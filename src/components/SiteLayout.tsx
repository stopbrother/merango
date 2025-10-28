'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Header from './Header';

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const hideLayout = pathname === '/consent';

  if (hideLayout)
    return (
      <main className="flex-1 max-w-[1200px] mx-auto w-full py-4 px-4">
        {children}
      </main>
    );

  return (
    <>
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto w-full py-4 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default SiteLayout;
