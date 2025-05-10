import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '@/firebase';
import { saveIdIndex, saveUserInfo } from '@/services/user.service';
import { registerWallet } from '@/services/wallet.service';

const getEmail = (id: string) => `${id}@moduwallet.com`;

// 회원가입
export const signUp = async (id: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    getEmail(id),
    password
  );

  const uid = userCredential.user.uid;

  // 유저 uid를 firestore에 저장
  await saveUserInfo(uid, id);
  // 유저 아이디를 firestore에 저장
  await saveIdIndex(uid, id);
  // 유저 계좌 생성
  await registerWallet(uid);

  return userCredential;
};

// 로그인
export const login = (id: string, password: string) =>
  signInWithEmailAndPassword(auth, getEmail(id), password);

export const logout = () => signOut(auth);
