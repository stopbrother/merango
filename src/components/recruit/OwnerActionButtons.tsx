import { Pencil, Trash2 } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

interface OwnerActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const OwnerActionButtons = ({ onEdit, onDelete }: OwnerActionButtonsProps) => {
  return (
    <div className="absolute top-4 right-10 flex gap-2">
      <TooltipWrapper message="수정">
        <button onClick={onEdit} className="opacity-70 hover:opacity-100">
          <Pencil className="w-4 h-4" />
        </button>
      </TooltipWrapper>

      <TooltipWrapper message="삭제">
        <button onClick={onDelete} className="opacity-70 hover:opacity-100">
          <Trash2 className="w-4 h-4" />
        </button>
      </TooltipWrapper>
    </div>
  );
};

export default OwnerActionButtons;
