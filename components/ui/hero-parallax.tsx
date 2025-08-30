"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { useTheme } from "next-themes";



export const AchievementsParallax= ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );


  const isDark = useTheme().theme ==="dark";
  return (
    
    <div
      ref={ref}
      className=" h-[300vh]  overflow-hidden   antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
        

        {/* decoration */}
     



    {isDark ? (
      

<div
    className="absolute inset-0 -z-10"
    style={{
      background: "#000000",
      backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
      `,
      backgroundSize: "30px 30px",
      backgroundPosition: "0 0",
    }}
  />
  



    ) : (
      
    <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
      `,
    }}
     />
  
     
    )}



  {/* Edge Fades Overlays */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 z-50 bg-gradient-to-b from-white/95 to-transparent dark:from-black/95" />
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 z-50 bg-gradient-to-t from-white/95 to-transparent dark:from-black/95" />







      <Header />
    
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=" "
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-extrabold tracking-tight leading-tight dark:text-white">
        Industry-Recognized Certificates
        <br /> from Leading Institutions
      </h1>
      <p className="text-base md:text-xl mt-6 max-w-3xl dark:text-neutral-200">
        Hands-on credentials and specializations from Google, Meta, IBM, and top universities. 
        Each card is a real certificate—click to open the original credential or verification page.
      </p>
    </div>
  );
};


export const ProductCard = ({
  product,
  translate,
}: {
  product: { title: string; link: string; thumbnail: string };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0 *:
      hover:shadow-lg hover:shadow-amber-700
      "
    >
      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open credential: ${product.title}`}
        className="block"
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          alt={product.title}
          className="
            object-cover object-center absolute inset-0 h-full w-full
        opacity-80 transition
            group-hover/product: group-hover/product:opacity-100
          "
        />
      </a>

      {/* dim layer on hover */}
      <div
        className="
          absolute inset-0 h-full w-full opacity-0
          group-hover/product:opacity-80
          bg-black transition
          pointer-events-none
        "
      />

      {/* certificate text */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/product:opacity-100 transition text-white">
        <p className="text-[11px] uppercase tracking-widest/relaxed opacity-80">
          View Credential
        </p>
        <h2 className="mt-1 text-lg md:text-xl font-semibold leading-snug">
          {product.title}
        </h2>
      </div>
    </motion.div>
  );
};
