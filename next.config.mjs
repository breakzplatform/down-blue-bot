/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "https://down.blue",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
