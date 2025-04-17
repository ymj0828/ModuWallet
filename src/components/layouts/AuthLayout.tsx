import { Outlet } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

const AuthLayout = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-[600px] flex-col items-center bg-white p-4 pt-20">
      <div className="mb-[80px] flex h-fit items-center gap-2">
        <img className="h-20 w-20" src={logo} alt="모두의 지갑 로고" />
        <p className="text-[36px] font-bold">모두의 지갑</p>
      </div>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
