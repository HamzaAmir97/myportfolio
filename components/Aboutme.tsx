import React from "react";
import { HeroScrollDemo } from "./herohighlit";
import { CardStack } from "./ui/card-stack";

const Aboutme = () => {
  return (
    <section
      className="w-screen h-auto
   grid grid-cols-1 md:grid-cols-2
   place-items-center
    "
    >


        {/* about me */}
      <div className="bg-red-500 h-[40rem]  flex flex-col items-start justify-start p-10">
        <h1 className="text-3xl font-semibold text-black dark:text-white mb-10">
          About me <br />{" "}
        </h1>
        <p className="text-lg text-black dark:text-white mb-10">
          
I’m a Full-Stack JavaScript Developer focused on web, mobile, and AI solutions. I design and build clean, scalable, and intelligent applications that blend creativity with technology. Skilled in MERN, Next.js, React Native, and Cloud/DevOps, I enjoy transforming challenges into real-world solutions.

Always learning, always building — let’s create innovation together..{" "}
          <br />{" "}
        </p>
      </div>




     {/*technologies used */}

      <div className=" bg-red-500 h-[40rem]  w-full flex flex-col items-center p-10">

          <h1 className="text-3xl font-semibold text-black dark:text-white mb-10">
          Behind me work <br />{" "}
        </h1>
        {/* <HeroScrollDemo/> */}
        
        
        </div>
    </section>
  );
};

export default Aboutme;
