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
};

export default nextConfig;
