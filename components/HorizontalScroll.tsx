"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import ScrambleMusnadText from "./ScrambleMusnadText";
import { animateSplitOnScroll } from "@/lib/animation/animateSplitOnScroll";
import { HeroHighlight } from "./ui/hero-highlight";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [containerAnim, setContainerAnim] = useState<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const track = trackRef.current!;
      const progress = progressRef.current!;

      // Reveal للسيكشن العمودي
      gsap.set(container, { autoAlpha: 0, y: 40 });
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(container, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }),
      });

      // إعداد الأفقي
      const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-panel]"));
      track.style.width = `${panels.length * 100}vw`;
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      setContainerAnim(tween);
      // ✅ مهم: بعد تكوين الأفقي نعمل refresh عشان كل التريجرز تعيد الحساب
      requestAnimationFrame(() => ScrollTrigger.refresh());

      // شريط التقدّم
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
        setContainerAnim(null);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ===== Intro refs (عمودي) =====
  const titleRef = useRef<HTMLParagraphElement>(null);
  const paraRef = useRef<HTMLHeadingElement>(null);

  // ===== Panel refs =====
  const titleRef1 = useRef<HTMLHeadingElement>(null);
  const paraRef1 = useRef<HTMLParagraphElement>(null);
  const titleRef2 = useRef<HTMLHeadingElement>(null);
  const paraRef2 = useRef<HTMLParagraphElement>(null);
  const titleRef3 = useRef<HTMLHeadingElement>(null);
  const paraRef3 = useRef<HTMLParagraphElement>(null);
  const titleRef4 = useRef<HTMLHeadingElement>(null);
  const paraRef4 = useRef<HTMLParagraphElement>(null);
  const titleRef5 = useRef<HTMLHeadingElement>(null);
  const paraRef5 = useRef<HTMLParagraphElement>(null);
  const titleRef6 = useRef<HTMLHeadingElement>(null);
  const paraRef6 = useRef<HTMLParagraphElement>(null);
  const paraRef7 = useRef<HTMLParagraphElement>(null);

  // Intro (عمودي)
  useLayoutEffect(() => {
    const stopIntroTitle = animateSplitOnScroll({
      ref: titleRef,
      mode: "chars",
      duration: 1,
      stagger: 0.03,
      from: { y: 40, opacity: 0, rotateX: -30 },
      to: { y: 0, opacity: 1, rotateX: 0 },
      start: "top 85%",
      once: true,
    });

    const stopIntroH2 = animateSplitOnScroll({
      ref: paraRef,
      mode: "words",
      duration: 0.9,
      stagger: 0.06,
      from: { y: 24, opacity: 0 },
      to: { y: 0, opacity: 1 },
      start: "top 90%",
      once: true,
      delay: 0.1,
    });

    return () => {
      stopIntroTitle && stopIntroTitle();
      stopIntroH2 && stopIntroH2();
    };
  }, []);

  // Panels (أفقي): نصوص + صور
  useLayoutEffect(() => {
    if (!containerAnim) return;

    // نصوص
    const cleanups = [
      // 01
      animateSplitOnScroll({
        ref: titleRef1,
        mode: "chars",
        from: { y: 40, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.03,
        containerAnimation: containerAnim,
        once: true,
      }),
      animateSplitOnScroll({
        ref: paraRef1,
        mode: "words",
        from: { y: 20, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.06,
        containerAnimation: containerAnim,
        once: true,
      }),
      // 02
      animateSplitOnScroll({
        ref: titleRef2,
        mode: "chars",
        from: { y: 40, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.03,
        containerAnimation: containerAnim,
        once: true,
      }),
      animateSplitOnScroll({
        ref: paraRef2,
        mode: "words",
        from: { y: 20, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.06,
        containerAnimation: containerAnim,
        once: true,
      }),
      // 03
      animateSplitOnScroll({
        ref: titleRef3,
        mode: "chars",
        from: { y: 40, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.03,
        containerAnimation: containerAnim,
        once: true,
      }),
      animateSplitOnScroll({
        ref: paraRef3,
        mode: "words",
        from: { y: 20, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.06,
        containerAnimation: containerAnim,
        once: true,
      }),
      // 04
      animateSplitOnScroll({
        ref: titleRef4,
        mode: "chars",
        from: { y: 40, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.03,
        containerAnimation: containerAnim,
        once: true,
      }),
      animateSplitOnScroll({
        ref: paraRef4,
        mode: "words",
        from: { y: 20, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.06,
        containerAnimation: containerAnim,
        once: true,
      }),
      // 05
      animateSplitOnScroll({
        ref: titleRef5,
        mode: "chars",
        from: { y: 40, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.03,
        containerAnimation: containerAnim,
        once: true,
      }),
      animateSplitOnScroll({
        ref: paraRef5,
        mode: "words",
        from: { y: 20, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.06,
        containerAnimation: containerAnim,
        once: true,
      }),
      // 06
      animateSplitOnScroll({
        ref: titleRef6,
        mode: "chars",
        from: { y: 40, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.03,
        containerAnimation: containerAnim,
        once: true,
      }),
      animateSplitOnScroll({
        ref: paraRef6,
        mode: "words",
        from: { y: 20, autoAlpha: 0 },
        to: { y: 0, autoAlpha: 1 },
        stagger: 0.06,
        containerAnimation: containerAnim,
        once: true,
      }),
    ];

    // صور / GIFs
    const imgs = gsap.utils.toArray<HTMLElement>("[data-img='reveal']");
    const imgTriggers: ScrollTrigger[] = [];
    const imgTweens: gsap.core.Tween[] = [];

    imgs.forEach((el) => {
      gsap.set(el, { autoAlpha: 0, y: 60, scale: 0.96, willChange: "transform, opacity" });

      const tween = gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      const st = ScrollTrigger.create({
        trigger: el,
        containerAnimation: containerAnim,
        start: "left 80%",
        end: "left 55%",
        animation: tween,
        toggleActions: "play none none none",
        // scrub: true, // لو عايزها تمشي مع السكرول حرفيًا
      });

      imgTriggers.push(st);
      imgTweens.push(tween);
    });

    return () => {
      cleanups.forEach((c) => c && c());
      imgTriggers.forEach((t) => t.kill());
      imgTweens.forEach((tw) => tw.kill());
    };
  }, [containerAnim]);

  return (
    <div className="relative z-0 ">
      {/* ===== Intro (vertical) ===== */}
      <header className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col gap-2 items-center justify-center">
        <p ref={titleRef} className="text-sm md:text-base tracking-wider uppercase text-gray-500 dark:text-white">
          Project Workflow
        </p>
        <h2 ref={paraRef} className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2 text-center dark:text-amber-600">
          From Requirements to Ongoing Support
        </h2>
        <p className="text-gray-600 mt-3 md:mt-4 text-center">
          <ScrambleMusnadText
            duration={3}
            revealDelay={0.0002}
            finalText="Explore how we turn ideas into shipped, scalable products. Scroll horizontally to follow the journey."
          />
        </p>
      </header>


      {/* ===== Horizontal Section ===== */}
      <section ref={containerRef} className="relative h-svh overflow-visible">
        
        
        
     
           {/* decoration */}
  <div className="absolute top-0 left-1/3 w-5 h-30 flex gap-2 -rotate-45 z-20">
    <span className="w-0.5 h-15 bg-black" />
    <span className="w-0.5 h-20 bg-black" />
  </div>

  {/* Gradient Diagonal Lines Pattern */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: `
         repeating-linear-gradient(45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
        repeating-linear-gradient(-45deg, rgba(0, 255, 65, 0.08) 0, rgba(0, 255, 65, 0.08) 1px, transparent 1px, transparent 12px),
        repeating-linear-gradient(90deg, rgba(0, 255, 65, 0.03) 0, rgba(0, 255, 65, 0.03) 1px, transparent 1px, transparent 4px)
      `,
        backgroundSize: '24px 24px, 24px 24px, 8px 8px',
    }}
  />

  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at 50% 100%, rgba(253,224,71,0.4) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(251,191,36,0.4) 0%, transparent 70%),
        radial-gradient(circle at 50% 100%, rgba(244,114,182,0.5) 0%, transparent 80%)
      `,
    }}
  />

  {/* Edge Fades Overlays */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-50 bg-gradient-to-b from-white/95 to-transparent dark:from-black/95" />
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-50 bg-gradient-to-t from-white/95 to-transparent dark:from-black/95" />



        
        {/* progress */}
        <div className="sticky top-0 left-0 right-0 h-1 z-50 pointer-events-none">
          <div
            ref={progressRef}
            className="h-full w-full bg-gradient-to-r from-amber-700 to-amber-100 origin-left transform scale-x-0"
          />
        </div>

        <div ref={trackRef} className="h-svh flex will-change-transform">
          {/* ===== 01 ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2 dark:text-neutral-200">
                <p ref={paraRef1}>01</p> Requirements Analysis
              </span>
              <h3 ref={titleRef1} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 dark:text-amber-600">
                Understand the Goals. Align the Vision.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
                {/* ✅ Panel 1: firstPanel + key لإجبار إعادة التركيب بعد جاهزية containerAnim */}
                <ScrambleMusnadText
                  key={containerAnim ? "p1-ready-1" : "p1-wait-1"}
                  duration={3}
                  revealDelay={0.0002}
                  finalText="We start with discovery sessions to clarify objectives, users, and constraints."
                  containerAnimation={containerAnim}
                  bindToContainer
                  firstPanel
                  // اختياري:
                  fontClass="musnad-font"
                  keepFontClass={true}  
                />
                Our outcome is a concise, actionable requirements brief that reduces risk and sets a shared definition of success.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed dark:text-white">
                <ScrambleMusnadText
                  key={containerAnim ? "p1-ready-2" : "p1-wait-2"}
                  duration={3}
                  revealDelay={0.0002}
                  finalText="Deliverables include user stories, acceptance criteria, and a prioritized scope that balances impact, effort, and timelines."
                  containerAnimation={containerAnim}
                  bindToContainer
                
                />
              </p>
            </div>
            <div className="flex justify-center items-center p-8 md:p-12">
              <div data-img="reveal" className="">
                <Image
                  src="/illustrationsGifs/analyze.gif"
                  unoptimized
                  alt="analyze"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover select-none will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          {/* ===== 02 ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2 dark:text-neutral-200">
                <p ref={paraRef3}>02</p> Planning & UX Design
              </span>
              <h3 ref={titleRef2} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 dark:text-amber-600">
                Architect the Path. Design for Outcomes.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="We translate requirements into a pragmatic roadmap and low-friction user journeys."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
                Wireframes and interactive prototypes clarify flows early and reduce costly rework.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="You’ll get a timeline, milestones, and a design system foundation that keeps the experience consistent and accessible."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
            </div>
            <div className="flex justify-center items-center p-8 md:p-12">
              <div data-img="reveal" className="">
                <Image
                  src="/illustrationsGifs/design.gif"
                  unoptimized
                  alt="design"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover select-none will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          {/* ===== 03 ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2 dark:text-neutral-200">
                <p ref={paraRef4}>03</p> Development & Implementation
              </span>
              <h3 ref={titleRef3} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 dark:text-amber-600">
                Build with Confidence. Ship with Quality.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="We use modern stacks (Next.js, React, Tailwind, and proven tooling) to deliver secure, performant features on a scalable foundation. Code reviews keep quality high."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="Each sprint produces demo-ready increments, so you can see progress, provide feedback, and keep momentum toward launch."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
            </div>
            <div className="flex justify-center items-center p-8 md:p-12">
              <div data-img="reveal" className="">
                <Image
                  src="/illustrationsGifs/coding.gif"
                  unoptimized
                  alt="coding"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover select-none will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          {/* ===== 04 ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2 dark:text-neutral-200">
                <p ref={paraRef5}>04</p> Testing & QA
              </span>
              <h3 ref={titleRef4} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 dark:text-amber-600">
                Every Detail Verified. Zero Surprises.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="Automated and manual testing ensure reliability across devices, browsers, and edge cases."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
                Performance, accessibility, and security checks are part of the definition of done.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="We fix defects fast and validate fixes before promotion to production."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
            </div>
            <div className="flex justify-center items-center p-8 md:p-12">
              <div data-img="reveal" className="">
                <Image
                  src="/illustrationsGifs/testing.gif"
                  unoptimized
                  alt="testing"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover select-none will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          {/* ===== 05 ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2 dark:text-neutral-200">
                <p ref={paraRef6}>05</p> Launch & Handover
              </span>
              <h3 ref={titleRef5} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 dark:text-amber-600">
                Go Live Smoothly. Own Your Stack.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="We orchestrate a frictionless release with backups, monitoring, and rollback plans."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
                Documentation and knowledge transfer ensure your team can operate with confidence.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="Post-launch, we track KPIs and user feedback to guide the next iteration."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
            </div>
            <div className="flex justify-center items-center p-8 md:p-12">
              <div data-img="reveal" className="">
                <Image
                  src="/illustrationsGifs/deoply.gif"
                  unoptimized
                  alt="deploy"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover select-none will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          {/* ===== 06 ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2 dark:text-neutral-200">
                <p ref={paraRef7}>06</p> Support & Maintenance
              </span>
              <h3 ref={titleRef6} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 dark:text-amber-600">
                A Long-Term Partner—Beyond the Launch.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="We stay with you after release: proactive monitoring, security updates, and a responsive support channel to keep the product healthy and evolving."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed dark:text-white">
                <ScrambleMusnadText
                  duration={3}
                  revealDelay={0.0002}
                  finalText="Need new features? We iterate thoughtfully—protecting velocity, stability, and ROI."
                  containerAnimation={containerAnim}
                  bindToContainer
                />
              </p>
            </div>
            <div className="flex justify-center items-center p-8 md:p-12">
              <div data-img="reveal" className="">
                <Image
                  src="/illustrationsGifs/support.gif"
                  unoptimized
                  alt="support"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover select-none will-change-transform"
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        </div>
      </section>
     

    </div>

  );
}
