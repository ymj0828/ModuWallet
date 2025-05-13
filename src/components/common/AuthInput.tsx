import { ChangeEvent, HTMLAttributes, type ReactNode, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import InputDescriptionPopover from './InputDescriptionPopover';

interface AuthInputProps {
  title: string;
  name: string;
  value: string;
  placeholder: string;
  propType: 'text' | 'password';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  minLength?: number;
  maxLength?: number;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  isPassword?: boolean;
  description?: ReactNode;
  openPopoverId?: string | null;
  setOpenPopoverId?: (id: string | null) => void;
}

const AuthInput = ({
  title,
  name,
  value,
  placeholder,
  error,
  propType,
  onChange,
  minLength,
  maxLength,
  inputMode,
  isPassword,
  description,
  openPopoverId,
  setOpenPopoverId,
}: AuthInputProps) => {
  const [type, setType] = useState<'text' | 'password'>(propType);

  const handlePasswordVisibleChange = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <label
          className="mb-2 inline-block text-[18px] font-medium text-black-to-white"
          htmlFor={name}
        >
          {title}
        </label>

        {description && (
          <InputDescriptionPopover
            id={name}
            description={description}
            openPopoverId={openPopoverId!}
            setOpenPopoverId={setOpenPopoverId!}
          />
        )}
      </div>

      <div className="relative h-14">
        <input
          className="h-full w-full rounded-lg border border-gray-300 bg-gray-100 px-4 text-black-to-white focus-visible:border-gray-400 focus-visible:outline-none"
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          inputMode={inputMode}
          autoComplete="off"
          onChange={onChange}
        />

        {isPassword && (
          <button
            type="button"
            aria-label={type === 'password' ? '비밀번호 보기' : '비밀번호 숨기기'}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {type === 'password' ? (
              <EyeOff
                onClick={handlePasswordVisibleChange}
                className="text-gray-300 hover:text-gray-400"
              />
            ) : (
              <Eye
                onClick={handlePasswordVisibleChange}
                className="text-gray-300 hover:text-gray-400"
              />
            )}
          </button>
        )}

        {error && <p className="mt-1 text-[14px] font-medium text-red">{error}</p>}
      </div>
    </div>
  );
};

export default AuthInput;
