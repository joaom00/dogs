/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ['schveufltdgsfxvyzrwb.supabase.in', 'localhost'],
  },
};

module.exports = nextConfig;
