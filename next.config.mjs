/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      }
     
    ]
  },

  eslint : {
    ignoreDuringBuilds :false
  }
};

export default nextConfig;
