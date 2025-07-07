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
  const { data, error } = await getPartyDetail(serverClient, params.id);

  if (error) return <div>데이터를 불러올 수 없습니다.</div>;

  return <PartyDetail recruit={data} />;
};

export default RecruitDetailPage;
