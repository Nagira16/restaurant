/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "encrypted-tbn0.gstatic.com"
            },
            {
                hostname: "tb-static.uber.com"
            }
        ]
    }
};

export default nextConfig;
