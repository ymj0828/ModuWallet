import { doc, getDoc, setDoc } from 'firebase/firestore';

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
