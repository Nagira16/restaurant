/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "www.donavicky.ca",
                protocol: "https"
            },
            {
                hostname: "i.blogs.es",
                protocol: "https"
            },
            {
                hostname: "hips.hearstapps.com",
                protocol: "https"
            },
            {
                hostname: "img.freepik.com",
                protocol: "https"
            },
            {
                hostname: "media.gettyimages.com",
                protocol: "https"
            },
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
            },
            {
                hostname: "scontent.fcxh2-1.fna.fbcdn.net"
            },
            {
                hostname: "img.clerk.com"
            },
            {
                hostname: "cdn.iconscout.com"
            },
            {
                hostname: "unimarket.ca"
            },
            {
                hostname: "via.placeholder.com"
            }
        ]
    }
};

export default nextConfig;
