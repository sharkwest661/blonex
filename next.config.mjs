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
  },
};

export default nextConfig;
