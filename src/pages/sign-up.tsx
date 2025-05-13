import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthInput from '@/components/common/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import ConfirmModal from '@/components/common/ConfirmModal';
import { INPUT_DESCRIPTIONS } from '@/constants/inputDescriptions';
import { PLACEHOLDERS } from '@/constants/placeholders';
import useSignUp from '@/hooks/useSignUp';

const SignUpPage = () => {
  const {
    form,
    errors,
    isFormSubmittable,
    isIdValid,
    checkDuplicate,
    handleChange,
    handleSignUp,
    isSignUpSuccessModalOpen,
    handleSignUpSuccessModalClose,
    isIdDuplicateSuccessModalOpen,
    handleIdDuplicateSuccessModalClose,
  } = useSignUp();

  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  return (
    <>
      <p className="mb-[40px] text-[20px] font-medium text-black-to-white">
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
              placeholder={PLACEHOLDERS.AUTH.REQUIRED_ID}
              minLength={2}
              maxLength={10}
              error={errors.id}
              propType="text"
              onChange={(e) => handleChange('id', e.target.value)}
              description={INPUT_DESCRIPTIONS.id}
              openPopoverId={openPopoverId}
              setOpenPopoverId={setOpenPopoverId}
            />
            <BaseButton size="fit" disabled={!isIdValid} onClick={checkDuplicate}>
              중복 확인
            </BaseButton>
          </div>
          <AuthInput
            title="비밀번호"
            name="password"
            value={form.password}
            placeholder={PLACEHOLDERS.AUTH.REQUIRED_PASSWORD}
            minLength={6}
            maxLength={10}
            error={errors.password}
            propType="password"
            onChange={(e) => handleChange('password', e.target.value)}
            isPassword
            description={INPUT_DESCRIPTIONS.password}
            openPopoverId={openPopoverId}
            setOpenPopoverId={setOpenPopoverId}
          />
          <AuthInput
            title="비밀번호 확인"
            name="passwordCheck"
            value={form.passwordCheck}
            placeholder={PLACEHOLDERS.AUTH.REQUIRED_PASSWORD_CHECK}
            error={errors.passwordCheck}
            propType="password"
            onChange={(e) => handleChange('passwordCheck', e.target.value)}
            isPassword
          />
        </div>
      </div>

      <BaseButton size="full" onClick={handleSignUp} disabled={!isFormSubmittable}>
        계정 만들기
      </BaseButton>

      <Link
        to="/sign-in"
        className="mt-6 text-[18px] text-black-to-white underline underline-offset-4"
      >
        이미 만들어둔 계정으로 이용하기
      </Link>

      <ConfirmModal
        text="회원가입이 완료되었습니다"
        open={isSignUpSuccessModalOpen}
        onClose={handleSignUpSuccessModalClose}
      />

      <ConfirmModal
        text="사용 가능한 이름입니다"
        open={isIdDuplicateSuccessModalOpen}
        onClose={handleIdDuplicateSuccessModalClose}
      />
    </>
  );
};

export default SignUpPage;
