import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  // Exclude heavy dependencies from server bundle
  serverExternalPackages: [
    "@prisma/client",
    "@auth/prisma-adapter",
    "bcryptjs",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude heavy packages from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "@prisma/client": false,
        "@auth/prisma-adapter": false,
        bcryptjs: false,
      };
    }
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
