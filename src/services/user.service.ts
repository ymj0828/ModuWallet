import bcrypt from 'bcryptjs';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/firebase';
import { UserItem } from '@/types/user';

// 아이디 firestore에 저장
// users 안에 있는 name은 uid를 요구하니 따로 아이디만 모아놓은 컬렉션에 저장함
export const saveIdIndex = async (uid: string, id: string) => {
  const email = `${id}@moduwallet.com`;

  setDoc(doc(db, 'id_index', email), { uid });
};

// 아이디 중복 검사
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

// 이체 비밀번호 등록
export const registerTransferPassword = async (uid: string, password: string) => {
  // 비밀번호 암호화
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await setDoc(
    doc(db, 'users', uid),
    { transferPassword: hashedPassword },
    { merge: true }
  );
};

// 이체 비밀번호 검증
export const isTransferPasswordValid = async (uid: string, password: string) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  const hashed = userDoc.data()?.transferPassword;

  if (!hashed) return false;

  // 입력한 비밀번호와 해시값 일치 여부 반환
  return bcrypt.compare(password, hashed);
};

// 유저 정보 가져오기
export const getUserInfo = async (uid: string) => {
  const docSnap = await getDoc(doc(db, 'users', uid));

  if (!docSnap.exists()) return null;

  // 유저 정보 반환
  return docSnap.data();
};

// 모든 유저 정보 가져오기
export const getAllUsers = async (): Promise<UserItem[]> => {
  const snapshot = await getDocs(collection(db, 'users'));

  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    name: doc.data().name ?? '(이름 없음)',
  }));
};
