import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import {
  countTransactionsByUid,
  getTransactions,
  sendMoney,
} from '@/services/transaction.service';
import { getAllUsers } from '@/services/user.service';

const SendPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [countMap, setCountMap] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user) return;

    const fetch = async () => {
      const [userList, transactions] = await Promise.all([
        getAllUsers(),
        getTransactions(user.uid),
      ]);

      setUsers(userList);

      const counts = countTransactionsByUid(transactions, user.uid);
      setCountMap(counts);
    };

    fetch();
  }, [user]);

  const handleSend = async (toUid: string) => {
    if (!user) return;
    try {
      await sendMoney(user.uid, toUid, 1000); // 임의 송금
      alert('송금 완료!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>송금할 사용자 선택</h2>
      <ul>
        {users
          .filter((u) => u.uid !== user?.uid)
          .map((u) => (
            <li key={u.uid}>
              {u.name} (총 {countMap[u.uid] ?? 0}회 거래)
              <button onClick={() => handleSend(u.uid)} style={{ marginLeft: 8 }}>
                송금하기
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SendPage;
