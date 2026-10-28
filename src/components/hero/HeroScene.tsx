"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

// Three.js loads only in the browser, after the hero text is on screen
const BlobScene = dynamic(() => import("./BlobScene"), { ssr: false });

/** null = no WebGL; still = one finished frame, with no animation or pointer */
function pickMode(): { still: boolean } | null {
  const canvas = document.createElement("canvas");
  if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) return null;

  // ?still renders one frame (screenshots, Open Graph image);
  // ?motion animates even with reduced motion turned on (for testing)
  const params = new URLSearchParams(location.search);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches && !params.has("motion");
  const nav = navigator as Navigator & { deviceMemory?: number };
  const weak = (nav.deviceMemory ?? 8) <= 2 || navigator.hardwareConcurrency <= 2;
  return { still: params.has("still") || reduced || weak };
}

export function HeroScene() {
  const [mode, setMode] = useState<{ still: boolean } | null>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => setMode(pickMode()), []);

  return (
    <div className={`hero-scene${ready ? " is-ready" : ""}`}>
      {mode && <BlobScene still={mode.still} onReady={onReady} />}
    </div>
  );
}
