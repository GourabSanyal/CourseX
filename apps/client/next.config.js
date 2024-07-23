/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "db", "store"],
  experimental: {
    externalDir: true
  }
};

module.exports = nextConfig;
