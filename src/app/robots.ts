import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/admin/'],
            },
            {
                userAgent: ['Googlebot', 'Bingbot'],
                allow: '/',
            },
            {
                userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'anthropic-ai', 'ClaudeBot', 'Claude-Web', 'Amazonbot'],
                allow: '/',
            },
        ],
        sitemap: 'https://ziopvt.com/sitemap.xml',
    };
}
