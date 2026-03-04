/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "ucarecdn.com" },
    ],
  },
}

export default nextConfig
