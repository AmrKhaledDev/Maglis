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
  allowedDevOrigins: ["cubic-counted-dictionary-bool.trycloudflare.com"],
  experimental: {
    proxyClientMaxBodySize: "200mb",
  },
};

export default nextConfig;
