import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomeLayout from '@/components/layouts/HomeLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

import LoginPage from '@/pages/sign-in';
import SignUpPage from '@/pages/sign-up';

import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signUp } from './services/auth.service';
import { saveIdIndex } from './services/user.service';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  //////////////
  // const [test, setTest] = useState()
  // // async - await로 데이터 fetch 대기
  // async function getTest() {
  //   // document에 대한 참조 생성
  //   const docRef = doc(db, "items", "data");
  //   // 참조에 대한 Snapshot 쿼리
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     setTest(docSnap.data())
  //   }
  // };
  // // 최초 마운트 시에 getTest import
  // useEffect(() => {
  //   getTest()
  // }, [])

  // console.log(test)

  /////////

  const handleSignUp = async () => {
    try {
      const userCredential = await signUp('안녕', '123456789');
      const uid = userCredential.user.uid;

      // id 인덱스를 Firestore에 저장
      await saveIdIndex('안녕', uid);

      // 회원가입 완료 후 이동
      // navigate('/sign-in');
    } catch (err: any) {
      console.error(err);
      // setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <button onClick={handleSignUp}>dfds</button>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            {/* <Route path="/" element={<MainPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
