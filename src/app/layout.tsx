import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 950',
  variable: '--font-pretendard',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  // 페이지에 title이 있을경우 %s 자리에 title → (title - 메랜고)
  title: {
    template: '메랜고 - %s',
    default: '메랜고 - 메이플랜드 파티 매칭',
  },
  description:
    '메이플랜드 파티 매칭 - 디스코드 로그인으로 간편하게 구인/구직 하세요, 메랜고',
  // metadata내 상대경로를 절대 경로로 바꾸는 기준 주소
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: ['/favicon.svg', '/favicon-48x48.png'],
    apple: '/apple-icon',
  },
  // 미리보기 카드에서 쓰임 (sns/메신저)
  openGraph: {
    url: BASE_URL,
    type: 'website',
    title: '메랜고',
    siteName: 'MeranGo',
    description:
      '메이플랜드 파티 매칭 - 디스코드 로그인으로 간편하게 구인/구직 하세요',
    images: ['/og.png'], // metadataBase로 인해 절대경로
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="overflow-y-scroll">
      <head>
        {/* Google Search console 사이트 검증 */}
        <meta
          name="google-site-verification"
          content="HYyoPQ59FAmROHPHf8pa9exypRJHFgOgWu9J3-1LtgY"
        />
        {/* Naver Search Advisor 사이트 검증 */}
        <meta
          name="naver-site-verification"
          content="bce879f6651a6ee99833ebb897fea1f1facfc618"
        />
      </head>
      <body className={`${pretendard.className} flex flex-col min-h-screen`}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
