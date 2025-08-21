import React from 'react'


import { ArrowUpRight } from 'lucide-react'

const Navbar = () => {
  return (
    <div className=" flex items-center justify-between  ">
     
     <div   className='  px-10'>
       <span className='
       buttonSecondary text-4xl
     '>
        It's me
     </span>
     </div>

     <div className="flex items-center gap-4 px-10">
  
     <span className="buttonSecondary2  px-2     flex justify-between items-center gap-2">
        
         <span className='flex flex-col  '>
         <p className=''>My Projects</p>
         <p className='text-xs'>See All my nice projects I have created</p>
         </span>
         <ArrowUpRight/>
      </span>


      <span className="buttonSecondary2 px-2  flex justify-between items-center gap-2">
         
         <span className='flex flex-col '>
         <p className=''>About me</p>
         <p className='text-xs'>Learn more about me</p>
         </span>
          <ArrowUpRight/>
      </span>
      <span className="buttonSecondary2 px-2 py-2 flex justify-between items-center gap-2">
         <span className='flex flex-col'>
         <p className=''>Contact me</p>
         <p className='text-xs'>Get in touch with me</p>
         </span>
        <ArrowUpRight/>
      </span>
     </div>

    </div>
  )
}

export default Navbar