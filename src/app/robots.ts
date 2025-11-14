import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.VERCEL_ENV === 'production';

  if (!isProd) {
    // prod가 아니라면 크롤 금지
    return {
      rules: [
        {
          userAgent: '*', // 크롤러
          disallow: ['/'], // 모든 경로 차단
        },
      ],
    };
  }

  // prod만 허용
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: '/settings/*',
      },
    ],
    sitemap: 'https://merango.party/sitemap.xml',
  };
}
