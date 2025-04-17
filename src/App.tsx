import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomeLayout from '@/components/layouts/HomeLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

import LoginPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            {/* <Route path="/" element={<MainPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
