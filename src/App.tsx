import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from '@/components/common/PrivateRoute';
import AuthLayout from '@/components/layouts/AuthLayout';
import HomeLayout from '@/components/layouts/HomeLayout';
import { useAuth } from '@/hooks/useAuth';
import HistoryPage from '@/pages/history';
import HomePage from '@/pages/home';
import SendPage from '@/pages/send';
import LoginPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  }

  console.log(user);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PrivateRoute>
                <HomeLayout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/send" element={<SendPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
