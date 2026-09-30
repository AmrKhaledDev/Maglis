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
  allowedDevOrigins:["concerning-illustration-specs-types.trycloudflare.com"],
  experimental: {
    proxyClientMaxBodySize: "200mb",
  },
};

export default nextConfig;
