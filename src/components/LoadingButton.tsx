import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const LoadingButton = () => {
  return (
    <Button>
      <Loader2 className="w-4 h-4 animate-spin" />
    </Button>
  );
};

export default LoadingButton;
