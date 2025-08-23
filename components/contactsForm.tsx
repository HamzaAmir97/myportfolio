"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
 

const services = [
    {   id:1,
        title: "Web Development",
        description: "We create custom web applications that are fast, secure, and user-friendly.",
    },
    {
        id:2,
        title: "Mobile Development",
        description: "We build mobile apps for iOS and Android that are fast, secure, and user-friendly.",
    },
    {
        id:3,
        title: "UI/UX Design",
        description: "We create custom web applications that are fast, secure, and user-friendly.",
    },
    {
        id:4,
        title: "Ai Development",
        description: "We create custom web applications that are fast, secure, and user-friendly.",
    },
]


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Email: z.string().email(),
})



const ContactsForm = () => {


     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      Email: "",
            },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

 
return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      


       <div className="flex  gap-4">
      
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl className="border-b-2 border-black">
                <Input placeholder="Hamzah ..." {...field} 
                className=" rounded-none border-none  "
                
                />
              </FormControl>
              <FormDescription>
               Write your full name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="border-b-2 border-black">
                <Input 
                className=" rounded-none border-none  "
                placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
               Write your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

                 </div> 

                 <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                
                className=" rounded-none border-none  "
                placeholder="hello i want to work with you" {...field} />
              </FormControl>
              <FormDescription>
               Write your message
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         
         <p>what is in your mind?</p>
        
        <div className="flex flex-wrap gap-4">
          {services.map((service) => (
           
           <Button key={service.id}
             
           className="
               w-[10rem]
         h-[3.5rem]
         rounded-full
         bg-white
         text-black
         border-1
         border-gray-200
         hover:bg-gray-200
         hover:text-black
         transition-all duration-300 ease-in-out
         hover:shadow-xl
         hover:shadow-amber-700
           "
           >{service.title}</Button>
          ))}
          </div>


        <Button type="submit"
        className="buttonPrimary
         self-center
        "
        >Submit</Button>
        <p className="text-gray-500 dark:text-gray-100">we will get back to you as soon as possible</p>
     
       
      </form>
    </Form>
  )
}

export default ContactsForm