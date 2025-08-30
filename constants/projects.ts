// projects.ts
import { Project } from "@/types";
import { toTechs } from "@/utils/normalize-tech";

export const STEPS: Project[] = [
  {
    name: "Real Estate Platform",
    imageSrc: "/projects/realestate.png",
    imageAlt: "Modern multilingual real estate platform UI",
    description:
      "Modern multilingual real estate app with filtering, protected admin panel, and Prisma-backed PostgreSQL.",
    liveUrl: "https://real-estate-mu-self.vercel.app",
    repoUrl: "https://github.com/HamzaAmir97/real_estate",
    techs: toTechs([
      "Next.js",
      "React",
      "TypeScript",
      "tailwind",       // ← تصبح Tailwind
      "shadcn",         // ← تصبح shadcn/ui
      "Prisma",
      "PostgreSQL",
      "framer",         // ← تصبح Framer Motion
      "GSAP",
      "next-intl",      // غير موجودة في TECH حالياً → تبقى كما هي
    ]),
    features: [
      "Next.js App Router with TypeScript",
      "Multilingual (English/Arabic) via next-intl",
      "Property listings with advanced filters",
      "Protected admin routes via middleware",
      "Charts & notifications (Recharts, sonner)",
      "Prisma ORM + Postgres (Neon cloud friendly)",
    ],
  },

  {
    name: "SaaS AI Website Builder",
    imageSrc: "/projects/saas-ai-website-builder.png",
    imageAlt: "AI Website Builder wizard & generated landing pages",
    description:
      "AI-powered website builder: generate sections, copy, and images; publish with SEO, auth, payments, and admin tools.",
    liveUrl: "https://codey-jade.vercel.app/",
    repoUrl: "https://github.com/HamzaAmir97/saas_ai_website_builder",
    techs: toTechs([
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",   // ← تصبح Tailwind
      "Prisma",
      "MongoDB",
      "Stripe",
      "OpenAI",
     
      "Clerk",
    ]),
    features: [
      "AI-generated sections, copy & images",
      "Multi-step wizard with live preview",
      "Auth (Clerk) & role management",
      "Payments & subscriptions (Stripe)",
      "WYSIWYG editing & SEO controls",
      "Media via AWS S3 / storage integration",
      "One-click deploy (e.g., Vercel) & admin dashboard",
    ],
  },

  {
    name: "Resume Builder",
    imageSrc: "/projects/resume-builder.png",
    imageAlt: "Resume Builder templates and live preview",
    description:
      "Full-stack app to create, customize, and download professional resumes with live preview and templates.",
    liveUrl: "https://resume-builder-dvio.onrender.com",
    repoUrl: "https://github.com/HamzaAmir97/resume_builder",
    techs: toTechs([
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
     
      "Tailwind CSS",   // ← تصبح Tailwind
    ]),
    features: [
      "Secure authentication (Sign up / Login)",
      "Create, edit & manage resumes",
      "Upload profile photos & certificates",
      "Multiple modern templates",
      "Live preview & high-quality download",
      "Fully responsive UI",
    ],
  },

  {
    name: "AI Trainer",
    imageSrc: "/projects/ai-trainer.png",
    imageAlt: "AI fitness coach web app with voice control",
    description:
      "Personal AI fitness coach: generates custom workout plans with voice interaction and real-time synced data.",
    liveUrl: "https://superfitness.vercel.app",
    repoUrl: "https://github.com/HamzaAmir97/ai_trainer",
    techs: toTechs([
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Convex",
      "Clerk",
      "Google Generative AI", // ← تصبح Google Gemini
      "Vapi",
    ]),
    features: [
      "AI-powered workout generation",
      "Interactive voice control for sessions",
      "Secure auth with Clerk",
      "Real-time database (Convex)",
      "Responsive, modern UI",
    ],
  },
];