"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import TypingAnimatedText from "./ui/TypingText";
import { BackgroundLines } from "./ui/background-lines";
import { FloatingDock } from "@/components/ui/floating-dock";

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
import BrandIconsGrid from "./companies";
import ServicesMarquee from "./ServicesMarquee";
import { Button } from "./ui/button";
import { Check, CheckCircle, DownloadIcon, MailIcon, Menu, Sparkle, Sparkles } from "lucide-react";
import { div } from "motion/react-client";
import Navbar from "./shared/Navbar";
import MobileNavbar from "./MobileNavbar";
import { useLayoutEffect, useRef } from "react";
import { useGsapCornerWipe } from "@/hooks/useGsapCornerWipe";
import ScrambleMusnadText from "./ScrambleMusnadText";
import { animateSplitOnScroll } from "@/lib/animation/animateSplitOnScroll";
import { revealOnScroll } from "@/lib/animation/revealOnScroll";


export function Hero() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  

  const btnRef1 = useRef<HTMLButtonElement>(null);
  const btnRef2 = useRef<HTMLButtonElement>(null);
  
  useGsapCornerWipe(btnRef2, {
    color: "rgba(0,0,0)", 
    corner: "bl",                  // من الركن السفلي اليمين
    duration: 0.2,
    ease: "power3.out",
    layer: "under",                // تحت المحتوى (النص فوق)
    // debug: true,
  });
   
  useGsapCornerWipe(btnRef1, {
    color: "rgba(255,255,255)", 
    corner: "bl",                  // من الركن السفلي اليمين
    duration: 0.2,
    ease: "power3.out",
    layer: "under",                // تحت المحتوى (النص فوق)
    // debug: true,
  });



   const titleRef = useRef<HTMLHeadingElement>(null);   // ✅ النوع صحيح
      const paraRef  = useRef<HTMLParagraphElement>(null); // ✅ النوع صحيح
      const paraRef2  = useRef<HTMLParagraphElement>(null); // ✅ النوع صحيح
      const paraRef3  = useRef<HTMLParagraphElement>(null); // ✅ النوع صحيح
    
      useLayoutEffect(() => {
        const stop1 = animateSplitOnScroll({
          ref: titleRef,
          mode: "chars",
          duration: 0.5,
          stagger: 0.03,
          from: { y: 40, opacity: 0, rotateX: -30 },
          to:   { y: 0,  opacity: 1, rotateX: 0 },
          start: "top 85%",
          once: true,
        });
    
        const stop2 = animateSplitOnScroll({
          ref: paraRef,
          mode: "lines",
          duration: 0.9,
          stagger: 0.06,
          from: { y: 24, opacity: 0 },
          to:   { y: 0,  opacity: 1 },
          start: "top 90%",
          once: true,
          delay: 0.5,
        });
    
        const stop3 = animateSplitOnScroll({
          ref: paraRef2,
          mode: "lines",
          duration: 1,
          stagger: 0.06,
          from: { y: 24, opacity: 0 },
          to:   { y: 0,  opacity: 1 },
          start: "top 90%",
          once: true,
          delay: 1,
        });
    
        const stop4 = animateSplitOnScroll({
          ref: paraRef3,
          mode: "lines",
          duration: 1.2,
          stagger: 0.06,
          from: { y: 24, opacity: 0 },
          to:   { y: 0,  opacity: 1 },
          start: "top 90%",
          once: true,
          delay:1.5,
        });
    
        return () => {
          stop1!();
          stop2!();
          stop3!();
          stop4!();
        };
      }, []);



     

  return (

  

    <section className=" relative w-screen h-full">

<div className=" absolute z-1 block md:hidden   right-10 top-5 ">
  <MobileNavbar/>
  </div>
                
              
     
    <HeroHighlight>
      
    <Navbar/>

      <div className=" w-screen h-[90vh]  grid grid-cols-1 place-items-center  lg:grid-cols-2
      md:place-items-center pt-10
      ">
      
   
       {/* left side */}
      <div className="flex flex-col p-10 justify-center  w-full items-center gap-7">
 
    
      <div className="flex items-center gap-2">
      <p   ref={titleRef} className="text-black text-4xl md:text-5xl dark:text-white font-light">Hello!</p>
      <motion.span
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="  px-4 font-bold text-neutral-700 dark:text-white max-w-4xl md:max-w-5xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
       
      
        <Highlight className="text-black dark:text-white  text-4xl md:text-5xl  h-screen">
        I'm{" "}Hamzah
        </Highlight>

       


      </motion.span>
            </div>
      
      <div className="flex items-center  justify-center gap-4">

      <span className="w-10 md:w-20 h-0.5 bg-black dark:bg-white rounded-full" />

      <TypingAnimatedText/>
      <Sparkles strokeWidth={1} className=" w-12 h-12 font-bold fill-black dark:fill-white  animate-bounce "/>
     </div>      
   
     <ScrambleMusnadText 
     duration={6}
     revealDelay={0.0002}
     
     finalText="Full-Stack JavaScript Developer specializing in web, mobile, and AI solutions. I build smart, scalable, and innovative applications that drive business growth and turn ideas into impactful products."
     
     className="text-black text-lg dark:text-white  max-w-lg"
     />


   {/* <p className="text-black dark:text-white  max-w-lg ">
   Full-Stack JavaScript Developer <b>specializing in web, mobile, and AI solutions. </b> I build smart, scalable, and innovative applications that drive business growth and turn ideas into impactful products.

Let’s build the future together.
   
   
   
   </p> */}


  {/* features */}
  <div className="hidden md:flex  flex-col   justify-center gap-4 pt-10">
  
  <span className="flex items-center gap-2">
    <Check className=" w-5   h-5  font-bold dark:fill-white"/>
    <p ref={paraRef} className="text-black font-bold dark:text-white" >
    Clean, maintainable, and scalable code for long-term growth and efficiency.
    </p>
  </span>


    <span className="flex items-center gap-2">
    <Check className=" w-5   h-5  font-boldk dark:fill-white"/>
    <p ref={paraRef2} className="text-black font-bold dark:text-white" >
    Modern, visually appealing interfaces that deliver a smooth user experience.
    </p>
    </span>
      <span className="flex items-center gap-2">
    <Check className=" w-5   h-5  font-bold  dark:fill-white"/>
    <p ref={paraRef3} className="text-black font-bold dark:text-white" >
    Fast delivery without compromising on quality or professionalism.
    </p>
    </span>
   

    </div>
    

{/* CTA buttons*/}
      <div className="hidden md:flex gap-4 pb-10">
      <Button ref={btnRef1}    variant="default" 
      className="buttonPrimary"
      >
        <p className=""  >Let's talk</p>
      </Button>
      <Button
      ref={btnRef2}
      variant="ghost" className="buttonSecondary rounded-none">
         <span className=" flex gap-1" >Download CV
         <DownloadIcon/></span>
      </Button>
      
      </div>

      


      </div>



        {/* right side */}

            <div className=" relative flex justify-end items-center">
             
             <motion.span 
             whileInView={"true"}
             initial={{ opacity: 0  ,scale:0.1}}
             animate={{ opacity: 1 ,scale:1}}
             transition={{ duration: 2.1 ,delay:0.1,ease:"easeInOut" }}
             className="absolute flex justify-center items-center 
             md:top-15 top-17 -left-2 md:-left-9 -z-10 
             w-[5rem] h-[5rem]  md:w-[7rem] md:h-[7rem] rounded-full bg-black " >
                <p className="text-white font-bold text-lg   text-center md:text-2xl">
          Hire me
                </p>

                <motion.span
                whileInView={"true"}
                initial={{ opacity: 0  ,scale:0.1}}
                animate={{ opacity: 1 ,scale:1}}
                transition={{ duration: 2.1 ,delay:0.1 ,ease:"easeInOut" }}
                 className=" absolute top-0 -right-3 md:w-9 w-7 h-7 md:h-9 bg-green-500 rounded-full animate-ping   "></motion.span>
                <motion.span
                whileInView={"true"}
                initial={{ opacity: 0  ,scale:0.1}}
                animate={{ opacity: 1 ,scale:1}}
                transition={{ duration: 2.1 ,delay:0.1 ,ease:"easeInOut" }}
                 className=" absolute top-1 -right-2 md:w-7 w-5 h-5 md:h-7 bg-green-400 rounded-full "></motion.span>
             </motion.span>
                
  

                {/* decoration */}
             <motion.div 
             whileInView={"true"}
             initial={{ opacity: 0  ,scale:0.1}}
             animate={{ opacity: 1 ,scale:1}}
             transition={{ duration: 2.5 ,delay:0.5 ,ease:"easeInOut" }}
             
             className="absolute  md:top-12 top-12 md:-left-5 left-5 -z-10 w-5 h-30 flex  gap-2 -rotate-45">
       <span className=" w-0.5 md:h-40 h-30   bg-black shadow-2xl shadow-white "/>
      
             </motion.div>
             <motion.div 
             whileInView={"true"}
             initial={{ opacity: 0  ,scale:0.1}}
             animate={{ opacity: 1 ,scale:1}}
             transition={{ duration: 2.5,delay:0.5 ,ease:"easeInOut" }}
             className="absolute  md:top-11 top-12   md:-left-5 left-4 -z-9 w-5 h-30 flex  gap-2 -rotate-45">
       <span className=" w-0.5 md:h-40 h-30   bg-white shadow-2xl shadow-black "/>
      
             </motion.div>
               
         


                   

             {/* <Image src="/images/photo.png" width={450} height={450} alt="My photo"
             className="object-cover "
             /> */}


         <motion.div
         whileInView={"true"}
         initial={{ opacity: 0  ,}}
         animate={{ opacity: 1 ,}}
         transition={{ duration: 2 ,delay:1 ,ease:"easeInOut" }}
         >
    <Image src="/illustrationsGifs/photo.gif" width={450} height={450} alt="My photo"
             unoptimized
             className="object-cover "
             loading="lazy" 
             />
              </motion.div>
            </div>

           

   {/* CTA buttons*/}
   <div className="flex md:hidden gap-4 pb-10">
      <Button variant="default" 
      className="buttonPrimary"
      >
        Let's talk
      </Button>
      <Button variant="ghost" className="buttonSecondary rounded-none">
        <span>Download CV</span>
         <DownloadIcon/>
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
            <span  className="w-[20%] h-0.5 bg-black dark:bg-white rounded-full"/>
          

             {/* social */}
            <div className="flex items-center gap-5">
                <span  className="flex gap-2 cursor-pointer " >
                  <IconBrandFacebook />
                  <p className="font-semibold cursor-pointer hover:text-amber-600">Facbook</p>
                </span>
                <span  className="flex gap-2 cursor-pointer" >
                  <IconBrandGithub/>
                  <p className="font-semibold cursor-pointer hover:text-amber-600">GitHub</p>
                </span>
                <span  className="flex gap-2 cursor-pointer" >
                  <IconBrandLinkedin/>
                  <p className="font-semibold cursor-pointer hover:text-amber-600">LinkedIn</p>
                </span>
            </div>

  
            <span  className="w-[40%] h-0.5 bg-black dark:bg-white rounded-full"/>
           
           {/* email */}
            <div className="flex items-center gap-5">
                <span  className="flex gap-2 cursor-pointer" >
                  <MailIcon/>
                  <p className="font-semibold cursor-pointer hover:text-amber-600">alhamza@gmail.com</p>
                </span>
              
            </div>

        </div>
    </section>
    
  );
}
