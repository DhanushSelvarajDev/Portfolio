/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted on Cloudflare Pages (output dir: dist)
  output: 'export',
  distDir: 'dist',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
