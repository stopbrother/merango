import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
}

const EmptyState = ({ icon: Icon, message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <Icon className="w-10 h-10 mb-4 text-muted-foreground" />
      <p className="text-sm mt-2">{message}</p>
    </div>
  );
};

export default EmptyState;
