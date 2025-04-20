import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthInput from '@/components/common/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import PageHeader from '@/components/common/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { registerTransferPassword } from '@/services/user.service';

const RegisterPasswordPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: '',
    passwordCheck: '',
  });
  const [error, setError] = useState('');

  const handleChange = (name: 'password' | 'passwordCheck', value: string) => {
    if (!/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { password, passwordCheck } = form;

    if (!/^\d{4}$/.test(password)) {
      setError('비밀번호는 숫자 4자리여야 합니다.');
      return;
    }

    if (password !== passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!user?.uid) return;

    await registerTransferPassword(user.uid, password);
    alert('이체 비밀번호가 등록되었습니다.');
    navigate('/');
  };

  return (
    <div>
      <PageHeader title="이체 비밀번호 등록" />
      <div className="flex flex-col gap-6">
        <AuthInput
          title="비밀번호"
          name="password"
          value={form.password}
          placeholder="숫자 4자리를 입력하세요"
          propType="password"
          maxLength={4}
          inputMode="numeric"
          isPassword
          onChange={(e) => handleChange('password', e.target.value)}
        />
        <AuthInput
          title="비밀번호 확인"
          name="passwordCheck"
          value={form.passwordCheck}
          placeholder="비밀번호를 다시 입력하세요"
          propType="password"
          maxLength={4}
          inputMode="numeric"
          isPassword
          onChange={(e) => handleChange('passwordCheck', e.target.value)}
        />
        {error && <p className="text-red text-center text-sm">{error}</p>}
        <BaseButton size="full" onClick={handleSubmit}>
          등록하기
        </BaseButton>
      </div>
    </div>
  );
};

export default RegisterPasswordPage;
