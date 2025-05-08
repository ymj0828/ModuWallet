import { useEffect, useState } from 'react';

import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { signUp } from '@/services/auth.service';
import { isIdDuplicate, saveIdIndex } from '@/services/user.service';
import signUpValidation, { ErrorState, FormState } from '@/validations/signUpValidation';

const useSignUp = () => {
  const [form, setForm] = useState<FormState>({
    id: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const handleChange = (name: keyof FormState, value: string) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === 'id') {
      setIsIdChecked(false);
    }

    const { errors } = signUpValidation(updatedForm, touched);
    setErrors(errors);
  };

  const handleSignUp = async () => {
    const { errors: newErrors, isValid } = signUpValidation(form, touched);

    if (!isValid || !isIdChecked) {
      setErrors(() => ({
        ...newErrors,
        ...(isIdChecked ? {} : { id: ERROR_MESSAGES.AUTH.REQUIRE_ID_DUPLICATE_CHECK }),
      }));
      return;
    }

    try {
      await signUp(form.id, form.password);
      // 회원가입 성공 모달
      // navigate('/sign-in');
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, id: err.message }));
    }
  };

  useEffect(() => {
    const { isValid } = signUpValidation(form, touched);
    setIsFormSubmittable(isValid && isIdChecked);
  }, [form, isIdChecked, touched]);

  const checkDuplicate = async () => {
    const id = form.id.trim();

    if (id === '') {
      setErrors((prev) => ({
        ...prev,
        id: ERROR_MESSAGES.AUTH.REQUIRED_ID,
      }));
      setIsIdChecked(false);
      return;
    }

    if (id.length < 2 || id.length > 10) {
      setErrors((prev) => ({
        ...prev,
        id: ERROR_MESSAGES.AUTH.ID_LENGTH,
      }));
      setIsIdChecked(false);
      return;
    }

    const isValidFormat = /^[가-힣a-zA-Z0-9]+$/.test(id);
    if (!isValidFormat) {
      setErrors((prev) => ({
        ...prev,
        id: ERROR_MESSAGES.AUTH.ID_INVALID_FORMAT,
      }));
      setIsIdChecked(false);
      return;
    }

    const isDuplicate = await isIdDuplicate(id);

    if (isDuplicate) {
      setErrors((prev) => ({
        ...prev,
        id: ERROR_MESSAGES.AUTH.ID_DUPLICATE,
      }));
      setIsIdChecked(false);
    } else {
      setErrors((prev) => ({ ...prev, id: undefined }));
      setIsIdChecked(true);
      // 중복 확인 성공 모달
      alert('사용 가능한 이름입니다!');
    }
  };

  return {
    form,
    errors,
    isFormSubmittable,
    checkDuplicate,
    handleChange,
    handleSignUp,
  };
};

export default useSignUp;
