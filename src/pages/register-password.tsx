import AuthInput from '@/components/common/AuthInput';
import BaseButton from '@/components/common/BaseButton';
import PageHeader from '@/components/common/PageHeader';
import { PLACEHOLDERS } from '@/constants/placeholders';
import useRegisterPassword from '@/hooks/useRegisterPassword';

const RegisterPasswordPage = () => {
  const { form, errors, isFormSubmittable, handleChange, handleRegisterPassword } =
    useRegisterPassword();

  return (
    <>
      <PageHeader title="이체 비밀번호 등록" />
      <div className="mb-[40px] flex flex-col gap-8">
        <AuthInput
          title="비밀번호"
          name="password"
          value={form.password}
          placeholder={PLACEHOLDERS.AUTH.PASSWORD_4DIGIT_ONLY}
          maxLength={4}
          error={errors.password}
          propType="password"
          inputMode="numeric"
          onChange={(e) => handleChange('password', e.target.value)}
          isPassword
        />
        <AuthInput
          title="비밀번호 확인"
          name="passwordCheck"
          value={form.passwordCheck}
          placeholder={PLACEHOLDERS.AUTH.REQUIRED_PASSWORD_CHECK}
          maxLength={4}
          error={errors.passwordCheck}
          propType="password"
          inputMode="numeric"
          onChange={(e) => handleChange('passwordCheck', e.target.value)}
          isPassword
        />
      </div>
      <BaseButton
        size="full"
        onClick={handleRegisterPassword}
        disabled={!isFormSubmittable}
      >
        등록하기
      </BaseButton>
    </>
  );
};

export default RegisterPasswordPage;
