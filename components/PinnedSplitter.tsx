// components/PinnedDualStack.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type Step = {
  leftTitle: string;
  leftBody: string;
  rightTitle: string;
  rightBody: string;
};

const STEPS: Step[] = [
  { leftTitle: "يسار 1", leftBody: "محتوى اليسار الأول.", rightTitle: "يمين 1", rightBody: "وصف يمين للخطوة 1." },
  { leftTitle: "يسار 2", leftBody: "محتوى اليسار الثاني.", rightTitle: "يمين 2", rightBody: "وصف يمين للخطوة 2." },
  { leftTitle: "يسار 3", leftBody: "محتوى اليسار الثالث.", rightTitle: "يمين 3", rightBody: "وصف يمين للخطوة 3." },
  { leftTitle: "يسار 4", leftBody: "محتوى اليسار الرابع.", rightTitle: "يمين 4", rightBody: "وصف يمين للخطوة 4." },
  { leftTitle: "يسار 5", leftBody: "محتوى اليسار الخامس.", rightTitle: "يمين 5", rightBody: "وصف يمين للخطوة 5." },
  { leftTitle: "يسار 6", leftBody: "محتوى اليسار السادس.", rightTitle: "يمين 6", rightBody: "وصف يمين للخطوة 6." },
];

export default function PinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const pinWrap = pinWrapRef.current!;

      // لوحات اليسار واليمين (متراكبة فوق بعض)
      const leftSlides = gsap.utils.toArray<HTMLElement>("[data-left-slide]");
      const rightSlides = gsap.utils.toArray<HTMLElement>("[data-right-slide]");

      // الحالة الابتدائية: أظهر الأولى، حضّر البقية للنزول من تحت
      gsap.set(leftSlides, { autoAlpha: 0, yPercent: 20 });
      gsap.set(rightSlides, { autoAlpha: 0, yPercent: 10 });
      if (leftSlides[0]) gsap.set(leftSlides[0], { autoAlpha: 1, yPercent: 0 });
      if (rightSlides[0]) gsap.set(rightSlides[0], { autoAlpha: 1, yPercent: 0 });

      // طول التأثير = (عدد الشرائح - 1) * ارتفاع الشاشة
      const totalSteps = leftSlides.length;
      const endDistance = () => (totalSteps - 1) * window.innerHeight;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${endDistance()}`,
          pin: pinWrap,         // ✅ تثبيت العمودين معًا
          pinSpacing: true,
          pinReparent: true,
          scrub: 1,
          snap: totalSteps > 1 ? 1 / (totalSteps - 1) :0, // سناب بين الشرائح
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      // عند كل خطوة: الحالية تطلع لفوق وتتلاشى، التالية تطلع من تحت وتظهر
      for (let i = 0; i < totalSteps - 1; i++) {
        // يسار
        tl.to(leftSlides[i],   { yPercent: -15, autoAlpha: 0, duration: 0.45 }, "+=0.25");
        tl.to(leftSlides[i+1], { yPercent: 0,   autoAlpha: 1, duration: 0.45 }, "<");

        // يمين (يتبدّل النص فقط، نفس الفكرة)
        tl.to(rightSlides[i],   { yPercent: -10, autoAlpha: 0, duration: 0.35 }, "<");
        tl.to(rightSlides[i+1], { yPercent: 0,   autoAlpha: 1, duration: 0.35 }, "<0.05");
      }

      // تنظيف
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-neutral-950 text-white">
      {/* الحاوية التي سيتم تثبيتها كاملة */}
      <div ref={pinWrapRef} className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">

          {/* العمود الأيسر: ستاك شرائح متراكبة */}
          <div className="relative h-[70vh] md:h-[80vh] lg:h-[80vh] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            {STEPS.map((s, i) => (
              <article
                key={i}
                data-left-slide
                className="absolute inset-0 p-6 md:p-8"
              >
                <div className="flex h-full w-full flex-col justify-end">
                  <h2 className="text-2xl md:text-4xl font-bold">{s.leftTitle}</h2>
                  <p className="mt-2 text-neutral-300 max-w-prose">{s.leftBody}</p>
                </div>
              </article>
            ))}
          </div>

          {/* العمود الأيمن: ستاك نصوص ثابت مكانها ويتبدّل المحتوى */}
          <div className="relative h-[60vh] md:h-[80vh] lg:h-[80vh]">
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative w-full max-w-md">
                {STEPS.map((s, i) => (
                  <div key={i} data-right-slide className="absolute inset-0">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-xl">
                      <span className="text-xs uppercase tracking-widest text-neutral-400">
                        {i + 1} / {STEPS.length}
                      </span>
                      <h3 className="mt-2 text-2xl md:text-3xl font-semibold">{s.rightTitle}</h3>
                      <p className="mt-3 text-neutral-300 leading-relaxed">{s.rightBody}</p>
                    </div>
                  </div>
                ))}
                {/* spacer غير مرئي لضمان أبعاد الحاوية المطلقة */}
                <div className="opacity-0 pointer-events-none select-none">
                  <div className="rounded-2xl border p-6">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
