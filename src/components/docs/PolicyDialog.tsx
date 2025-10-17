import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import PrivacyContent from './PrivacyContent';
import TermsContent from './TermsContent';

interface PolicyDialogProps {
  policy: 'terms' | 'privacy';
}

const PolicyDialog = ({ policy }: PolicyDialogProps) => {
  const terms = policy === 'terms';

  return (
    <Dialog>
      <DialogTrigger className="text-sm text-muted-foreground underline cursor-pointer hover:font-bold leading-none">
        보기
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{terms ? '이용약관' : '개인정보처리방침'}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="prose"></div>
          {terms ? <TermsContent /> : <PrivacyContent />}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDialog;
