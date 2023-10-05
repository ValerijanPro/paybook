/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  reactStrictMode: true,
  env: {
    X_API_KEY: process.env.X_API_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(wav|mp3)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "static/audio/",
            publicPath: "/_next/static/audio/",
          },
        },
      ],
    });

    return config;
  },
};
