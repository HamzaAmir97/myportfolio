// hooks/useGsapDiagonalHover.ts
"use client";

import * as React from "react";
import gsap from "gsap";

export type GsapDiagonalHoverOptions = {
  color?: string;            // لون الطبقة (rgba/hex) — افتراضي: أبيض شفاف خفيف
  opacity?: number;          // شفافية الطبقة — افتراضي: 1
  duration?: number;         // مدة الحركة — افتراضي: 0.36s
  ease?: string;             // منحنى الحركة — افتراضي: "power3.out"
  borderRadius?: string;     // انحناء الحواف — افتراضي: inherit
  inset?: number;            // مسافة داخلية للطبقة — افتراضي: 0
  reverse?: boolean;         // عكس الاتجاه (من أعلى يسار → أسفل يمين)
  mode?: "fill" | "shine";   // تعبئة كاملة أو لمعة شريطية
  zIndex?: number;           // طبقة الoverlay بالنسبة للمحتوى — افتراضي: 1
  debug?: boolean;           // لإظهار لون صارخ للتأكد من الoverlay ظاهر
};

type AnyRef<E extends HTMLElement> =
  | React.RefObject<E>
  | React.MutableRefObject<E | null>;

/**
 * useGsapDiagonalHover — هوفر قطري بـ GSAP
 * يحرك طبقة overlay من الركن السفلي اليمين ➜ الركن العلوي اليسار (أو العكس مع reverse)
 */
export function useGsapDiagonalHover<E extends HTMLElement>(
  ref: AnyRef<E>,
  {
    color = "rgba(255,255,255,0.08)",
    opacity = 1,
    duration = 0.36,
    ease = "power3.out",
    borderRadius = "inherit",
    inset = 0,
    reverse = false,
    mode = "fill",
    zIndex = 1,
    debug = false,
  }: GsapDiagonalHoverOptions = {}
) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // احترام تقليل الحركة
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ضمان position/overflow
    const cs = getComputedStyle(el);
    if (cs.position === "static") el.style.position = "relative";
    if (cs.overflow === "visible") el.style.overflow = "hidden";
    if (!el.style.zIndex) el.style.zIndex = "0";

    // إنشاء overlay
    const overlay = document.createElement("span");
    overlay.setAttribute("data-diagonal-overlay", "true");
    overlay.style.position = "absolute";
    overlay.style.inset = `${inset}px`;
    overlay.style.borderRadius = borderRadius;
    overlay.style.pointerEvents = "none";
    overlay.style.opacity = String(opacity);
    overlay.style.zIndex = String(zIndex);
    overlay.style.willChange = "transform, opacity";

    if (mode === "fill") {
      overlay.style.background = debug ? "rgba(255,0,0,0.25)" : color;
    } else {
      // شريط لمّاع يمر قطرياً
      overlay.style.background =
        debug
          ? "linear-gradient(135deg, transparent 40%, rgba(255,0,0,0.7) 50%, transparent 60%)"
          : "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)";
      overlay.style.maskImage =
        "linear-gradient(135deg, transparent 35%, black 50%, transparent 65%)";
      (overlay.style as any).webkitMaskImage =
        "linear-gradient(135deg, transparent 35%, black 50%, transparent 65%)";
      overlay.style.mixBlendMode = "overlay";
    }

    el.appendChild(overlay);

    // وضعية البداية/النهاية كنِسَب مئوية (خارج الإطار)
    const start = reverse ? { xPercent: -70, yPercent: -70 } : { xPercent: 70, yPercent: 70 };
    const end   = reverse ? { xPercent: 70,  yPercent: 70  } : { xPercent: -70, yPercent: -70 };

    // GSAP context للتنظيف
    const ctx = gsap.context(() => {
      // الوضع الابتدائي
      gsap.set(overlay, start);

      // تايملاين الهوفر
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration, ease },
      })
      .to(overlay, end, 0);

      // أحداث التفاعل
      const enter = () => (prefersReduced ? gsap.set(overlay, { xPercent: 0, yPercent: 0 }) : tl.play());
      const leave = () => (prefersReduced ? gsap.set(overlay, start) : tl.reverse(0));

      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("focus", enter, true);
      el.addEventListener("blur", leave, true);
      el.addEventListener("touchstart", enter, { passive: true });
      el.addEventListener("touchend", leave, { passive: true });
      el.addEventListener("touchcancel", leave, { passive: true });

      // تنظيف
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
    }, el); // يربط كل شيء بالعنصر

    // إزالة overlay عند التفكيك
    return () => {
      ctx.revert();
      overlay.remove();
    };
  }, [ref, color, opacity, duration, ease, borderRadius, inset, reverse, mode, zIndex, debug]);
}
