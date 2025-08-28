// components/PinnedDualStack.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Globe2 } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import { TECH, TechItem } from "@/constants/tech-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// ✅ أيقوناتك الحقيقية

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

/** Demo data (بدّلها لاحقًا بمشاريعك الفعلية) */
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
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "PostgreSQL" },
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
      { name: "React" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "GSAP" },
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
      { name: "Next.js" },
      { name: "PostgreSQL" },
      { name: "Redis" }, // fallback لو ما له أيقونة
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
      { name: "React Native" }, // fallback
      { name: "TypeScript" },
      { name: "Expo" }, // fallback
      { name: "SQLite" }, // fallback
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
      { name: "Python" },
      { name: "OpenAI" },
      { name: "LangChain" }, // fallback
      { name: "FastAPI" },   // fallback
    ],
    features: [
      "Chat with tools & memory",
      "Embeddings search over docs",
      "Guardrails, evals, and telemetry",
      "Multi-tenant API with rate limits",
    ],
  },
];

/* -----------------------------
 * ربط أسماء التقنيات بالأيقونات الفعلية من TECH
 * ----------------------------- */
const ALL_TECH: TechItem[] = Object.values(TECH).flat();
const TECH_BY_LABEL = new Map<string, TechItem>(
  ALL_TECH.map((t) => [t.label.toLowerCase(), t])
);
const LABEL_ALIASES: Record<string, string> = {
  "nextjs": "Next.js",
  "next.js": "Next.js",
  "reactjs": "React",
  "node": "Node.js",
  "expressjs": "Express",
  "express.js": "Express",
  "postgres": "PostgreSQL",
  "postgresql": "PostgreSQL",
  "js": "JavaScript",
  "ts": "TypeScript",
  "tailwindcss": "Tailwind CSS",
  "tailwind": "Tailwind CSS",
};
function getTechItemByName(name: string): TechItem | null {
  const n = name.trim().toLowerCase();
  const aliased = LABEL_ALIASES[n] ?? name;
  return (
    TECH_BY_LABEL.get(aliased.toLowerCase()) ||
    TECH_BY_LABEL.get(name.toLowerCase()) ||
    null
  );
}

/* -----------------------------
 * دائرة الأيقونة الحقيقية
 * ----------------------------- */
function TechCircle({
  src,
  alt,
  name,
}: {
  src: string;
  alt: string;
  name: string;
}) {
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
        hover:scale-105 transition-all
        group
      "
    >
      <Image
        src={src}
        alt={alt}
        width={60}
        height={60}
        className="
          object-contain
          grayscale opacity-70
          transition duration-300 ease-out
          group-hover:grayscale-0 group-hover:opacity-100
        "
      />
    </span>
  );
}

/**
 * المطلوب النهائي:
 * - اليسار: Scroll-Up (track عمودي يتحرك لأعلى)، كل شريحة بارتفاع الشاشة المخصصة.
 * - اليمين: Fade بين الشرائح + أنيميشن الميزات.
 */
export default function PinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);

  // ✅ مسار اليسار (track) لنجعله يتحرك عموديًا
  const leftTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrap = pinWrapRef.current!;
      const leftTrack = leftTrackRef.current!;
      const rightSlides = gsap.utils.toArray<HTMLElement>("[data-right-slide]");
      const total = rightSlides.length;

      // يمين: أول شريحة ظاهرة والباقي مخفية (fade)
      gsap.set(rightSlides, { autoAlpha: 0 });
      if (rightSlides[0]) gsap.set(rightSlides[0], { autoAlpha: 1 });

      // ScrollTrigger مثبت
      const stepDur = 1; // مدة كل خطوة على التايملاين
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top+=10",
          end: () => `+=${(total - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: total > 1 ? 1 / (total - 1) : 0,
          invalidateOnRefresh: true,
        },
      });

      // اليسار: حرّك الـ track لأعلى بمقدار 100% لكل شريحة
      // كل child في leftTrack ارتفاعه يساوي ارتفاع الحاوية، لذا yPercent يترجم بين الشرائح
      tl.to(
        leftTrack,
        {
          yPercent: -100 * (total - 1),
          duration: stepDur * (total - 1),
          ease: "none",
        },
        0
      );

      // اليمين: فِيد + ميزات عند بداية كل خطوة
      for (let i = 0; i < total - 1; i++) {
        const at = i * stepDur;

        tl.to(rightSlides[i], { autoAlpha: 0, duration: 0.25 }, at + 0.001);
        tl.to(rightSlides[i + 1], { autoAlpha: 1, duration: 0.25 }, at + 0.05);

        const nextFeatures =
          (rightSlides[i + 1] as HTMLElement).querySelectorAll(
            "[data-feature-item]"
          );
        tl.fromTo(
          nextFeatures,
          { y: 6, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.2 },
          at + 0.08
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
        {/* grid والمسامير */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen px-3 md:px-6 pt-3 md:pt-4 gap-x-6">
          {/* LEFT (Pinned, Scroll-Up Track) */}
          <div className="relative h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-hidden">
            {/* المسار العمودي: كل Article بارتفاع الحاوية */}
            <div
              ref={leftTrackRef}
              className="absolute inset-0 flex flex-col will-change-transform"
            >
              {STEPS.map((p, i) => (
                <article
                  key={p.name + i}
                  className="h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1.2rem)] flex flex-col gap-4 p-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">{p.name}</h3>
                  <figure className="relative w-full rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                    <div className="w-full aspect-[4/10] md:aspect-[4/3]">
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
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-300 text-neutral-950 font-semibold"
                    >
                      <Globe2 />
                      <span>Visit Project</span>
                    </a>
                    <a
                      href={p.repoUrl}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white"
                    >
                      <IconBrandGithub />
                      <span>GitHub Repo</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT (Pinned, Fade + features + real icons) */}
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
                    <h3 className="mt-2 text-2xl md:text-4xl font-bold">
                      {p.name}
                    </h3>

                    {/* تقنيات بأيقونات حقيقية */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {p.techs.map((t) => {
                        const item = getTechItemByName(t.name);
                        return item ? (
                        
                        <Tooltip>
                          <TooltipTrigger>  
                          <TechCircle
                            key={`${p.name}-${item.key}`}
                            src={item.src}
                            alt={item.alt}
                            name={item.label}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {item.label}
                        </TooltipContent>
                        </Tooltip>
                        ) : (
                          <span
                            key={`${p.name}-${t.name}`}
                            title={t.name}
                            className="
                              inline-flex items-center justify-center
                              h-11 w-11 md:h-20 md:w-20 rounded-full
                              border border-white/20 bg-white/5
                              text-[10px] font-medium text-white/80
                              select-none
                            "
                          >
                            {t.name}
                          </span>
                        );
                      })}
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
