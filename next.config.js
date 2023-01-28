/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    ATLAS_URL: process.env.ATLAS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "*",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
