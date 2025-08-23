import React from "react";
import { Marquee } from "./Marquee";
import { Sparkle } from "lucide-react";

const BrandIconsGrid = () => {
  return (
 

    
      <div className="w-screen bg-black dark:bg-transparent -rotate-2 py-2">

      <Marquee direction="right" >
        <div className="text-center flex items-center   gap-20 justify-center w-screen ml-0  mr-0  py-5  ">

          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">Web Development</h2>
          </span>
          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">Mobile App Development</h2>
          </span>
          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">UI/UX Design</h2>
          </span>
          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">AI Development</h2>
          </span>
        
          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">Problem Solving</h2>
          </span>
          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">Clean Coding</h2>
          </span>
        
          <span className="flex items-center  justify-center gap-2 ">
           <Sparkle className="text-white"/>
           <h2 className="font-bold text-lg text-white dark:text-white">best practices</h2>
          </span>
        
      
         
          
        </div>
        </Marquee>


      </div>

      


    
  );
};

export default BrandIconsGrid;
