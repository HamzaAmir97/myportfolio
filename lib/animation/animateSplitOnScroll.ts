// src/lib/animation/animateSplitOnScroll.ts
"use client";
import type React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// لو عندك Club GSAP:
// import { SplitText } from "gsap/SplitText"; // أو "gsap-trial/SplitText"
// gsap.registerPlugin(SplitText as any);

type Mode = "chars" | "words" | "lines";
type RefLike<T extends HTMLElement = HTMLElement> =
  | React.RefObject<T>
  | React.MutableRefObject<T | null>;

export type AnimateSplitOnScrollOpts<T extends HTMLElement = HTMLElement> = {
  ref: RefLike<T>;
  mode?: Mode;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;

  // ScrollTrigger
  start?: string;
  end?: string;
  once?: boolean;
  markers?: boolean;

  from?: gsap.TweenVars;
  to?: gsap.TweenVars;

  // لو سكروول أفقي: ابعت الـtween بتاع التحريك
  containerAnimation?: gsap.core.Animation | null;
};

function getEl<T extends HTMLElement>(ref: RefLike<T>): T | null {
  return (ref as any)?.current ?? null;
}

export function animateSplitOnScroll<T extends HTMLElement = HTMLElement>({
  ref,
  mode = "chars",
  duration = 1,
  stagger = 0.04,
  ease = "power2.out",
  delay = 0,
  start,
  end,
  once = true,
  markers = false,
  from = { y: 30, autoAlpha: 0 },
  to = { y: 0, autoAlpha: 1 },
  containerAnimation = null,
}: AnimateSplitOnScrollOpts<T>) {
  const el = getEl(ref) as HTMLElement | null;
  if (!el) return () => {};

  const prevVisibility = el.style.visibility;
  el.style.visibility = "hidden";

  // لو فيه containerAnimation ومفيش start/end، استخدم left/right (أفقي)
  const _start = start ?? (containerAnimation ? "left 85%" : "top 85%");
  const _end   = end   ?? (containerAnimation ? "right 15%" : "bottom 20%");

  const hasSplit = !!((gsap as any).plugins && (gsap as any).plugins.SplitText);

  let tl: gsap.core.Timeline | null = null;
  let split: any = null;
  const originalHTML = el.innerHTML;

  const cleanup = () => {
    tl?.kill();
    if (split?.revert) split.revert();
    else el.innerHTML = originalHTML;
    el.style.visibility = prevVisibility;
  };

  if (hasSplit) {
    const SplitTextCtor = (gsap as any).plugins.SplitText;
    split = new SplitTextCtor(el, { type: "lines,words,chars" });

    const targets: HTMLElement[] =
      mode === "lines" ? split.lines : mode === "words" ? split.words : split.chars;

    gsap.set(targets, { display: "inline-block", willChange: "transform,opacity", ...from });
    el.style.visibility = "";

    tl = gsap.timeline({
      delay,
      defaults: { duration, ease },
      scrollTrigger: {
        trigger: el,
        start: _start,
        end: _end,
        once,
        markers,
        toggleActions: once ? "play none none none" : "play none none reverse",
        ...(containerAnimation ? { containerAnimation } : {}),
      },
    });

    tl.to(targets, { ...to, stagger });
    return cleanup;
  }

  // ===== بديل بدون البلجن =====
  const text = el.textContent ?? "";
  el.innerHTML = "";

  const wordEls: HTMLElement[] = [];
  const charEls: HTMLElement[] = [];

  const parts = text.split(/(\s+)/);
  for (const w of parts) {
    if (w.trim() === "") {
      el.appendChild(document.createTextNode(w));
      continue;
    }
    const wSpan = document.createElement("span");
    wSpan.className = "gsap-split-w";
    wSpan.style.display = "inline-block";
    wSpan.style.whiteSpace = "pre";
    el.appendChild(wSpan);
    wordEls.push(wSpan);

    if (mode !== "words") {
      for (const ch of Array.from(w)) {
        const cSpan = document.createElement("span");
        cSpan.className = "gsap-split-ch";
        cSpan.style.display = "inline-block";
        cSpan.style.willChange = "transform,opacity";
        cSpan.textContent = ch;
        wSpan.appendChild(cSpan);
        charEls.push(cSpan);
      }
    } else {
      wSpan.textContent = w;
    }
  }

  // lines تقريبية
  const lineGroups: HTMLElement[][] = [];
  if (wordEls.length) {
    let currentTop = wordEls[0].offsetTop;
    let group: HTMLElement[] = [];
    for (const w of wordEls) {
      if (Math.abs(w.offsetTop - currentTop) > 1) {
        lineGroups.push(group);
        group = [];
        currentTop = w.offsetTop;
      }
      group.push(w);
    }
    if (group.length) lineGroups.push(group);
  }

  const targets = mode === "lines" ? lineGroups : mode === "words" ? wordEls : charEls;

  if (mode === "lines") lineGroups.forEach((g) => gsap.set(g, { ...from }));
  else gsap.set(targets as HTMLElement[], { ...from, willChange: "transform,opacity" });

  el.style.visibility = "";

  tl = gsap.timeline({
    delay,
    defaults: { duration, ease },
    scrollTrigger: {
      trigger: el,
      start: _start,
      end: _end,
      once,
      markers,
      toggleActions: once ? "play none none none" : "play none none reverse",
      ...(containerAnimation ? { containerAnimation } : {}),
    },
  });

  if (mode === "lines") {
    lineGroups.forEach((g, i) => tl!.to(g, { ...to }, i * stagger));
  } else {
    tl.to(targets as HTMLElement[], { ...to, stagger });
  }

  return cleanup;
}
