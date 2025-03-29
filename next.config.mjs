/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/analyze",
          // destination: "https://gamma-fin-agent-734911192367.us-west1.run.app/analyze/",
          // destination: "https://gamma-fin-agent-734911192367.us-west1.run.app/analyze",
          destination: "http://gamma-fin-agent-734911192367.us-west1.run.app/analyze/",
          // destination: "http://gamma-fin-agent-734911192367.us-west1.run.app/analyze",
        },
      ];
    },
  };
  
  export default nextConfig;
  