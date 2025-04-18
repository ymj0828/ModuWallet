import { Link } from 'react-router-dom';

import AuthInput from '@/components/common/AuthInput';
import BaseButton from '@/components/common/BaseButton';

const SignInPage = () => {
  return (
    <>
      <p className="mb-[40px] text-[20px] font-medium">
        반가워요!
        <br />
        전에 정해두신 이름과 비밀번호를 입력하시면
        <br />내 계좌와 정보를 확인하실 수 있어요.
      </p>
      <div className="mb-[40px] w-full">
        <div className="flex flex-col gap-8">
          <div className="flex items-end gap-3">
            <AuthInput
              title="내가 정한 이름"
              name="id"
              placeholder="이름을 입력해 주세요"
              propType="text"
            />
            <BaseButton size="fit">중복 확인</BaseButton>
          </div>
          <AuthInput
            title="비밀번호"
            name="password"
            placeholder="이름을 입력해 주세요"
            propType="password"
            isPassword
          />
        </div>
        <div className="mt-8 text-right">
          <label className="inline-flex cursor-pointer select-none items-center gap-2">
            <input
              type="checkbox"
              className="h-5 w-5 cursor-pointer rounded-md border border-gray-300 text-white accent-blue-500"
            />
            <p> 다음에도 이 계정으로 사용하기</p>
          </label>
        </div>
      </div>
      <BaseButton size="full">내 지갑 열기</BaseButton>
      <Link to="/sign-up" className="mt-6 text-[18px] underline underline-offset-4">
        내 계정 만들러 가기
      </Link>
    </>
  );
};

export default SignInPage;
