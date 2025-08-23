// components/PinnedDualStack.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Types */
type Tech = { name: string; iconClass?: string };
type Project = {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  techs: Tech[];
};

/** Demo data */
const STEPS: Project[] = [
  {
    name: "Nova Analytics",
    imageSrc: "/projects/nova-analytics.jpg",
    imageAlt: "Dashboard screens for Nova Analytics",
    description:
      "Real-time analytics with custom dashboards, role-based access, and blazing-fast queries.",
    liveUrl: "#",
    repoUrl: "#",
    techs: [
      { name: "Next.js", iconClass: "devicon-nextjs-original" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "Tailwind", iconClass: "devicon-tailwindcss-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
    ],
  },
  {
    name: "Relay Commerce",
    imageSrc: "/projects/relay-commerce.jpg",
    imageAlt: "E-commerce storefront mockups",
    description:
      "Headless storefront with lightning-fast checkout, search, and personalized recommendations.",
    liveUrl: "#",
    repoUrl: "#",
    techs: [
      { name: "React", iconClass: "devicon-react-original" },
      { name: "Node.js", iconClass: "devicon-nodejs-plain" },
      { name: "MongoDB", iconClass: "devicon-mongodb-plain" },
      { name: "GSAP", iconClass: "devicon-javascript-plain" },
    ],
  },
  {
    name: "Atlas CRM",
    imageSrc: "/projects/atlas-crm.jpg",
    imageAlt: "CRM UI with pipeline and contacts",
    description:
      "Unified pipeline, contacts, and automation—built for teams that move fast and close faster.",
    liveUrl: "#",
    repoUrl: "#",
    techs: [
      { name: "Next.js", iconClass: "devicon-nextjs-original" },
      { name: "NestJS", iconClass: "devicon-nestjs-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "Redis" },
    ],
  },
  {
    name: "Pulse Mobile",
    imageSrc: "/projects/pulse-mobile.jpg",
    imageAlt: "Mobile app screens",
    description:
      "Cross-platform app with offline-first sync, push notifications, and polished animations.",
    liveUrl: "#",
    repoUrl: "#",
    techs: [
      { name: "React Native" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "Expo" },
      { name: "SQLite" },
    ],
  },
  {
    name: "Echo AI",
    imageSrc: "/projects/echo-ai.jpg",
    imageAlt: "AI assistant interface",
    description:
      "LLM-powered assistant that drafts content, answers questions, and automates routine tasks.",
    liveUrl: "#",
    repoUrl: "#",
    techs: [
      { name: "Python", iconClass: "devicon-python-plain" },
      { name: "OpenAI" },
      { name: "LangChain" },
      { name: "FastAPI" },
    ],
  },
];

/** Circular tech badge */
function TechBadge({ tech }: { tech: Tech }) {
  return (
    <span
      data-tech-icon
      title={tech.name}
      aria-label={tech.name}
      className="
        inline-flex items-center justify-center
        h-11 w-11 rounded-full
        border border-white/15 bg-white/5
        text-[10px] font-medium text-white/90
        backdrop-blur-sm shadow-sm select-none
      "
    >
      {tech.iconClass ? (
        <i className={`${tech.iconClass} text-xl`} aria-hidden="true" />
      ) : (
        tech.name
      )}
    </span>
  );
}

/**
 * PinnedDualStack
 * - العنوان فوق منفصل وغير مُثبت.
 * - كتلة الـpin تبدأ من أول الشاشة (بدون قص).
 * - في العمود الأيسر: عنوان → صورة بنِسَب ثابتة → وصف → أزرار (تحت الصورة مباشرة).
 */
export default function PinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  /** يثبّت كتلة الـpin ويحرّك الشرائح مع التمرير */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrap = pinWrapRef.current!;
      const leftSlides = gsap.utils.toArray<HTMLElement>("[data-left-slide]");
      const rightSlides = gsap.utils.toArray<HTMLElement>("[data-right-slide]");

      gsap.set(leftSlides,  { autoAlpha: 0, yPercent: 0 });
      gsap.set(rightSlides, { autoAlpha: 0, yPercent: 0 });
      if (leftSlides[0])  gsap.set(leftSlides[0],  { autoAlpha: 1 });
      if (rightSlides[0]) gsap.set(rightSlides[0], { autoAlpha: 1 });

      const total = leftSlides.length;
      const endDistance = () => (total - 1) * window.innerHeight;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: () => `+=${endDistance()}`,
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          scrub: 1,
          anticipatePin: 1,
          snap: total > 1 ? 1 / (total - 1) : 0,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        tl.to(leftSlides[i],   { autoAlpha: 0, duration: 0.28 }, "+=0.25");
        tl.to(leftSlides[i+1], { autoAlpha: 1, duration: 0.28 }, "<");

        tl.to(rightSlides[i],   { autoAlpha: 0, duration: 0.26 }, "<");
        tl.to(rightSlides[i+1], { autoAlpha: 1, duration: 0.26 }, "<0.05");

        tl.fromTo(
          (rightSlides[i + 1] as HTMLElement).querySelectorAll("[data-tech-icon]"),
          { y: 6, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.2 },
          "<"
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, pinWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-neutral-950 text-white">
      {/* ===== Heading (غير مثبت) ===== */}
      <div className="w-screen px-6 py-8 md:px-10 md:py-10">
        <p className="text-amber-300/80 text-xs uppercase tracking-[0.2em]">
          Selected Work
        </p>
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          Projects that ship business impact
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-300">
          Scroll to explore. Left shows the active project; right mirrors its title and tech stack.
        </p>
      </div>

      {/* ===== Pinned block ===== */}
      <div ref={pinWrapRef} className="w-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen min-h-[100svh] md:gap-x-6 lg:gap-x-10 px-3 md:px-6">
          {/* LEFT — عنوان → صورة → وصف → CTA */}
          <div className="relative h-screen min-h-[100svh] overflow-hidden">
            {STEPS.map((p, i) => (
              <article
                key={p.name + i}
                data-left-slide
                className="absolute inset-0 p-3 sm:p-5 box-border bg-neutral-900/10"
              >
                <div className="flex h-full flex-col gap-3 sm:gap-4 min-h-0">
                  {/* عنوان المشروع */}
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {p.name}
                  </h3>

                  {/* الصورة بنسبة ثابتة + حد أقصى للارتفاع */}
                  <figure className="relative w-full shrink-0 rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                    <div className="w-full aspect-[16/10] md:aspect-[4/3] lg:max-h-[62vh]">
                      <img
                        src={p.imageSrc}
                        alt={p.imageAlt ?? p.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0";
                        }}
                      />
                    </div>
                  </figure>

                  {/* الوصف تحت الصورة مباشرة */}
                  <p className="text-neutral-300/95 leading-relaxed max-w-3xl">
                    {p.description}
                  </p>

                  {/* CTA buttons تحت الوصف */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a
                      href={p.liveUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2
                                 bg-gradient-to-r from-amber-600 to-amber-300 text-neutral-950
                                 font-semibold shadow hover:opacity-95 transition"
                    >
                      Visit Project
                    </a>
                    <a
                      href={p.repoUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2
                                 border border-white/15 bg-white/5 hover:bg-white/10
                                 text-white font-medium transition"
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT — البطاقة المعلوماتية */}
          <div className="relative h-screen min-h-[100svh] overflow-visible">
            {STEPS.map((p, i) => (
              <aside
                key={p.name + i}
                data-right-slide
                className="absolute inset-0 flex items-start justify-start p-3 sm:p-5"
              >
                <div
                  className="
                    w-full max-w-xl rounded-2xl border border-white/10
                    bg-white/[0.03] backdrop-blur-sm shadow-xl overflow-hidden
                  "
                >
                  <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
                  <div className="p-6 md:p-8">
                    <h4 className="text-xs uppercase tracking-widest text-neutral-400">
                      {i + 1} / {STEPS.length}
                    </h4>
                    <h3 className="mt-2 text-2xl md:text-4xl font-extrabold tracking-tight">
                      {p.name}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {p.techs.map((t) => (
                        <TechBadge key={`${p.name}-${t.name}`} tech={t} />
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
