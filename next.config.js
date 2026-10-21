/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const standalone = process.env.SUBNETLAB_OUTPUT === "standalone";

const nextConfig = {
  output: standalone ? "standalone" : "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd && !standalone ? "/SubnetLab" : ""),
  trailingSlash: true,
};

module.exports = nextConfig;
