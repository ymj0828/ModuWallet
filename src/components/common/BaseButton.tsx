import { ReactNode } from 'react';

import clsx from 'clsx';

interface BaseButtonProps {
  size: 'full' | 'fit';
  children: ReactNode;
}

const BaseButton = ({ size, children }: BaseButtonProps) => {
  return (
    <button
      className={clsx(
        'h-12 whitespace-nowrap rounded-lg bg-primary px-4 font-semibold text-white',
        size === 'full' && 'w-full'
      )}
      type="button"
    >
      {children}
    </button>
  );
};

export default BaseButton;
