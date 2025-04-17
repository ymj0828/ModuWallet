import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeLayout from '@/components/layouts/HomeLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

import LoginPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<HomeLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
