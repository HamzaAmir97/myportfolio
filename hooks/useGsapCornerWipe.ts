// hooks/useGsapCornerWipe.ts
"use client";

import * as React from "react";
import gsap from "gsap";

export type GsapCornerWipeOptions = {
  color?: string;              // لون الطبقة
  opacity?: number;            // شفافية الطبقة
  duration?: number;           // مدة الحركة
  ease?: string;               // منحنى الحركة
  borderRadius?: string;       // انحناء الحواف
  inset?: number;              // مسافة داخلية
  corner?: "br" | "tr" | "bl" | "tl"; // ركن البداية (افتراضي: br = bottom-right)
  layer?: "under" | "over";    // مكان الطبقة بالنسبة للنص (افتراضي: under)
  debug?: boolean;             // لون واضح للفحص
};

type AnyRef<E extends HTMLElement> =
  | React.RefObject<E>
  | React.MutableRefObject<E | null>;

const STYLE_ID = "gcw-auto-layer-style";
function ensureStylesInjected() {
  if (document.getElementById(STYLE_ID)) return;
  const css = `
  /* هوست بعلامة خاصة */
  [data-gcw-host] { position: relative; overflow: hidden; }
  /* خلي الoverlay تحت */
  [data-gcw-host] > [data-gcw-overlay] { position: absolute; z-index: 0; }
  /* ارفع بقية الأطفال فوق الoverlay */
  [data-gcw-host] > :not([data-gcw-overlay]) { position: relative; z-index: 1; }
  `;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

/**
 * useGsapCornerWipe — Wipe من ركن محدد بالهوفر/focus
 * افتراضيًا: يبدأ من الركن السفلي اليمين ويتمدّد ليملأ العنصر.
 */
export function useGsapCornerWipe<E extends HTMLElement>(
  ref: AnyRef<E>,
  {
    color = "rgba(255,255,255,0.10)",
    opacity = 1,
    duration = 0.35,
    ease = "power3.out",
    borderRadius = "inherit",
    inset = 0,
    corner = "br",
    layer = "under",
    debug = false,
  }: GsapCornerWipeOptions = {}
) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // احترام تقليل الحركة
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // ضمان الأساسيات
    const cs = getComputedStyle(el);
    if (cs.position === "static") el.style.position = "relative";
    if (cs.overflow === "visible") el.style.overflow = "hidden";

    // حقن ستايل يصون ترتيب الطبقات عند layer="under"
    if (layer === "under") {
      ensureStylesInjected();
      el.setAttribute("data-gcw-host", ""); // علشان القاعدة تشتغل
    }

    // إنشاء overlay
    const overlay = document.createElement("span");
    overlay.setAttribute("data-gcw-overlay", "");
    overlay.style.inset = `${inset}px`;
    overlay.style.borderRadius = borderRadius;
    overlay.style.pointerEvents = "none";
    overlay.style.position = "absolute";
    overlay.style.opacity = String(opacity);
    overlay.style.background = debug ? "rgba(255,0,0,0.25)" : color;
    overlay.style.transform = "scale(0)";
    overlay.style.willChange = "transform";

    // ركن البداية
    overlay.style.transformOrigin =
      corner === "br" ? "bottom right" :
      corner === "tr" ? "top right" :
      corner === "bl" ? "bottom left" : "top left";

    // ترتيب الإدراج
    if (layer === "under") {
      el.prepend(overlay); // تحت المحتوى
    } else {
      overlay.style.zIndex = "2"; // فوق المحتوى
      el.appendChild(overlay);
    }

    // GSAP
    const ctx = gsap.context(() => {
      gsap.set(overlay, { scale: 0 });
      const tl = gsap.timeline({ paused: true })
        .to(overlay, {
          scale: 1,
          duration: prefersReduced ? 0 : duration,
          ease,
        });

      const enter = () => (prefersReduced ? gsap.set(overlay, { scale: 1 }) : tl.play());
      const leave = () => (prefersReduced ? gsap.set(overlay, { scale: 0 }) : tl.reverse());

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("focus", enter, true);
      el.addEventListener("blur", leave, true);
      el.addEventListener("touchstart", enter, { passive: true });
      el.addEventListener("touchend", leave, { passive: true });
      el.addEventListener("touchcancel", leave, { passive: true });

      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.removeEventListener("focus", enter, true);
        el.removeEventListener("blur", leave, true);
        el.removeEventListener("touchstart", enter);
        el.removeEventListener("touchend", leave);
        el.removeEventListener("touchcancel", leave);
        tl.kill();
      };
    }, el);

    return () => {
      ctx.revert();
      overlay.remove();
      if (layer === "under") el.removeAttribute("data-gcw-host");
    };
  }, [ref, color, opacity, duration, ease, borderRadius, inset, corner, layer, debug]);
}
