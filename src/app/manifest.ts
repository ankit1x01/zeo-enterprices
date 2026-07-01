import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'GST Suvidha Support',
        short_name: 'GST Suvidha Support',
        description: 'Professional taxation, Income Tax Return (ITR) e-filing, GST returns, web design, local SEO, GMB setup, QA audits, and custom software development.',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFBEA',
        theme_color: '#EAB308',
        icons: [
            {
                src: '/logo.jpg',
                sizes: 'any',
                type: 'image/jpeg',
            },
            {
                src: '/logo.jpg',
                sizes: '512x512',
                type: 'image/jpeg',
                purpose: 'maskable',
            },
        ],
    };
}
