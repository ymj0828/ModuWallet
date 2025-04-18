import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '@/services/auth.service';

type LoginFormState = {
  id: string;
  password: string;
};

export const useLogin = () => {
  const [form, setForm] = useState<LoginFormState>({
    id: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (name: keyof LoginFormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!form.id || !form.password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      await login(form.id, form.password);
      navigate('/');
    } catch (err: any) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return {
    form,
    handleChange,
    handleLogin,
    error,
  };
};
