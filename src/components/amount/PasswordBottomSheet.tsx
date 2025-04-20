import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import BaseButton from '@/components/common/BaseButton';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error?: string;
}

const PasswordBottomSheet = ({ open, onClose, onSubmit, error }: Props) => {
  const [password, setPassword] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setPassword('');
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleNumberClick = (digit: string) => {
    if (password.length >= 4) return;
    setPassword((prev) => prev + digit);
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (password.length === 4) {
      onSubmit(password);
      setPassword('');
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 mx-auto max-w-[600px] bg-black bg-opacity-30">
      <div
        ref={modalRef}
        className="animate-slide-up bg-background fixed bottom-0 left-0 right-0 mx-auto max-w-[600px] rounded-t-2xl p-8 shadow-xl"
      >
        <div className="mx-auto w-full max-w-md">
          <p className="text-black-to-white mb-6 text-center text-xl font-bold">
            이체 비밀번호 입력
          </p>

          <div className="relative mb-12">
            <div className="flex justify-center gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-5 w-5 rounded-full border border-primary">
                  {password[i] && (
                    <div className="h-full w-full rounded-full bg-primary"></div>
                  )}
                </div>
              ))}
            </div>

            {error && (
              <p className="absolute left-1/2 top-[28px] mb-2 w-full -translate-x-1/2 text-center text-[16px] text-red-500">
                {error}
              </p>
            )}
          </div>

          <div className="mb-8 grid grid-cols-3 gap-4 text-center text-xl">
            {[...Array(9)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handleNumberClick(String(i + 1))}
                className="hover:bg-primary-50 rounded border border-primary p-4 text-primary"
              >
                {i + 1}
              </button>
            ))}
            <div></div>
            <button
              onClick={() => handleNumberClick('0')}
              className="hover:bg-primary-50 rounded border border-primary p-4 text-primary"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="hover:bg-primary-50 rounded border border-primary p-4 text-red-500"
            >
              지움
            </button>
          </div>

          <BaseButton size="full" disabled={password.length !== 4} onClick={handleSubmit}>
            확인
          </BaseButton>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PasswordBottomSheet;
