"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

/* =========================
   1) DATA (صورتان كحد أقصى)
   ========================= */

export const data = [
  {
    title: "Aug 2025",
    content: (
      <div>
        <p className="mb-4 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Launched <strong>SaaS AI Website Builder</strong> and shared it with the Yemen open-source community.
          The platform generates production-ready websites using AI prompts, with multi-tenant billing and an
          admin dashboard. Targeted at small businesses and creators to go live in minutes.
        </p>
        <ul className="list-disc pl-5 mb-6 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
          <li>Stack: TypeScript, Next.js, Prisma, PostgreSQL, Auth, Stripe-ready architecture.</li>
          <li>Features: AI section generator, template presets, SEO/meta, media uploads, i18n (AR/EN).</li>
          <li>Ops: CI/CD, error monitoring, and usage analytics for subscription plans.</li>
        </ul>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <a href="#" className="underline">Project page</a>
          <span>•</span>
          <a href="#" className="underline">Yemen Open Source listing</a>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6
         hover:scale-[1.02]
         transition-all duration-300 ease-out
         cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/templates/startup-1.webp"
            alt="SaaS AI Builder"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover
            
            shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-2.webp"
            alt="Dashboard preview"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Jun 2021 — Bachelor’s Graduation",
    content: (
      <div>
        <p className="mb-2 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Graduated with a <strong>Bachelor’s Degree in Software Engineering</strong> from Taiz University
          (Program span: <strong>Jun 2016 – 10 Jul 2021</strong>).
        </p>
        <p className="mb-4 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Capstone received an <strong>Excellent</strong> evaluation — see the next item for full project details.
        </p>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <a href="#" className="underline">Diploma</a>
          <span>•</span>
          <a href="#" className="underline">Transcript</a>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="Graduation highlight"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/features-section.png"
            alt="Campus snapshot"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Jun 2021 — Graduation Project (ML Cancer Diagnosis)",
    content: (
      <div>
        <p className="mb-2 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          <strong>A Diagnosis and Prediction System for Lung and Colon Cancers using Machine Learning Algorithms</strong>.
          Work period: <strong>Sep 1, 2020 – Jun 6, 2021</strong>.
        </p>
        <ul className="list-disc pl-5 mb-6 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
          <li>Accuracy: best models reached <strong>98%</strong>, lowest <strong>96%</strong>.</li>
          <li>Outcome: demonstrated effectiveness and reliability for assisting early diagnosis.</li>
          <li>Skills: data analysis, ML workflow, software development & documentation.</li>
          <li>Grade: project evaluated as <strong>Excellent</strong>.</li>
        </ul>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <a href="#" className="underline">Abstract / Report</a>
          <span>•</span>
          <a href="#" className="underline">Source (private)</a>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/templates/startup-3.webp"
            alt="Model evaluation charts"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-4.webp"
            alt="Pipeline snapshot"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Mar 2021 — Publication (IEEE)",
    content: (
      <div>
        <p className="mb-3 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Published <em>Online Voting System Based on IoT and Ethereum Blockchain</em> at ICTSA 2021 (IEEE).
        </p>
        <ul className="list-disc pl-5 mb-6 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
          <li>Decentralized e-voting with Ethereum smart contracts and IoT endpoints.</li>
          <li>Addresses integrity, transparency, and on/off-chain trade-offs.</li>
        </ul>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <a href="#" className="underline">IEEE Xplore</a>
          <span>•</span>
          <a href="#" className="underline">Preprint</a>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="Paper figure"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/cards.png"
            alt="Architecture sketch"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Oct 2019 — Conference Talk",
    content: (
      <div>
        <p className="mb-3 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Presented on <strong>Deepfake Technology</strong> at the 3rd Engineering Student Symposium,
          Faculty of Engineering &amp; IT, Taiz University (Yemen).
        </p>
        <ul className="list-disc pl-5 mb-6 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
          <li>Discussed advances in generative models and their ethical implications.</li>
          <li>Reviewed detection approaches and dataset limitations in 2019.</li>
        </ul>
        <div className="flex items-center gap-3 text-xs md:text-sm">
          <a href="#" className="underline">Event page</a>
          <span>•</span>
          <a href="#" className="underline">Slides</a>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/templates/startup-3.webp"
            alt="Symposium"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-4.webp"
            alt="Talk photo"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2019 — Institutes Management System",
    content: (
      <div>
        <p className="mb-3 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Built a C# desktop app following UI/UX fundamentals for institutes management (admissions, fees, and reporting).
        </p>
        <div className="flex items-center gap-3 text-xs md:text-sm mb-4">
          <a href="#" className="underline">Repository</a>
          <span>•</span>
          <a href="#" className="underline">Docs</a>
        </div>
        <div className="grid grid-cols-2 gap-4
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/pro/hero-sections.png"
            alt="C# app UI"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/features-section.png"
            alt="Reports view"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2018 — Lab Management System",
    content: (
      <div>
        <p className="mb-3 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Designed and implemented a laboratory management system in C++ (interfaces, records, and basic inventory).
        </p>
        <div className="flex items-center gap-3 text-xs md:text-sm mb-4">
          <a href="#" className="underline">Repository</a>
          <span>•</span>
          <a href="#" className="underline">Docs</a>
        </div>
        <div className="grid grid-cols-2 gap-4
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/pro/bento-grids.png"
            alt="C++ UI"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/cards.png"
            alt="Inventory view"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2020 — Heart Beat Monitor (Arduino)",
    content: (
      <div>
        <p className="mb-3 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Built a simulation of a heart-beat monitor using Arduino in Proteus (reading, filtering, and plotting).
        </p>
        <div className="flex items-center gap-3 text-xs md:text-sm mb-4">
          <a href="#" className="underline">Repository</a>
          <span>•</span>
          <a href="#" className="underline">Demo</a>
        </div>
        <div className="grid grid-cols-2 gap-4
        hover:scale-[1.02]
        transition-all duration-300 ease-out
        cursor-pointer
        ">
          <img
            src="https://assets.aceternity.com/templates/startup-1.webp"
            alt="Arduino sim"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
          <img
            src="https://assets.aceternity.com/templates/startup-2.webp"
            alt="Signal view"
            width={500}
            height={500}
            className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
];

/* =========================================
   2) TIMELINE — ScrollTrigger فقط (بدون تبعيات إضافية)
   - كل عنصر يظهر عند دخوله المشهد
   - مع ستاجر بسيط لعناصر المحتوى الداخلية
   ========================================= */

type TimelineItemType = {
  title: string;
  content: React.ReactNode;
};

export function Timeline({ data }: { data: TimelineItemType[] }) {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* الخط العمودي */}
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800 md:left-1/2 md:-translate-x-1/2" />
      <div className="space-y-16 md:space-y-24">
        {data.map((item, i) => (
          <TimelineItem key={i} index={i} {...item} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  title,
  content,
  index,
}: TimelineItemType & { index: number }) {
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = itemRef.current;
    if (!el) return;

    // حاوية العنصر
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // عناصر داخلية: فقرات/قوائم/روابط/صور
    const inner = el.querySelectorAll("p, li, a, img");
    gsap.fromTo(
      inner,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // تنظيف ScrollTriggers عند إلغاء المكون
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className="relative grid md:grid-cols-2 items-start gap-6 md:gap-10"
    >
      {/* نقطة على الخط */}
      <span
        className={`absolute left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 top-2 h-3 w-3 rounded-full bg-amber-500 shadow-md`}
      />
      {/* العنوان */}
      <div className={`${isLeft ? "md:order-1" : "md:order-2"}`}>
        <h3 className="font-semibold tracking-tight text-base md:text-lg text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
      </div>
      {/* المحتوى */}
      <div className={`${isLeft ? "md:order-2" : "md:order-1"}`}>{content}</div>
    </div>
  );
}

/* =========================
   3) USAGE
   =========================
   <Timeline data={data} />
*/

import { ClipboardList, Users, Settings, Globe2 } from "lucide-react";
import type { StatItem } from "@/types";

export const stats: StatItem[] = [
  {
    Icon: ClipboardList,
    value: 36, // ~12 مشروع/سنة
    label: "Projects Completed",
    minDigits: 2, // هتظهر 36
  },
  {
    Icon: Users,
    value: 24, // عميلين تقريبًا بالشهرين
    label: "Satisfied Clients",
    minDigits: 2,
  },
  {
    Icon: Settings,
    value: 3, // فريق صغير تتعاونوا سوا
    label: "Team Members",
    minDigits: 2, // تبقى 03 حسب التصميم
  },
  {
    Icon: Globe2,
    value: 12, // دول وصلت لها/تعاملت معها
    label: "Countries Reached", // كانت "World Wide Customer" وده أدق
    minDigits: 2,
  },
];
