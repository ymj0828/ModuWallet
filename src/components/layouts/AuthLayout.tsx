import { Outlet } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import ThemeModeButton from '@/components/common/ThemeModeButton';

const AuthLayout = () => {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-[600px] flex-col items-center bg-background p-4 pt-12">
      <div className="absolute right-[14px] top-[8px]">
        <ThemeModeButton />
      </div>
      <div className="mb-[48px] flex h-fit items-center gap-3">
        <img className="h-16 w-16" src={logo} alt="모두의 지갑 로고" />
        <p className="text-[36px] font-bold text-black-to-white">모두의 지갑</p>
      </div>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
