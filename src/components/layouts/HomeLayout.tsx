import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header';

const HomeLayout = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[600px] bg-white">
      <Header />
      <main className='p-4'>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
