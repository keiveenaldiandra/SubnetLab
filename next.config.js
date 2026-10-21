/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const standalone = process.env.SUBNETLAB_OUTPUT === "standalone";

const nextConfig = {
  // Static export is a production build target. In Next 14, enabling it in
  // dev conflicts with dynamicParams=false and rejects valid module routes.
  output: isProd ? (standalone ? "standalone" : "export") : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd && !standalone ? "/SubnetLab" : ""),
  trailingSlash: true,
};

module.exports = nextConfig;
