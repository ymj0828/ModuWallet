import { useState } from 'react';

import { signUp } from '@/services/auth.service';
import { isIdDuplicate, saveIdIndex } from '@/services/user.service';

type FormState = {
  id: string;
  password: string;
  passwordCheck: string;
};

export const useSignUp = () => {
  const [form, setForm] = useState<FormState>({
    id: '',
    password: '',
    passwordCheck: '',
  });

  const [error, setError] = useState('');

  const handleChange = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    if (!form.id || !form.password || !form.passwordCheck) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (form.password !== form.passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const userCredential = await signUp(form.id, form.password);
      await saveIdIndex(form.id, userCredential.user.uid);
      // navigate('/sign-in');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const checkDuplicate = async () => {
    const isDuplicate = await isIdDuplicate(form.id);
    if (isDuplicate) {
      setError('이미 사용 중인 이름입니다.');
    } else {
      setError('');
      alert('사용 가능한 이름입니다!');
    }
  };

  return {
    form,
    checkDuplicate,
    handleChange,
    handleSignUp,
    error,
  };
};
