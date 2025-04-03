import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://1be0-105-160-20-66.ngrok-free.app',
    NEXT_LOCAL_BASE_URL: 'http://localhost:9090/api/',
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
