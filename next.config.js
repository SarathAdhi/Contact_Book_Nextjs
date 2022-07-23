/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL,
    API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
