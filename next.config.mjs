/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'remisimmons.com',
      },
      // Allow all HTTPS images for property submissions
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
