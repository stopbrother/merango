import PrivacyContent from '@/components/docs/PrivacyContent';

const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">개인정보처리방침</h1>

      <PrivacyContent />
    </div>
  );
};

export default PrivacyPage;
