import { type ReactNode, useEffect, useRef } from 'react';

import { CircleAlert } from 'lucide-react';

interface InputDescriptionPopoverProps {
  id: string;
  description: ReactNode;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const InputDescriptionPopover = ({
  id,
  description,
  openPopoverId,
  setOpenPopoverId,
}: InputDescriptionPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const isOpen = openPopoverId === id;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpenPopoverId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpenPopoverId]);

  return (
    <div ref={popoverRef} className="relative inline-block">
      <button type="button" onClick={() => setOpenPopoverId(isOpen ? null : id)}>
        <CircleAlert size={20} className="text-black-to-white" />
      </button>

      {isOpen && (
        <div className="absolute -bottom-3 left-7 z-10 w-max max-w-[240px] whitespace-normal break-keep rounded-lg border border-gray-200 bg-white-to-black p-3 text-black-to-white shadow-md">
          {description}
        </div>
      )}
    </div>
  );
};

export default InputDescriptionPopover;
