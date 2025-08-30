
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"; // أو "gsap-trial/ScrambleTextPlugin"

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

// مجموعة مسند الافتراضية
const MUSNAD_CHARS =
  "𐩠𐩡𐩢𐩣𐩤𐩥𐩦𐩧𐩨𐩩𐩪𐩫𐩬𐩭𐩮𐩯𐩰𐩱𐩲𐩳𐩴𐩵𐩶𐩷𐩸𐩹𐩺𐩻𐩼𐩽𐩾𐩿";

type Props = {
  finalText: string;
  duration?: number;         // مدة السكربل
  revealDelay?: number;      // تأخير ظهور الحروف
  rtl?: boolean;             // اتجاه RTL
  className?: string;

  // ScrollTrigger
  start?: string;
  end?: string;
  once?: boolean;
  markers?: boolean;

  // ربط بالأفقي
  containerAnimation?: gsap.core.Animation | null;
  bindToContainer?: boolean;

  // Panel 1 fix: شغّل عند بداية الـpin
  firstPanel?: boolean;

  // سرعة السكربل داخل ScrambleTextPlugin
  speed?: number;

  // الخط المُطبّق أثناء وبعد السكربل
  fontClass?: string;        // افتراضي "musnad-font"
  keepFontClass?: boolean;   // خلي الخط مستمر بعد الإنهاء (افتراضي true)

  // حروف إضافية تُدمج مع المسند
  extraChars?: string;
  // أو بديل كامل لمجموعة الحروف
  chars?: string;
};

export default function ScrambleMusnadText({
  finalText,
  duration = 2,
  revealDelay = 0.1,
  rtl = false,
  className = "",
  start,
  end,
  once = true,
  markers = false,
  containerAnimation,
  bindToContainer = false,
  firstPanel = false,
  speed = 2,
  fontClass = "musnad-font",
  keepFontClass = true,
  extraChars = "",
  chars,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current!;
    if (!el) return;

    // لو مطلوب الربط بالأفقي ولسه مافيش containerAnimation — استنى
    if (bindToContainer && !containerAnimation) return;

    let tween: gsap.core.Tween | null = null;
    let st: ScrollTrigger | null = null;

    // الحروف المعتمدة
    const CHAR_SET = (chars ?? (MUSNAD_CHARS + extraChars)).replace(/\s+/g, "");

    // حافظ على القياسات: اعرض النص النهائي "مخفي" قبل إنشاء التريجر
    const prevVisibility = el.style.visibility;
    const prevText = el.textContent ?? "";
    const prevClass = el.className;

    el.style.visibility = "hidden";
    el.textContent = finalText;

    // الافتراضات
    const _start = start ?? (containerAnimation ? "left 80%" : "top 85%");
    const _end   = end   ?? (containerAnimation ? "left 60%" : "bottom 20%");

    // دالة تشغيل السكربل
    const runScramble = () => {
      // طبّق الخط
      if (fontClass) el.classList.add(fontClass);

      // ابدأ بقناع مسند بنفس طول النص
      const mask = Array.from({ length: finalText.length }, () =>
        CHAR_SET[(Math.random() * CHAR_SET.length) | 0]
      ).join("");

      el.style.visibility = "";      // أظهر الآن
      el.textContent = mask;

      tween?.kill();
      tween = gsap.to(el, {
        duration,
        ease: "none",
        scrambleText: {
          text: finalText,
          chars: CHAR_SET,
          tweenLength: true,
          revealDelay,
          speed,
          rightToLeft: rtl,
        },
        // عند الانتهاء: احتفظ بالخط أو أزِله حسب الخيار
        onComplete: () => {
          if (!keepFontClass && fontClass) {
            el.classList.remove(fontClass);
          }
        },
      });
    };

    // --------- بناء ScrollTrigger حسب الحالة ---------
    if (bindToContainer && containerAnimation) {
      // Panel 1: شغّل مع بداية الـpin
      if (firstPanel) {
        const pinEl = containerAnimation.scrollTrigger?.trigger;
        if (pinEl) {
          st = ScrollTrigger.create({
            trigger: pinEl,
            start: "top top",
            once,
            markers,
            onEnter: runScramble,
            // لو رجعت لفوق ومش once:
            onLeaveBack: () => {
              if (!once) {
                tween?.kill();
                el.style.visibility = "hidden";
                el.textContent = finalText; // يحافظ على القياس
              }
            },
          });
        }
      } else {
        // باقي البانلز: اربط بالتحريك الأفقي
        st = ScrollTrigger.create({
          trigger: el,
          containerAnimation,
          start: _start,
          end: _end,
          once,
          markers,
          toggleActions: once ? "play none none none" : "play none none reverse",
          onEnter: runScramble,
          onLeaveBack: () => {
            if (!once) {
              tween?.kill();
              el.style.visibility = "hidden";
              el.textContent = finalText;
            }
          },
        });
      }
    } else {
      // عمودي (fallback)
      st = ScrollTrigger.create({
        trigger: el,
        start: _start,
        end: _end,
        once,
        markers,
        toggleActions: once ? "play none none none" : "play none none reverse",
        onEnter: runScramble,
        onLeaveBack: () => {
          if (!once) {
            tween?.kill();
            el.style.visibility = "hidden";
            el.textContent = finalText;
          }
        },
      });
    }

    // لو لحظة الإنشاء كان الشرط متحقق بالفعل (نادرًا)، فعّل يدويًا
    if (st && st.progress > 0 && firstPanel) runScramble();

    return () => {
      tween?.kill();
      st && st.kill();
      // رجّع الحالة القديمة
      el.style.visibility = prevVisibility;
      el.textContent = prevText;
      el.className = prevClass;
    };
  }, [
    finalText,
    duration,
    revealDelay,
    rtl,
    start,
    end,
    once,
    markers,
    containerAnimation,
    bindToContainer,
    firstPanel,
    speed,
    fontClass,
    keepFontClass,
    extraChars,
    chars,
  ]);

  return (
    <span
      ref={ref}
      dir={rtl ? "rtl" : "ltr"}
      className={`inline-block ${className}`}
      aria-label={finalText}
    />
  );
}
