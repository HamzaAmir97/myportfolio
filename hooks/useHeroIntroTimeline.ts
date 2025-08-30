"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";

// يقبل RefObject أو MutableRefObject لأي عنصر DOM
type RefLike<T extends HTMLElement = HTMLElement> =
  | React.RefObject<T | null>
  | React.MutableRefObject<T | null>
  | null
  | undefined;

type AnyRef = RefLike<any>;

type Opts = {
  root: AnyRef;
  title: AnyRef;
  highlight: AnyRef;
  typing: AnyRef;
  features: AnyRef[]; // [paraRef, paraRef2, paraRef3]
  ctas: AnyRef[];     // [btnRef1, btnRef2, mobileBtnRef1, mobileBtnRef2]
  rightImage: AnyRef;
  hireBadge?: AnyRef;
  decoWrap?: AnyRef;
  onComplete?: () => void;
  debug?: boolean;
};

// رجّع HTMLElement من ref (لو مش موجود يرجّع null)
const asEl = (r: AnyRef): HTMLElement | null => {
  if (!r) return null;
  if (typeof (r as any).current !== "undefined") return (r as any).current as HTMLElement | null;
  return (r as unknown as HTMLElement) || null;
};

const compact = <T,>(arr: (T | null | undefined)[]) =>
  arr.filter(Boolean) as T[];

export function useHeroIntroTimeline(opts: Opts) {
  const {
    root, title, highlight, typing, features, ctas, rightImage, hireBadge, decoWrap, onComplete, debug = false,
  } = opts;

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const titleEl = asEl(title);
    const highlightEl = asEl(highlight);
    const typingEl = asEl(typing);
    const featuresEls = compact(features.map(asEl));
    const ctasEls = compact(ctas.map(asEl));
    const rightImageEl = asEl(rightImage);
    const hireBadgeEl = asEl(hireBadge);
    const decoWrapEl = asEl(decoWrap);

    const all = compact<HTMLElement>([
      titleEl,
      highlightEl,
      typingEl,
      ...featuresEls,
      ...ctasEls,
      rightImageEl,
      hireBadgeEl,
      decoWrapEl,
    ]);

    if (debug) {
      // لوج سريع يساعدك تعرف مين المفقود
      console.table({
        title: !!titleEl,
        highlight: !!highlightEl,
        typing: !!typingEl,
        features: featuresEls.length,
        ctas: ctasEls.length,
        rightImage: !!rightImageEl,
        hireBadge: !!hireBadgeEl,
        decoWrap: !!decoWrapEl,
        totalTargets: all.length,
      });
    }

    if (reduce) {
      gsap.set(all, { clearProps: "all", autoAlpha: 1, y: 0, scale: 1 });
      onComplete?.();
      return;
    }

    const scope = asEl(root) || undefined;

    const ctx = gsap.context(() => {
      // نبني التوينات بشكل شرطي؛ لو مفيش ولا توين، ما نخبّيش العناصر
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.6 },
        onComplete: () => {
          gsap.set(all, { willChange: "auto" });
          onComplete?.();
        },
      });

      let tweensCount = 0;

      const push = (fn: () => void) => {
        fn();
        tweensCount++;
      };

      if (titleEl) {
        gsap.set(titleEl, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });
        push(() => tl.to(titleEl, { autoAlpha: 1, y: 0 }));
      }

      if (highlightEl) {
        gsap.set(highlightEl, { autoAlpha: 0, y: 24, willChange: "transform,opacity" });
        push(() => tl.to(highlightEl, { autoAlpha: 1, y: 0 }, "-=0.35"));
      }

      if (typingEl) {
        gsap.set(typingEl, { autoAlpha: 0, y: 12, willChange: "transform,opacity" });
        push(() => tl.to(typingEl, { autoAlpha: 1, y: 0 }, "-=0.20"));
      }

      if (featuresEls.length) {
        gsap.set(featuresEls, { autoAlpha: 0, y: 18, willChange: "transform,opacity" });
        push(() => tl.to(featuresEls, { autoAlpha: 1, y: 0, stagger: 0.18 }, "+=0.05"));
      }

      if (ctasEls.length) {
        gsap.set(ctasEls, { autoAlpha: 0, y: 16, willChange: "transform,opacity" });
        push(() => tl.to(ctasEls, { autoAlpha: 1, y: 0, stagger: 0.12 }));
      }

      if (rightImageEl) {
        gsap.set(rightImageEl, { autoAlpha: 0, y: 18, scale: 0.98, willChange: "transform,opacity" });
        push(() => tl.to(rightImageEl, { autoAlpha: 1, y: 0, scale: 1 }));
      }

      if (hireBadgeEl) {
        gsap.set(hireBadgeEl, { autoAlpha: 0, scale: 0.8, willChange: "transform,opacity" });
        push(() => tl.to(hireBadgeEl, { autoAlpha: 1, scale: 1 }, "-=0.25"));
      }

      if (decoWrapEl) {
        gsap.set(decoWrapEl, { autoAlpha: 0, willChange: "opacity" });
        push(() => tl.to(decoWrapEl, { autoAlpha: 1 }, "-=0.40"));
      }

      // لو مفيش ولا توين اتسجّل (كل الـ refs كانت فاضية مثلًا)
      // رجّع كل العناصر لوضعها الطبيعي عشان ما تتخبّيش
      if (tweensCount === 0 && all.length) {
        gsap.set(all, { clearProps: "all", autoAlpha: 1, y: 0, scale: 1 });
        if (debug) console.warn("[HeroTL] No tweens created — restored visibility.");
      }
    }, scope);

    return () => ctx.revert();
  }, [
    root, title, highlight, typing, features, ctas,
    rightImage, hireBadge, decoWrap, onComplete, debug,
  ]);
}
