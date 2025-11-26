import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto w-full py-4 px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
