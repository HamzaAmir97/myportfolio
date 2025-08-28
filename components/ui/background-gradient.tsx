import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };

  const motionProps = animate
    ? {
      
        variants,
        initial: "initial" as const,
        animate: "animate" as const,
        transition: {
          duration: 5,
          repeat: Infinity ,
          repeatType: "reverse" as const,
        },
        style: { backgroundSize: "400% 400%" },
      }
    : {};

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      {/* طبقة التوهّج (Blur) */}
      <motion.div
        {...motionProps}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-70 group-hover:opacity-100",
          "blur-xl transition duration-500 will-change-transform",
          // تدرّج برتقالي بالكامل
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff8c00_0%,transparent_60%),radial-gradient(circle_farthest-side_at_100%_0,#ffa62b_0%,transparent_60%),radial-gradient(circle_farthest-side_at_100%_100%,#ff7a18_0%,transparent_60%),radial-gradient(circle_farthest-side_at_0_0,#ffd27f_0%,#c2410c_100%)]"
        )}
      />

      {/* طبقة حادّة فوق التوهّج */}
      <motion.div
        {...motionProps}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff8c00_0%,transparent_40%),radial-gradient(circle_farthest-side_at_100%_0,#ffa62b_0%,transparent_40%),radial-gradient(circle_farthest-side_at_100%_100%,#ff7a18_0%,transparent_40%),radial-gradient(circle_farthest-side_at_0_0,#ffd27f_0%,#c2410c_100%)]"
        )}
      />

      {/* المحتوى */}
      <div className={cn("relative z-10 rounded-3xl", className)}>{children}</div>
    </div>
  );
};
