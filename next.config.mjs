/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 부작용 확인을 위한 여러번 렌더링
  images: {
    // 외부(디스코드) 이미지 도메인 허용
    remotePatterns: [
      {
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
};

export default nextConfig;
