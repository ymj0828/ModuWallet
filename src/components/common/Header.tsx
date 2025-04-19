import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

const Header = () => {
  return (
    <header className="h-[60px] flex justify-center bg-zinc-200">
      <Link to="/" className="flex items-center gap-1">
        <img className="h-14 w-14" src={logo} alt="모두의 지갑 로고" />
        <p className="text-[24px] font-bold">모두의 지갑</p>
      </Link>
    </header>
  );
};

export default Header;
