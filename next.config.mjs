/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin()
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**"
      }
    ]
  }
};

export default withNextIntl(nextConfig);
