import SiteLayout from '@/components/SiteLayout';
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
  // 페이지에 title이 있을경우 %s 자리에 title → (title - MeranGo)
  title: {
    template: 'MeranGo - %s',
    default: 'MeranGo - 메이플랜드 파티 매칭',
  },
  description:
    '메이플랜드 파티 매칭 - 디스코드 로그인으로 간편하게 구인/구직 하세요',
  // metadata내 상대경로를 절대 경로로 바꾸는 기준 주소
  metadataBase: new URL(BASE_URL),
  icons: { icon: '/favicon.svg', apple: '/apple-icon' },
  // 미리보기 카드에서 쓰임 (sns/메신저)
  openGraph: {
    url: BASE_URL,
    type: 'website',
    title: 'MeranGo',
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
      <body className={`${pretendard.className} flex flex-col min-h-screen`}>
        <Providers>
          <SiteLayout>
            {children}
            <Toaster position="top-center" />
          </SiteLayout>
        </Providers>
      </body>
    </html>
  );
}
