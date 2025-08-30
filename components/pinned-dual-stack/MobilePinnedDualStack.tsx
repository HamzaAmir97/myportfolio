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

export default function MobilePinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = mobileContainerRef.current!;
      const track = mobileTrackRef.current!;
      const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-mobile-panel]"));
      const details = gsap.utils.toArray<HTMLElement>("[data-mobile-detail]");

      track.style.width = `${panels.length * 100}vw`;

      gsap.set(details, { autoAlpha: 0 });
      if (details[0]) gsap.set(details[0], { autoAlpha: 1 });

      const getDistance = () => track.scrollWidth - window.innerWidth;

      const hTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          pin: true,
          scrub: 1,
          end: () => `+=${getDistance()}`,
          snap: panels.length > 1 ? 1 / (panels.length - 1) : 0,
          invalidateOnRefresh: true,
        },
      });

      let current = 0;
      const switchDetails = (nextIdx: number) => {
        if (!details[current] || !details[nextIdx] || current === nextIdx) return;
        gsap.to(details[current], { autoAlpha: 0, y: -8, duration: 0.2 });
        gsap.fromTo(details[nextIdx], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.2 });
        current = nextIdx;
      };

      const st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${getDistance()}`,
        onUpdate: () => {
          const idx = Math.round(hTween.progress() * (panels.length - 1));
          switchDetails(idx);
        },
        invalidateOnRefresh: true,
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("resize", refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("resize", refresh);
        window.removeEventListener("load", refresh);
        hTween.scrollTrigger?.kill();
        hTween.kill();
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-neutral-950 text-white">
      {/* Heading */}
      <div className="w-screen px-6 py-8">
        <p className="text-amber-300/80 text-xs uppercase tracking-[0.2em]">Selected Work</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
          Projects that ship business impact
        </h2>
      </div>

      {/* Mobile */}
      <div ref={mobileContainerRef} className="relative w-full h-[calc(100svh-5rem)] overflow-hidden">
        {/* Track */}
        <div ref={mobileTrackRef} className="absolute flex items-center justify-center inset-x-0 top-0 h-[62%] w-[80%] will-change-transform">
          {STEPS.map((p, i) => (
            <section
              key={`panel-${i}`}
              data-mobile-panel
              className="w-screen h-full flex flex-col px-4 py-4"
            >
              <div className="flex-1 min-h-0 flex flex-col gap-3">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
                <figure className="relative w-full rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                  <Lens>
                    <div className="relative w-full h-[55%] min-h-[160px]">
                      <Image src={p.imageSrc} alt={p.imageAlt ?? p.name} fill className="object-cover" />
                    </div>
                  </Lens>
                </figure>
                <p className="text-neutral-300 text-sm">{p.description}</p>

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
            </section>
          ))}
        </div>

        {/* Details */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] z-10">
          <div className="h-full relative px-4 pb-4">
            {STEPS.map((p, i) => (
              <aside
                key={`detail-${i}`}
                data-mobile-detail
                className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-xl overflow-hidden opacity-0"
              >
                <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
                <div className="p-4">
                  <h4 className="text-xs uppercase text-neutral-400">
                    {i + 1} / {STEPS.length}
                  </h4>
                  <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>

                  {/* تقنيات */}
                  <div className="mt-4 flex flex-wrap gap-2">
  {p.techs.map((t, idx) => {
    const item = getTechItemByName(t.name);
    const tk = (item?.key ?? t.name).toString().toLowerCase().replace(/\s+/g, "-");
    const baseKey = `mob-tech-${i}-${tk}-${idx}`;
    return item ? (
      <AnimatedTooltip key={baseKey} src={item.src} alt={item.alt} name={item.label} />
    ) : (
      <AnimatedTooltip key={`${baseKey}-fb`} src={"https://via.placeholder.com/150"} alt={t.name} name={t.name} />
    );
  })}
</div>

                  {/* الميزات */}
                  <div className="mt-4">
                    <h5 className="text-xs uppercase text-amber-300 mb-1">Key Features</h5>
                    <ul className="grid grid-cols-1 gap-1">
                      {p.features.map((feat, idx) => (
                        <li
                          key={`mfeat-${i}-${idx}`}
                          className="flex items-start gap-2 text-sm text-neutral-200"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
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
