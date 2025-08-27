import React from 'react'


import { ArrowUpRight } from 'lucide-react'

const Navbar = () => {
  return (
    <div className=" hidden md:flex items-center justify-between  ">
     
     <div   className='  px-10'>
       <span className='
       buttonSecondary text-4xl
     '>
        It's me
     </span>
     </div>

     <div className="flex items-center gap-4 px-10">
  
  
     <span className="buttonSecondary2 px-2">
        
         <span className='flex flex-col  '>
         <span className='flex items-center justify-between gap-5'>
         <p className=''>My Projects</p>
         <ArrowUpRight  className='self-end'/>
         </span>
         <p className='text-xs'>See All my nice projects I have created</p>
         </span>
         
      </span>


      <span className="buttonSecondary2   px-2 ">
         
         <span className='flex flex-col '>
          <span className='flex items-center justify-between gap-5'>
         <p className=''>About me</p>
         <ArrowUpRight/>
         </span>
         <p className='text-xs'>Learn more about me</p>
         </span>
          
      </span>

      <span className="buttonSecondary2  px-2">
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