import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // для docker-образа
  // фиксируем корень: в $HOME есть посторонний package-lock.json, иначе Turbopack путает workspace root
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      // WP-медиа через nginx; уточнить домен в prod
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
