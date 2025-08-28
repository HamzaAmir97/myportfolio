"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { TECH, } from "@/constants/tech-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type StackSectionKey = keyof typeof TECH;
type StackSection = {
  key: StackSectionKey;
  title: string;
  blurb: string;
  pitch?: string;
};

/** ---------------------------------
 * Sections Data
 * --------------------------------- */
const sections: StackSection[] = [
  {
    key: "uiux",
    title: "UI/UX",
    blurb: "Smooth interfaces, GSAP transitions, and thoughtful UX.",
    pitch:
      "I build modern, fast, and responsive UIs with clean architectures, using React, Next.js, and Tailwind with smooth GSAP animations.",
  },
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Smooth interfaces, GSAP transitions, and thoughtful UX.",
    pitch:
      "I build modern, fast, and responsive UIs with clean architectures, using React, Next.js, and Tailwind with smooth GSAP animations.",
  },
  {
    key: "backend",
    title: "Backend",
    blurb: "Reliable APIs, high performance, and scalability.",
    pitch:
      "I design scalable APIs with Node.js and robust databases, ensuring performance, monitoring, and caching from day one.",
  },
  {
    key: "mobile",
    title: "Mobile",
    blurb: "Reliable APIs, high performance, and scalability.",
    pitch:
      "I design scalable APIs with Node.js and robust databases, ensuring performance, monitoring, and caching from day one.",
  },
  {
    key: "ai",
    title: "AI Development",
    blurb: "Smart models, LLM integration, and practical MLOps.",
    pitch:
      "I integrate LLMs, build intelligent AI agents, and set up pipelines with LangChain, Python, and OpenAI to power production-ready solutions.",
  },
  {
    key: "testing",
    title: "Testing",
    blurb: "Confident launches with automated and thorough testing.",
    pitch:
      "From unit to end-to-end tests, I ensure reliability with Jest, Cypress, and Playwright, integrated into CI/CD pipelines.",
  },
];

/** ---------------------------------
 * Illustration sources
 * --------------------------------- */
const ILLUSTRATIONS: Record<StackSectionKey, { src: string; alt: string }> = {
  uiux: { src: "/illustrations/uiux.svg", alt: "UI/UX illustration" },
  frontend: { src: "/illustrations/frontend.svg", alt: "Frontend UI illustration" },
  backend: { src: "/illustrations/backend.svg", alt: "Backend services illustration" },
  mobile: { src: "/illustrations/mobile.svg", alt: "Mobile illustration" },
  ai: { src: "/illustrations/Ai-powered marketing tools abstract.gif", alt: "AI brain network illustration" },
  testing: { src: "/illustrations/testing.svg", alt: "Testing pipelines illustration" },
};

/** ---------------------------------
 * Tech circle with real images
 * --------------------------------- */
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

/** ---------------------------------
 * Tabs
 * --------------------------------- */
function SectionTabs({
  activeKey,
  onChange,
}: {
  activeKey: StackSectionKey;
  onChange: (k: StackSectionKey) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1">
      {sections.map((s) => {
        const active = s.key === activeKey;
        return (
          <button
            key={s.key}
            onClick={() => onChange(s.key)}
            className={[
              "shrink-0 rounded-full border text-sm px-3 py-1.5",
              active
                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                : "bg-white text-black border-black/20 dark:bg-transparent dark:text-white dark:border-white/30 hover:border-black/60 dark:hover:border-white/60",
            ].join(" ")}
            aria-pressed={active}
          >
            {s.title}
          </button>
        );
      })}
    </div>
  );
}

/** ---------------------------------
 * About me section
 * --------------------------------- */
export default function Aboutme() {
  const [activeKey, setActiveKey] = useState<StackSectionKey>("frontend");

  // auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKey((prevKey) => {
        const idx = sections.findIndex((s) => s.key === prevKey);
        const next = (idx + 1) % sections.length;
        return sections[next].key;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const active = useMemo(() => sections.find((s) => s.key === activeKey)!, [activeKey]);
  const illu = ILLUSTRATIONS[active.key];

  return (
    <section className="relative w-screen bg-white dark:bg-neutral-950">
      {/* dotted background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          background: "#000",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* header */}
      <header className="px-6 md:px-10 pt-10">
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 bg-black dark:bg-white" />
          <p className="text-[11px] uppercase tracking-widest font-semibold text-black dark:text-white">
            About me
          </p>
        </div>
        <h1 className="mt-2 text-4xl md:text-5xl uppercase font-extrabold tracking-tight text-black dark:text-white">
          Who I am
        </h1>
      </header>

      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-10 py-10">
        {/* left */}
        <div className="flex flex-col gap-6">
          <p className="text-lg md:text-xl leading-relaxed text-black dark:text-white">
            I’m a versatile developer who combines my passion for technology and
            love for design with strong programming expertise to create elegant,
            market-ready solutions. I’m always learning and evolving, staying
            ahead with the latest technologies to turn ideas into high-quality
            products.
          </p>
          <div className="relative w-full rounded-xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
            <div className="relative flex items-center justify-center w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[30rem]">
             
             
              <Image src={illu.src} alt={illu.alt} fill sizes="(max-width:768px)90vw,40vw" className="object-contain p-4" />
            </div>
          </div>
        </div>

        {/* right */}
        <aside className="w-full">
          <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
          <div className="pt-4">
            <SectionTabs activeKey={activeKey} onChange={setActiveKey} />
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight text-black dark:text-white">
              {active.title}
            </h3>
            <p className="mt-1 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {active.pitch ?? active.blurb}
            </p>

            {/* Tech Circles */}
            <div className="mt-4 flex flex-wrap gap-3">
            {TECH[active.key].map((t) => (
  
  <Tooltip>
    <TooltipTrigger>
  <TechCircle key={t.key} src={t.src} alt={t.alt} name={t.label} />
  </TooltipTrigger>
  <TooltipContent>
    {t.label}
  </TooltipContent>
  </Tooltip>

))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
