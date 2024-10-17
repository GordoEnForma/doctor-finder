/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                hostname: 'images.unsplash.com'
            },
        ]
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
};

export default nextConfig;
