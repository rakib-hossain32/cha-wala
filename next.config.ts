/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  distDir: process.env.DIST_DIR || ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  // Next.js 16+ no longer supports `eslint` config here; handle linting separately.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.pixabay.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hero-gateway",
        permanent: false,
      },
    ];
  },
  webpack(config: any) {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      exclude: [/node_modules/],
      use: [
        {
          loader: "@dhiwise/component-tagger/nextLoader",
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
