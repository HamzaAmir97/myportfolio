"use client";
import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { Compare } from "./ui/compare";
import { ContainerTextFlip } from "./ui/container-text-flip";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden   ">
      <ContainerScroll
        titleComponent={
          <>
          
            <h1 className="text-4xl font-semibold text-black dark:text-white mb-10">
              let's Make your Idea to Reality <br /> </h1>
            
              <div className="flex justify-center items-center gap-10  m-10 ">
              <span className="text-3xl md:text-[6rem] font-bold mt-1 leading-none">
                with
              </span>
            <ContainerTextFlip
      words={["better", "modern", "clean" ,"code"]}
     
    /> 
    <span className="text-3xl md:text-[6rem] font-bold mt-1 leading-none">
    solutions
              </span>  

</div>
          </>
        }
      >
        <div  className=" w-full m-0">
       <Compare
        firstImage="https://assets.aceternity.com/code-problem.png"
        secondImage="https://assets.aceternity.com/code-solution.png"
        firstImageClassName="object-cover object-left-top "
        secondImageClassname="object-cover object-left-top"
       
        slideMode="hover"
       >


       </Compare>
       </div>
      </ContainerScroll>
    </div>
  );
}
