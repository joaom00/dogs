/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ['schveufltdgsfxvyzrwb.supabase.in', 'schveufltdgsfxvyzrwb.supabase.co'],
  },
};

module.exports = nextConfig;
