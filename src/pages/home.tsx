import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BaseButton from '@/components/common/BaseButton';
import { useAuth } from '@/hooks/useAuth';
import { logout } from '@/services/auth.service';
import { getUserInfo } from '@/services/user.service';
import { getOrInitBalance } from '@/services/wallet.service';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [balance, setBalance] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const [balanceResult, userInfo] = await Promise.all([
          getOrInitBalance(user.uid),
          getUserInfo(user.uid),
        ]);

        setBalance(balanceResult);
        setUserName(userInfo?.name ?? null);
      }
    };

    fetchData();
  }, [user]);

  const handleTransferClick = async () => {
    if (!user?.uid) return;

    const userInfo = await getUserInfo(user.uid);
    const hasPassword = !!userInfo?.transferPassword;

    if (!hasPassword) {
      navigate('/register-password');
    } else {
      navigate('/send');
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-black-to-white text-[24px] font-semibold">
          <span className="text-[28px]">{userName}</span>님 안녕하세요!
        </h2>
        <button
          type="button"
          className="hover:bg-primary-50 rounded-lg border border-primary px-3 py-2 text-[14px] font-semibold text-primary"
          onClick={logout}
        >
          다른 계정으로 전환
        </button>
      </div>
      <div className="rounded-lg border border-primary px-12 py-10">
        <p className="text-black-to-white text-[20px] font-medium">현재 잔액</p>
        <p className="py-3 text-center text-[40px] font-bold text-primary">
          {balance?.toLocaleString()}원
        </p>
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <BaseButton size="full" onClick={handleTransferClick}>
            이체
          </BaseButton>
        </div>
        <Link to="/history" className="flex-1">
          <BaseButton size="full">거래 내역</BaseButton>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
