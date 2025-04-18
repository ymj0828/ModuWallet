import { db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const saveIdIndex = async (id: string, uid: string) => {
  const email = `${id}@moduwallet.com`;
  return setDoc(doc(db, 'id_index', email), { uid });
};
