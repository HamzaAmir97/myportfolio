// lib/animation/revealOnScroll.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type RevealType = "fade" | "scale" | "fade-scale" | "slide-up";

type Options = {
  type?: RevealType;
  start?: string;           // مثلا: "top 85%"
  end?: string;             // مثلا: "top 50%"
  once?: boolean;           // يظهر مرة واحدة
  duration?: number;        // زمن الأنميشن
  ease?: string;            // "power2.out" مثلا
};

export function revealOnScroll(el: HTMLElement, {
  type = "fade-scale",
  start = "top 85%",
  end = "top 50%",
  once = true,
  duration = 0.8,
  ease = "power2.out",
}: Options = {}) {
  if (!el) return () => {};

  // حالات البداية/النهاية حسب النوع
  const from: gsap.TweenVars = { opacity: 0, willChange: "transform, opacity" };
  const to: gsap.TweenVars = { opacity: 1, duration, ease };

  if (type === "scale") {
    Object.assign(from, { scale: 0.9 });
    Object.assign(to,   { scale: 1 });
  } else if (type === "fade-scale") {
    Object.assign(from, { scale: 0.96, yPercent: 6 });
    Object.assign(to,   { scale: 1,    yPercent: 0 });
  } else if (type === "slide-up") {
    Object.assign(from, { y: 24 });
    Object.assign(to,   { y: 0 });
  }

  const tween = gsap.fromTo(el, from, to);

  const st = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    animation: tween,
    toggleActions: once ? "play none none none" : "play none none reverse",
    // scrub: true, // لو عايزها تمشي مع السكرول حرفيًا شغّل دي
  });

  // تحسين بسيط للجودة
  el.style.backfaceVisibility = "hidden";
  el.style.transformStyle = "preserve-3d";

  // cleanup
  return () => {
    st.kill();
    tween.kill();
  };
}
