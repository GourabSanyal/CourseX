/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "db", "store", "shared-types"],
  env: {
    NEXTAUTH_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXTAUTH_URL || 'https://localhost:3000',
  },
};

module.exports = nextConfig;
