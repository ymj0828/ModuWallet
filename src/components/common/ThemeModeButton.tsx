import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

const ThemeModeButton = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark((prev) => !prev);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button onClick={toggleTheme}>
      {isDark ? (
        <div className="flex flex-col items-center">
          <Sun className="text-black-to-white" size="32px" />
          <span className="text-[14px] font-medium text-black-to-white">밝은 배경</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-[2px]">
          <Moon className="text-black-to-white" size="28px" />
          <span className="text-[14px] font-medium text-black-to-white">어두운 배경</span>
        </div>
      )}
    </button>
  );
};

export default ThemeModeButton;
