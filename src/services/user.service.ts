import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/firebase';

export const saveIdIndex = async (id: string, uid: string) => {
  const email = `${id}@moduwallet.com`;
  return setDoc(doc(db, 'id_index', email), { uid });
};

export const isIdDuplicate = async (id: string) => {
  const email = `${id}@moduwallet.com`;
  const userDoc = await getDoc(doc(db, 'id_index', email));
  return userDoc.exists();
};

export const saveUserInfo = async (uid: string, name: string) => {
  await setDoc(doc(db, 'users', uid), {
    name,
    createdAt: serverTimestamp(),
  });
};

export const getUserInfo = async (uid: string) => {
  const docSnap = await getDoc(doc(db, 'users', uid));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getAllUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    name: doc.data().name ?? '(이름 없음)',
  }));
};

export const getUserMap = async (): Promise<Record<string, string>> => {
  const snapshot = await getDocs(collection(db, 'users'));
  const map: Record<string, string> = {};

  snapshot.forEach((doc) => {
    map[doc.id] = doc.data().name ?? '(이름 없음)';
  });

  return map;
};
