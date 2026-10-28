import type { NextConfig } from "next";

// Static export served at vangrog.com/jlhaas (proxied from the vangrog site on Netlify)
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jlhaas",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
