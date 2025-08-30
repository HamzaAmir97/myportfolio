"use client";

import { Children, useEffect, useRef, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  /** pixels per second */
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  /** عدد العناصر الظاهرة */
  itemsToShow?: number;
  /** المسافة بين العناصر (px) */
  gap?: number;
}

export function Marquee({
  children,
  direction = "left",
  speed = 80,
  pauseOnHover = true,
  className = "",
  itemsToShow = 4,
  gap = 2,
}: MarqueeProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const recalc = () => {
      if (contentRef.current) setContentWidth(contentRef.current.scrollWidth);
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [children, itemsToShow, gap]);

  // المدة بالثواني = عرض المحتوى / السرعة (px/sec)
  const durationSec = contentWidth > 0 ? contentWidth / speed : 20;
  const items = Children.toArray(children);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className="flex flex-nowrap items-center"
        style={{
          ["--gap" as any]: `${gap}px`,
          ["--visible" as any]: itemsToShow as any,
          gap: "var(--gap)",
          // ❌ لا تستخدم animation: ... (shorthand)
          // ✅ استخدم longhand فقط:
          animationName: `marquee-${direction}`,
          animationDuration: `${durationSec}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDelay: "0s",
          animationDirection: "normal",
          animationFillMode: "none",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {/* نسخة 1 */}
        <div
          ref={contentRef}
          className="flex flex-nowrap items-center shrink-0"
          style={{ gap: "var(--gap)" }}
        >
          {items.map((child, i) => (
            <div
              key={`a-${i}`}
              style={{
                flex: "0 0 calc((100% - (var(--gap) * (var(--visible) - 1))) / var(--visible))",
                whiteSpace: "nowrap",
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* نسخة 2 (للتكرار اللانهائي) */}
        <div className="flex flex-nowrap items-center shrink-0" style={{ gap: "var(--gap)" }}>
          {items.map((child, i) => (
            <div
              key={`b-${i}`}
              style={{
                flex: "0 0 calc((100% - (var(--gap) * (var(--visible) - 1))) / var(--visible))",
                whiteSpace: "nowrap",
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* keyframes فقط — لا تضيف animation هنا */}
      <style>{`
        @keyframes marquee-left { 
          from { transform: translateX(0); } 
          to   { transform: translateX(-50%); } 
        }
        @keyframes marquee-right { 
          from { transform: translateX(-50%); } 
          to   { transform: translateX(0); } 
        }
      `}</style>
    </div>
  );
}
