/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [100],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
            },
        ],
    },
}

export default nextConfig
