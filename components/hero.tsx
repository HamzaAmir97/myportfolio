// components/Hero.tsx
"use client";

import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import TypingAnimatedText from "./ui/TypingText";

import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

import ServicesMarquee from "./ServicesMarquee";
import { Button } from "./ui/button";
import { Check, DownloadIcon, MailIcon, Sparkles } from "lucide-react";

import Navbar from "./shared/Navbar";
import MobileNavbar from "./MobileNavbar";
import { useRef } from "react";
import { useGsapCornerWipe } from "@/hooks/useGsapCornerWipe";
import ScrambleMusnadText from "./ScrambleMusnadText";

// ✅ مهم: الهوك المتتالي (نسخة v2 المرِنة)
import { useHeroIntroTimeline } from "@/hooks/useHeroIntroTimeline";
import { useTheme } from "next-themes";

export function Hero() {

  // ===== Refs للتايملاين =====
  const rootRef = useRef<HTMLElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const highlightWrapRef = useRef<HTMLSpanElement>(null); // الحاوية اللي فيها الـ Highlight
  const typingWrapRef = useRef<HTMLDivElement>(null);

  const paraRef = useRef<HTMLParagraphElement>(null);
  const paraRef2 = useRef<HTMLParagraphElement>(null);
  const paraRef3 = useRef<HTMLParagraphElement>(null);

  const btnRef1 = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);
  const mobileBtnRef1 = useRef<HTMLButtonElement>(null);
  const mobileBtnRef2 = useRef<HTMLButtonElement>(null);

  const hireBadgeRef = useRef<HTMLSpanElement>(null);   // دائرة "Hire me"
  const decoWrapRef = useRef<HTMLDivElement>(null);     // أول عنصر ديكور (هن fade-in واحد)
  const rightImageRef = useRef<HTMLDivElement>(null);   // غلاف صورة/جيف اليمين


  const  isDarkMode = useTheme().theme === "dark";
  // ===== تأثير الهوفر للأزرار (GSAP Corner Wipe) =====
  useGsapCornerWipe(btnRef2, {
    color: "rgba(0,0,0)",
    corner: "br",
    duration: 0.2,
    ease: "power3.out",
    layer: "under",
  });

  useGsapCornerWipe(btnRef1, {
    color: "rgba(255,255,255)",
    corner: "bl",
    duration: 0.2,
    ease: "power3.out",
    layer: "under",
  });

  useGsapCornerWipe(mobileBtnRef2, {
    color: "rgba(0,0,0)",
    corner: "br",
    duration: 0.2,
    ease: "power3.out",
    layer: "under",
  });

  useGsapCornerWipe(mobileBtnRef1, {
    color: "rgba(255,255,255)",
    corner: "bl",
    duration: 0.2,
    ease: "power3.out",
    layer: "under",
  });

  // ===== Timeline المتتالي: يشغّل العناصر واحدة وراء الثانية =====
  useHeroIntroTimeline({
    root: rootRef,
    title: titleRef,
    highlight: highlightWrapRef,
    typing: typingWrapRef,
    features: [paraRef, paraRef2, paraRef3],
    ctas: [btnRef1, btnRef2, mobileBtnRef1, mobileBtnRef2],
    rightImage: rightImageRef,
    hireBadge: hireBadgeRef,
    decoWrap: decoWrapRef,
    // debug: true, // فعلها لو حابب تشوف حالة الـ refs بالكونسول
  });

  return (
    <section ref={rootRef} className=" relative w-screen h-full">
      <div className=" absolute z-1 block md:hidden   right-10 top-5 ">
        <MobileNavbar />
      </div>

      <HeroHighlight>
        <Navbar />

        <div className=" w-screen h-[90vh]  grid grid-cols-1 place-items-center  lg:grid-cols-2
      md:place-items-center pt-10
      ">
          {/* left side */}
          <div className="flex flex-col p-10 justify-center  w-full items-center gap-7">
            <div className="flex items-center gap-2">
              <p ref={titleRef} className="text-black text-4xl md:text-5xl dark:text-white font-light">
                Hello!
              </p>

              {/* أزلنا initial/animate من الـ motion.span — التايملاين هيتولّى */}
              <motion.span
                ref={highlightWrapRef}
                className="  px-4 font-bold text-neutral-700 dark:text-white max-w-4xl md:max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto "
              >
                <Highlight className="text-black dark:text-white  text-4xl md:text-5xl  h-screen">
                  I&apos;m{" "}Hamzah
                </Highlight>
              </motion.span>
            </div>

            <div ref={typingWrapRef} className="flex items-center  justify-center gap-4">
              <span className="w-10 md:w-20 h-0.5 bg-black dark:bg-white rounded-full" />
              <TypingAnimatedText />
              <Sparkles strokeWidth={1} className=" w-12 h-12 font-bold fill-black dark:fill-white  animate-bounce " />
            </div>

            {/* ✅ ScrambleMusnadText موجود كما طلبت */}
            <ScrambleMusnadText
              duration={6}
              revealDelay={0.0002}
              finalText="Full-Stack JavaScript Developer specializing in web, mobile, and AI solutions. I build smart, scalable, and innovative applications that drive business growth and turn ideas into impactful products."
              className="text-black text-lg dark:text-white  max-w-lg"
            />

            {/* features */}
            <div className="hidden md:flex  flex-col   justify-center gap-4 pt-10">
              <span className="flex items-center gap-2">
                <Check className=" w-5   h-5  font-bold dark:fill-white" />
                <p ref={paraRef} className="text-black font-bold dark:text-white">
                  Clean, maintainable, and scalable code for long-term growth and efficiency.
                </p>
              </span>

              <span className="flex items-center gap-2">
                <Check className=" w-5   h-5  font-boldk dark:fill-white" />
                <p ref={paraRef2} className="text-black font-bold dark:text-white">
                  Modern, visually appealing interfaces that deliver a smooth user experience.
                </p>
              </span>
              <span className="flex items-center gap-2">
                <Check className=" w-5   h-5  font-bold  dark:fill-white" />
                <p ref={paraRef3} className="text-black font-bold dark:text-white">
                  Fast delivery without compromising on quality or professionalism.
                </p>
              </span>
            </div>

            {/* CTA buttons*/}
            <div className="hidden md:flex gap-4 pb-10">
              <Button ref={btnRef1} variant="default" className="buttonPrimary">
                <p className=" dark:text-black">Let&apos;s talk</p>
              </Button>
              <Button ref={btnRef2} variant="ghost" className="buttonSecondary rounded-none">
                <span className=" flex gap-1 ">
                  Download CV
                  <DownloadIcon />
                </span>
              </Button>
            </div>
          </div>

          {/* right side */}
          <div className=" relative flex justify-end items-center">
          
          
            {/* Hire me badge */}
            <motion.span
              ref={hireBadgeRef}
              className="absolute flex justify-center items-center 
             md:top-15 top-17 -left-2 md:-left-9 -z-10 
             w-[5rem] h-[5rem]  md:w-[7rem] md:h-[7rem] rounded-full bg-black "
            >
              <p className="text-white font-bold text-lg   text-center md:text-2xl">Hire me</p>

              <motion.span
                className=" absolute top-0 -right-3 md:w-9 w-7 h-7 md:h-9 bg-green-500 rounded-full animate-ping   "
              ></motion.span>
              <motion.span
                className=" absolute top-1 -right-2 md:w-7 w-5 h-5 md:h-7 bg-green-400 rounded-full "
              ></motion.span>
            </motion.span>





            {/* decoration (نفعّل fade لواحد منهم) */}
            <div
              ref={decoWrapRef}
              className="absolute  md:top-5 top-12 md:-left-5 left-6 -z-10 w-5 h-30 flex  gap-2 -rotate-45"
            >
              <span className=" w-0.5 md:h-40 h-30   bg-black shadow-2xl shadow-white " />
            </div>
            <div
              className="absolute  md:top-4 top-12   md:-left-5 left-6 -z-9 w-5 h-30 flex  gap-2 -rotate-45"
            >
              <span className=" w-0.5 md:h-40 h-30   bg-white shadow-2xl shadow-black " />
            </div>




            {/* صورة/جيف */}
            <motion.div ref={rightImageRef}>
              <Image
                src="/illustrationsGifs/photo.gif"
                width={450}
                height={450}
                alt="My photo"
                unoptimized
                className="object-cover "
                loading="lazy"
              />
            </motion.div>
          </div>

          {/* CTA — Mobile */}
          <div className="flex md:hidden gap-4 pb-10">
            <Button ref={mobileBtnRef1} variant="default" className="buttonPrimary">
              <p className="">Let&apos;s talk</p>
            </Button>
            <Button ref={mobileBtnRef2} variant="ghost" className="buttonSecondary rounded-none">
              <span className="flex items-center gap-2">
                Download CV
                <DownloadIcon />
              </span>
            </Button>
          </div>

          {/* services marquee mobile*/}
          <div className="lg:hidden">
            <ServicesMarquee />
          </div>
        </div>

        {/* services marquee desktop*/}
        <div className="lg:block hidden">
          <ServicesMarquee />
        </div>
      </HeroHighlight>

      {/* social and email */}
      <div className="h-20 hidden md:flex items-center justify-start gap-10 my-15 px-5">
        <span className="w-[20%] h-0.5 bg-black dark:bg-white rounded-full" />

        {/* social */}
        <div className="flex items-center gap-5">
          <span className="flex gap-2 cursor-pointer ">
            <IconBrandFacebook />
            <p className="font-semibold cursor-pointer hover:text-amber-600">Facbook</p>
          </span>
          <span className="flex gap-2 cursor-pointer">
            <IconBrandGithub />
            <p className="font-semibold cursor-pointer hover:text-amber-600">GitHub</p>
          </span>
          <span className="flex gap-2 cursor-pointer">
            <IconBrandLinkedin />
            <p className="font-semibold cursor-pointer hover:text-amber-600">LinkedIn</p>
          </span>
        </div>

        <span className="w-[40%] h-0.5 bg-black dark:bg-white rounded-full" />

        {/* email */}
        <div className="flex items-center gap-5">
          <span className="flex gap-2 cursor-pointer">
            <MailIcon />
            <p className="font-semibold cursor-pointer hover:text-amber-600">alhamza@gmail.com</p>
          </span>
        </div>
      </div>
    </section>
  );
}
