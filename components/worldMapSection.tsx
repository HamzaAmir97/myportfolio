"use client";
import dynamic from "next/dynamic";
import { motion } from "motion/react";

// 👇 حمّل الخريطة بدون SSR عشان نتجنّب أي اختلاف وقت الـ hydration
const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[2/1] rounded-lg bg-neutral-200/40" />
  ),
});

export function WorldMapSection() {
  return (
    <div className=" my-4 w-full ">
      <div className="max-w-7xl mx-auto py-4 text-center">
        <p className="font-bold text-xl md:text-4xl text-black dark:text-white">
          Products that scale your business{" "}
          <span className="text-amber-600">
            {"Worldwide".split("").map((ch, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </p>

        <p className="text-sm md:text-lg text-neutral-600 max-w-2xl mx-auto py-4 dark:text-neutral-200">
          I design high-performing websites & digital products that open new
          markets, attract customers across continents, and help your brand sell
          24/7 — from Cairo to California. SEO that travels, blazing speed, and
          conversion-focused UX built for global growth.
        </p>
      </div>

      <WorldMap
        dots={[
          { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } }, // Alaska → Los Angeles
          { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } }, // Alaska → Brasília
          { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },   // Brasília → Lisbon
          { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },      // London → New Delhi
          { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },     // New Delhi → Vladivostok
          { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },      // New Delhi → Nairobi
          { start: { lat: 30.0444, lng: 31.2357 }, end: { lat: 25.2048, lng: 55.2708 } },     // Cairo → Dubai
          { start: { lat: 30.0444, lng: 31.2357 }, end: { lat: 52.52,   lng: 13.405 } },      // Cairo → Berlin
          { start: { lat: 48.8566, lng: 2.3522 },  end: { lat: 24.7136, lng: 46.6753 } },     // Paris → Riyadh
          { start: { lat: 40.7128, lng: -74.006 }, end: { lat: 51.5074, lng: -0.1278 } },     // New York → London
          { start: { lat: 35.6895, lng: 139.6917 },end: { lat: -33.8688,lng: 151.2093 } },    // Tokyo → Sydney
          { start: { lat: 1.3521,  lng: 103.8198 },end: { lat: -6.2088, lng: 106.8456 } },    // Singapore → Jakarta
          { start: { lat: -26.2041,lng: 28.0473 }, end: { lat: 25.2048, lng: 55.2708 } },     // Johannesburg → Dubai
          { start: { lat: 19.4326, lng: -99.1332 },end: { lat: 40.7128, lng: -74.006 } },     // Mexico City → New York
          { start: { lat: -23.5505,lng: -46.6333 },end: { lat: 38.7223, lng: -9.1393 } },     // São Paulo → Lisbon
          { start: { lat: 43.6532, lng: -79.3832 },end: { lat: 37.7749, lng: -122.4194 } },   // Toronto → San Francisco
          { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 52.52,   lng: 13.405 } },      // Istanbul → Berlin
          { start: { lat: 28.6139, lng: 77.209 },  end: { lat: 1.3521,  lng: 103.8198 } },    // New Delhi → Singapore
        ]}
      />
    </div>
  );
}
