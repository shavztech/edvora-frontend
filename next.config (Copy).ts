import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    appDir: true,
  },
  /* config options here */
  reactCompiler: true,

};

export default nextConfig;
