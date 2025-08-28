// components/SkillsWall.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TECH } from "@/constants/tech-icons";
import type { TechItem } from "@/constants/tech-icons";
import { motion } from "motion/react";
import { getBrandColor, glowVars } from "@/utils/brand-color";

type Props = {
  rows?: number;
  cols?: number;
  maxItems?: number;
  title?: string;
  subtitle?: string;
};

function GhostTile() {
  return (
    <div
      aria-hidden
      className="
        rounded-xl h-16 sm:h-[4.5rem] md:h-20
        bg-white/[0.02] border border-white/[0.05]
      "
    />
  );
}

function IconTile({
  src,
  alt,
  label,
  href,
}: {
  src: string;
  alt: string;
  label: string;
  href?: string;
}) {
  // Brand color → CSS vars for glow/shadow
  const color = getBrandColor(label);
  const vars = glowVars(color, /* soft */ 1, /* strong */ 1);

  const tile = (
    <div
      style={vars}
      className="
        group relative overflow-visible
        rounded-xl h-16 sm:h-[4.5rem] md:h-20
        bg-white/[0.03] border border-white/[0.08]
        flex items-center justify-center

        /* slow, buttery hover in/out */
     
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:border-white/25
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
        hover:shadow-[0_10px_28px_-10px_var(--glow),0_26px_80px_-14px_var(--glow-strong),0_0_0_1px_var(--glow)]

        /* soft bloom behind the tile */
        after:content-[''] after:absolute after:-inset-[14%] after:rounded-[16px]
        after:opacity-0 group-hover:after:opacity-100
        after:transition after:duration-800 after:ease-[cubic-bezier(0.22,1,0.36,1)]
        after:bg-[radial-gradient(ellipse_at_center,var(--glow-strong)_0%,transparent_68%)]
        after:-z-10
        hover:scale-105 transition-all 
      "
    >
      <Image
        src={src}
        alt={alt}
        width={70}
        height={70}
        className="
          object-contain
          grayscale brightness-110 opacity-85
          transition
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100
          group-hover:drop-shadow-[0_0_38px_var(--glow-strong)]
        "
      />
      <span className="sr-only">{label}</span>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {tile}
    </a>
  ) : (
    tile
  );
}

export default function SkillsWall({
  rows = 2,
  cols = 10,
  maxItems = rows * cols,
  title = "The technologies I use to build real products",
  subtitle = "A modern, carefully curated stack—from UI to backend and AI—used to ship high-quality, scalable features fast.",
}: Props) {
  // Flatten all tech (no sectioning)
  const allTech = useMemo<TechItem[]>(() => Object.values(TECH).flat(), []);
  const items = allTech.slice(0, Math.min(maxItems, rows * cols));

  const totalCells = rows * cols;
  const padStart = Math.floor((totalCells - items.length) / 2);

  // Fill the grid with centered icons and intentional empty slots
  const cells = Array.from({ length: totalCells }, (_, idx) => {
    const itemIndex = idx - padStart;
    return itemIndex >= 0 && itemIndex < items.length ? items[itemIndex] : null;
  });

  return (
    <section id="skills" className="relative w-screen bg-[#0b0b0b] text-white overflow-hidden py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p className="mt-4 text-center text-sm md:text-base text-neutral-400">
          {subtitle}
        </p>

        {/* grid wrapper + edge fades */}
        <div className="relative mt-10 overflow-hidden">
          {/* grid */}
          <div
            className="grid gap-3 relative z-10"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {(() => {
              // stagger animation for icon tiles only
              let animIndex = -1;
              return cells.map((c, i) =>
                c ? (
                  <Tooltip key={`${c.key}-${i}`}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: (++animIndex) * 0.06,
                        }}
                        viewport={{ once: true, amount: 0.25 }}
                      >
                        <IconTile
                          src={c.src}
                          alt={c.alt}
                          label={c.label}
                          href={c.href}
                        />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>{c.label}</TooltipContent>
                  </Tooltip>
                ) : (
                  <GhostTile key={`ghost-${i}`} />
                )
              );
            })()}
          </div>

          {/* edge fade overlays */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 sm:h-40 bg-gradient-to-b from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 sm:h-40 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 sm:w-28 bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 sm:w-28 bg-gradient-to-l from-[#0b0b0b] via-[#0b0b0b]/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
