import React from 'react'
import ContactsForm from './contactsForm'


const ContactsUs = () => {
  return (
    <section className="w-full h-full flex flex-col  gap-2 antialiased px-10 py-20 ">
         
         {/* header */}
    <div className="w-full h-[10rem] flex flex-col gap-2  items-center justify-center">
        <span className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-500 dark:text-gray-100 px-2">Say Hi!</h1>
        <h1 className="text-4xl font-bold "> {"  "}and tell me about </h1>
         </span>

         <span className="flex items-center justify-center ">
        <h1 className="text-4xl font-bold ">your project</h1>
         </span>

        <p className="text-gray-500 dark:text-gray-100">Have a nice works? reach out  and let's create something amazing together.</p>
    </div> 
     



         {/* form */}
         <div className="w-full h-auto flex flex-col gap-2 py-20 items-center justify-center">
        <ContactsForm/>
        </div>


         {/* footer */}

  


    </section>
  )
}

export default ContactsUs

