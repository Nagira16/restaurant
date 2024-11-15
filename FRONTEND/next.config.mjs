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
            }
        ]
    }
};

export default nextConfig;
