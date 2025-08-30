  "use client";
import React, { useLayoutEffect } from 'react'
import { Button } from './ui/button'
import { ArrowDown, ArrowRight, BotMessageSquare, Laptop2Icon, PaletteIcon, SmartphoneIcon } from 'lucide-react'
import Image from 'next/image'
import { BackgroundGradient } from './ui/background-gradient'
import { GlowingEffect } from './ui/glowing-effect'
import { useGsapCornerWipe } from '@/hooks/useGsapCornerWipe';
import { useRef } from 'react';
import { animateSplitOnScroll } from '@/lib/animation/animateSplitOnScroll';

const Services = () => {

     const btnRef = useRef<HTMLButtonElement>(null);
  
    useGsapCornerWipe(btnRef, {
      color: "rgba(255,255,255)",
      corner: "bl",
      duration: 0.2,
      layer: "under",
    });


     const titleRef = useRef<HTMLHeadingElement>(null);   // ✅ النوع صحيح
      const paraRef  = useRef<HTMLParagraphElement>(null); // ✅ النوع صحيح
    
      useLayoutEffect(() => {
        const stop1 = animateSplitOnScroll({
          ref: titleRef,
          mode: "chars",
          duration: 1,
          stagger: 0.03,
          from: { y: 40, opacity: 0, rotateX: -30 },
          to:   { y: 0,  opacity: 1, rotateX: 0 },
          start: "top 85%",
          once: true,
        });
    
        const stop2 = animateSplitOnScroll({
          ref: paraRef,
          mode: "words",
          duration: 0.9,
          stagger: 0.06,
          from: { y: 24, opacity: 0 },
          to:   { y: 0,  opacity: 1 },
          start: "top 90%",
          once: true,
          delay: 0.1,
        });
    
        return () => {
          stop1!();
          stop2!();
        };
      }, []);
    
  return (
   
    <section className="relative w-full min-h-[100svh] lg:w-screen lg:h-screen py-12 lg:py-20 flex flex-col px-4 sm:px-6 lg:px-10">
        
      {/* heading */}
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between py-6 lg:py-10">
        {/* title */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="w-5 h-0.5 bg-black dark:bg-white"/>
            <p ref={titleRef} className="text-xs uppercase font-semibold text-black dark:text-white">
              My Services ?
            </p>
          </div>
          <h1 ref={paraRef} className="text-3xl sm:text-4xl uppercase font-bold text-black dark:text-white">
            What I offer
          </h1>
        </div>

        {/* Cta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-10">
          <p className="text-black/80 dark:text-white/80">This is some of my services i offer to my clients</p>
          <Button ref={btnRef} className="buttonPrimary w-fit hidden lg:block"> <p>All services</p></Button>
        </div>
      </div>

      {/* services */}
      <div className="flex flex-col items-stretch justify-center lg:flex-row lg:items-center lg:gap-2">
        {/* عمود المحتوى */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:justify-between gap-6 lg:gap-10">

          {/* scroll button: مخفي على الصغير — يظهر زي ما هو على الكبير */}
          <div className="hidden lg:flex h-[20rem] flex-col items-center justify-center gap-5">
            <p className="text-black font-semibold dark:text-white -rotate-90 py-5">Scroll down</p>
            <span className="w-0.5 h-12 bg-black dark:bg-white"/>
            <a href="#skills">
              <Button
                className="w-14 h-14 bg-black dark:bg-black rounded-full cursor-pointer hover:scale-110 hover:shadow-xl hover:shadow-amber-700 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-300 ease-in-out animate-bounce"
                aria-label="Scroll to skills"
              >
                <ArrowDown/>
              </Button>
            </a>
          </div>



          {/* الكروت: 
              - موبايل/تابلت Grid 1-2 أعمدة
              - ديسكتوب ترجع Flex أفقي بنفس المقاس */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 place-items-center lg:grid-cols-[unset] lg:grid-rows-[unset] lg:grid-none lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-10">
            
            {/* service1 */}
            <BackgroundGradient>
              <div className="
                w-full sm:w-[18rem] md:w-[18rem] lg:w-[18rem]
                h-64 sm:h-72 lg:h-[20rem]
                p-6 sm:p-8 lg:p-10
                hover:rounded-xl border-black dark:border-white
              ">
                <div className="flex flex-col items-start gap-3">
                  <Laptop2Icon className="w-10 h-10 text-white"/>
                  <h1 className="text-white dark:text-white font-bold text-2xl sm:text-3xl">Web Development</h1>
                  <span className="w-px h-8 bg-white"/>
                  <button className="flex items-center gap-2 text-white cursor-pointer">
                    learn more <ArrowRight/>
                  </button>
                </div>
              </div>
            </BackgroundGradient>

            {/* service2 */}
            <div 
            className="
              w-[15.9rem] md:w-[18rem] lg:w-[18rem]
              h-64 sm:h-72 lg:h-[20rem]
              border-2 p-6 sm:p-8 lg:p-10 border-black hover:border-amber-600 dark:hover:border-amber-600 dark:border-white
            ">
              <div className="flex flex-col items-start gap-3">
                <SmartphoneIcon className="w-10 h-10"/>
                <h1 className="text-black dark:text-white font-bold text-2xl sm:text-3xl">Mobile Development</h1>
                <span className="w-px h-8 bg-black dark:bg-white"/>
                <button className="flex items-center gap-2 text-black dark:text-white cursor-pointer">
                  learn more <ArrowRight/>
                </button>
              </div>
            </div>

            {/* service3 */}
            <div  className="
              w-[15.9rem] md:w-[18rem] lg:w-[18rem]
              h-64 sm:h-72 lg:h-[20rem]
              border-2 p-6 sm:p-8 lg:p-10 border-black hover:border-amber-600 dark:hover:border-amber-600 dark:border-white
            ">
              <div className="flex flex-col items-start gap-3">
                <BotMessageSquare className="w-10 h-10"/>
                <h1 className="text-black dark:text-white font-bold text-2xl sm:text-3xl">
                  AI <br/> Development
                </h1>
                <span className="w-px h-8 bg-black dark:bg-white"/>
                <button className="flex items-center gap-2 text-black dark:text-white hover:text-amber-600 dark:hover:text-amber-600 cursor-pointer">
                  learn more <ArrowRight/>
                </button>
              </div>
            </div>

            {/* service4 */}
            <div className="
              w-[15.9rem] md:w-[18rem] lg:w-[18rem]
              h-64 sm:h-72 lg:h-[20rem]
              border-2 p-6 sm:p-8 lg:p-10 border-black hover:border-amber-600 dark:hover:border-amber-600 dark:border-white
            ">
              <div className="flex flex-col items-start gap-3">
                <PaletteIcon className="w-10 h-10"/>
                <h1 className="text-black dark:text-white font-bold text-2xl sm:text-3xl">
                  UI/UX <br/> Design
                </h1>
                <span className="w-px h-8 bg-black dark:bg-white"/>
                <button className="flex items-center gap-2 text-black dark:text-white hover:text-amber-600 dark:hover:text-amber-600 cursor-pointer">
                  learn more <ArrowRight/>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* الخلفية المنقّطة (لو عايز ترجعها) */}
      {/* <Image src="/images/dotes.png" width={500} height={500} alt="dotted background"
          className="w-full h-[30rem] absolute bottom-0 left-0 opacity-5 -z-2"
      /> */}
    </section>
  )
}

export default Services
