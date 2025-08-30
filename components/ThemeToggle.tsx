"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type Effect = "auto" | "fade";

export function ThemeToggle({ effect = "auto" }: { effect?: Effect }) {
  const { resolvedTheme, setTheme } = useTheme();

  // يحدد النقطة اللي تبدأ منها الدائرة (حسب مكان الكليك)
  const getPoint = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.nativeEvent) {
      return { x: e.clientX, y: e.clientY };
    }
    // لو كيبورد/بدون كليك: خليها من منتصف الشاشة
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  };

  const toggleWithViewTransition = async (next: "light" | "dark", e?: React.MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsVT = "startViewTransition" in document;

    // fallback: انتقال بسيط لو مفيش دعم
    if (!supportsVT || reduce || effect === "fade") {
      document.documentElement.classList.add("theme-transition");
      setTheme(next);
      // شيل الكلاس بعد شوية عشان مايثقلش الصفحة
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 320);
      return;
    }

    // View Transitions
    const { x, y } = getPoint(e);
    document.documentElement.style.setProperty("--theme-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-y", `${y}px`);
    document.documentElement.classList.add("theme-switching");

   
    const transition = document.startViewTransition(() => {
      setTheme(next);
    });

    try {
      await transition.finished;
    } finally {
      document.documentElement.classList.remove("theme-switching");
      // تنظيف المتغيرات (اختياري)
      document.documentElement.style.removeProperty("--theme-x");
      document.documentElement.style.removeProperty("--theme-y");
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    toggleWithViewTransition(next, e);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={onClick}
      className="relative"
    >
      {/* أيقونة تتبدل حسب الثيم */}
      {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
