"use client";

import React, { useRef } from "react";
import { ArrowUpRight, Palette } from "lucide-react";
import { useGsapCornerWipe } from "@/hooks/useGsapCornerWipe";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

/** تعريف اختياري لتفادي أخطاء تايبسكربت مع View Transitions */
declare global {
  interface Document {
    startViewTransition(updateCallback: () => void | Promise<void>): ViewTransition;
  }
}

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDarkMode = (resolvedTheme ?? theme) === "dark";

  const spanRef = useRef<HTMLAnchorElement>(null);
  useGsapCornerWipe(spanRef, {
    color: isDarkMode ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });

  const spanRef1 = useRef<HTMLAnchorElement>(null);
  useGsapCornerWipe(spanRef1, {
    color: isDarkMode ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });

  const spanRef2 = useRef<HTMLAnchorElement>(null);
  useGsapCornerWipe(spanRef2, {
    color: isDarkMode ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });

  const spanRef3 = useRef<HTMLAnchorElement>(null);
  useGsapCornerWipe(spanRef3, {
    color: isDarkMode ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)",
    corner: "bl",
    duration: 0.2,
    layer: "under",
  });

  // ✅ تبديل الثيم مع View Transitions + Fallback تلقائي
  const toggleTheme = async (e?: React.MouseEvent) => {
    const next = isDarkMode ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsVT = !!document.startViewTransition && !reduce;

    if (!supportsVT) {
      // Fallback: انتقال ألوان بسيط
      document.documentElement.classList.add("theme-transition");
      setTheme(next);
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 320);
      return;
    }

    // نقطة الانطلاق = مكان الكليك (أو منتصف الشاشة لو مفيش حدث)
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.classList.add("theme-switching");

    const t = document.startViewTransition!(() => {
      setTheme(next);
    });

    try {
      await t.finished;
    } finally {
      document.documentElement.classList.remove("theme-switching");
      document.documentElement.style.removeProperty("--theme-x");
      document.documentElement.style.removeProperty("--theme-y");
    }
  };

  return (
    <div className="hidden md:flex items-center justify-between">
      <div className="flex items-center gap-5 px-10">
        {/* Theme Toggler — نفس الأيقونة Palette */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="w-20 h-20 flex items-center justify-center">
              <Palette
                width={45}
                height={45}
                className="
                  hover:scale-110 transition-all duration-300 ease-in-out
                  cursor-pointer hover:text-amber-500 hover:rotate-45
                  rotate-10
                "
                onClick={(e) => toggleTheme(e)} // ← مهم: نمرر الحدث
                role="button"
                aria-label="Toggle theme"
                tabIndex={0}
                onKeyDown={(ke) => {
                  if (ke.key === "Enter" || ke.key === " ") toggleTheme();
                }}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent><p>Toggle Theme</p></TooltipContent>
        </Tooltip>

        <span ref={spanRef} className="buttonSecondary2 text-4xl">
          <p>It's me</p>
        </span>
      </div>

      <div className="flex items-center gap-4 px-10">
        <span className="buttonSecondary2 px-2">
          <span ref={spanRef1} className="flex flex-col">
            <span className="flex items-center justify-between gap-5">
              <p>My Projects</p>
              <ArrowUpRight className="self-end" />
            </span>
            <p className="text-xs">See All my nice projects I have created</p>
          </span>
        </span>

        <span ref={spanRef2} className="buttonSecondary2 px-2">
          <span className="flex flex-col">
            <span className="flex items-center justify-between gap-5">
              <p>About me</p>
              <ArrowUpRight />
            </span>
            <p className="text-xs">Learn more about me</p>
          </span>
        </span>

        <span ref={spanRef3} className="buttonSecondary2 px-2">
          <span className="flex flex-col">
            <span className="flex items-center justify-between gap-5">
              <p>Contact me</p>
              <ArrowUpRight />
            </span>
            <p className="text-xs">Get in touch with me</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
