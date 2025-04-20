import { Outlet } from 'react-router-dom';

import Header from '@/components/common/Header';

const HomeLayout = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[600px] bg-white">
      <Header />
      <main className='px-4 py-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
