import { Outlet } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

const AuthLayout = () => {
  return (
    <main className="bg-background mx-auto flex min-h-screen max-w-[600px] flex-col items-center p-4 pt-12">
      <div className="mb-[48px] flex h-fit items-center gap-3">
        <img className="h-16 w-16" src={logo} alt="모두의 지갑 로고" />
        <p className="text-black-to-white text-[36px] font-bold">모두의 지갑</p>
      </div>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
