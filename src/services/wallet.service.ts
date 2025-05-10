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

// 계좌 생성 및 초기 잔액 추가
export const registerWallet = async (uid: string) => {
  const userRef = doc(db, 'wallet', uid);

  await setDoc(userRef, {
    balance: DEFAULT_BALANCE,
  });
};

// 잔액 조회
export const getBalance = async (uid: string) => {
  const snapshot = await getDoc(doc(db, 'wallet', uid));

  const data = snapshot.data();

  return data?.balance;
};

// 입력한 금액 이체
export const sendMoney = async (fromUid: string, toUid: string, amount: number) => {
  const fromRef = doc(db, 'wallet', fromUid);
  const toRef = doc(db, 'wallet', toUid);

  // 여러 작업을 한 번에 수행하기 위해 runTransaction 사용
  await runTransaction(db, async (transaction) => {
    const fromSnap = await transaction.get(fromRef);
    const toSnap = await transaction.get(toRef);

    // 둘 중 하나라도 존재하지 않으면 실행 중단
    if (!fromSnap.exists() || !toSnap.exists()) return;

    const fromBalance = fromSnap.data().balance;
    const toBalance = toSnap.data().balance;

    // 보내는 사람과 받는 사람의 잔액을 동시에 업데이트
    transaction.update(fromRef, { balance: fromBalance - amount });
    transaction.update(toRef, { balance: toBalance + amount });
  });

  // 보내는 사람과 받는 사람의 거래 내역 기록을 동시에 업데이트
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
    // 시간순 정렬
    orderBy('timestamp', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as Transaction);
};

// 거래 횟수 추출하기
export const countTransactionsByUid = (transactions: Transaction[], myUid: string) => {
  const counts: Record<string, number> = {};

  transactions.forEach((tx) => {
    const targetUid = tx.type === 'send' ? tx.to : tx.from;

    if (!targetUid || targetUid === myUid) return;

    counts[targetUid] = (counts[targetUid] ?? 0) + 1;
  });

  return counts;
};
