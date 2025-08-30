"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { Globe2 } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import { TECH, TechItem } from "@/constants/tech-icons";
import { STEPS } from "@/constants/projects";
import { Lens } from "../ui/lens";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

// (لا نستخدم pid في المفاتيح الآن لتجنّب أي تصادمات محتملة)
const ALL_TECH: TechItem[] = Object.values(TECH).flat();
const TECH_BY_LABEL = new Map<string, TechItem>(ALL_TECH.map((t) => [t.label.toLowerCase(), t]));
const LABEL_ALIASES: Record<string, string> = {
  nextjs: "Next.js",
  "next.js": "Next.js",
  reactjs: "React",
  node: "Node.js",
  expressjs: "Express",
  "express.js": "Express",
  postgres: "PostgreSQL",
  postgresql: "PostgreSQL",
  js: "JavaScript",
  ts: "TypeScript",
  tailwindcss: "Tailwind CSS",
  tailwind: "Tailwind CSS",
};
function getTechItemByName(name: string): TechItem | null {
  const n = name.trim().toLowerCase();
  const aliased = LABEL_ALIASES[n] ?? name;
  return TECH_BY_LABEL.get(aliased.toLowerCase()) ?? TECH_BY_LABEL.get(name.toLowerCase()) ?? null;
}

export default function DesktopPinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const leftTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pinWrap = pinWrapRef.current!;
      const leftTrack = leftTrackRef.current!;
      const rightSlides = gsap.utils.toArray<HTMLElement>("[data-right-slide]");
      const total = rightSlides.length;

      gsap.set(rightSlides, { autoAlpha: 0 });
      if (rightSlides[0]) gsap.set(rightSlides[0], { autoAlpha: 1 });

      const stepDur = 1;
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

      tl.to(
        leftTrack,
        { yPercent: -100 * (total - 1), duration: stepDur * (total - 1), ease: "none" },
        0
      );

      for (let i = 0; i < total - 1; i++) {
        const at = i * stepDur;
        tl.to(rightSlides[i], { autoAlpha: 0, duration: 0.25 }, at + 0.001);
        tl.to(rightSlides[i + 1], { autoAlpha: 1, duration: 0.25 }, at + 0.05);

        const nextFeatures =
          (rightSlides[i + 1] as HTMLElement).querySelectorAll("[data-feature-item]");
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-neutral-950 text-white">
      {/* Heading */}
      <div className="w-screen px-6 py-8 md:px-10 md:py-10">
        <p className="text-amber-300/80 text-xs uppercase tracking-[0.2em]">Selected Work</p>
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          Projects that ship business impact
        </h2>
      </div>

      <div ref={pinWrapRef} className="w-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen px-3 md:px-6 pt-3 md:pt-4 gap-x-6">
          {/* LEFT */}
          <div className="relative h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-hidden">
            <div ref={leftTrackRef} className="absolute inset-0 flex flex-col will-change-transform">
              {STEPS.map((p, i) => (
                <article
                  key={`left-${i}`}
                  className="h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1.2rem)] flex flex-col gap-4 p-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">{p.name}</h3>
                  <figure className="relative w-full rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                    <Lens>
                      <div className="relative w-full h-[38vh] md:h-[50vh]">
                        <Image src={p.imageSrc} alt={p.imageAlt ?? p.name} fill className="object-cover" />
                      </div>
                    </Lens>
                  </figure>
                  <p className="text-neutral-300">{p.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-visible py-6">
            {STEPS.map((p, i) => (
              <aside
                key={`right-${i}`}
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

                    {/* تقنيات */}
                    <div className="mt-5 flex flex-wrap gap-3">
  {p.techs.map((t, idx) => {
    const item = getTechItemByName(t.name);
    const tk = (item?.key ?? t.name).toString().toLowerCase().replace(/\s+/g, "-");
    const baseKey = `desk-tech-${i}-${tk}-${idx}`;
    return item ? (
      <AnimatedTooltip key={baseKey} src={item.src} alt={item.alt} name={item.label} />
    ) : (
      <AnimatedTooltip key={`${baseKey}-fb`} src={"https://via.placeholder.com/150"} alt={t.name} name={t.name} />
    );
  })}
</div>

                    {/* Features */}
                    <div className="mt-6">
                      <h5 className="text-sm uppercase text-amber-300 mb-2">Key Features</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {p.features.map((feat, idx) => (
                          <li
                            key={`feat-${i}-${idx}`}
                            data-feature-item
                            className="flex items-start gap-2 text-sm text-neutral-200"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center justify-center gap-3 pb-5">
                    {p.liveUrl && p.liveUrl !== "#" && (
                     
                    <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <Button className="buttonPrimary">
                        <Globe2 />
                        <span>Visit Project</span>
                        </Button>  
                        
                      </a>
                     
                    )}
                    {p.repoUrl && (
                      
                    <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <span className="buttonSecondary flex items-center gap-2">
                        <IconBrandGithub />
                        <span>GitHub Repo</span>
                        </span>
                        
                        
                      </a>
                      
                    )}
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
