import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations pour Node.js 24+
  experimental: {
    // Optimisations pour les Web Vitals
    optimizePackageImports: ["animejs"],
  },

  // Configuration TypeScript stricte
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Optimisations de production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configuration des images
  images: {
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
