/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/(.*)",
        destination: "/",
      },
    ];
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "next-admin-ecommerce.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
