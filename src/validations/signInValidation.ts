import { ERROR_MESSAGES } from '@/constants/errorMessages';

export type FormState = {
  id: string;
  password: string;
};

export type ErrorState = {
  id?: string;
  password?: string;
};

const signInValidation = (
  form: FormState,
  touched: Partial<Record<keyof FormState, boolean>>
): { errors: ErrorState; isValid: boolean } => {
  const errors: ErrorState = {};

  if (touched.id && !form.id) {
    errors.id = ERROR_MESSAGES.AUTH.REQUIRED_ID;
  }

  if (touched.password && !form.password) {
    errors.password = ERROR_MESSAGES.AUTH.REQUIRED_PASSWORD;
  }

  const isValid = !!form.id && !!form.password;

  return { errors, isValid };
};

export default signInValidation;
