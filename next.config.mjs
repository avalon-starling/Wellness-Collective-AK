/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // No ESLint tooling is installed in this project (kept intentionally
  // minimal) — skip Next's automatic lint pass during `next build` rather
  // than have it try to bootstrap a config non-interactively.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
