import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from '@/components/common/PrivateRoute';
import AuthLayout from '@/components/layouts/AuthLayout';
import HomeLayout from '@/components/layouts/HomeLayout';
import { useAuth } from '@/hooks/useAuth';
import AmountPage from '@/pages/amount';
import CompletePage from '@/pages/complete';
import HistoryPage from '@/pages/history';
import HomePage from '@/pages/home';
import RegisterPasswordPage from '@/pages/register-password';
import SendPage from '@/pages/send';
import LoginPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

const App = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-200">
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
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/send" element={<SendPage />} />
            <Route path="/send/amount" element={<AmountPage />} />
            <Route path="/register-password" element={<RegisterPasswordPage />} />
            <Route path="/send/complete" element={<CompletePage />} />
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
