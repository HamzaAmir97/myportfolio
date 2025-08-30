// components/StatsStrip.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Users,
  Settings,
  Globe2,
  Icon as LucideIcon,
} from "lucide-react";
import { StatItem, StatsStripProps } from "@/types";

/** تنسيق الرقم بعدد خانات أدنى */
function formatValue(val: number | string, minDigits = 1) {
  if (typeof val === "number") return String(val).padStart(minDigits, "0");
  return val;
}

/** عدّاد تدريجي عند الظهور */
function useCountUp(target: number, run: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (typeof window === "undefined") return;

    // تقليل الحركة
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = target;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(p);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, durationMs]);

  return value;
}

/** صندوق الإحصائية */
function StatCard({ item }: { item: StatItem }) {
  const { Icon, value, label, minDigits = 1 } = item;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // رصد الظهور مرة واحدة
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isNumber = typeof value === "number";
  const animated = useCountUp(isNumber ? value : 0, inView, 1400);

  return (
    <div
      ref={ref}
      className="
        flex flex-col items-center justify-center gap-3
        p-6 sm:p-7 lg:p-8
        bg-white dark:bg-neutral-900
      "
    >
      <Icon className="h-9 w-9 sm:h-10 sm:w-10 text-neutral-700 dark:text-neutral-200" strokeWidth={1.75} />
      <div
        className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
        aria-live="polite"
      >
        {formatValue(isNumber ? animated : value, minDigits)}
      </div>
      <div className="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400 text-center">
        {label}
      </div>
    </div>
  );
}

/** شريط الإحصائيات */
export default function StatsStrip({
  heading,
  items,
  rtl = false,
  className,
}: StatsStripProps) {
  return (
    <section
      className={[
        "w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8",
        className ?? "",
      ].join(" ")}
      style={{ direction: rtl ? "rtl" : "ltr" }}
      aria-label={heading ?? "Statistics"}
    >
      {heading ? (
        <header className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {heading}
          </h2>
        </header>
      ) : null}

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          border border-neutral-200 dark:border-neutral-800
          divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800
          rounded-xl overflow-hidden bg-white dark:bg-neutral-900
        "
      >
        {items.map((it, i) => (
          <StatCard key={i + it.label} item={it} />
        ))}
      </div>
    </section>
  );
}
