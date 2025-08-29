import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
