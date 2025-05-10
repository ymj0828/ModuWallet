import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import ThemeModeButton from '@/components/common/themeModeButton';

const Header = () => {
  return (
    <header className="relative flex h-[72px] justify-center bg-gray-100">
      <Link to="/" className="flex items-center gap-2">
        <img className="h-10 w-10" src={logo} alt="모두의 지갑 로고" />
        <p className="text-[24px] font-bold text-black-to-white">모두의 지갑</p>
      </Link>
      <div className="absolute right-[16px] top-1/2 -translate-y-1/2">
        <ThemeModeButton />
      </div>
    </header>
  );
};

export default Header;
