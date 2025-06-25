import Link from 'next/link';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { ReactNode } from 'react';

interface DropdownLinkItemProps {
  href: string;
  children: ReactNode;
}

const DropdownLinkItem = ({ href, children }: DropdownLinkItemProps) => {
  return (
    <DropdownMenuItem asChild>
      <Link href={href} className="cursor-pointer focus:!text-[#206030]">
        {children}
      </Link>
    </DropdownMenuItem>
  );
};

export default DropdownLinkItem;
