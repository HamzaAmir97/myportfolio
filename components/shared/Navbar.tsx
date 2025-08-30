"use client";

import React, { useRef } from 'react'


import { ArrowUpRight } from 'lucide-react'
import { useGsapCornerWipe } from '@/hooks/useGsapCornerWipe';
import { useTheme } from 'next-themes';

const Navbar = () => {
   
  const isDarkMode = useTheme().theme === "dark";
   const spanRef = useRef<HTMLAnchorElement>(null);

  useGsapCornerWipe(spanRef, {
    color: `${isDarkMode ? "rgba(255,255,255)" : "rgba(0,0,0)"}`,
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });
   const spanRef1 = useRef<HTMLAnchorElement>(null);

  useGsapCornerWipe(spanRef1, {
    color: `${isDarkMode ? "rgba(255,255,255)" : "rgba(0,0,0)"}`,
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });
   const spanRef2 = useRef<HTMLAnchorElement>(null);

  useGsapCornerWipe(spanRef2, {
    color: `${isDarkMode ? "rgba(255,255,255)" : "rgba(0,0,0)"}`,
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });
   const spanRef3 = useRef<HTMLAnchorElement>(null);

  useGsapCornerWipe(spanRef3, {
    color: `${isDarkMode ? "rgba(255,255,255)" : "rgba(0,0,0)"}`,
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });


  return (
    <div className=" hidden  md:flex items-center justify-between  ">
     
     <div   className='  px-10'>
       <span ref={spanRef} className={`
       buttonSecondary2 text-4xl
     `}>
       <p>It's me</p>
     </span>
     </div>

     <div className="flex items-center gap-4 px-10">
  
  
     <span className={`buttonSecondary2 px-2`}>
        
         <span ref={spanRef1} className='flex flex-col  '>
         <span className='flex items-center justify-between gap-5'>
         <p className=''>My Projects</p>
         <ArrowUpRight  className='self-end'/>
         </span>
         <p className='text-xs'>See All my nice projects I have created</p>
         </span>
         
      </span>


      <span ref={spanRef2} className={`buttonSecondary2   px-2 `}>
         
         <span className='flex flex-col '>
          <span className='flex items-center justify-between gap-5'>
         <p className=''>About me</p>
         <ArrowUpRight/>
         </span>
         <p className='text-xs'>Learn more about me</p>
         </span>
          
      </span>

      <span ref={spanRef3} className={`buttonSecondary2  px-2`}>
         <span className='flex flex-col'>
         <span className='flex items-center justify-between gap-5'>
         <p className=''>Contact me</p>
         <ArrowUpRight/>
         </span>
         <p className='text-xs'>Get in touch with me</p>
         </span>
        
      </span>
     </div>

    </div>
  )
}

export default Navbar