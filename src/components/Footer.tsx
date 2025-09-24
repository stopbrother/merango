import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">© 이름</p>

        <nav className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/guide" className="hover:underline">
            이용가이드
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/contact" className="hover:underline">
            문의
          </Link>
          <Link href="/terms" className="hover:underline">
            이용약관
          </Link>
          <Link href="/privacy" className="hover:underline">
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
