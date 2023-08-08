/** @type {import('next').NextConfig} */
const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

const nextConfig = {
  reactStrictMode: true, // false
  // swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;