// components/HorizontalScroll.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalScroll — Workflow Edition (with top progress bar)
 * - Intro heading appears before the horizontal scroller
 * - Section stays hidden until in-view (reveal), then pins and scrolls horizontally
 * - Sticky gradient progress bar (amber-700 ➜ amber-100) fills as you progress
 */
export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current!;
      const track = trackRef.current!;
      const progress = progressRef.current!;

      // ===== Reveal on first enter (fade + slide) =====
      gsap.set(container, { autoAlpha: 0, y: 40 });
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(container, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
        },
      });

      // ===== Horizontal scroll setup =====
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
          // markers: true,
        },
      });

      // ===== Progress bar animation (sticky at the top of the section) =====
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          // No pin here; the section itself is pinned by the tween above.
        },
      });

      // Keep measurements correct
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === container) st.kill();
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);



  return (
    <div className="relative z-0 ">
      {/* ===== Intro Heading (appears before the horizontal scroller) ===== */}
      <header className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16 flex flex-col gap-2 items-center justify-center">
        <p className="text-sm md:text-base tracking-wider uppercase text-gray-500">
          Project Workflow
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2 text-center">
          From Requirements to Ongoing Support
        </h2>
        <p className="text-gray-600 mt-3 md:mt-4 text-center">
          Explore how we turn ideas into shipped, scalable products. Scroll horizontally to follow the journey.
        </p>
      </header>

      {/* ===== Horizontal Section (hidden until revealed, then pinned) ===== */}
      <section ref={containerRef} className="relative h-svh overflow-visible">
        {/* Sticky progress track */}
        <div className="sticky top-0 left-0 right-0 h-1 z-50 pointer-events-none">
          <div
            ref={progressRef}
            className="h-full w-full bg-gradient-to-r from-amber-700 to-amber-100 origin-left transform scale-x-0"
          />
        </div>

        <div ref={trackRef} className="h-svh flex will-change-transform">

          {/* ===== 01: Requirements Analysis ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            {/* Right (Copy) */}
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2">
                01 — Requirements Analysis
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Understand the Goals. Align the Vision.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We start with discovery sessions to clarify objectives, users, and constraints.
                Our outcome is a concise, actionable requirements brief that reduces risk and
                sets a shared definition of success.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Deliverables include user stories, acceptance criteria, and a prioritized scope
                that balances impact, effort, and timelines.
              </p>
            </div>

            {/* Left (Visual) */}
            <div className="flex justify-center items-center p-8 md:p-12">
              

              {/* step 1 */}
                <div>
                  
                  <Image src="/illustrationsGifs/analyze.gif"
                  unoptimized
                  alt="analyze" 
                   width={300} height={200} 
                   className="w-full h-full object-cover"
                   loading="lazy" 
                  />


                  
                  
                </div>
             
            </div>
          </article>

          {/* ===== 02: Planning & UX Design ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
          {/* Right (Copy) */}
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2">
                02 — Planning & UX Design
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Architect the Path. Design for Outcomes.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We translate requirements into a pragmatic roadmap and low-friction user journeys.
                Wireframes and interactive prototypes clarify flows early and reduce costly rework.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                You’ll get a timeline, milestones, and a design system foundation that keeps
                the experience consistent and accessible.
              </p>
            </div>

            {/* Left (Visual) */}
            <div className="flex justify-center items-center p-8 md:p-12">
              
                <div>
                  <Image src="/illustrationsGifs/design.gif"
                   unoptimized
                   alt="design" 
                   width={600} height={500} 
                   className="w-full h-full object-cover"
                   loading="lazy" 
                  />
                  
                      
                </div>
              
            </div>
          </article>

          {/* ===== 03: Development & Implementation ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            {/* Right (Copy) */}
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2">
                03 — Development & Implementation
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Build with Confidence. Ship with Quality.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We use modern stacks (Next.js, React, Tailwind, and proven tooling) to deliver
                secure, performant features on a scalable foundation. Code reviews keep quality high.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Each sprint produces demo-ready increments, so you can see progress, provide feedback,
                and keep momentum toward launch.
              </p>
            </div>

            {/* Left (Visual) */}
            <div className="flex justify-center items-center p-8 md:p-12">
              
            <div>
                  <Image src="/illustrationsGifs/coding.gif"
                   unoptimized
                   alt="design" 
                   width={600} height={500} 
                   className="w-full h-full object-cover"
                   loading="lazy" 
                  />
                  
                      
                </div>
              
            </div>
          </article>

          {/* ===== 04: Testing & Quality Assurance ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            {/* Right (Copy) */}
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2">
                04 — Testing & QA
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Every Detail Verified. Zero Surprises.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                Automated and manual testing ensure reliability across devices, browsers, and edge cases.
                Performance, accessibility, and security checks are part of the definition of done.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                We fix defects fast and validate fixes before promotion to production.
              </p>
            </div>

            {/* Left (Visual) */}
            <div className="flex justify-center items-center p-8 md:p-12">
            <div>
                  <Image src="/illustrationsGifs/testing.gif"
                unoptimized
                alt="testing" 
                   width={600} height={500} 
                   className="w-full h-full object-cover"
                   loading="lazy" 
                  />
                  
                      
                </div>
            </div>
          </article>

          {/* ===== 05: Launch & Handover ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            {/* Right (Copy) */}
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2">
                05 — Launch & Handover
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Go Live Smoothly. Own Your Stack.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We orchestrate a frictionless release with backups, monitoring, and rollback plans.
                Documentation and knowledge transfer ensure your team can operate with confidence.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Post-launch, we track KPIs and user feedback to guide the next iteration.
              </p>
            </div>

            {/* Left (Visual) */}
            <div className="flex justify-center items-center p-8 md:p-12">
            <div>
                  <Image src="/illustrationsGifs/deoply.gif"
                  unoptimized
                  alt="deploy" 
                   width={600} height={500} 
                   className="w-full h-full object-cover"
                   loading="lazy" 
                  />
                  
                      
                </div>
            </div>
          </article>

          {/* ===== 06: Support & Maintenance ===== */}
          <article data-panel className="w-screen h-svh grid grid-cols-1 md:grid-cols-2">
            {/* Right (Copy) */}
            <div className="flex flex-col justify-center items-start p-8 md:p-12">
              <span className="text-xs tracking-wider uppercase text-gray-500 mb-2">
                06 — Support & Maintenance
              </span>
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                A Long-Term Partner—Beyond the Launch.
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                We stay with you after release: proactive monitoring, security updates, and a
                responsive support channel to keep the product healthy and evolving.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Need new features? We iterate thoughtfully—protecting velocity, stability, and ROI.
              </p>
            </div>

            {/* Left (Visual) */}
            <div className="flex justify-center items-center p-8 md:p-12">
            <div>
                  <Image src="/illustrationsGifs/support.gif"
                   unoptimized
                   alt="support" 
                   width={600} height={500} 
                   className="w-full h-full object-cover"
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
