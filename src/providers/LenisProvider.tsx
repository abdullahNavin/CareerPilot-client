"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      allowNestedScroll: true,
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
