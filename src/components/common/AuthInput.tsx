import { ChangeEvent, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

interface AuthInputProps {
  title: string;
  name: string;
  value: string;
  placeholder: string;
  propType: 'text' | 'password';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}

const AuthInput = ({
  title,
  name,
  value,
  placeholder,
  propType,
  onChange,
  isPassword,
}: AuthInputProps) => {
  const [type, setType] = useState<'text' | 'password'>(propType);

  const handlePasswordVisibleChange = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  return (
    <div className="w-full">
      <label className="mb-2 inline-block text-[18px]" htmlFor={name}>
        {title}
      </label>
      <div className="relative h-12">
        <input
          className="h-full w-full rounded-lg border border-gray-300 pl-4 focus-visible:border-gray-500 focus-visible:outline-none"
          id={name}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        {isPassword && (
          <button className="absolute right-3 top-0 translate-y-1/2">
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
