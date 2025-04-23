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
        'h-14 whitespace-nowrap rounded-lg bg-primary px-4 text-[18px] font-medium text-white-to-black hover:bg-primary-500 disabled:bg-gray-300 disabled:text-gray-100',
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
