import React from 'react'
import { HeroScrollDemo } from './herohighlit'

const Aboutme = () => {
  return (
    <section className='w-screen h-auto
   grid grid-cols-1 md:grid-cols-2
   place-items-center
    '>
       


          <div className='flex flex-col items-start justify-start'>
             <h1 className='text-3xl font-semibold text-black dark:text-white mb-10'>
             About me <br /> </h1>
              <p className='text-lg text-black dark:text-white mb-10'>
              let's Make your Idea to Reality <br /> </p>
            </div>


         
            <div>
            <HeroScrollDemo/>
              </div>

         
        
    </section>
  )
}

export default Aboutme