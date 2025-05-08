import { Link } from 'react-router-dom';

import AuthInput from '@/components/common/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import { PLACEHOLDERS } from '@/constants/placeholders';
import useSignIn from '@/hooks/useSignIn';

const SignInPage = () => {
  const { form, errors, isFormSubmittable, handleChange, handleSigIn } = useSignIn();

  return (
    <>
      <p className="mb-[40px] text-[20px] font-medium text-black-to-white">
        반가워요!
        <br />
        전에 정해두신 이름과 비밀번호를 입력하시면
        <br />내 계좌와 정보를 확인하실 수 있어요.
      </p>
      <div className="mb-[40px] flex w-full flex-col gap-8">
        <AuthInput
          title="내가 정한 이름"
          name="id"
          value={form.id}
          placeholder={PLACEHOLDERS.AUTH.REQUIRED_ID}
          error={errors.id}
          propType="text"
          onChange={(e) => handleChange('id', e.target.value)}
        />
        <AuthInput
          title="비밀번호"
          name="password"
          value={form.password}
          placeholder={PLACEHOLDERS.AUTH.REQUIRED_PASSWORD}
          error={errors.password}
          propType="password"
          onChange={(e) => handleChange('password', e.target.value)}
          isPassword
        />
      </div>
      <BaseButton size="full" onClick={handleSigIn} disabled={!isFormSubmittable}>
        내 지갑 열기
      </BaseButton>
      <Link
        to="/sign-up"
        className="mt-6 text-[18px] text-black-to-white underline underline-offset-4"
      >
        내 계정 만들러 가기
      </Link>
    </>
  );
};

export default SignInPage;
