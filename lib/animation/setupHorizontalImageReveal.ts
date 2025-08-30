// lib/animation/setupHorizontalImageReveal.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SetupOptions = {
  container: HTMLElement;           // السكشن اللي بيتعمله pin
  track: HTMLElement;               // العنصر اللي بيمشي أفقياً (بيحتوي الصور/الكروت)
  selector?: string;                // سيليكتر العناصر اللي هيتعمل لها reveal (افتراض: [data-reveal="img"])
  stagger?: number;                 // تأخير بسيط بين الصور
  scrub?: boolean | number;         // scrub للـ reveal (افتراضي true)
  start?: string;                   // بداية التريجر للصورة جوه السكرول الأفقي (افتراضي "left 80%")
  end?: string;                     // نهاية التريجر للصورة (افتراضي "left 20%")
  once?: boolean;                   // لو true تعمل reveal مرة واحدة ومترجعش
  fromVars?: gsap.TweenVars;        // تخصيص حالة البداية
  toVars?: gsap.TweenVars;          // تخصيص حالة النهاية
};

/**
 * تعمل Pin أفقي للـ track + تعمل Reveal لكل العناصر المطابقة للـ selector أثناء السكرول الأفقي.
 * بترجع دالة cleanup عشان تفك أي ScrollTriggers وTweens عند التفكيك.
 */
export function setupHorizontalImageReveal({
  container,
  track,
  selector = '[data-reveal="img"]',
  stagger = 0.1,
  scrub = true,
  start = "left 80%",
  end = "left 20%",
  once = false,
  fromVars,
  toVars,
}: SetupOptions) {
  // 1) سكرول أفقي للـ track
  const getDistance = () => Math.max(0, track.scrollWidth - container.clientWidth);

  const scrollTween = gsap.to(track, {
    x: () => -getDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => "+=" + getDistance(),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // 2) Reveal لكل صورة أثناء السكرول الأفقي
  const items = gsap.utils.toArray<HTMLElement>(selector);
  const defaultFrom: gsap.TweenVars = {
    opacity: 0,
    scale: 0.96,
    yPercent: 8,
    willChange: "transform, opacity",
    // tip: لو عايز بداية حادة: filter: "blur(8px)"
  };
  const defaultTo: gsap.TweenVars = {
    opacity: 1,
    scale: 1,
    yPercent: 0,
    duration: 0.8,
    ease: "power2.out",
    // tip: لو مستخدم blur فوق: filter: "blur(0px)"
  };

  const triggers: ScrollTrigger[] = [];
  const tweens: gsap.core.Tween[] = [];

  items.forEach((el, i) => {
    // tween لكل صورة
    const tween = gsap.fromTo(el, fromVars ?? defaultFrom, {
      ...(toVars ?? defaultTo),
      delay: i === 0 ? 0 : i * (stagger || 0),
    });

    // ScrollTrigger مربوط بالـ containerAnimation (مهم جداً للأفقي)
    const st = ScrollTrigger.create({
      trigger: el,
      containerAnimation: scrollTween, // <-- الخلاّص للأفقي
      start,
      end,
      scrub,
      animation: tween,
      toggleActions: once ? "play none none none" : "play none none reverse",
      // لو عايزها مرة واحدة فعلاً بدون رجوع:
      onLeave: once ? () => tween.progress(1).pause() : undefined,
    });

    tweens.push(tween);
    triggers.push(st);
  });

  // تحسينات بسيطة للجودة
  items.forEach((el) => {
    el.style.backfaceVisibility = "hidden";
    el.style.transformStyle = "preserve-3d";
  });

  // Cleanup
  const cleanup = () => {
    triggers.forEach((t) => t.kill());
    tweens.forEach((tw) => tw.kill());
    scrollTween?.scrollTrigger?.kill();
    scrollTween?.kill();
  };

  // رجّع cleanup & scrollTween لو حبيت تستخدمه
  return { cleanup, scrollTween };
}
