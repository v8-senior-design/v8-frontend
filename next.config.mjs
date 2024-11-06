/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['assets.aceternity.com'],
  },
  typescript: {
      ignoreBuildErrors: true,
  },
};

export default nextConfig;
