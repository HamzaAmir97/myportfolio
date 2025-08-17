import React from "react";
import { HeroScrollDemo } from "./herohighlit";
import { CardStack } from "./ui/card-stack";
import StackRotator, { StackSection } from '@/components/StackRotator';

const sections: StackSection[] = [
    {
      key: 'frontend',
      title: 'Frontend',
      blurb: 'واجهات سلسة، انتقالات GSAP، وتجربة مستخدم مدروسة.',
      techs: [
        { name: 'React', iconClass: 'devicon-react-original' },
        { name: 'Next.js', iconClass: 'devicon-nextjs-original' },
        { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
        { name: 'Tailwind', iconClass: 'devicon-tailwindcss-plain' },
        { name: 'GSAP', iconClass: 'devicon-javascript-plain' },
      ],
    },
    {
      key: 'backend',
      title: 'Backend',
      blurb: 'APIs موثوقة، أداء عالي، وقابلية للتوسع.',
      techs: [
        { name: 'Node.js', iconClass: 'devicon-nodejs-plain' },
        { name: 'NestJS', iconClass: 'devicon-nestjs-plain' },
        { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
        { name: 'MongoDB', iconClass: 'devicon-mongodb-plain' },
      ],
    },
    {
      key: 'ai',
      title: 'AI Development',
      blurb: 'نماذج ذكية، تكامل LLMs، وتدفقات MLOps عملية.',
      techs: [
        { name: 'Python', iconClass: 'devicon-python-plain' },
        { name: 'PyTorch', iconClass: 'devicon-pytorch-original' },
        { name: 'TensorFlow', iconClass: 'devicon-tensorflow-original' },
        { name: 'LangChain' },
        { name: 'OpenAI' },
      ],
    },
    {
      key: 'testing',
      title: 'Testing',
      blurb: 'إطلاق بثقة عبر اختبارات شاملة وآلية.',
      techs: [
        { name: 'Jest', iconClass: 'devicon-jest-plain' },
        { name: 'Cypress', iconClass: 'devicon-cypressio-plain' },
        { name: 'Playwright', iconClass: 'devicon-playwright-plain' },
        { name: 'Vitest', iconClass: 'devicon-vitejs-plain' },
      ],
    },
  ];
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

          <h1 className="text-3xl font-semibold text-black dark:text-white ">
          Behind me work <br />{" "}
        </h1>
        <StackRotator sections={sections}
        
        />
        {/* <HeroScrollDemo/> */}
        
        
        </div>
    </section>
  );
};

export default Aboutme;
