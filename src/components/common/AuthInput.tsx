import { ChangeEvent, HTMLAttributes, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps {
  title: string;
  name: string;
  value: string;
  placeholder: string;
  propType: 'text' | 'password';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  isPassword?: boolean;
}

const AuthInput = ({
  title,
  name,
  value,
  placeholder,
  propType,
  onChange,
  maxLength,
  inputMode,
  isPassword,
}: AuthInputProps) => {
  const [type, setType] = useState<'text' | 'password'>(propType);

  const handlePasswordVisibleChange = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="w-full">
      <label
        className="text-black-to-white mb-2 inline-block text-[18px] font-medium"
        htmlFor={name}
      >
        {title}
      </label>
      <div className="relative h-14">
        <input
          className="h-full w-full rounded-lg border border-gray-400 bg-gray-100 pl-4 text-black focus-visible:border-gray-500 focus-visible:outline-none"
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          inputMode={inputMode}
          onChange={onChange}
        />
        {isPassword && (
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            {type === 'password' ? (
              <EyeOff
                onClick={handlePasswordVisibleChange}
                className="text-gray-400 hover:text-gray-500"
              />
            ) : (
              <Eye
                onClick={handlePasswordVisibleChange}
                className="text-gray-400 hover:text-gray-500"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
