"use client";
import BrandIconsGrid from "@/components/companies";
import { Hero } from "@/components/hero";

import ContactSection from "@/components/contact";

import HorizontalScroll from "@/components/HorizontalScroll";
import Services from "@/components/Services";
import { AchievementsParallax } from "@/components/ui/hero-parallax";
import { Timeline } from "@/components/ui/timeline";
import { products} from "@/lib/constants";
import ExperienceTimeline from "@/components/shared/ExperienceTimeline";
import { ExperienceItem, StatItem } from "@/types";
import { ClipboardList, Globe2, Settings, Users } from "lucide-react";
import StatsStrip from "@/components/StatsStrip";
import ClientFeedbackCarousel from "@/components/ClientFeedbackCarousel";
import SkillsWall from "@/components/SkillsViteGrid";
import { WorldMapSection } from "@/components/worldMapSection";
import PinnedDualStack from "@/components/PinnedDualStack";
import { items } from "@/constants/expirence";
import { data, stats } from "@/constants/achivments";








 
 



export default function Home() {
  return (
     <main className="overflow-x-hidden">
       <Hero/>
      <Services/>
  


     {/* desktop */}
       <div  className="hidden md:block">
      <SkillsWall rows={7} cols={12} />
        </div> 

         {/* mobile */}
       <div  className="block md:hidden">
      <SkillsWall rows={7} cols={8} />
        </div>    

       {/* <Aboutme/> */}


       
    
   
     <HorizontalScroll/>
     {/* projects */}
     
    <PinnedDualStack/>

     <BrandIconsGrid/>
     
     <AchievementsParallax products={products}  />
     <ExperienceTimeline items={items} />

 
  


     <Timeline data={data}/>
     <ClientFeedbackCarousel/>
     <WorldMapSection/>
    <StatsStrip items={stats} />
     <ContactSection/>
     
    {/* <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
     
   
     
       <InfiniteMovingCards
       items={testimonials}
     direction="left"
     speed="normal"
    />
  </div> 
      */}
        </main>

  );
}
