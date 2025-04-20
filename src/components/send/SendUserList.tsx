import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { countTransactionsByUid, getTransactions } from '@/services/transaction.service';
import { getAllUsers } from '@/services/user.service';
import { UserItem } from '@/types/user';

const SendUserList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
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

  return (
    <ul>
      {users
        .filter((u) => u.uid !== user?.uid)
        .map((u) => (
          <li
            key={u.uid}
            className="hover:bg-primary-50 cursor-pointer rounded-lg border border-primary"
          >
            <Link
              to={`/send/amount?toUid=${u.uid}`}
              className="flex items-center justify-between p-5"
            >
              <p className="text-black-to-white text-[22px] font-medium">{u.name}</p>
              <p className="text-black-to-white">{countMap[u.uid] ?? 0}회 거래</p>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default SendUserList;
