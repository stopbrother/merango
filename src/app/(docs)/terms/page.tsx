import TermsContent from '@/components/docs/TermsContent';

const TermsPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">이용약관</h1>

      <TermsContent />
    </div>
  );
};

export default TermsPage;
