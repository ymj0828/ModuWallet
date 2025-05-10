import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { signUp } from '@/services/auth.service';
import { isIdDuplicate } from '@/services/user.service';
import signUpValidation, { ErrorState, FormState } from '@/validations/signUpValidation';

const useSignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    id: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isIdDuplicateSuccessModalOpen, setIsIdDuplicateSuccessModalOpen] =
    useState(false);
  const [isSignUpSuccessModalOpen, setIsSignUpSuccessModalOpen] = useState(false);

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
      setIsSignUpSuccessModalOpen(true);
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, id: err.message }));
    }
  };

  const handleSignUpSuccessModalClose = () => {
    setIsSignUpSuccessModalOpen(false);
    navigate('/sign-in');
  };

  useEffect(() => {
    const { isValid } = signUpValidation(form, touched);
    setIsFormSubmittable(isValid && isIdChecked);
  }, [form, isIdChecked, touched]);

  const checkDuplicate = async () => {
    const id = form.id.trim();

    const isDuplicate = await isIdDuplicate(id);

    if (isDuplicate) {
      setErrors((prev) => ({
        ...prev,
        id: ERROR_MESSAGES.AUTH.ID_DUPLICATE,
      }));
      setIsIdChecked(false);
    } else {
      setIsIdChecked(true);
      setIsIdDuplicateSuccessModalOpen(true);
    }
  };

  const handleIdDuplicateSuccessModalClose = () => {
    setIsIdDuplicateSuccessModalOpen(false);
  };

  const isIdValid = useMemo(() => {
    const { errors } = signUpValidation(form, { id: true });
    return !errors.id;
  }, [form.id]);

  return {
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
  };
};

export default useSignUp;
