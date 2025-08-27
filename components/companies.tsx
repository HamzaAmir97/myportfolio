import React from "react";
import Image from "next/image";
import { Marquee } from "./Marquee";
import { BRANDS } from "@/constants/brands";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function BrandCircle({ src, alt, name }: { src: string; alt: string; name: string }) {
  return (
    <span
      title={name}
      className="
        group relative inline-flex items-center justify-center
        h-16 w-16 rounded-full
        bg-white dark:bg-neutral-900
        border border-black/10 dark:border-white/15
        shadow-sm overflow-hidden
        cursor-pointer
        hover:shadow-md hover:shadow-amber-700
        mx-10
      "
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="64px"
        className="
          object-contain p-2
          grayscale opacity-70
          transition duration-300 ease-out
          group-hover:grayscale-0 group-hover:opacity-100
        "
      />
    </span>
  );
}


const BrandIconsGrid = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 w-screen p-20 mt-20" id="faq">
      <h2 className="text-4xl font-bold text-center">
        Trained &amp; Certified by Leading Institutions
      </h2>

      <p className="pt-6 pb-8 text-base max-w-2xl text-center m-auto dark:text-neutral-400">
        I have gained hands-on experience and certifications from top global
        platforms and organizations, ensuring both practical expertise and
        professional excellence.
      </p>

      <div className="mx-auto w-screen bg-white dark:bg-transparent">
        <Marquee>
          <div className="flex items-center gap-10 px-6">
            {BRANDS.map((b) => {
              const circle = (


                <Tooltip key={b.key}>
                  <TooltipTrigger>
                <BrandCircle key={b.key} src={b.src} alt={b.alt} name={b.label} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{b.label}</p>
                </TooltipContent>
                </Tooltip>


              );
              return b.href ? (
                <a
                  key={b.key}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:scale-[1.04] transition-transform"
                  aria-label={b.label}
                  title={b.label}
                >
                  {circle}
                </a>
              ) : (
                circle
              );
            })}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default BrandIconsGrid;
