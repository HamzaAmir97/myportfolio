import React from 'react'
import { Button } from './ui/button'
import { ArrowDown, ArrowRight, BotMessageSquare, Laptop2Icon, PaletteIcon, PhoneIcon, SmartphoneIcon,} from 'lucide-react'
import Image from 'next/image'
import { BackgroundGradient } from './ui/background-gradient'
import { GlowingEffect } from './ui/glowing-effect'

const Services = () => {
  return (
    <section className=" relative w-screen h-screen py-20 flex flex-col px-10">
        
        {/* heading */}
        <div className="flex justify-between py-10">
         

           {/* title */}
           <div className="flex  flex-col gap-2 ">


            <div className="flex  justify-start items-center gap-2">
           <span className="w-5 h-0.5 bg-black dark:bg-white"/>
           <p className="text-xs  uppercase font-semibold text-black dark:text-white ">
             My Services ?
             </p>
             </div>


               <h1 className='text-4xl uppercase font-bold text-black dark:text-white'>What I offer</h1>
               
         
        </div>
          

          {/* Cta */}
          <div className="flex items-center gap-10">
             <p>This is some of my services i offer to my clients</p>
             <Button className='buttonPrimary'>All services</Button>
          </div>

        </div>
        
        

     {/* services */}

     <div className='flex flex-col items-center justify-center md:flex-row gap-2'>
       
      
    
       {/* services */}
       <div className='flex flex-row  items-center justify-between  gap-10'>

                {/* scroll button */} 
     <div className=' h-[20rem] flex flex-col items-center justify-center     gap-5'>
     <p className='text-black  font-semibold dark:text-white -rotate-90 py-5'>Scroll down</p>
     <span className='w-0.5 h-15 bg-black dark:bg-black '/>
          
         
            <a href="#skills">
               <Button className='w-15 h-15 bg-black dark:bg-black  rounded-full 
               cursor-pointer hover:scale-110 
               hover:shadow-xl
               hover:shadow-amber-700
               hover:bg-white dark:hover:bg-black 
               hover:text-black dark:hover:text-white 
               transition-all duration-300 ease-in-out animate-bounce'><ArrowDown/></Button>
         </a>
       </div>

              {/* service1 */}

              <BackgroundGradient>
              <div className='w-[20rem] h-[20rem]  p-10 hover:rounded-xl border-black dark:border-white' >
            
            <div className="flex flex-col items-start gap-2">
                <Laptop2Icon className='w-10 h-15 text-white'/>
                <h1 className='text-white dark:text-white font-bold text-3xl'>Web Development</h1>
              <span className="  w-0.5 h-15 bg-white dark:bg-white "/>
               
               <span> <p className=' flex items-center gap-2 text-white dark:text-white cursor-pointer'>learn more
                     <ArrowRight/>
               </p>
               </span>
            </div>

              </div>
              </BackgroundGradient>
            
            
              {/* service2 */}
              <GlowingEffect/>
              <div className='w-[20rem] h-[20rem] border-2 p-10  border-black hover:border-amber-600  dark:hover:border-amber-600 dark:border-white' >

              <div className="flex flex-col items-start gap-2">
                <SmartphoneIcon className='w-10 h-15'/>
                <h1 className='text-black dark:text-white font-bold text-3xl'>Mobile Development</h1>
              <span className="  w-0.5 h-15 bg-black dark:bg-black "/>
               
               <span> <p className=' flex items-center gap-2 text-black dark:text-white cursor-pointer'>learn more
                     <ArrowRight/>
               </p>
               </span>
            </div>
              </div>

              {/* service3 */}
              <div className='w-[20rem] h-[20rem] border-2 p-10 border-black hover:border-amber-600  dark:hover:border-amber-600 dark:border-white' >
    
              <div className="flex flex-col items-start gap-2">
              <BotMessageSquare className='w-10 h-15'/>
                <h1 className='text-black dark:text-white font-bold text-3xl'>AI  <br/> Development</h1>
              <span className="  w-0.5 h-15 bg-black dark:bg-black "/>
               
               <span> <p className=' flex items-center gap-2 text-black dark:text-white hover:text-amber-600 dark:hover:text-amber-600 cursor-pointer'>learn more
                     <ArrowRight/>
               </p>
               </span>
            </div>
              </div>

            {/* service4 */}
            <div className='w-[20rem] h-[20rem] border-2 p-10 border-black hover:border-amber-600  dark:hover:border-amber-600 dark:border-white' >
    
            <div className="flex flex-col items-start gap-2">
            <PaletteIcon className='w-10 h-15'/>
              <h1 className='text-black dark:text-white font-bold text-3xl'>UI/UX  <br/> Design</h1>
            <span className="  w-0.5 h-15 bg-black dark:bg-black "/>
             
             <span> <p className=' flex items-center gap-2 text-black dark:text-white hover:text-amber-600 dark:hover:text-amber-600 cursor-pointer'>learn more
                   <ArrowRight/>
             </p>
             </span>
          </div>
            </div>

              </div>




     </div>


     {/* <Image src="/images/dotes.png" width={500} height={500} alt="dotted background"
      className='w-[100%] h-[30rem]  absolute bottom-0 left-0 opacity-5 -z-2'
     /> */}
        
        </section>
  )
}

export default Services