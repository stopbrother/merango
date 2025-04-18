import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { RecruitWithProfile } from '@/types/parties.types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface PartyCardProps {
  recruit: RecruitWithProfile;
}
const PartyCard = ({ recruit }: PartyCardProps) => {
  // 시간을 2분전, 1개월 전 같은 텍스트로 변환
  const dateTime = recruit.updated_date_time ?? recruit.created_date_time;
  const formattedTime = formatDistanceToNow(new Date(dateTime), {
    addSuffix: true,
    locale: ko,
  });
  return (
    <Card key={recruit.id} className="hover:shadow-lg cursor-pointer">
      <CardHeader className="w-full flex flex-row justify-between items-center">
        <Badge>{recruit.party_type}</Badge>
        <span className="text-sm text-gray-500 !mt-0">{formattedTime}</span>
      </CardHeader>
      <CardTitle className="text-center">{recruit.title}</CardTitle>
      <CardFooter className="justify-center">
        파티장: {recruit.created_by.username}
      </CardFooter>
    </Card>
  );
};

export default PartyCard;
