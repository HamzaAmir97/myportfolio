// constants/tech.ts

/* ====== Types ====== */
export type TechItem = {
    key: string;
    label: string;
    alt: string;
    src: string;      // نستخدم public paths مثل /skills/xxx.png
    href?: string;
  };
  
  export type TechByCategory = {
    frontend: TechItem[];
    backend: TechItem[];
    ai: TechItem[];
    testing: TechItem[]; 
    mobile: TechItem[];
    uiux: TechItem[];
  };
  
  /* ====== DATA (Object of Objects) ====== */
  /* المسارات أدناه تطابق الأسماء داخل /public/skills كما في لقطة الشاشة */
  export const TECH: TechByCategory = {
    frontend: [
      { key: "react",   label: "React",    alt: "React",    src: "/skills/react.png",                         href: "https://react.dev/" },
      { key: "nextjs",  label: "Next.js",  alt: "Next.js",  src: "/skills/nextjs-icon-dark-background.png",   href: "https://nextjs.org/" },
      { key: "tailwind",label: "Tailwind", alt: "Tailwind", src: "/skills/tailwind.png",                    href: "https://tailwindcss.com/" },
      { key: "framer",  label: "Framer",   alt: "Framer",   src: "/skills/Framer.png",                        href: "https://www.framer.com/motion/" },
      { key: "GSAP",label: "GSAP", alt: "GSAP", src: "/skills/gsap.png",                    href: "https://tailwindcss.com/" },  
      { key: "router",  label: "React Router", alt: "React Router", src: "/skills/router.png",                href: "https://reactrouter.com/" },
      { key: "javascript", label: "JavaScript", alt: "JavaScript", src: "/skills/JavaScript (2).png",             href: "https://developer.mozilla.org/docs/Web/JavaScript" },
      { key: "typescript", label: "TypeScript", alt: "TypeScript", src: "/skills/TypeScript.png",             href: "https://www.typescriptlang.org/" },
      { key: "html", label: "HTML", alt: "HTML", src: "/skills/html5.png",             href: "https://developer.mozilla.org/docs/Web/HTML" },
      { key: "css", label: "CSS", alt: "CSS", src: "/skills/css3.png",             href: "https://developer.mozilla.org/docs/Web/CSS" },
      { key: "bootstrap", label: "Bootstrap", alt: "Bootstrap", src: "/skills/bootstrap.png",             href: "https://getbootstrap.com/" },
      { key: "shadcn", label: "Shadcn", alt: "Shadcn", src: "/skills/shadcn.png",             href: "https://shadcn.com/" },
      { key: "threejs", label: "Three.js", alt: "Three.js", src: "/skills/three.png",             href: "https://threejs.org/" },
    ],
  
    backend: [
      { key: "nodejs",    label: "Node.js",    alt: "Node.js",    src: "/skills/Nodejs.png",       href: "https://nodejs.org/" },
      { key: "express",   label: "Express",    alt: "Express.js", src: "/skills/express.png",      href: "https://expressjs.com/" },
      { key: "appwrite",  label: "Appwrite",   alt: "Appwrite",   src: "/skills/Appwrite.png",     href: "https://appwrite.io/" },
      { key: "inngest",   label: "Inngest",    alt: "Inngest",    src: "/skills/inngest.png",      href: "https://www.inngest.com/" },
      { key: "supabase",  label: "Supabase",   alt: "Supabase",   src: "/skills/supabase.png",   href: "https://supabase.com/" },
      { key: "prisma",    label: "Prisma",     alt: "Prisma",     src: "/skills/prisma-icon-sm.png", href: "https://www.prisma.io/" },
      { key: "postgresql",label: "PostgreSQL", alt: "PostgreSQL", src: "/skills/postSql.png",      href: "https://www.postgresql.org/" },
      { key: "mongodb",   label: "MongoDB",    alt: "MongoDB",    src: "/skills/mongodb.png",      href: "https://www.mongodb.com/" },
      { key: "tanstack ",   label: "TanStack",    alt: "TanStack",   src: "/skills/tanstack.png",   href: "https://supabase.com/" },
      { key: "trpc ",   label: "TRPC",    alt: "TRPC",   src: "/skills/rtpc.png",   href: "https://supabase.com/" },
    ],
  
    ai: [
      { key: "python",  label: "Python",        alt: "Python",        src: "/skills/python.png",               href: "https://www.python.org/" },
      { key: "jupyter", label: "Jupyter",       alt: "Jupyter",       src: "/skills/jupiter.png",             href: "https://jupyter.org/" },
      { key: "gemini",  label: "Google Gemini", alt: "Google Gemini", src: "/skills/Google-Gemini-Logo.png",  href: "https://gemini.google.com/" },
      {key: "openai",  label: "OpenAI",         alt: "OpenAI",        src: "/skills/openai.png",          href: "https://openai.com/" },
    ],
  
    testing: [
      { key: "jest", label: "Jest", alt: "Jest", src: "/skills/jest.png", href: "https://jestjs.io/" },
      { key: "cypress", label: "Cypress", alt: "Cypress", src: "/skills/cypress.png", href: "https://www.cypress.io/" },
      { key: "postman", label: "Postman", alt: "Postman", src: "/skills/postman.png", href: "https://playwright.dev/" },
      // فاضي الآن (ما شفت jest/cypress/playwright في المجلد)
      // مثال عند الإضافة: { key: "jest", label: "Jest", alt: "Jest", src: "/skills/jest.png", href: "https://jestjs.io/" },
    ],
    mobile: [
      { key: "react-native", label: "React Native", alt: "React Native", src: "/skills/react-native.png", href: "https://reactnative.dev/" },
      { key: "expo", label: "Expo", alt: "Expo", src: "/skills/expo.png", href: "https://expo.dev/" },
      { key: "nativewind", label: "Nativewind", alt: "Nativewind", src: "/skills/nativewind.png", href: "https://nativewind.dev/" },
    ],
    uiux: [
      { key: "figma", label: "Figma", alt: "Figma", src: "/skills/figma.png", href: "https://figma.com/" },
      { key: "adobe-xd", label: "Adobe XD", alt: "Adobe XD", src: "/skills/xd.png", href: "https://adobe.com/xd" },
      {key: "photoshop", label: "Photoshop", alt: "Photoshop", src: "/skills/photoshop.png", href: "https://adobe.com/xd" },
      {key: "illustrator", label: "Illustrator", alt: "Illustrator", src: "/skills/illusrator.png", href: "https://adobe.com/xd" },
    ],
  };
  
  /* اختياري: ماب للوصول المباشر بأي key عبر كل الأقسام */
  export const TECH_MAP = Object.fromEntries(
    Object.values(TECH).flat().map((t) => [t.key, t])
  ) as Record<string, TechItem>;
  