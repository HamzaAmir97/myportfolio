// components/PinnedDualStack.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Globe2 } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
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
  features: string[];
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
    features: [
      "Live KPIs & drill-down charts",
      "Role-based dashboards & sharing",
      "Query caching for sub-100ms responses",
      "Export to CSV/XLSX & scheduled reports",
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
    features: [
      "1-click checkout & wallet support",
      "AI product search & facets",
      "Personalized recommendations",
      "Order tracking & returns portal",
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
    features: [
      "Kanban pipeline with drag & drop",
      "Email sync & activity timeline",
      "Tasks, reminders, and SLAs",
      "Advanced filters & saved views",
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
    features: [
      "Offline-first data sync",
      "Push notifications & deep links",
      "Native gestures and transitions",
      "Theming & accessibility support",
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
    features: [
      "Chat with tools & memory",
      "Embeddings search over docs",
      "Guardrails, evals, and telemetry",
      "Multi-tenant API with rate limits",
    ],
  },
];


// Tech circle with real images
function TechCircle({ src, alt, name }: { src: string; alt: string; name: string }) {
  return (
    <span
      title={name}
      className="
        inline-flex items-center justify-center
        h-11 w-11 md:h-20 md:w-20 rounded-full
        border border-black/15 dark:border-white/20
        bg-white dark:bg-transparent
        shadow-sm select-none overflow-hidden
        cursor-pointer
        hover:scale-108 transition-all
        hover:shadow-lg hover:shadow-amber-700
        group

      "
    >
      <Image src={src} alt={alt} width={60} height={60} className="
      grayscale opacity-70
      transition duration-300 ease-out
      group-hover:grayscale-0 group-hover:opacity-100
      
      " />
    </span>
  );
}

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
 * - الهيدر منفصل.
 * - التثبيت يبدأ مع إزاحة 8px لتجنّب قصّ الحواف/الشادو.
 * - الميزات في الكارد الأيمن.
 */
export default function PinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrap = pinWrapRef.current!;
      const leftSlides = gsap.utils.toArray<HTMLElement>("[data-left-slide]");
      const rightSlides = gsap.utils.toArray<HTMLElement>("[data-right-slide]");

      gsap.set(leftSlides, { autoAlpha: 0 });
      gsap.set(rightSlides, { autoAlpha: 0 });
      if (leftSlides[0]) gsap.set(leftSlides[0], { autoAlpha: 1 });
      if (rightSlides[0]) gsap.set(rightSlides[0], { autoAlpha: 1 });

      const total = leftSlides.length;
      const endDistance = () => (total - 1) * window.innerHeight;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrap,
          // ✅ ابدأ التثبيت مع إزاحة بسيطة لتظهر الحواف كاملة
          start: "top top+=10",
          end: () => `+=${endDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: total > 1 ? 1 / (total - 1) : 0,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < total - 1; i++) {
        tl.to(leftSlides[i], { autoAlpha: 0, duration: 0.25 }, "+=0.25");
        tl.to(leftSlides[i + 1], { autoAlpha: 1, duration: 0.25 }, "<");

        tl.to(rightSlides[i], { autoAlpha: 0, duration: 0.25 }, "<");
        tl.to(rightSlides[i + 1], { autoAlpha: 1, duration: 0.25 }, "<0.05");

        // Animate features on the right
        tl.fromTo(
          (rightSlides[i + 1] as HTMLElement).querySelectorAll("[data-feature-item]"),
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
      {/* Heading */}
      <div className="w-screen px-6 py-8 md:px-10 md:py-10">
        <p className="text-amber-300/80 text-xs uppercase tracking-[0.2em]">
          Selected Work
        </p>
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          Projects that ship business impact
        </h2>
      </div>

      {/* Pinned block */}
      <div ref={pinWrapRef} className="w-screen">
        {/* ✅ gutter علوي بسيط لمنع أي إحساس بالقص */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen px-3 md:px-6 pt-3 md:pt-4 gap-x-6">
          {/* LEFT */}
          <div className="relative h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-hidden">
            {STEPS.map((p, i) => (
              <article
                key={p.name + i}
                data-left-slide
                className="absolute inset-0 flex flex-col gap-4 p-4"
              >
                <h3 className="text-2xl md:text-3xl font-bold">{p.name}</h3>
                <figure className="relative w-full rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                  <div className="w-full aspect-[16/10] md:aspect-[4/3]">
                    <img
                      src={p.imageSrc}
                      alt={p.imageAlt ?? p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </figure>
                <p className="text-neutral-300">{p.description}</p>
                <div className="flex gap-3">
                  <a
                    href={p.liveUrl}
                    className=" flex gap-1  px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-300 text-neutral-950 font-semibold"
                  >
                     <Globe2/>
                    <p>Visit Project</p>  

                  </a>
                  <a
                    href={p.repoUrl}
                    className=" flex gap-1 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white"
                  >
                    <IconBrandGithub/>
                    GitHub Repo
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* RIGHT (Tech + Features) */}
          <div className="relative hidden md:block h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-visible">
            {STEPS.map((p, i) => (
              <aside
                key={p.name + i}
                data-right-slide
                className="absolute inset-0 flex items-start justify-start p-4"
              >
                <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-xl overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
                  <div className="p-6">
                    <h4 className="text-xs uppercase text-neutral-400">
                      {i + 1} / {STEPS.length}
                    </h4>
                    <h3 className="mt-2 text-2xl md:text-4xl font-bold">{p.name}</h3>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {p.techs.map((t) => (
                        <TechBadge key={`${p.name}-${t.name}`} tech={t} />
                      ))}
                    </div>

                    {/* Features */}
                    <div className="mt-6">
                      <h5 className="text-sm uppercase text-amber-300 mb-2">
                        Key Features
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {p.features.map((feat, idx) => (
                          <li
                            key={`${p.name}-feat-${idx}`}
                            data-feature-item
                            className="flex items-start gap-2 text-sm text-neutral-200"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-200" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
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
