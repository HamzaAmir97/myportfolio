// constants/tech.ts

/* ====== Types ====== */
export type TechItem = {
  key: string;   // مُعرّف ثابت للاستخدام في React key
  label: string;
  alt: string;
  src: string;   // public path مثل /skills/xxx.png
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

/* ====== DATA ====== */
// ملاحظة: كل keys بصيغة lowercase-kebab وبدون مسافات زائدة
export const TECH: TechByCategory = {
  frontend: [
    { key: "react",        label: "React",         alt: "React",         src: "/skills/react.png",                         href: "https://react.dev/" },
    { key: "nextjs",       label: "Next.js",       alt: "Next.js",       src: "/skills/nextjs-icon-dark-background.png",   href: "https://nextjs.org/" },
    { key: "tailwind",     label: "Tailwind",      alt: "Tailwind",      src: "/skills/tailwind.png",                      href: "https://tailwindcss.com/" },
    { key: "framer",       label: "Framer Motion", alt: "Framer Motion", src: "/skills/Framer.png",                        href: "https://www.framer.com/motion/" },
    { key: "gsap",         label: "GSAP",          alt: "GSAP",          src: "/skills/gsap.png",                          href: "https://greensock.com/gsap/" },
    { key: "react-router", label: "React Router",  alt: "React Router",  src: "/skills/router.png",                        href: "https://reactrouter.com/" },
    { key: "javascript",   label: "JavaScript",    alt: "JavaScript",    src: "/skills/JavaScript (2).png",                href: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { key: "typescript",   label: "TypeScript",    alt: "TypeScript",    src: "/skills/TypeScript.png",                    href: "https://www.typescriptlang.org/" },
    { key: "html",         label: "HTML",          alt: "HTML",          src: "/skills/html5.png",                         href: "https://developer.mozilla.org/docs/Web/HTML" },
    { key: "css",          label: "CSS",           alt: "CSS",           src: "/skills/css3.png",                          href: "https://developer.mozilla.org/docs/Web/CSS" },
    { key: "bootstrap",    label: "Bootstrap",     alt: "Bootstrap",     src: "/skills/bootstrap.png",                     href: "https://getbootstrap.com/" },
    { key: "shadcn",       label: "shadcn/ui",     alt: "shadcn/ui",     src: "/skills/shadcn.png",                        href: "https://ui.shadcn.com/" },
    { key: "threejs",      label: "Three.js",      alt: "Three.js",      src: "/skills/three.png",                         href: "https://threejs.org/" },
  ],

  backend: [
    { key: "nodejs",     label: "Node.js",     alt: "Node.js",     src: "/skills/Nodejs.png",          href: "https://nodejs.org/" },
    { key: "express",    label: "Express",     alt: "Express.js",  src: "/skills/express.png",         href: "https://expressjs.com/" },
    { key: "appwrite",   label: "Appwrite",    alt: "Appwrite",    src: "/skills/Appwrite.png",        href: "https://appwrite.io/" },
    { key: "inngest",    label: "Inngest",     alt: "Inngest",     src: "/skills/inngest.png",         href: "https://www.inngest.com/" },
    { key: "supabase",   label: "Supabase",    alt: "Supabase",    src: "/skills/supabase.png",        href: "https://supabase.com/" },
    { key: "prisma",     label: "Prisma",      alt: "Prisma",      src: "/skills/prisma-icon-sm.png",  href: "https://www.prisma.io/" },
    { key: "postgresql", label: "PostgreSQL",  alt: "PostgreSQL",  src: "/skills/postSql.png",         href: "https://www.postgresql.org/" },
    { key: "mongodb",    label: "MongoDB",     alt: "MongoDB",     src: "/skills/mongodb.png",         href: "https://www.mongodb.com/" },
    { key: "tanstack",   label: "TanStack",    alt: "TanStack",    src: "/skills/tanstack.png",        href: "https://tanstack.com/" },
    { key: "trpc",       label: "tRPC",        alt: "tRPC",        src: "/skills/trpc.png",            href: "https://trpc.io/" },
  ],

  ai: [
    { key: "python",   label: "Python",         alt: "Python",         src: "/skills/python.png",                href: "https://www.python.org/" },
    { key: "jupyter",  label: "Jupyter",        alt: "Jupyter",        src: "/skills/jupyter.png",               href: "https://jupyter.org/" },
    { key: "gemini",   label: "Google Gemini",  alt: "Google Gemini",  src: "/skills/Google-Gemini-Logo.png",    href: "https://gemini.google.com/" },
    { key: "openai",   label: "OpenAI",         alt: "OpenAI",         src: "/skills/openai.png",                href: "https://openai.com/" },
  ],

  testing: [
    { key: "jest",     label: "Jest",     alt: "Jest",     src: "/skills/jest.png",     href: "https://jestjs.io/" },
    { key: "cypress",  label: "Cypress",  alt: "Cypress",  src: "/skills/cypress.png",  href: "https://www.cypress.io/" },
    { key: "postman",  label: "Postman",  alt: "Postman",  src: "/skills/postman.png",  href: "https://www.postman.com/" },
  ],

  mobile: [
    { key: "react-native", label: "React Native", alt: "React Native", src: "/skills/react-native.png", href: "https://reactnative.dev/" },
    { key: "expo",         label: "Expo",         alt: "Expo",         src: "/skills/expo.png",         href: "https://expo.dev/" },
    { key: "nativewind",   label: "Nativewind",   alt: "Nativewind",   src: "/skills/nativewind.png",   href: "https://nativewind.dev/" },
  ],

  uiux: [
    { key: "figma",       label: "Figma",       alt: "Figma",       src: "/skills/figma.png",        href: "https://figma.com/" },
    { key: "adobe-xd",    label: "Adobe XD",    alt: "Adobe XD",    src: "/skills/xd.png",           href: "https://www.adobe.com/products/xd.html" },
    { key: "photoshop",   label: "Photoshop",   alt: "Photoshop",   src: "/skills/photoshop.png",    href: "https://www.adobe.com/products/photoshop.html" },
    { key: "illustrator", label: "Illustrator", alt: "Illustrator", src: "/skills/illustrator.png",  href: "https://www.adobe.com/products/illustrator.html" },
  ],
} satisfies TechByCategory;

/* ========== Utilities ========== */

// تجميع كل العناصر مرة واحدة
export const ALL_TECH: TechItem[] = Object.values(TECH).flat();

// ماب للوصول بأي key
export const TECH_MAP = Object.fromEntries(
  ALL_TECH.map((t) => [t.key, t])
) as Record<string, TechItem>;

// تحقّق ديف: يمنع تكرار الـ keys (يساعد على منع تحذير React لاحقًا)
if (process.env.NODE_ENV !== "production") {
  const counts = new Map<string, number>();
  for (const t of ALL_TECH) {
    counts.set(t.key, (counts.get(t.key) ?? 0) + 1);
  }
  const dups = [...counts.entries()].filter(([, n]) => n > 1).map(([k]) => k);
  if (dups.length) {
    // مش هيمنع الرندر، بس هيظهر لك تنبيه واضح في الكونسول
    console.warn("[TECH] Duplicate keys detected:", dups);
  }
}
