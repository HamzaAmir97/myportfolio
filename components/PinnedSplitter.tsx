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
import { STEPS } from "@/constants/projects";
import { Lens } from "./ui/lens";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------
 * ربط أسماء التقنيات بالأيقونات الفعلية من TECH
 * ------------------------------------------- */
const ALL_TECH: TechItem[] = Object.values(TECH).flat();
const TECH_BY_LABEL = new Map<string, TechItem>(
  ALL_TECH.map((t) => [t.label.toLowerCase(), t])
);
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

/** دالة: تجيب عنصر التقنية من قاعدة الأيقونات */
function getTechItemByName(name: string): TechItem | null {
  const n = name.trim().toLowerCase();
  const aliased = LABEL_ALIASES[n] ?? name;
  return (
    TECH_BY_LABEL.get(aliased.toLowerCase()) ||
    TECH_BY_LABEL.get(name.toLowerCase()) ||
    null
  );
}

/** كمبوننت: دائرة أيقونة تقنية (صورة فعلية) */
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
 * كمبوننت رئيسي: PinnedDualStack
 * - نسخة الديسكتوب (md+): Pin + Fade + Features.
 * - نسخة الموبايل (< md): الجزء العلوي يتحرّك أفقيًا، والجزء السفلي ثابت بـ fade بين الشرائح.
 */
export default function PinnedDualStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // مراجع نسخة الديسكتوب
  const pinWrapRef = useRef<HTMLDivElement | null>(null);
  const leftTrackRef = useRef<HTMLDivElement | null>(null);

  // مراجع نسخة الموبايل (تمرير أفقي لجزء المشروع فقط)
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  /**
   * تأثير: إعداد أنيميشن الديسكتوب فقط عند شاشات md+
   */
  useLayoutEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    if (!mql.matches) return; // شغّل الديسكتوب فقط على الشاشات الكبيرة

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

      // تحريك مسار اليسار عموديًا
      tl.to(
        leftTrack,
        {
          yPercent: -100 * (total - 1),
          duration: stepDur * (total - 1),
          ease: "none",
        },
        0
      );

      // تبديل اليمين + ظهور الميزات
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /**
   * تأثير: نسخة الموبايل
   * - المسار العلوي يتحرك أفقيًا.
   * - التفاصيل بالأسفل ثابتة ويتم تبديلها بـ fade عند تغيير الشريحة.
   */
  useLayoutEffect(() => {
    const mql = window.matchMedia("(max-width: 767.98px)");
    if (!mql.matches) return; // شغّل الموبايل فقط على الشاشات الصغيرة

    const ctx = gsap.context(() => {
      const container = mobileContainerRef.current!;
      const track = mobileTrackRef.current!;
      const panels = Array.from(
        track.querySelectorAll<HTMLElement>("[data-mobile-panel]")
      );
      const details = gsap.utils.toArray<HTMLElement>("[data-mobile-detail]");

      // عرض المسار الكامل = عدد الشرائح * عرض الشاشة
      track.style.width = `${panels.length * 100}vw`;

      // جهّز التفاصيل السفلية: كلها مخفية ماعدا الأولى
      gsap.set(details, { autoAlpha: 0 });
      if (details[0]) gsap.set(details[0], { autoAlpha: 1 });

      const getDistance = () => track.scrollWidth - window.innerWidth;

      // تحريك المسار الأفقي العلوي + Pin + Snap
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

      // تبديل التفاصيل السفلية بالـ fade حسب التقدم
      let current = 0;
      const switchDetails = (nextIdx: number) => {
        if (!details[current] || !details[nextIdx] || current === nextIdx) return;
        // يمكنك إضافة حركة انزلاق بسيطة مع الفيد:
        gsap.to(details[current], { autoAlpha: 0, y: -8, duration: 0.2 });
        gsap.fromTo(
          details[nextIdx],
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.2 }
        );
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
      <div className="w-screen px-6 py-8 md:px-10 md:py-10">
        <p className="text-amber-300/80 text-xs uppercase tracking-[0.2em]">
          Selected Work
        </p>
        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight">
          Projects that ship business impact
        </h2>
      </div>

      {/* =========================
          نسخة الديسكتوب (md+)
          ========================= */}
      <div ref={pinWrapRef} className="w-screen hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen px-3 md:px-6 pt-3 md:pt-4 gap-x-6">
          {/* LEFT (Pinned, Scroll-Up Track) */}
          <div className="relative h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-hidden">
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
                    {/* صورة أصغر لتجنّب القص */}
                   
                    <Lens >
                    <div className="relative w-full h-[38vh] md:h-[50vh]">
                      <Image
                        src={p.imageSrc}
                        alt={p.imageAlt ?? p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    </Lens>
                  </figure>
                  <p className="text-neutral-300">{p.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT (Pinned, Fade + features + real icons) */}
          <div className="relative h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)] overflow-visible py-6">
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
                          <Tooltip key={`${p.name}-${item.key}`}>
                            <TooltipTrigger>
                              <TechCircle
                                src={item.src}
                                alt={item.alt}
                                name={item.label}
                              />
                            </TooltipTrigger>
                            <TooltipContent>{item.label}</TooltipContent>
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

                  {/* Ctas */}
                  <div className="flex items-center justify-center gap-3 pb-5">
                    {p.liveUrl && p.liveUrl !== "#" && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-300 text-neutral-950 font-semibold"
                      >
                        <Globe2 />
                        <span>Visit Project</span>
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white"
                      >
                        <IconBrandGithub />
                        <span>GitHub Repo</span>
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            ))}
          </div>
        </div>
      </div>



      {/* =========================
          نسخة الموبايل (أفقي + تفاصيل ثابتة بأسفل)
          ========================= */}
      <div
        ref={mobileContainerRef}
        className="block md:hidden relative w-full h-[calc(100svh-5rem)] overflow-hidden"
      >


        {/* المسار العلوي المتحرك أفقياً - يأخذ 62% من ارتفاع الكونتينر */}
        <div
          ref={mobileTrackRef}
          className="absolute flex items-center justify-center  inset-x-0 top-0 h-[62%] w-[80%] will-change-transform"
        >
          {STEPS.map((p, i) => (
            <section
              key={p.name + i}
              data-mobile-panel
              className="w-screen h-full flex flex-col px-4 py-4"
            >
              {/* المشروع بالأعلى (هو اللي يتحرك) */}
              <div className="flex-1 min-h-0 flex flex-col gap-3">
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
                <figure className="relative w-full rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
                  
                 
                  <Lens>
                  <div className="relative w-full h-[55%] min-h-[160px]">
                    <Image
                      src={p.imageSrc}
                      alt={p.imageAlt ?? p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  </Lens>
                </figure>
                <p className="text-neutral-300 text-sm">{p.description}</p>
            

              {/* CTAs */}
                <div className="mt-4 flex justify-center items-center gap-2">
                    {p.liveUrl && p.liveUrl !== "#" && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" flex  items-center justify-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-300 text-neutral-950 text-sm font-semibold"
                      >
                        <Globe2 className="w-4 h-4" />
                        <span>Visit</span>
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-white/15 bg-white/5 text-white text-sm"
                      >
                        <IconBrandGithub className="w-4 h-4" />
                        <span>Repo</span>
                      </a>
                    )}
                  </div>
            
              </div>
                
                 
            </section>
          ))}
        </div>

        {/* التفاصيل السفلية الثابتة - تأخذ 38% من ارتفاع الكونتينر */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] z-10">
          <div className="h-full relative px-4 pb-4">
            {STEPS.map((p, i) => (
              <aside
                key={p.name + i}
                data-mobile-detail
                className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-xl overflow-hidden opacity-0"
              >
                <div className="h-1 w-full bg-gradient-to-r from-amber-700 to-amber-100" />
                <div className="p-4">
                  <h4 className="text-xs uppercase text-neutral-400">
                    {i + 1} / {STEPS.length}
                  </h4>
                  <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>

                  {/* تقنيات (دوائر صور) */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.techs.map((t) => {
                      const item = getTechItemByName(t.name);
                      return item ? (
                        <span key={`${p.name}-${item.key}`}>
                          <TechCircle
                            src={item.src}
                            alt={item.alt}
                            name={item.label}
                          />
                        </span>
                      ) : (
                        <span
                          key={`${p.name}-${t.name}`}
                          className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-white/20 bg-white/5 text-[10px] font-medium text-white/80 select-none"
                          title={t.name}
                        >
                          {t.name}
                        </span>
                      );
                    })}
                  </div>

                  {/* الميزات */}
                  <div className="mt-4">
                    <h5 className="text-xs uppercase text-amber-300 mb-1">
                      Key Features
                    </h5>
                    <ul className="grid grid-cols-1 gap-1">
                      {p.features.map((feat, idx) => (
                        <li
                          key={`${p.name}-mfeat-${idx}`}
                          className="flex items-start gap-2 text-sm text-neutral-200"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-200" />
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
