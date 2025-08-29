// utils/normalize-tech.ts
import { TECH_MAP } from "@/constants/tech-icons";

// اكتب أي صيغة هنا -> يتحول لمفتاح TECH_MAP الصحيح
const SYNONYMS: Record<string, string> = {
  "tailwind css": "tailwind",
  tailwind: "tailwind",

  framer: "framer",
  "framer motion": "framer",

  gsap: "gsap",

  next: "nextjs",
  "next.js": "nextjs",
  nextjs: "nextjs",

  react: "react",
  "react.js": "react",

  typescript: "typescript",
  ts: "typescript",

  javascript: "javascript",
  js: "javascript",

  postgres: "postgresql",
  postgresql: "postgresql",

  node: "nodejs",
  "node.js": "nodejs",
  nodejs: "nodejs",

  express: "express",
  "express.js": "express",

  openai: "openai",

  "google generative ai": "gemini",
  "google gemini": "gemini",
  gemini: "gemini",

  shadcn: "shadcn",
  "shadcn/ui": "shadcn",

  mongodb: "mongodb",
  prisma: "prisma",
};

export function normalizeTechLabel(raw: string): string {
  const s = raw.trim().toLowerCase();
  const key = SYNONYMS[s] ?? s.replace(/\s+/g, "-");
  // إن كانت التقنية معروفة في TECH_MAP نرجع الـ label الرسمي (لأجل الكتابة + الأيقونة لاحقًا)
  if (TECH_MAP[key]) return TECH_MAP[key].label;
  // غير معروفة؟ نخلي النص كما هو بعد تنظيف بسيط
  return raw.trim().replace(/\s+/g, " ");
}

export const toTechs = (names: string[]) =>
  names.map((n) => ({ name: normalizeTechLabel(n) })); // يلائم type Tech الحالي
