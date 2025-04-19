import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BaseButton from '@/components/common/BaseButton';
import { useAuth } from '@/hooks/useAuth';
import { getUserInfo } from '@/services/user.service';
import { getOrInitBalance } from '@/services/wallet.service';

const HomePage = () => {
  const { user } = useAuth();
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

  return (
    <div className="mt-4 flex flex-col gap-6">
      <h2 className="text-[24px] font-semibold">{userName}님 안녕하세요!</h2>
      <div className="bg-primary py-10 px-12 rounded-lg">
        <p className="text-[18px] font-medium text-white">현재 잔액</p>
        <p className="text-center text-[40px] font-bold py-2 text-white">
          {balance?.toLocaleString()}원
        </p>
      </div>
      <div className="flex gap-6">
        <Link to="/send" className="flex-1">
          <BaseButton size="full">이체</BaseButton>
        </Link>
        <Link to="/history" className="flex-1">
          <BaseButton size="full">거래 내역</BaseButton>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
