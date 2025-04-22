'use client';

import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size: number;
}

const Spinner = ({ size }: SpinnerProps) => {
  return <Loader2 className="animate-spin" width={size} height={size} />;
};

export default Spinner;
