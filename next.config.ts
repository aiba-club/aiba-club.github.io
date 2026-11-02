import type { NextConfig } from "next";

// Static export so the site can be hosted on GitHub Pages (aiba-club.github.io).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
