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

  const [userName, setUserName] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const [userInfo, balanceResult] = await Promise.all([
          getUserInfo(user.uid),
          getOrInitBalance(user.uid),
        ]);

        setUserName(userInfo?.name ?? null);
        setBalance(balanceResult);
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
        <h2 className="text-[24px] font-semibold text-black-to-white">
          <span className="text-[28px]">{userName}</span>님 안녕하세요!
        </h2>
        <button
          type="button"
          className="rounded-lg border border-primary px-3 py-2 text-[14px] font-semibold text-primary hover:bg-primary-400"
          onClick={logout}
        >
          다른 계정으로 전환
        </button>
      </div>
      <div className="rounded-lg border border-primary px-12 py-10">
        <p className="text-[20px] font-medium text-black-to-white">현재 잔액</p>
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
