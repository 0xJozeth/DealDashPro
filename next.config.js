/** @type {import('next').NextConfig} */

const nextConfig = {};

// module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["uploadthing-prod.s3.us-west-2.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};
