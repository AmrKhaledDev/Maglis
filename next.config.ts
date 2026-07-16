import type { NextConfig } from "next";
// =============================================
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    proxyClientMaxBodySize: "200mb",
  },
};

export default nextConfig;
