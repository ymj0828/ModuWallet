import { useEffect, useState } from 'react';

import clsx from 'clsx';

import PageHeader from '@/components/common/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Transaction, getTransactions } from '@/services/transaction.service';
import { getUserMap } from '@/services/user.service';
import { getOrInitBalance } from '@/services/wallet.service';

const HistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userMap, setUserMap] = useState<Record<string, string>>({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [txs, map, bal] = await Promise.all([
        getTransactions(user.uid),
        getUserMap(),
        getOrInitBalance(user.uid),
      ]);

      setTransactions(txs);
      setUserMap(map);
      setBalance(bal);
    };

    fetchData();
  }, [user]);

  return (
    <>
      <PageHeader title="거래 내역 조회" />
      <div className="text-black-to-white text-center text-[22px] font-semibold">
        현재 잔액: {balance.toLocaleString()}원
      </div>
      <hr className="border-black-to-white my-[32px]" />
      <ul className="flex flex-col gap-4">
        {transactions.map((tx, idx) => (
          <li
            key={idx}
            className="flex justify-between rounded-lg border border-primary p-4"
          >
            <div className="flex flex-col justify-between gap-1">
              <p className="text-[14px] text-gray-500">
                {tx.timestamp?.toDate().toLocaleString()}
              </p>
              <p className="text-black-to-white text-[20px] font-medium">
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
              <p className="text-black-to-white text-[18px] font-semibold">
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
