import { ERROR_MESSAGES } from '@/constants/errorMessages';

export type FormState = {
  password: string;
  passwordCheck: string;
};

export type ErrorState = {
  password?: string;
  passwordCheck?: string;
};

const registerPasswordValidation = (
  form: FormState,
  touched: Partial<Record<keyof FormState, boolean>>
): { errors: ErrorState; isValid: boolean } => {
  const errors: ErrorState = {};

  if (touched.password) {
    if (!form.password) {
      errors.password = ERROR_MESSAGES.AUTH.REQUIRED_PASSWORD;
    } else if (!/^\d{4}$/.test(form.password)) {
      errors.password = ERROR_MESSAGES.AUTH.PASSWORD_4DIGIT_ONLY;
    }
  }

  if (touched.passwordCheck && !form.passwordCheck) {
    errors.passwordCheck = ERROR_MESSAGES.AUTH.REQUIRED_PASSWORD_CHECK;
  }

  if (
    touched.passwordCheck &&
    form.password &&
    form.passwordCheck &&
    form.password !== form.passwordCheck
  ) {
    errors.passwordCheck = ERROR_MESSAGES.AUTH.PASSWORD_NOT_MATCH;
  }

  const isValid =
    !!form.password && !!form.passwordCheck && form.password === form.passwordCheck;

  return { errors, isValid };
};

export default registerPasswordValidation;
