// components/StatsStrip.tsx
"use client";

import React from "react";
import {
  ClipboardList,
  Users,
  Settings,
  Globe2,
  Icon as LucideIcon,
} from "lucide-react";
import { StatItem, StatsStripProps } from "@/types";

/** -------------------------------------------
 * دالة مساعدة: تنسيق الرقم بعدد خانات أدنى
 * ------------------------------------------- */
function formatValue(val: number | string, minDigits = 1) {
  if (typeof val === "number") {
    return String(val).padStart(minDigits, "0");
  }
  return val;
}


/** -------------------------------------------
 * عنصر صندوق إحصائية مفرد
 * ------------------------------------------- */
function StatCard({ item }: { item: StatItem }) {
  const { Icon, value, label, minDigits = 1 } = item;

  return (
    <div
      className="
        flex flex-col items-center justify-center gap-3
        p-6 sm:p-7 lg:p-8
        bg-white
      "
    >
      <Icon className="h-9 w-9 sm:h-10 sm:w-10 text-neutral-700" strokeWidth={1.75} />
      <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
        {formatValue(value, minDigits)}
      </div>
      <div className="text-sm sm:text-[15px] text-neutral-600 text-center">
        {label}
      </div>
    </div>
  );
}

/** -------------------------------------------
 * الكومبوننت الرئيسي: شريط الإحصائيات
 * - شبكة 1/2/4 أعمدة
 * - حدود رفيعة بين العناصر (مثل التصميم)
 * ------------------------------------------- */
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
          border border-neutral-200
          divide-y sm:divide-y-0 sm:divide-x divide-neutral-200
          rounded-xl overflow-hidden bg-white
        "
      >
        {items.map((it, i) => (
          <StatCard key={i + it.label} item={it} />
        ))}
      </div>
    </section>
  );
}

/** -------------------------------------------
 * مثال جاهز للاستخدام (اختياري)
 * انسخه داخل صفحة لتجربة الكومبوننت سريعًا
 * ------------------------------------------- */
// export function DemoStats() {
  