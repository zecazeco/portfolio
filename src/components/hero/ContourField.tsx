"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Contour lines of a slowly drifting, domain-warped noise field, like a
// generative TouchDesigner patch: thin grey lines, every fifth one a bit
// darker and one band in the accent orange. The mouse raises a soft hill in
// the field, so the lines bend around it.
//
// One pass, no feedback: each pixel is computed from scratch. To stay light it
// draws at 1x pixel ratio, at most 30 fps, and only while the hero is on
// screen; with `still` it draws a single frame.

const MAX_FPS = 30;

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;    // px, y up
uniform float uMouseOn; // 0..1, eased
varying vec2 vUv;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

// Gradient noise, about -0.7..0.7
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0)), f - vec2(1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  return noise(p) + 0.5 * noise(p * 2.03 + 1.7) + 0.25 * noise(p * 4.01 + 4.3);
}

void main() {
  vec2 p = vUv * uRes;
  float t = uTime * 0.025;

  // Domain warp: the field folds over itself, slowly
  vec2 q = p * 0.0025;
  vec2 warp = vec2(fbm(q + vec2(t, 0.0)), fbm(q + vec2(5.2, 1.3) - vec2(0.0, t)));
  float f = fbm(q * 1.4 + warp * 1.2 + vec2(0.0, t * 0.5));

  // The mouse: a soft hill
  vec2 m = p - uMouse;
  f += 0.35 * uMouseOn * exp(-dot(m, m) / (2.0 * 110.0 * 110.0));

  // Contour lines, 1 px wide whatever the slope
  float v = f * 12.0;
  float line = 1.0 - smoothstep(0.0, 1.0, abs(fract(v + 0.5) - 0.5) / fwidth(v));
  float band = floor(v + 0.5);
  float major = step(abs(mod(band, 5.0)), 0.5);
  float accent = step(abs(mod(band + 2.0, 9.0)), 0.5);

  vec3 col = mix(vec3(0.067), vec3(1.0, 0.616, 0.357), accent);
  float a = line * mix(mix(0.13, 0.26, major), 0.7, accent);
  gl_FragColor = vec4(col * a, a); // premultiplied
}
`;

export default function ContourField({ still }: { still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      blending: THREE.NoBlending,
      uniforms: {
        uRes: { value: new THREE.Vector2() },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uMouseOn: { value: 0 },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    const scene = new THREE.Scene();
    scene.add(quad);
    const camera = new THREE.Camera();
    const u = material.uniforms;

    function resize() {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      u.uRes.value.set(w, h);
      if (still || !running) renderer.render(scene, camera);
    }

    // Mouse over the hero, in canvas pixels (y up)
    let mouseIn = false;
    function onPointerMove(e: PointerEvent) {
      const r = host.getBoundingClientRect();
      mouseIn = e.pointerType === "mouse" && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (mouseIn) u.uMouse.value.set(e.clientX - r.left, r.bottom - e.clientY);
    }

    let running = false;
    let visible = true;
    let last = 0;
    // Starts at a random moment, so the pattern differs on every visit
    let time = Math.random() * 400;
    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.1);
      if (dt < 1 / MAX_FPS - 0.002) return;
      last = now;
      time += dt;
      u.uTime.value = time;
      u.uMouseOn.value += ((mouseIn ? 1 : 0) - u.uMouseOn.value) * Math.min(1, dt * 2);
      renderer.render(scene, camera);
    }
    function update() {
      const go = !still && visible && !document.hidden;
      if (go === running) return;
      running = go;
      last = performance.now();
      renderer.setAnimationLoop(go ? frame : null);
    }

    u.uTime.value = time;
    resize();
    host.classList.add("is-ready");

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(host);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    document.addEventListener("visibilitychange", update);
    if (!still) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pointermove", onPointerMove);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [still]);

  return <div ref={ref} className="hero-field" aria-hidden="true" />;
}
