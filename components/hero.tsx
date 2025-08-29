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
      <p className="text-black text-4xl md:text-5xl dark:text-white font-light">Hello!</p>
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
   

   <p className="text-black dark:text-white  max-w-lg ">
   Full-Stack JavaScript Developer <b>specializing in web, mobile, and AI solutions. </b> I build smart, scalable, and innovative applications that drive business growth and turn ideas into impactful products.

Let’s build the future together.
   
   
   
   </p>


  {/* features */}
  <div className="hidden md:flex  flex-col   justify-center gap-4 pt-10">
  
  <span className="flex items-center gap-2">
    <Check className=" w-5   h-5  font-bold dark:fill-white"/>
    <p className="text-black font-bold dark:text-white" >
    Clean, maintainable, and scalable code for long-term growth and efficiency.
    </p>
  </span>


    <span className="flex items-center gap-2">
    <Check className=" w-5   h-5  font-boldk dark:fill-white"/>
    <p className="text-black font-bold dark:text-white" >
    Modern, visually appealing interfaces that deliver a smooth user experience.
    </p>
    </span>
      <span className="flex items-center gap-2">
    <Check className=" w-5   h-5  font-bold  dark:fill-white"/>
    <p className="text-black font-bold dark:text-white" >
    Fast delivery without compromising on quality or professionalism.
    </p>
    </span>
   

    </div>
    

{/* CTA buttons*/}
      <div className="hidden md:flex gap-4 pb-10">
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

      


      </div>



        {/* right side */}

            <div className=" relative flex justify-end items-center">
             
             <span className="absolute flex justify-center items-center 
             md:top-15 top-17 -left-2 md:-left-9 -z-10 
             w-[5rem] h-[5rem]  md:w-[7rem] md:h-[7rem] rounded-full bg-black " >
                <p className="text-white font-bold text-lg   text-center md:text-2xl">
          Hire me
                </p>

                <span className=" absolute top-0 -right-3 md:w-9 w-7 h-7 md:h-9 bg-green-500 rounded-full animate-ping   "></span>
                <span className=" absolute top-1 -right-2 md:w-7 w-5 h-5 md:h-7 bg-green-400 rounded-full "></span>
             </span>
                
  

                {/* decoration */}
             <div className="absolute  md:top-12 top-12 md:-left-5 left-5 -z-10 w-5 h-30 flex  gap-2 -rotate-45">
       <span className=" w-0.5 md:h-40 h-30   bg-black shadow-2xl shadow-white "/>
      
             </div>
             <div className="absolute  md:top-11 top-12   md:-left-5 left-4 -z-9 w-5 h-30 flex  gap-2 -rotate-45">
       <span className=" w-0.5 md:h-40 h-30   bg-white shadow-2xl shadow-black "/>
      
             </div>
               
         


                   

             {/* <Image src="/images/photo.png" width={450} height={450} alt="My photo"
             className="object-cover "
             /> */}

<Image src="/illustrationsGifs/photo.gif" width={450} height={450} alt="My photo"
             unoptimized
             className="object-cover "
             loading="lazy" 
             />

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
