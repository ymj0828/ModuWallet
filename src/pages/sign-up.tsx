import { Link } from 'react-router-dom';

import AuthInput from '@/components/common/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import { useSignUp } from '@/hooks/useSignUp';

const SignUpPage = () => {
  const { form, checkDuplicate, handleChange, handleSignUp, error } = useSignUp();

  return (
    <>
      <p className="mb-[40px] text-[20px] font-medium">
        처음 오셨군요!
        <br />
        앞으로 서비스를 이용하실 때 쓸 이름과
        <br />
        비밀번호를 먼저 만들어주세요.
      </p>
      <div className="mb-[40px] w-full">
        <div className="flex flex-col gap-8">
          <div className="flex items-end gap-3">
            <AuthInput
              title="내가 사용할 이름"
              name="id"
              value={form.id}
              placeholder="이름을 입력해 주세요"
              propType="text"
              onChange={(e) => handleChange('id', e.target.value)}
            />
            <BaseButton size="fit" onClick={checkDuplicate}>
              중복 확인
            </BaseButton>
          </div>
          <AuthInput
            title="비밀번호"
            name="password"
            value={form.password}
            placeholder="이름을 입력해 주세요"
            propType="password"
            onChange={(e) => handleChange('password', e.target.value)}
            isPassword
          />
          <AuthInput
            title="비밀번호 확인"
            name="passwordCheck"
            value={form.passwordCheck}
            placeholder="이름을 입력해 주세요"
            propType="password"
            onChange={(e) => handleChange('passwordCheck', e.target.value)}
            isPassword
          />
        </div>
      </div>
      <BaseButton size="full" onClick={handleSignUp}>
        계정 만들기
      </BaseButton>
      <Link to="/sign-in" className="mt-6 text-[18px] underline underline-offset-4">
        이미 만들어둔 계정으로 이용하기
      </Link>
    </>
  );
};

export default SignUpPage;
