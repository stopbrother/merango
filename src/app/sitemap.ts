import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://merango.party';

  // 각 객체 하나 = url 하나에 해당
  return [
    {
      url: `${baseUrl}`, // 절대 경로
      lastModified: new Date(), // 마지막 변경 시점
      changeFrequency: 'daily', // 페이지 변경 주기
      priority: 1, // 0.0 ~ 1, 중요도
    },
    {
      // 리스트 페이지
      url: `${baseUrl}/recruits`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
  ];
}
