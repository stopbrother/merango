import ConsentForm from '@/components/ConsentForm';

const ConsentPage = async () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">약관 동의</h1>
      <p className="text-sm text-muted-foreground mt-2">
        서비스 이용을 위해 아래 항목에 동의해 주세요.
      </p>

      <div className="mt-8">
        <ConsentForm />
      </div>
    </div>
  );
};

export default ConsentPage;
