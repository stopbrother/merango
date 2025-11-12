import ConsentForm from '@/components/ConsentForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const ConsentPage = async () => {
  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full py-4 px-4">
      <section className="mx-auto max-w-md px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>약관 동의</CardTitle>
            <CardDescription>
              서비스 이용을 위해 아래 항목에 동의해 주세요.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ConsentForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ConsentPage;
