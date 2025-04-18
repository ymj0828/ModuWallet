import { auth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const getFakeEmail = (id: string) => `${id}@moduwallet.com`;

export const signUp = (id: string, password: string) =>
  createUserWithEmailAndPassword(auth, getFakeEmail(id), password);

export const login = (id: string, password: string) =>
  signInWithEmailAndPassword(auth, getFakeEmail(id), password);

export const logout = () => signOut(auth);
