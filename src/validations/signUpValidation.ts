import { ERROR_MESSAGES } from '@/constants/errorMessages';

export type FormState = {
  id: string;
  password: string;
  passwordCheck: string;
};

export type ErrorState = {
  id?: string;
  password?: string;
  passwordCheck?: string;
};

const signUpValidation = (
  form: FormState,
  touched: Partial<Record<keyof FormState, boolean>>
): {
  errors: ErrorState;
  isValid: boolean;
} => {
  const errors: ErrorState = {};

  const id = form.id.trim();

  if (touched.id) {
    if (!id) {
      errors.id = ERROR_MESSAGES.AUTH.REQUIRED_ID;
    } else if (id.length < 2 || id.length > 10) {
      errors.id = ERROR_MESSAGES.AUTH.ID_LENGTH;
    } else if (!/^[가-힣a-zA-Z0-9]+$/.test(id)) {
      errors.id = ERROR_MESSAGES.AUTH.ID_INVALID_FORMAT;
    }
  }

  if (touched.password) {
    if (!form.password) {
      errors.password = ERROR_MESSAGES.AUTH.REQUIRED_PASSWORD;
    } else if (form.password.length < 6 || form.password.length > 10) {
      errors.password = ERROR_MESSAGES.AUTH.PASSWORD_LENGTH;
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
    !!form.id &&
    !!form.password &&
    !!form.passwordCheck &&
    form.password === form.passwordCheck;

  return { errors, isValid };
};

export default signUpValidation;
