import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // для docker-образа
  images: {
    remotePatterns: [
      // WP-медиа через nginx; уточнить домен в prod
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
