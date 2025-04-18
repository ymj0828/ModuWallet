import { ReactNode, createContext, useEffect, useState } from 'react';

import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/firebase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>
  );
};
