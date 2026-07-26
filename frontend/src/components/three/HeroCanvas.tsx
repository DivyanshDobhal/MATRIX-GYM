import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

/**
 * Client-only wrapper for the R3F hero scene.
 * - Adds mouse-based parallax on the canvas host.
 * - Defers mounting until visible + idle to keep TTI fast.
 */
export function HeroCanvas() {
  return (
    <ClientOnly fallback={<div className="absolute inset-0" aria-hidden />}>
      <ParallaxHost>
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </ParallaxHost>
    </ClientOnly>
  );
}

function ParallaxHost({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const cb = () => setMounted(true);
    const w = window as any;
    const id = typeof w.requestIdleCallback === "function"
      ? w.requestIdleCallback(cb, { timeout: 800 })
      : setTimeout(cb, 400);
    return () => {
      if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--px", `${cx * 12}px`);
      el.style.setProperty("--py", `${cy * 12}px`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={host}
      className="absolute inset-0"
      style={{ transform: "translate3d(var(--px,0), var(--py,0), 0)" }}
    >
      {mounted && children}
    </div>
  );
}
