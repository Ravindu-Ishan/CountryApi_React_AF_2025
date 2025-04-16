import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  env: {
    GMAP_API_KEY: process.env.GMAP_API_KEY, // Expose the API key to the client
  },
};

export default withFlowbiteReact(nextConfig);