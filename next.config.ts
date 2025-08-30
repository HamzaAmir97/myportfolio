import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   
     typescript: {
      ignoreBuildErrors: true,
     },

     eslint: {
      ignoreDuringBuilds: true,
     },

     images: {
      unoptimized: true,
     },

  /* config options here */
};

export default nextConfig;
