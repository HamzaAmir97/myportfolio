// components/ExperienceTimeline.tsx
"use client";

import { ExperienceItem, ExperienceTimelineProps } from "@/types";
import React from "react";


/** ------------------------------
 *  عنصر صغير: فاصل عمودي / أفقي
 *  يتحوّل لعمودي على الشاشات الكبيرة، وأفقي على الموبايل.
 *  ------------------------------ */
function Divider() {
  return (
    <span
      aria-hidden="true"
      className="
        hidden lg:block w-px h-8 bg-neutral-700/60
        lg:mx-6
      "
    />
  );
}

/** ------------------------------
 *  عنصر رقم داخل مربع
 *  ------------------------------ */
function IndexBadge({ index, featured }: { index: number; featured?: boolean }) {
  return (
    <div
      className={[
        "flex h-12 w-12 items-center justify-center rounded-md border",
        featured
          ? "bg-neutral-900 border-neutral-700 text-white"
          : "bg-white text-neutral-900 border-neutral-200",
        "shadow-sm shrink-0",
      ].join(" ")}
    >
      <span className="text-base font-extrabold">{index}</span>
    </div>
  );
}

/** ------------------------------
 *  كرت خبرة مفرد
 *  ------------------------------ */
function ExperienceCard({
  item,
  index,
  rtl,
}: {
  item: ExperienceItem;
  index: number;
  rtl?: boolean;
}) {
  const isFeatured = Boolean(item.featured || index === 1);

  return (
    <article
      className={[
        "rounded-xl border transition-shadow",
        isFeatured
          ? "bg-neutral-900 text-white border-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          : "bg-white text-neutral-900 border-neutral-200",
      ].join(" ")}
    >
      <div
        className={[
          "flex flex-col gap-4 p-4 sm:p-5 md:p-6",
          "lg:flex-row lg:items-center lg:justify-between",
        ].join(" ")}
        style={{ direction: rtl ? "rtl" : "ltr" }}
      >
        {/* اليسار: الرقم + العنوان/الوصف */}
        <div className="flex items-start gap-4 lg:gap-6">
          <IndexBadge index={item.id ?? index} featured={isFeatured} />

          <div className="min-w-0">
            <h3
              className={[
                "text-base sm:text-lg md:text-xl font-extrabold tracking-tight",
                isFeatured ? "text-white" : "text-neutral-900",
              ].join(" ")}
            >
              {item.role}
            </h3>

            <p
              className={[
                "mt-1 text-sm sm:text-[15px] leading-relaxed",
                isFeatured ? "text-neutral-200" : "text-neutral-600",
              ].join(" ")}
            >
              {item.org}
              {item.location ? (
                <>
                  {" "}
                  <span className="opacity-70">— {item.location}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>

        {/* فاصل عمودي على الديسكتوب */}
        <Divider />

        {/* اليمين: مدة الوظيفة */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* فاصل أفقي للموبايل فقط */}
          <div className="lg:hidden h-px w-full bg-neutral-200 my-2" />
          <span
            className={[
              "text-xs sm:text-[13px] uppercase tracking-wider",
              isFeatured ? "text-amber-300" : "text-neutral-500",
              "whitespace-nowrap",
            ].join(" ")}
          >
            مدة الوظيفة
          </span>
          <span
            className={[
              "text-sm sm:text-base font-semibold",
              isFeatured ? "text-white" : "text-neutral-800",
              "whitespace-nowrap",
            ].join(" ")}
          >
            {item.durationLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

/** ------------------------------
 *  الكومبوننت الرئيسي: قائمة الخبرات
 *  - متجاوب بالكامل
 *  - يدعم RTL عبر prop
 *  ------------------------------ */
export default function ExperienceTimeline({
  title = "Experience",
  subtitle,
  items = [],
  rtl = false,
  className,
}: ExperienceTimelineProps) {
  return (
    <section
      className={[
        "w-full max-w-5xl mx-auto  md:my-10 px-4 sm:px-6 md:px-8",
        className ?? "",
      ].join(" ")}
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      {/* الهيدر */}
      <header className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm sm:text-[15px] text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        ) : null}
      </header>

      {/* القائمة */}
      <div className="space-y-4 md:space-y-5">
        {items.map((item, idx) => (
          <ExperienceCard
            key={(item.id ?? idx) + item.role}
            item={item}
            index={(item.id ?? idx) + 1}
            rtl={rtl}
          />
        ))}
      </div>
    </section>
  );
}

/** ------------------------------
 *  مثال جاهز للاستخدام (اختياري)
 *  انسخه لأي صفحة لتجربة الكومبوننت بسرعة
 *  ------------------------------ */
