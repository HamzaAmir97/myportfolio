// components/Aboutme.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";

/** ---------------------------------
 * Types
 * --------------------------------- */
type Tech = { name: string; iconClass?: string };
type StackSection = {
  key: "frontend" | "backend" | "ai" | "testing";
  title: string;
  blurb: string;
  pitch?: string;
  techs: Tech[];
};

/** ---------------------------------
 * Sections Data
 * --------------------------------- */
const sections: StackSection[] = [
  {
    key: "frontend",
    title: "Frontend",
    blurb: "Smooth interfaces, GSAP transitions, and thoughtful UX.",
    pitch:
      "I build modern, fast, and responsive UIs with clean architectures, using React, Next.js, and Tailwind with smooth GSAP animations.",
    techs: [
      { name: "React", iconClass: "devicon-react-original" },
      { name: "Next.js", iconClass: "devicon-nextjs-original" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "Tailwind", iconClass: "devicon-tailwindcss-plain" },
      { name: "GSAP", iconClass: "devicon-javascript-plain" },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    blurb: "Reliable APIs, high performance, and scalability.",
    pitch:
      "I design scalable APIs with Node.js and robust databases, ensuring performance, monitoring, and caching from day one.",
    techs: [
      { name: "Node.js", iconClass: "devicon-nodejs-plain" },
      { name: "NestJS", iconClass: "devicon-nestjs-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "MongoDB", iconClass: "devicon-mongodb-plain" },
    ],
  },
  {
    key: "ai",
    title: "AI Development",
    blurb: "Smart models, LLM integration, and practical MLOps.",
    pitch:
      "I integrate LLMs, build intelligent AI agents, and set up pipelines with LangChain, PyTorch, and OpenAI to power production-ready solutions.",
    techs: [
      { name: "Python", iconClass: "devicon-python-plain" },
      { name: "PyTorch", iconClass: "devicon-pytorch-original" },
      { name: "TensorFlow", iconClass: "devicon-tensorflow-original" },
      { name: "LangChain" },
      { name: "OpenAI" },
    ],
  },
  {
    key: "testing",
    title: "Testing",
    blurb: "Confident launches with automated and thorough testing.",
    pitch:
      "From unit to end-to-end tests, I ensure reliability with Jest, Cypress, and Playwright, integrated into CI/CD pipelines.",
    techs: [
      { name: "Jest", iconClass: "devicon-jest-plain" },
      { name: "Cypress", iconClass: "devicon-cypressio-plain" },
      { name: "Playwright", iconClass: "devicon-playwright-plain" },
      { name: "Vitest", iconClass: "devicon-vitejs-plain" },
    ],
  },
];

/** ---------------------------------
 * Illustration sources
 * Place SVG/PNG files in /public/illustrations/
 * --------------------------------- */
const ILLUSTRATIONS: Record<
  StackSection["key"],
  { src: string; alt: string }
> = {
  frontend: {
    src: "/illustrations/frontend.svg",
    alt: "Frontend UI illustration",
  },
  backend: {
    src: "/illustrations/backend.svg",
    alt: "Backend services illustration",
  },
  ai: {
    src: "/illustrations/ai.svg",
    alt: "AI brain network illustration",
  },
  testing: {
    src: "/illustrations/testing.svg",
    alt: "Testing pipelines illustration",
  },
};

/** ---------------------------------
 * Tech circle (devicon or initials)
 * --------------------------------- */
function TechCircle({ tech }: { tech: Tech }) {
  const short = useMemo(() => tech.name.slice(0, 2).toUpperCase(), [tech.name]);
  return (
    <span
      title={tech.name}
      className="
        inline-flex items-center justify-center
        h-11 w-11 sm:h-12 sm:w-12 rounded-full
        border border-black/15 dark:border-white/20
        bg-white dark:bg-transparent
        text-[10px] font-semibold text-black dark:text-white
        shadow-sm select-none
      "
    >
      {tech.iconClass ? (
        <i className={`${tech.iconClass} text-xl`} aria-hidden="true" />
      ) : (
        short
      )}
    </span>
  );
}

/** ---------------------------------
 * Small tabs to switch active section
 * --------------------------------- */
function SectionTabs({
  activeKey,
  onChange,
}: {
  activeKey: StackSection["key"];
  onChange: (k: StackSection["key"]) => void;
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
 * Illustration frame (left)
 * Smaller image to avoid cropping + top gradient bar
 * --------------------------------- */
function IllustrationFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden">
      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
      {/* fixed heights so image stays smaller and never crops */}
      <div className="relative flex items-center justify-center w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[30rem]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          sizes="(max-width: 768px) 90vw, 40vw"
          className="object-contain p-4"
        />
      </div>
    </div>
  );
}

/** ---------------------------------
 * About me section
 * --------------------------------- */
export default function Aboutme() {
  const [activeKey, setActiveKey] = useState<StackSection["key"]>(
    sections[0].key
  );

  /** Auto-rotate tabs every 2s */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKey((prevKey) => {
        const idx = sections.findIndex((s) => s.key === prevKey);
        const next = (idx + 1) % sections.length;
        return sections[next].key;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const active = useMemo(
    () => sections.find((s) => s.key === activeKey)!,
    [activeKey]
  );

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
        {/* left: summary + illustration (smaller) */}
        <div className="flex flex-col gap-6">
          <p className="text-lg md:text-xl leading-relaxed text-black dark:text-white">
            I’m a versatile developer who combines my passion for technology and
            love for design with strong programming expertise to create elegant,
            market-ready solutions. I’m always learning and evolving, staying
            ahead with the latest technologies to turn ideas into high‑quality
            products.
          </p>

          <IllustrationFrame src={illu.src} alt={illu.alt} />
        </div>

        {/* right: minimal bar + content (no card box) */}
        <aside className="w-full">
          {/* top gradient bar only (like left) */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />

          {/* tight spacing content */}
          <div className="pt-4">
            {/* Tabs remain for manual switch */}
            <SectionTabs activeKey={activeKey} onChange={setActiveKey} />

            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight text-black dark:text-white">
              {active.title}
            </h3>
            <p className="mt-1 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {active.pitch ?? active.blurb}
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {active.techs.map((t) => (
                <TechCircle key={`${active.key}-${t.name}`} tech={t} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
