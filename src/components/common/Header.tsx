import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

const Header = () => {
  return (
    <header className="flex h-[72px] justify-center bg-gray-100">
      <Link to="/" className="flex items-center gap-2">
        <img className="h-10 w-10" src={logo} alt="모두의 지갑 로고" />
        <p className="text-black-to-white text-[24px] font-bold">모두의 지갑</p>
      </Link>
    </header>
  );
};

export default Header;
