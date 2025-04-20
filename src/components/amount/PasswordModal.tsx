import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error?: string;
}

const PasswordModal = ({ open, onClose, onSubmit, error }: Props) => {
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
        className="animate-slide-up fixed bottom-0 left-0 right-0 mx-auto max-w-[600px] rounded-t-2xl bg-white p-6 shadow-xl"
      >
        <div className="mx-auto w-full max-w-md">
          <h2 className="mb-4 text-center text-xl font-bold">이체 비밀번호 입력</h2>

          {/* 비밀번호 ● 표시 */}
          <div className="mb-4 flex justify-center gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-4 w-4 rounded-full border border-gray-500">
                {password[i] && (
                  <div className="h-full w-full rounded-full bg-black"></div>
                )}
              </div>
            ))}
          </div>

          {error && <p className="mb-2 text-center text-sm text-red-500">{error}</p>}

          {/* 키패드 */}
          <div className="grid grid-cols-3 gap-4 text-center text-xl">
            {[...Array(9)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handleNumberClick(String(i + 1))}
                className="rounded border p-4"
              >
                {i + 1}
              </button>
            ))}
            <div></div>
            <button onClick={() => handleNumberClick('0')} className="rounded border p-4">
              0
            </button>
            <button onClick={handleDelete} className="rounded border p-4 text-red-500">
              지움
            </button>
          </div>

          {/* 확인 버튼 */}
          <button
            disabled={password.length !== 4}
            onClick={handleSubmit}
            className="mt-6 w-full rounded bg-black py-3 text-white disabled:opacity-50"
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PasswordModal;
