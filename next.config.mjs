/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare Workers cannot run sharp, so Next's own image optimiser has nothing to
    // run on. The two heroes are the only next/image users on the site and their source
    // URLs already carry sizing params (?w=1400&q=80), so they arrive pre-sized and
    // nothing is lost. Every other image — the brand marks and all 26 service icons —
    // is a plain <img> pointing at a WebP that build_assets.py already sized.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
