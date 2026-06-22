import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'GST Suvidha Support',
        short_name: 'GST Suvidha Support',
        description: 'Professional taxation, Income Tax Return (ITR) e-filing, GST returns, web design, local SEO, GMB setup, QA audits, and custom software development.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0A1628',
        theme_color: '#0066CC',
        icons: [
            {
                src: '/logo-symbol.png',
                sizes: 'any',
                type: 'image/png',
            },
            {
                src: '/logo.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}
