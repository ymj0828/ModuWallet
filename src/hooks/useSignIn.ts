import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { login } from '@/services/auth.service';
import signInValidation, { ErrorState, FormState } from '@/validations/signInValidation';

type LoginFormState = {
  id: string;
  password: string;
};

const useSignIn = () => {
  const [form, setForm] = useState<LoginFormState>({
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  const navigate = useNavigate();

  const handleChange = (name: keyof LoginFormState, value: string) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setTouched((prev) => ({ ...prev, [name]: true }));

    const { errors } = signInValidation(updatedForm, touched);
    setErrors(errors);
  };

  const handleSigIn = async () => {
    try {
      await login(form.id, form.password);
      navigate('/');
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, id: ERROR_MESSAGES.AUTH.LOGIN_FAILED }));
    }
  };

  useEffect(() => {
    const { isValid } = signInValidation(form, touched);
    setIsFormSubmittable(isValid);
  }, [form, touched]);

  return {
    form,
    errors,
    isFormSubmittable,
    handleChange,
    handleSigIn,
  };
};

export default useSignIn;
