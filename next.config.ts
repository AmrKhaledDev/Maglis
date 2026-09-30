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
  allowedDevOrigins: ["muslim-joseph-bufing-hire.trycloudflare.com"],
  experimental: {
    proxyClientMaxBodySize: "200mb",
  },
};

export default nextConfig;
