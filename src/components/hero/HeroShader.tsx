"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js loads only in the browser, after the page is on screen
const ContourField = dynamic(() => import("./ContourField"), { ssr: false });

/**
 * Contour-line shader behind the hero. Animated only with a mouse and motion
 * allowed (?motion forces it); otherwise, one still frame. Nothing without WebGL2.
 */
export function HeroShader() {
  const [mode, setMode] = useState<{ still: boolean } | null>(null);

  useEffect(() => {
    if (!document.createElement("canvas").getContext("webgl2")) return;
    const params = new URLSearchParams(location.search);
    const mouse = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode({ still: !params.has("motion") && (!mouse || reduced) });
  }, []);

  return mode && <ContourField still={mode.still} />;
}
