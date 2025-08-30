"use client";

import React, { useRef, useEffect, useState } from "react";
import { Menu, ArrowUpRight, Palette } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useGsapCornerWipe } from "@/hooks/useGsapCornerWipe";
import { useTheme } from "next-themes";

function MobileNavbar() {
  // 1) Hooks ثابتة الترتيب
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDarkMode = (resolvedTheme ?? theme) === "dark";
  const wipeColor = isDarkMode ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";

  // مراجع عناصر الـ GSAP
  const spanRef = useRef<HTMLSpanElement>(null);
  const spanRef1 = useRef<HTMLSpanElement>(null);
  const spanRef2 = useRef<HTMLSpanElement>(null);

  // GSAP wipe يعتمد على الثيم الحالي
  useGsapCornerWipe(spanRef,  { color: wipeColor, corner: "bl", duration: 0.2, layer: "under" });
  useGsapCornerWipe(spanRef1, { color: wipeColor, corner: "bl", duration: 0.2, layer: "under" });
  useGsapCornerWipe(spanRef2, { color: wipeColor, corner: "bl", duration: 0.2, layer: "under" });

  const toggleTheme = () => setTheme(isDarkMode ? "light" : "dark");

  // 2) الحجب بعد الهوكس لتجنّب تغيير ترتيبها
  if (!mounted) return null;

  return (
    <div>
      <div className="flex flex-row-reverse w-screen px-5 justify-between items-center">
        {/* يمين الهيدر (مع row-reverse) */}
        <div className="flex items-center gap-3">
         
           {/* زر تبديل الثيم في الهيدر العلوي */}
           <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md active:scale-95 transition hover:scale-110 hover:text-amber-600  cursor-pointer "
          >
            <Palette className="h-8 w-8" />
          </button>
         
         
          {/* القائمة */}
          <Sheet>
            <SheetTrigger asChild className="group cursor-pointer rounded-full">
              <button type="button" aria-label="Open menu">
                <Menu className="h-12 w-12 hover:text-amber-600" />
              </button>
            </SheetTrigger>

            <SheetContent
              className="w-screen h-screen flex flex-col gap-20 items-center
                         bg-white dark:bg-black p-10"
            >
              <SheetHeader className="w-full">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-4xl uppercase">My Portfolio</SheetTitle>

                 {/* زر تبديل الثيم في الهيدر العلوي */}
           <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md active:scale-95 transition hover:scale-110 hover:text-amber-600  cursor-pointer "
          >
            <Palette className="h-8 w-8" />
          </button>
                </div>
                <SheetDescription />
              </SheetHeader>

              {/* روابط القائمة */}
              <div className="flex flex-col items-center gap-6 px-10 w-full">
                <span
                  className="border-t-[3px] border-gray-500 dark:border-gray-500
                             w-full py-3 cursor-pointer
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300 ease-in-out font-bold px-2"
                >
                  <span className="flex flex-col">
                    <span ref={spanRef} className="flex items-center justify-between gap-5">
                      <p className="text-2xl">My Projects</p>
                      <ArrowUpRight className="self-end" />
                    </span>
                    <p className="text-xs">See all my nice projects I have created</p>
                  </span>
                </span>

                <span
                  className="border-t-[3px] border-gray-500 dark:border-gray-500
                             w-full py-3 cursor-pointer
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300 ease-in-out font-bold px-2"
                >
                  <span className="flex flex-col">
                    <span ref={spanRef1} className="flex items-center justify-between gap-5">
                      <p className="text-2xl">About me</p>
                      <ArrowUpRight />
                    </span>
                    <p className="text-xs">Learn more about me</p>
                  </span>
                </span>

                <span
                  className="border-t-[3px] border-gray-500 dark:border-gray-500
                             w-full py-3 cursor-pointer
                             hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black
                             transition-all duration-300 ease-in-out font-bold px-2"
                >
                  <span className="flex flex-col">
                    <span ref={spanRef2} className="flex items-center justify-between gap-5">
                      <p className="text-2xl">Contact me</p>
                      <ArrowUpRight />
                    </span>
                    <p className="text-xs">Get in touch with me</p>
                  </span>
                </span>
              </div>
            </SheetContent>
          </Sheet>

        
        </div>

        {/* يسار الهيدر (مع row-reverse) */}
        <div className="px-10">
          <span className="buttonSecondary text-4xl">It's me</span>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
