import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/firebase';

export type Transaction = {
  type: 'send' | 'receive';
  from?: string;
  to?: string;
  amount: number;
  timestamp: any;
};

// 초기 잔액
const DEFAULT_BALANCE = 50000;

export const getOrInitBalance = async (uid: string) => {
  const userRef = doc(db, 'wallet', uid);
  const userSnap = await getDoc(userRef);

  // 계좌가 없다면 새로 생성하고 초기 잔액 추가
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      balance: DEFAULT_BALANCE,
    });
    return DEFAULT_BALANCE;
  }

  const data = userSnap.data();

  // 이미 잔액이 있다면 그대로 반환
  return data.balance;
};

export const sendMoney = async (fromUid: string, toUid: string, amount: number) => {
  const fromRef = doc(db, 'wallet', fromUid);
  const toRef = doc(db, 'wallet', toUid);

  await runTransaction(db, async (transaction) => {
    const fromSnap = await transaction.get(fromRef);
    const toSnap = await transaction.get(toRef);

    if (!fromSnap.exists() || !toSnap.exists()) {
      throw new Error('보내는 사람 또는 받는 사람 정보가 없습니다.');
    }

    const fromBalance = fromSnap.data().balance ?? 0;
    const toBalance = toSnap.data().balance ?? 0;

    if (fromBalance < amount) {
      throw new Error('잔액이 부족합니다.');
    }

    transaction.update(fromRef, { balance: fromBalance - amount });
    transaction.update(toRef, { balance: toBalance + amount });
  });

  // 거래 내역 기록
  await Promise.all([
    addDoc(collection(db, 'wallet', fromUid, 'transactions'), {
      type: 'send',
      to: toUid,
      amount,
      timestamp: serverTimestamp(),
    }),
    addDoc(collection(db, 'wallet', toUid, 'transactions'), {
      type: 'receive',
      from: fromUid,
      amount,
      timestamp: serverTimestamp(),
    }),
  ]);
};

// 전체 거래 내역 가져오기
export const getTransactions = async (uid: string): Promise<Transaction[]> => {
  const q = query(
    collection(db, 'wallet', uid, 'transactions'),
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Transaction);
};

export const countTransactionsByUid = (transactions: Transaction[], myUid: string) => {
  const counts: Record<string, number> = {};

  transactions.forEach((tx) => {
    const targetUid = tx.type === 'send' ? tx.to : tx.from;
    if (!targetUid || targetUid === myUid) return;
    counts[targetUid] = (counts[targetUid] ?? 0) + 1;
  });

  return counts;
};
