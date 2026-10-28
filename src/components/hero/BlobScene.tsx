"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Blob tracking in the style of TouchDesigner: boxes drift around with live
// coordinates, nearest boxes are linked, and the pointer becomes a tracked blob
// (in the accent color) that locks on to the closest ones.
// Orthographic camera in CSS pixels, so lines and text stay crisp.

const SNIPPETS = [
  {
    file: "face.glsl",
    code: ["uniform sampler2D uCam;", "varying vec2 vUv;", "void main() {", "  vec4 c = texture2D(uCam, vUv);", "  gl_FragColor = c;", "}"],
  },
  {
    file: "tracker.ts",
    code: ["const box = blob.bounds();", "label(box.x, box.y);", "link(box, nearest(box));"],
  },
  {
    file: "Grab.cs",
    code: ["void Update() {", "  if (trigger.pressed)", "    Grab(target);", "}"],
  },
];

type Blob = {
  bx: number;
  by: number;
  ax: number;
  ay: number;
  fx: number;
  fy: number;
  phase: number;
  w: number;
  h: number;
  depth: number;
  brackets: boolean;
  code: boolean;
  label: Label;
  plane?: THREE.Mesh;
  // Current frame, in pixels with y up
  x: number;
  y: number;
  cw: number;
  ch: number;
};

type Label = { mesh: THREE.Mesh; ctx: CanvasRenderingContext2D; tex: THREE.CanvasTexture; w: number; h: number };

// Same layout on every load, so the still frame (Open Graph) is predictable
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Segments {
  pos: Float32Array;
  col: Float32Array;
  n = 0;
  geometry = new THREE.BufferGeometry();
  object: THREE.LineSegments;

  constructor(max: number, order: number) {
    this.pos = new Float32Array(max * 6);
    this.col = new Float32Array(max * 6);
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.col, 3));
    this.object = new THREE.LineSegments(this.geometry, new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false }));
    this.object.frustumCulled = false;
    this.object.renderOrder = order;
  }

  line(x1: number, y1: number, x2: number, y2: number, c: THREE.Color) {
    if (this.n * 6 >= this.pos.length) return;
    this.pos.set([x1, y1, 0, x2, y2, 0], this.n * 6);
    this.col.set([c.r, c.g, c.b, c.r, c.g, c.b], this.n * 6);
    this.n++;
  }

  rect(x: number, y: number, w: number, h: number, c: THREE.Color, brackets = false) {
    const l = x - w / 2;
    const r = x + w / 2;
    const b = y - h / 2;
    const t = y + h / 2;
    if (!brackets) {
      this.line(l, b, r, b, c);
      this.line(r, b, r, t, c);
      this.line(r, t, l, t, c);
      this.line(l, t, l, b, c);
      return;
    }
    const k = Math.min(w, h) * 0.25;
    for (const [cx, cy, dx, dy] of [
      [l, b, 1, 1],
      [r, b, -1, 1],
      [r, t, -1, -1],
      [l, t, 1, -1],
    ]) {
      this.line(cx, cy, cx + dx * k, cy, c);
      this.line(cx, cy, cx, cy + dy * k, c);
    }
  }

  commit() {
    this.geometry.setDrawRange(0, this.n * 2);
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.n = 0;
  }

  dispose() {
    this.geometry.dispose();
    (this.object.material as THREE.Material).dispose();
  }
}

export default function BlobScene({ still, onReady }: { still: boolean; onReady: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current!;
    let disposed = false;

    const css = getComputedStyle(document.documentElement);
    const token = (name: string) => css.getPropertyValue(name).trim();
    const colors = {
      bg: token("--bg"),
      surface: token("--surface"),
      text: token("--text"),
      muted: token("--muted"),
      accent: token("--accent"),
      accentText: token("--accent-text"),
    };
    const ink = new THREE.Color(colors.text);
    const faint = new THREE.Color(colors.muted).lerp(new THREE.Color(colors.bg), 0.45);
    const accent = new THREE.Color(colors.accent);
    const dpr = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: still });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(colors.bg, 1);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -10, 10);

    const links = new Segments(200, 0);
    const boxes = new Segments(600, 2);
    scene.add(links.object, boxes.object);

    const disposables: { dispose(): void }[] = [links, boxes];
    // Meshes of the current layout, rebuilt when the layout changes
    let built: { meshes: THREE.Object3D[]; disposables: { dispose(): void }[] } = { meshes: [], disposables: [] };
    let font = "";

    // Text is drawn on small canvases at device resolution
    function canvas2d(w: number, h: number) {
      const c = document.createElement("canvas");
      c.width = Math.ceil(w * dpr);
      c.height = Math.ceil(h * dpr);
      const ctx = c.getContext("2d")!;
      ctx.scale(dpr, dpr);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      built.disposables.push(tex);
      return { ctx, tex };
    }

    function plane(tex: THREE.Texture, w: number, h: number, order: number) {
      const geometry = new THREE.PlaneGeometry(w, h);
      const material = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false });
      built.disposables.push(geometry, material);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = order;
      scene.add(mesh);
      built.meshes.push(mesh);
      return mesh;
    }

    function makeLabel(template: string): Label {
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `10px ${font}`;
      const w = Math.ceil(probe.measureText(template).width) + 8;
      const h = 15;
      const { ctx, tex } = canvas2d(w, h);
      return { mesh: plane(tex, w, h, 3), ctx, tex, w, h };
    }

    function drawLabel(label: Label, text: string, chip: boolean) {
      const { ctx, w, h } = label;
      ctx.clearRect(0, 0, w, h);
      ctx.font = `10px ${font}`;
      ctx.textBaseline = "middle";
      if (chip) {
        ctx.fillStyle = colors.text;
        ctx.fillRect(0, 0, Math.ceil(ctx.measureText(text).width) + 8, h);
      }
      ctx.fillStyle = chip ? colors.bg : colors.text;
      ctx.fillText(text, 4, h / 2 + 1);
      label.tex.needsUpdate = true;
    }

    function codeWindow(lines: string[]) {
      const size = 10;
      const lineH = 14;
      const pad = 10;
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `${size}px ${font}`;
      const w = Math.ceil(Math.max(...lines.map((l) => probe.measureText(l).width))) + pad * 2 + 20;
      const h = lines.length * lineH + pad * 2;
      const { ctx, tex } = canvas2d(w, h);
      ctx.fillStyle = colors.surface;
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${size}px ${font}`;
      ctx.textBaseline = "middle";
      lines.forEach((line, i) => {
        const y = pad + i * lineH + lineH / 2;
        ctx.fillStyle = colors.muted;
        ctx.fillText(String(i + 1), pad, y);
        ctx.fillStyle = colors.text;
        ctx.fillText(line, pad + 20, y);
      });
      return { mesh: plane(tex, w, h, 1), w, h };
    }

    let blobs: Blob[] = [];
    let cursorLabel: Label;
    let region = { x: 0, y: 0, w: 1, h: 1 };
    let width = 1;
    let height = 1;

    // Fewer code windows when the region is narrow, so they do not pile up
    function sizeClass() {
      return width < 768 ? "phone" : region.w < 440 ? "narrow" : "wide";
    }
    let builtFor = "";

    function build() {
      builtFor = sizeClass();
      built.meshes.forEach((m) => scene.remove(m));
      built.disposables.forEach((d) => d.dispose());
      built = { meshes: [], disposables: [] };

      const rand = rng(7);
      const phone = builtFor === "phone";
      const tracked = phone ? 5 : builtFor === "narrow" ? 6 : 8;
      const snippets = builtFor === "wide" ? SNIPPETS : SNIPPETS.slice(0, 2);
      const scale = phone ? 0.75 : 1;
      const spots =
        builtFor === "wide"
          ? [
              [0.2, 0.2],
              [0.62, 0.8],
              [0.82, 0.32],
            ]
          : [
              [0.25, 0.2],
              [0.75, 0.78],
            ];

      blobs = [];
      snippets.forEach((s, i) => {
        const win = codeWindow(s.code);
        const label = makeLabel(s.file);
        drawLabel(label, s.file, true);
        blobs.push({
          bx: spots[i][0],
          by: spots[i][1],
          ax: 0.03,
          ay: 0.03,
          fx: 0.15 + rand() * 0.1,
          fy: 0.12 + rand() * 0.1,
          phase: rand() * 10,
          w: win.w,
          h: win.h,
          depth: 0.3 + rand() * 0.3,
          brackets: false,
          code: true,
          label,
          plane: win.mesh,
          x: 0,
          y: 0,
          cw: win.w,
          ch: win.h,
        });
      });
      // Spread the tracked blobs so boxes and labels do not pile up: try random
      // spots until one is clear of the code windows and the other blobs
      // (footprints in region units, padded for the label and the drift)
      const taken = blobs.map((b) => ({ x: b.bx, y: b.by, rx: (b.w / 2 + 12) / region.w, ry: (b.h / 2 + 16) / region.h }));
      for (let i = 0; i < tracked; i++) {
        const w = (36 + rand() * 70) * scale;
        const h = (30 + rand() * 56) * scale;
        const rx = (w / 2 + 28) / region.w;
        const ry = (h / 2 + 20) / region.h;
        let bx = 0;
        let by = 0;
        let clear = false;
        for (let tries = 0; tries < 200 && !clear; tries++) {
          bx = 0.06 + rand() * 0.88;
          by = 0.06 + rand() * 0.88;
          clear = taken.every((t) => Math.abs(t.x - bx) > t.rx + rx || Math.abs(t.y - by) > t.ry + ry);
        }
        // No room left: fewer blobs is better than a pile
        if (!clear) continue;
        taken.push({ x: bx, y: by, rx, ry });
        blobs.push({
          bx,
          by,
          ax: 0.02 + rand() * 0.04,
          ay: 0.02 + rand() * 0.04,
          fx: 0.15 + rand() * 0.3,
          fy: 0.12 + rand() * 0.3,
          phase: rand() * 10,
          w,
          h,
          depth: 0.6 + rand() * 0.8,
          brackets: i % 2 === 1,
          code: false,
          label: makeLabel("#00 x0.000 y0.000"),
          x: 0,
          y: 0,
          cw: 0,
          ch: 0,
        });
      }
      cursorLabel = makeLabel("cursor x0.000 y0.000");
    }

    // Desktop: right of the text. Phone: a band above the text.
    function layout() {
      width = host.clientWidth;
      height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.right = width;
      camera.top = height;
      camera.updateProjectionMatrix();
      region =
        width >= 768
          ? { x: width * 0.54, y: 28, w: width * 0.46 - 32, h: height - 56 }
          : { x: 16, y: height - 250, w: width - 32, h: 230 };
    }

    // Pointer, in the host's pixels with y up
    const pointer = { x: 0, y: 0, inside: false, px: 0, py: 0 };
    const parallax = new THREE.Vector2();
    function onPointerMove(e: PointerEvent) {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = r.bottom - e.clientY;
      pointer.inside =
        pointer.x > region.x - 24 &&
        pointer.x < region.x + region.w + 24 &&
        pointer.y > region.y - 24 &&
        pointer.y < region.y + region.h + 24;
      pointer.px = e.clientX / window.innerWidth - 0.5;
      pointer.py = e.clientY / window.innerHeight - 0.5;
    }

    function update(time: number, relabel: boolean) {
      parallax.x += (pointer.px - parallax.x) * 0.05;
      parallax.y += (pointer.py - parallax.y) * 0.05;

      for (const b of blobs) {
        const breathe = b.code ? 1 : 1 + 0.15 * Math.sin(time * 0.7 + b.phase);
        b.cw = b.w * breathe;
        b.ch = b.h * breathe;
        const nx = b.bx + b.ax * Math.sin(time * b.fx + b.phase);
        const ny = b.by + b.ay * Math.cos(time * b.fy + b.phase * 1.3);
        // Keep the whole box inside the region
        const hw = Math.min(b.cw / 2, region.w / 2);
        const hh = Math.min(b.ch / 2, region.h / 2);
        b.x = THREE.MathUtils.clamp(region.x + nx * region.w, region.x + hw, region.x + region.w - hw) - parallax.x * b.depth * 24;
        b.y = THREE.MathUtils.clamp(region.y + (1 - ny) * region.h, region.y + hh, region.y + region.h - hh) + parallax.y * b.depth * 24;
      }

      // The pointer locks on to the three closest blobs
      const locked = new Set<Blob>();
      if (pointer.inside) {
        [...blobs]
          .sort((a, b) => Math.hypot(a.x - pointer.x, a.y - pointer.y) - Math.hypot(b.x - pointer.x, b.y - pointer.y))
          .slice(0, 3)
          .forEach((b) => {
            locked.add(b);
            links.line(pointer.x, pointer.y, b.x, b.y, accent);
          });
        boxes.rect(pointer.x, pointer.y, 56, 56, accent);
      }

      // Each blob links to its nearest neighbor
      blobs.forEach((a, i) => {
        let best: Blob | null = null;
        let dist = Infinity;
        blobs.forEach((b, j) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (j !== i && d < dist) {
            dist = d;
            best = b;
          }
        });
        if (best) links.line(a.x, a.y, (best as Blob).x, (best as Blob).y, faint);
      });

      blobs.forEach((b, i) => {
        const c = locked.has(b) ? accent : ink;
        boxes.rect(b.x, b.y, b.cw, b.ch, c, b.brackets);
        if (!b.code) {
          boxes.line(b.x - 4, b.y, b.x + 4, b.y, c);
          boxes.line(b.x, b.y - 4, b.x, b.y + 4, c);
        }
        b.plane?.position.set(Math.round(b.x), Math.round(b.y), 0);
        // Label at the top-left corner, pushed back in if it would leave the canvas
        const left = Math.min(b.x - b.cw / 2, width - b.label.w - 4);
        const top = b.y + b.ch / 2;
        b.label.mesh.position.set(Math.round(left + b.label.w / 2), Math.round(top + b.label.h / 2 + 2), 0);
        if (relabel && !b.code) {
          const id = String(i).padStart(2, "0");
          drawLabel(b.label, `#${id} x${(b.x / width).toFixed(3)} y${(1 - b.y / height).toFixed(3)}`, false);
        }
      });

      cursorLabel.mesh.visible = pointer.inside;
      if (pointer.inside) {
        cursorLabel.mesh.position.set(Math.round(pointer.x - 28 + cursorLabel.w / 2), Math.round(pointer.y + 28 + cursorLabel.h / 2 + 2), 0);
        if (relabel) {
          const { ctx, w, h } = cursorLabel;
          const text = `cursor x${(pointer.x / width).toFixed(3)} y${(1 - pointer.y / height).toFixed(3)}`;
          ctx.clearRect(0, 0, w, h);
          ctx.font = `10px ${font}`;
          ctx.fillStyle = colors.accent;
          ctx.fillRect(0, 0, Math.ceil(ctx.measureText(text).width) + 8, h);
          ctx.fillStyle = colors.accentText;
          ctx.textBaseline = "middle";
          ctx.fillText(text, 4, h / 2 + 1);
          cursorLabel.tex.needsUpdate = true;
        }
      }

      links.commit();
      boxes.commit();
      renderer.render(scene, camera);
    }

    let time = 8;
    let prev = performance.now();
    let lastLabel = 0;
    function frame() {
      const now = performance.now();
      time += Math.min((now - prev) / 1000, 0.05);
      prev = now;
      // Labels are redrawn ten times a second, enough for numbers to read as live
      const relabel = now - lastLabel > 100;
      if (relabel) lastLabel = now;
      update(time, relabel);
    }

    // Only animate while the hero is on screen and the tab is visible
    let onScreen = true;
    function updateLoop() {
      const run = !still && onScreen && !document.hidden;
      if (run) prev = performance.now();
      renderer.setAnimationLoop(run ? frame : null);
    }
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      updateLoop();
    });
    const resize = new ResizeObserver(() => {
      layout();
      if (sizeClass() !== builtFor) build();
      update(time, true);
    });

    // Labels and code use the site font, so wait for it
    document.fonts.ready.then(() => {
      if (disposed) return;
      font = getComputedStyle(document.body).fontFamily;
      layout();
      build();
      update(time, true);
      resize.observe(host);
      observer.observe(host);
      document.addEventListener("visibilitychange", updateLoop);
      if (!still) window.addEventListener("pointermove", onPointerMove, { passive: true });
      updateLoop();
      onReady();
    });

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", updateLoop);
      window.removeEventListener("pointermove", onPointerMove);
      [...disposables, ...built.disposables].forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [still, onReady]);

  return <div ref={ref} className="hero-canvas" aria-hidden="true" />;
}
