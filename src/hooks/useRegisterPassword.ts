import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { registerTransferPassword } from '@/services/user.service';
import registerPasswordValidation, {
  ErrorState,
  FormState,
} from '@/validations/registerPasswordValidation';

const useRegisterPassword = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = useState<ErrorState>({});
  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (name: keyof FormState, value: string) => {
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setTouched((prev) => ({ ...prev, [name]: true }));

    const { errors } = registerPasswordValidation(updatedForm, touched);
    setErrors(errors);
  };

  const handleRegisterPassword = async () => {
    if (!user?.uid) return;

    try {
      await registerTransferPassword(user.uid, form.password);
      setIsModalOpen(true);
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, id: err.message }));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const { isValid } = registerPasswordValidation(form, touched);
    setIsFormSubmittable(isValid);
  }, [form, touched]);

  return {
    form,
    errors,
    isFormSubmittable,
    isModalOpen,
    handleChange,
    handleRegisterPassword,
    handleModalClose,
  };
};

export default useRegisterPassword;
