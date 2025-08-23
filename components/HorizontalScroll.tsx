// components/HorizontalScroll.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const track = trackRef.current!;

      // panels = عدد الشاشات الأفقية
      const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-panel]"));
      // اضبط عرض التراك بناءً على عدد البانلز
      track.style.width = `${panels.length * 100}vw`;

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          scrub: 1,
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
          // markers: true, // فعّلها لو تحب تشوف الحدود
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-svh overflow-visible z-0"
    >
      <div ref={trackRef} className="h-svh flex will-change-transform">
        <article data-panel className="w-screen h-svh grid place-items-center text-4xl font-bold ">
          صفحة 1
        </article>
        <article data-panel className="w-screen h-svh grid place-items-center text-4xl font-bold">
          صفحة 2
        </article>
        <article data-panel className="w-screen h-svh grid place-items-center text-4xl font-bold">
          صفحة 3
        </article>
      </div>
    </section>
  );
}
