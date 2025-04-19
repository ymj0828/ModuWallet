import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '@/firebase';
import { saveUserInfo } from '@/services/user.service';

const getFakeEmail = (id: string) => `${id}@moduwallet.com`;

export const signUp = async (id: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    getFakeEmail(id),
    password
  );
  const uid = userCredential.user.uid;

  await saveUserInfo(uid, id);
  return userCredential;
};
export const login = (id: string, password: string) =>
  signInWithEmailAndPassword(auth, getFakeEmail(id), password);

export const logout = () => signOut(auth);
