import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ArrowUpRight } from "lucide-react";
  
function MobileNavbar() {
  return (
    <div>
      <div className=" flex flex-row-reverse w-screen px-5 justify-between items-center">
      <Sheet >
    <SheetTrigger asChild className="  group  cursor-pointer dark:bg-white rounded-full">
       
          <Menu className="h-12 w-12 hover:text-amber-600    cursor-pointer" />
      
        </SheetTrigger>
       
        <SheetContent className="w-screen h-screen
         flex flex-col  gap-20 items-center
        bg-white dark:bg-black p-10">
        <SheetHeader>
          <SheetTitle className="text-4xl uppercase" >My Portfolio</SheetTitle>
          <SheetDescription>
           
          </SheetDescription>
        </SheetHeader>
            
        <div className="flex flex-col items-center gap-20 px-10">
  
  
  <span className="border-t-3 border-gray-500 dark:border-gray-500
       w-full
       h-[3.5rem]
       cursor-pointer
       hover:bg-black dark:hover:bg-white 
       hover:text-white 
       transition-all duration-300 ease-in-out
       font-bold   px-2">
     
      <span className='flex flex-col  '>
      <span className='flex items-center justify-between gap-5'>
      <p className='text-2xl'>My Projects</p>
      <ArrowUpRight  className='self-end'/>
      </span>
      <p className='text-xs'>See All my nice projects I have created</p>
      </span>
      
   </span>


   <span className="border-t-3 border-gray-500 dark:border-gray-500
       w-full
       h-[3.5rem]
       cursor-pointer
       hover:bg-black dark:hover:bg-white 
       hover:text-white 
       transition-all duration-300 ease-in-out
       font-bold   px-2 ">
      
      <span className='flex flex-col '>
       <span className='flex items-center justify-between gap-5'>
      <p className='text-2xl'>About me</p>
      <ArrowUpRight/>
      </span>
      <p className='text-xs'>Learn more about me</p>
      </span>
       
   </span>

   <span className="border-t-3 border-gray-500 dark:border-gray-500
       w-full
       h-[3.5rem]
       cursor-pointer
       hover:bg-black dark:hover:bg-white 
       hover:text-white 
       transition-all duration-300 ease-in-out
       font-bold   px-2">
      <span className='flex flex-col'>
      <span className='flex items-center justify-between gap-5'>
      <p className='text-2xl'>Contact me</p>
      <ArrowUpRight/>
      </span>
      <p className='text-xs'>Get in touch with me</p>
      </span>
     
   </span>
  </div>

        </SheetContent>
        </Sheet>
            <div className="  px-10">
          <span
            className="
       buttonSecondary text-4xl
     "
          >
            It's me
          </span>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
