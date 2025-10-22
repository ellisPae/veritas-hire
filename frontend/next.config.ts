import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    appDir: true,
  },
  distDir: ".next",
};

export default nextConfig;
