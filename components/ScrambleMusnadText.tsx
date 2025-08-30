"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"; // أو "gsap-trial/ScrambleTextPlugin"

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const MUSNAD_CHARS =
  "𐩠𐩡𐩢𐩣𐩤𐩥𐩦𐩧𐩨𐩩𐩪𐩫𐩬𐩭𐩮𐩯𐩰𐩱𐩲𐩳𐩴𐩵𐩶𐩷𐩸𐩹𐩺𐩻𐩼𐩽𐩾𐩿";

type Props = {
  finalText: string;
  duration?: number;
  revealDelay?: number;
  rtl?: boolean;
  className?: string;

  // ScrollTrigger
  start?: string;
  end?: string;
  once?: boolean;
  markers?: boolean;

  // ربط بالأفقي (containerAnimation). لو bindToContainer=true لن ننشئ التريجر قبل توفّره.
  containerAnimation?: gsap.core.Animation | null;
  bindToContainer?: boolean;

  // Scramble speed
  speed?: number;
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
  containerAnimation,          // قد يكون undefined/ null
  bindToContainer = false,     // لو true: انتظر لحد ما containerAnimation يتوفر
  speed = 2,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current!;
    if (!el) return;

    // لو مطلوب الربط بالأفقي ولسه مافيش containerAnimation — لا تنشئ التريجر الآن
    if (bindToContainer && !containerAnimation) return;

    let tween: gsap.core.Tween | null = null;

    // عشان ScrollTrigger يقيس موضع/عرض مضبوط: خلي النص النهائي موجود لكن مخفي
    const prevVisibility = el.style.visibility;
    const prevText = el.textContent ?? "";
    el.style.visibility = "hidden";
    el.textContent = finalText; // عرض صحيح قبل إنشاء التريجر

    const _start = start ?? (containerAnimation ? "left 85%" : "top 85%");
    const _end   = end   ?? (containerAnimation ? "right 15%" : "bottom 20%");

    const st = ScrollTrigger.create({
      trigger: el,
      start: _start,
      end: _end,
      once,
      markers,
      toggleActions: once ? "play none none none" : "play none none reverse",
      ...(containerAnimation ? { containerAnimation } : {}),
      onEnter: () => {
        // احضر ماسك مسند بطول النص
        const mask = Array.from({ length: finalText.length }, () =>
          MUSNAD_CHARS[(Math.random() * MUSNAD_CHARS.length) | 0]
        ).join("");

        el.style.visibility = "";      // الآن يظهر
        el.classList.add("musnad-font");
        el.textContent = mask;

        tween?.kill();
        tween = gsap.to(el, {
          duration,
          scrambleText: {
            text: finalText,
            chars: MUSNAD_CHARS,
            tweenLength: true,
            revealDelay,
            speed,
            rightToLeft: rtl,
          },
          ease: "none",
          onComplete: () => el.classList.remove("musnad-font"),
        });
      },
      onLeaveBack: () => {
        if (!once) {
          tween?.kill();
          el.classList.add("musnad-font");
          el.style.visibility = "hidden";
          el.textContent = finalText; // حتى يظل القياس مضبوط عند الرجوع
        }
      },
    });

    return () => {
      tween?.kill();
      st.kill();
      el.style.visibility = prevVisibility;
      el.textContent = prevText;
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
    speed,
  ]);

  return (
    <span
      ref={ref}
      dir={rtl ? "rtl" : "ltr"}
      className={`inline-block ${className}`} // inline-block لضمان عرض/قياس ثابت
      aria-label={finalText}
    />
  );
}
