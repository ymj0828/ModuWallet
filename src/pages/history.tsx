import { useEffect, useState } from 'react';

import clsx from 'clsx';

import PageHeader from '@/components/common/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { getAllUsers } from '@/services/user.service';
import { type Transaction, getBalance, getTransactions } from '@/services/wallet.service';

const HistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userMap, setUserMap] = useState<Record<string, string>>({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [txs, users, bal] = await Promise.all([
        getTransactions(user.uid),
        getAllUsers(),
        getBalance(user.uid),
      ]);

      const map: Record<string, string> = {};

      users.forEach((user) => {
        map[user.uid] = user.name;
      });

      setTransactions(txs);
      setUserMap(map);
      setBalance(bal);
    };

    fetchData();
  }, [user]);

  return (
    <>
      <PageHeader title="거래 내역 조회" />

      <div className="text-center text-[22px] font-semibold text-black-to-white">
        현재 잔액: {balance.toLocaleString()}원
      </div>

      <hr className="my-[32px] border-black-to-white" />

      <ul className="flex flex-col gap-4">
        {transactions.map((tx, idx) => (
          <li
            key={idx}
            className="flex justify-between rounded-lg border border-primary p-4"
          >
            <div className="flex flex-col justify-between gap-1">
              <p className="text-[14px] text-gray-400">
                {tx.timestamp?.toDate().toLocaleString()}
              </p>
              <p className="text-[20px] font-medium text-black-to-white">
                {tx.type === 'send'
                  ? `${userMap[tx.to!] ?? tx.to}`
                  : `${userMap[tx.from!] ?? tx.from}`}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <p
                className={clsx(
                  'font-medium',
                  tx.type === 'send' ? 'text-blue' : 'text-red'
                )}
              >
                {tx.type === 'send' ? '출금' : '입금'}
              </p>
              <p className="text-[18px] font-semibold text-black-to-white">
                {tx.amount.toLocaleString()}원
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HistoryPage;
