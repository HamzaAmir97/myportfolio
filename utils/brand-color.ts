// utils/brand-color.ts
import type { CSSProperties } from "react";
import type { TechItem } from "@/constants/tech-icons";

// ألوان افتراضية للبراندات (عدّلها براحتك)
export const BRAND_COLORS: Record<string, string> = {
  // Frontend / UI
  "react": "#61DAFB",
  "next.js": "#B0B0B0",      // أبيض ما يبان كـ glow، اخترنا رمادي فاتح
  "tailwind css": "#38BDF8",
  "framer": "#0055FF",
  "tanstack": "#FF4154",
  "shadcn/ui": "#A78BFA",
  "react router": "#CA4245",
  "three.js": "#8BE9FD",     // بديل لطيف بدل الأبيض/الأسود
  "gsap": "#88CE02",
  "javascript": "#F7DF1E",
  "typescript": "#3178C6",
   
  // UI/UX
  "figma": "#F24E1E",
  "adobe XD": "#FF61F6",
  "adobe photoshop": "#31A8FF",
  "adobe illustrator": "#FF9A00",
 
  // Backend
  "node.js": "#539E43",
  "express": "#9CA3AF",
  "appwrite": "#F02E65",
  "inngest": "#8A8A8A", 
  "supabase": "#3ECF8E",
  "prisma": "#0C344B",
  "postgresql": "#336791",
  "mongodb": "#10A44C",
  "postman": "#FF6C37",
  "rtpc": "#3B82F6",         // لوغو المكعّبات الزرقاء

  // AI
  "openai": "#10A37F",
  "google gemini": "#1A73E8",
  "python": "#3776AB",
  "jupyter": "#F37726",

  // Testing
  "jest": "#99425B",
};

// Aliases لتطبيع الأسماء
const ALIASES: Record<string, string> = {
  "nextjs": "next.js",
  "tailwind": "tailwind css",
  "router": "react router",
  "postgres": "postgresql",
  "js": "javascript",
  "ts": "typescript",
  "gemini": "google gemini",
  "shadcn": "shadcn/ui",
};

const norm = (s: string) => s.trim().toLowerCase();

/** يرجّع اللون المناسب (hex) لتقنية معيّنة أو الاسم مباشرة */
export function getBrandColor(input: string | TechItem, fallback = "#fbbf24") {
  const name = typeof input === "string" ? input : (input.label ?? input.key);
  const n = norm(name);
  const aliased = ALIASES[n] ?? n;
  return BRAND_COLORS[aliased] ?? fallback;
}

/** يحوّل hex إلى rgba() */
export function hexToRgba(hex: string, alpha = 1) {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** يرجّع CSS vars جاهزة للـ glow */
export function glowVars(color: string, soft = 0.32, strong = 0.55): CSSProperties {
  return {
    // استعملها داخل الـ class: shadow-[...var(--glow)]
    ["--glow" as any]: hexToRgba(color, soft),
    ["--glow-strong" as any]: hexToRgba(color, strong),
  } as CSSProperties;
}
