/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/bukabiz',
  env: {
    urlAPI: 'http://178.128.90.130/bukabiz-cms/api/',
  },
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}

module.exports = nextConfig