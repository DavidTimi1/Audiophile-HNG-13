import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Do not fail the build on type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
