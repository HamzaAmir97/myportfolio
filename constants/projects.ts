

/** Types */
type Tech = { name: string; iconClass?: string };
  type Project = {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  liveUrl?: string;
  repoUrl?: string;
  techs: Tech[];
  features: string[];
};



// components/... (where Project/Tech types are declared)

/** -----------------------------
 * Projects pulled from GitHub READMEs
 * Sources:
 * - SaaS AI Website Builder
 * - Resume Builder
 * - AI Trainer
 * - Real Estate Platform
 * ----------------------------- */
export const STEPS: Project[] = [
    {
        name: "Real Estate Platform",
        imageSrc: "/projects/realestate.png",
        imageAlt: "Modern multilingual real estate platform UI",
        description:
          "Modern multilingual real estate app with filtering, protected admin panel, and Prisma-backed PostgreSQL.",
        liveUrl: "https://real-estate-mu-self.vercel.app",
        repoUrl: "https://github.com/HamzaAmir97/real_estate",
        techs: [
          { name: "Next.js" },
          { name: "React" },
          { name: "TypeScript" },
          { name: "tailwind" },
          { name: "shadcn" },
          { name: "Prisma" },
          { name: "PostgreSQL" },
          { name: "framer" },
          { name: "GSAP" },
          { name: "next-intl" },
        ],
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
      liveUrl: "#",
      repoUrl: "https://github.com/HamzaAmir97/saas_ai_website_builder",
      techs: [
        { name: "Next.js" },
        { name: "React" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Prisma" },
        { name: "MongoDB" },
        { name: "Stripe" },
        { name: "OpenAI" },
        { name: "Resend" },
        { name: "Clerk" },
      ],
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
      techs: [
        { name: "React" },
        { name: "Vite" },
        { name: "Node.js" },
        { name: "Express" },
        { name: "MongoDB" },
        { name: "Mongoose" },
        { name: "JWT" },
        { name: "Multer" },
        { name: "Tailwind CSS" },
      ],
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
      techs: [
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind CSS" },
        { name: "Convex" },
        { name: "Clerk" },
        { name: "Google Generative AI" },
        { name: "Vapi" },
      ],
      features: [
        "AI-powered workout generation",
        "Interactive voice control for sessions",
        "Secure auth with Clerk",
        "Real-time database (Convex)",
        "Responsive, modern UI",
      ],
    },
   
  ];
  