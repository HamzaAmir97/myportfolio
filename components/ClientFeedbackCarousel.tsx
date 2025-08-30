// components/ClientFeedbackCarousel.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Feedback } from "@/types";


const FEEDBACKS: Feedback[] = [
  {
    quote:
      "I just wanted to share a quick note and let you know that you guys do a really good job.",
    name: "Rohan Sing",
    title: "Project Manager, Airflow Tech Inc",
    image: "/people/rohan.jpg",
  },
  {
    quote:
      "Delivery was on time, the UI is spotless, and the handover was super smooth. Highly recommended!",
    name: "Mia Carter",
    title: "Head of Product, Nova Labs",
    image: "/people/mia.jpg",
  },
  {
    quote:
      "They understood our constraints and still shipped a delightful, accessible experience.",
    name: "Omar El‑Sayed",
    title: "CTO, Relay Commerce",
    image: "/people/omar.jpg",
  },
];

/** -------------------------------------------------
 *  مكوّن: قناع (Mask) لصورة النجمة/الزخرفة
 *  - نستخدم SVG mask للحصول على شكل “انفجار/بتلات”
 *  ------------------------------------------------- */
function StarMaskImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
      {/* SVG mask inline حتى تشتغل على كل المتصفحات الحديثة */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <mask id="burstMask" maskUnits="objectBoundingBox">
            {/* خلفية سوداء = شفّافة، أبيض = مرئي */}
            <rect x="0" y="0" width="1" height="1" fill="black" />
            {/* دائرة أساسية */}
            <circle cx="0.5" cy="0.5" r="0.36" fill="white" />
            {/* بتلات حول الدائرة */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const cx = 0.5 + Math.cos(angle) * 0.23;
              const cy = 0.5 + Math.sin(angle) * 0.23;
              return <circle key={i} cx={cx} cy={cy} r="0.12" fill="white" />;
            })}
          </mask>
        </defs>
      </svg>

      <div
        className="absolute inset-0 rounded-none overflow-hidden"
        style={{ mask: "url(#burstMask)", WebkitMask: "url(#burstMask)" }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0")}
        />
      </div>
    </div>
  );
}

/** -------------------------------------------------
 *  الكومبوننت الرئيسي: ClientFeedbackCarousel
 *  - يكدّس الشرائح فوق بعضها (position: absolute)
 *  - GSAP يدير التبديل كل 2 ثانية
 *  - إيقاف مؤقت عند hover / احترام prefers-reduced-motion
 *  ------------------------------------------------- */
export default function ClientFeedbackCarousel() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const slides = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-slide]"));

    // لو جهاز المستخدم يفضّل تقليل الحركة
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // إظهار أول سلايد
    gsap.set(slides, { autoAlpha: 0, yPercent: 2 });
    if (slides[0]) gsap.set(slides[0], { autoAlpha: 1, yPercent: 0 });

    if (reduceMotion || slides.length <= 1) return;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.out" } });
    const hold = 2; // ثانيتان لكل فيدباك

    slides.forEach((slide, i) => {
      const next = slides[(i + 1) % slides.length];

      // أمسك السلايد الحالي ظاهر لمدة hold
      tl.to({}, { duration: hold });

      // اخفاء الحالي
      tl.to(slide, { autoAlpha: 0, yPercent: -2, duration: 0.35 }, "<");

      // إظهار التالي
      tl.set(next, { yPercent: 4 }, "<"); // حضّر التالي خارج المكان
      tl.to(next, { autoAlpha: 1, yPercent: 0, duration: 0.45 }, "<0.05");
    });

    // إيقاف مؤقت عند الـ hover
    const onEnter = () => tl.pause();
    const onLeave = () => tl.resume();
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  return (
    <section className=" text-neutral-900">
      <div
        ref={rootRef}
        className="
          relative mx-auto w-full max-w-6xl
          px-5 sm:px-8 md:px-10
          py-10 sm:py-12 md:py-16
        "
      >
        {/* شريط صغير أعلى اليسار */}
        <div className="text-[11px] tracking-widest uppercase font-semibold text-neutral-700 dark:text-neutral-200 mb-4">
          Client Feedback
          <span className="block w-14 h-[2px]mt-2" />
        </div>

        {/* الحاوية التي تحتوي كل الشرائح فوق بعض */}
        <div className="relative min-h-[340px] sm:min-h-[360px] md:min-h-[420px]">
          {FEEDBACKS.map((f, i) => (
            <div
              key={f.name + i}
              data-slide
              className="
                absolute inset-0 grid grid-cols-1 md:grid-cols-[1fr_auto]
                items-center gap-8 md:gap-10
              "
            >
              {/* النص الكبير */}
              <blockquote className="order-2 md:order-1">
                <p className="text-2xl sm:text-3xl md:text-[42px] leading-[1.15] font-extrabold tracking-tight dark:text-neutral-200">
                  “{f.quote}”
                </p>

                <footer className="mt-6">
                  <div className="font-semibold dark:text-neutral-200">{f.name}</div>
                  <div className="text-sm text-neutral-600">{f.title}</div>

                  {/* زخرفة تموّج بسيطة */}
                  <svg
                    aria-hidden="true"
                    className="mt-4"
                    width="120"
                    height="10"
                    viewBox="0 0 120 10"
                    fill="none"
                  >
                    <path
                      d="M1 5c6-4 12 4 18 0s12 4 18 0 12 4 18 0 12 4 18 0 12 4 18 0 12 4 18 0"
                      stroke="currentColor"
                      className="text-neutral-800 dark:text-neutral-200"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </footer>
              </blockquote>

              {/* صورة العميل بالزخرفة */}
              <div className="order-1 md:order-2 justify-self-center md:justify-self-end">
                <StarMaskImage src={f.image} alt={f.name} />
              </div>
            </div>
          ))}
        </div>

        {/* زر إغلاق ديكوري أعلى يمين (اختياري) */}
        <div className="hidden md:block absolute top-4 right-4">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 4l16 16M20 4L4 20" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </section>
  );
}
