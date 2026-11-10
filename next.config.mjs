/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted on Cloudflare Pages (output dir: out)
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
