import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { XCircleIcon, XIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className=" flex  flex-col gap-2 px-10 py-10 bg-black">
     <XIcon className='text-white h-10 w-10 rotate-10'/>
     <span className='h-0.5 w-full bg-gray-500 my-2'/>

        <div className=" flex flex-col md:flex-row gap-5 items-center justify-between">
             
             <div className="flex items-center justify-between gap-10 cursor-pointer">
                 <a href="https://www.facebook.com/alhamza2013" target="_blank" rel="noopener noreferrer">
                <span className='flex items-center gap-2 group'>
                   <IconBrandFacebook className='text-white group-hover:scale-110 transition-all'/>
                   <p className='text-white group-hover:text-amber-500'>Facebook</p>

                 </span>
                 </a>
                 <a href="https://github.com/HamzaAmir97" target="_blank" rel="noopener noreferrer">
                 <span className='flex items-center gap-2 group'>
                   <IconBrandGithub className='text-white group-hover:scale-110 transition-all'/>
                   <p className='text-white group-hover:text-amber-500'>github</p>

                 </span>
                   </a>
                 <a href="https://www.linkedin.com/in/hamzahaamir/" target="_blank" rel="noopener noreferrer">
                 <span className='flex items-center gap-2 group'>
                   <IconBrandLinkedin className='text-white group-hover:scale-110 transition-all'/>
                   <p className='text-white group-hover:text-amber-500'>linkedin</p>

                 </span>
                 </a>
             </div>
         

         <div className="">
              <p className='text-white'>© 2025 Hamzah Amir. All rights reserved.</p>
         </div>



        </div>
    </footer>
  )
}

export default Footer