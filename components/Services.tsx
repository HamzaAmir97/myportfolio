import React from 'react'

const Services = () => {
  return (
    <section className="w-screen h-auto py-20 flex flex-col px-10">
        
        {/* heading */}
        <div className="flex justify-between">
         

           {/* title */}
           <div className="flex  flex-col gap-2 ">


            <div className="flex  justify-center items-center gap-2">
           <span className="w-5 h-0.5 bg-black dark:bg-white"/>
           <p className="text-xl font-semibold text-black dark:text-white ">
             My Services ?
             </p>
             </div>


               <h1 className='text-4xl font-bold text-black dark:text-white'>What I offer</h1>
               
         
        </div>
          

          {/* Cta */}
          <div className="flex items-center gap-4">
        
          
          </div>

        </div>
        
        

     {/* services */}


        
        </section>
  )
}

export default Services