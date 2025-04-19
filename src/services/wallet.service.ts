import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase';

const DEFAULT_BALANCE = 50000;

export const getOrInitBalance = async (uid: string) => {
  const userRef = doc(db, 'wallet', uid);
  const userSnap = await getDoc(userRef);

  // 1️⃣ 문서 자체가 없다면 → 새로 생성
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      balance: DEFAULT_BALANCE, // 초기 잔액
    });
    return DEFAULT_BALANCE;
  }

  const data = userSnap.data();

  // 2️⃣ 문서는 있지만 balance가 없다면 → 추가
  if (data.balance === undefined) {
    await updateDoc(userRef, { balance: DEFAULT_BALANCE });
    return DEFAULT_BALANCE;
  }

  // 3️⃣ 이미 잔액이 있다면 → 그대로 반환
  return data.balance;
};
