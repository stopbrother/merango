'use client';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';

interface AlertProfileGuardProps {
  handleClick: () => void;
}

const AlertProfileGuard = ({ handleClick }: AlertProfileGuardProps) => {
  return (
    <Alert className="mt-4">
      <AlertTitle>프로필이 필요합니다.</AlertTitle>
      <AlertDescription className="flex items-center gap-2">
        닉네임/레벨/직업을 설정해주세요.
        <Button onClick={handleClick} size="sm" variant="outline">
          설정하기
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default AlertProfileGuard;
