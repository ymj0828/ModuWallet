import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { Transaction, getTransactions } from '@/services/transaction.service';
import { getUserMap } from '@/services/user.service';

const HistoryPage = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userMap, setUserMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [txs, map] = await Promise.all([getTransactions(user.uid), getUserMap()]);
      setTransactions(txs);
      setUserMap(map);
    };

    fetchData();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">송금 내역</h2>
      <ul className="space-y-2">
        {transactions.map((tx, idx) => (
          <li key={idx} className="border p-3 rounded">
            <div>
              <strong>{tx.type === 'send' ? '보냄' : '받음'}</strong> {tx.amount}원
            </div>
            <div className="text-sm text-gray-500">
              {tx.type === 'send'
                ? `→ ${userMap[tx.to!] ?? tx.to}`
                : `← ${userMap[tx.from!] ?? tx.from}`}
            </div>
            <div className="text-xs text-gray-400">
              {tx.timestamp?.toDate().toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
