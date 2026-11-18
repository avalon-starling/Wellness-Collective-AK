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
  async redirects() {
    return [
      // Redirect old /find-wellness URLs to /directory
      {
        source: "/find-wellness",
        destination: "/directory",
        permanent: true, // 301 redirect
      },
      {
        source: "/find-wellness/:slug",
        destination: "/directory/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
