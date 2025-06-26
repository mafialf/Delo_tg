/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/page2',
        permanent: true,
      },
    ];
  },

  webpack(config) {
    config.resolve.fallback = {
      fs: false,
      path: false,
      child_process: false,
      module: false,
      ...config.resolve.fallback,
    };
    return config;
  },
};

export default nextConfig;