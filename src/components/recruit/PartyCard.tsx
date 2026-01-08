import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { RecruitWithProfile } from '@/types/parties.types';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PARTY_TYPE_OPTIONS } from '@/constants/partyType';
import TooltipWrapper from '../common/TooltipWrapper';

interface PartyCardProps {
  recruit: RecruitWithProfile;
}
const PartyCard = ({ recruit }: PartyCardProps) => {
  // 시간을 2분전, 1개월 전 같은 텍스트로 변환
  const dateTime = recruit.raised_date_time ?? recruit.created_date_time;
  const formattedTime = formatDistanceToNow(new Date(dateTime), {
    addSuffix: true,
    locale: ko,
  });

  // 파티타입 한글로 변환
  const typeLabel = PARTY_TYPE_OPTIONS.find(
    (v) => v.value === recruit.party_type
  )?.label;

  return (
    <Card key={recruit.id} className="hover:shadow-lg cursor-pointer">
      <CardHeader className="w-full flex flex-row justify-between items-center">
        <Badge>{typeLabel}</Badge>
        <span className="text-sm text-gray-500 mt-0!">{formattedTime}</span>
      </CardHeader>
      <TooltipWrapper message={recruit.title}>
        <CardTitle className="text-center truncate">{recruit.title}</CardTitle>
      </TooltipWrapper>
      <CardFooter className="justify-center">
        파티장: {recruit.created_by.username}
      </CardFooter>
    </Card>
  );
};

export default PartyCard;
