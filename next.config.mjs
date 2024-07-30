/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
              pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'oliviaweb.oliviawissig.com',
                pathname: '**',
              },
              {
                protocol: 'https',
                hostname: 'hitwebcounter.com',
                pathname: '**',
              },
              {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
              },
          ],
      },
};

export default nextConfig;
