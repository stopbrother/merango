import { getPartyDetail } from '@/api/party-api';
import PartyDetail from '@/components/recruit/PartyDetail';
import { createClient } from '@/utils/supabase/server';

interface RecruitDetailPageProps {
  params: {
    id: string;
  };
}

const RecruitDetailPage = async ({ params }: RecruitDetailPageProps) => {
  const serverClient = createClient();
  const data = await getPartyDetail(serverClient, params.id);

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-10">
      <p className="text-sm text-muted-foreground mb-1">{data.party_type}</p>
      <h1 className="text-2xl font-bold mb-6">{data.title}</h1>
      <PartyDetail recruit={data} isModal={false} />
    </div>
  );
};

export default RecruitDetailPage;
