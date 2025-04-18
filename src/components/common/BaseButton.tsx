import { ReactNode } from 'react';

import clsx from 'clsx';

interface BaseButtonProps {
  size: 'full' | 'fit';
  onClick?: () => void;
  children: ReactNode;
}

const BaseButton = ({ size, onClick, children }: BaseButtonProps) => {
  return (
    <button
      className={clsx(
        'h-12 whitespace-nowrap rounded-lg bg-primary px-4 font-semibold text-white',
        size === 'full' && 'w-full'
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;
