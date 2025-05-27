import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
  eslint: {
    // Warning: This will skip *all* lint errors during `next build`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;



