/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "encrypted-tbn0.gstatic.com"
            },
            {
                hostname: "tb-static.uber.com"
            },
            {
                hostname: "valleydirectfoods.com"
            },
            {
                hostname: "www.simplyrecipes.com"
            },
            {
                hostname: "scontent-nrt1-2.xx.fbcdn.net"
            },
            {
                hostname: "thewoodenskillet.com"
            }
        ]
    }
};

export default nextConfig;
