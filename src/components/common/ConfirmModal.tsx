import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { X } from 'lucide-react';

import BaseButton from '@/components/common/BaseButton';

interface ConfirmModalProps {
  text: string;
  open: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ text, open, onClose }: ConfirmModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 모달 바깥쪽을 클릭한 경우에 모달 닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 dark:bg-opacity-60">
      <div
        ref={modalRef}
        className="relative w-[340px] rounded-xl border border-primary bg-background px-8 pb-8 pt-12"
      >
        <button onClick={onClose} className="absolute right-3 top-3">
          <X className="text-black-to-white" />
        </button>
        <p className="mb-7 text-center text-xl font-semibold text-black-to-white">
          {text}
        </p>
        <BaseButton size={'full'} onClick={onClose}>
          확인
        </BaseButton>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
