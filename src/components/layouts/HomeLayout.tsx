import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <main className="mx-auto min-h-screen max-w-[600px] bg-white">
      <Outlet />
    </main>
  );
};

export default HomeLayout;
