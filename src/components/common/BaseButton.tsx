import { ReactNode } from 'react';

import clsx from 'clsx';

interface BaseButtonProps {
  size: 'full' | 'fit';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const BaseButton = ({ size, disabled, onClick, children }: BaseButtonProps) => {
  return (
    <button
      className={clsx(
        'h-12 whitespace-nowrap rounded-lg bg-primary px-4 font-semibold text-white disabled:bg-gray-200',
        size === 'full' && 'w-full'
      )}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;
