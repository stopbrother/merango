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
    <div className="mx-auto max-w-md px-4 py-10">
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
    </div>
  );
};

export default ConsentPage;
