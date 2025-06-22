// Update next.config.mjs to include example images domain
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bolbol.az",
        port: "",
        pathname: "/media/**",
      },
    ],
    // Allow local example images
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
