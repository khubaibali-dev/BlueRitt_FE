// src/hooks/useSignupForm.ts
import { useState, ChangeEvent, FormEvent } from "react";
import { useToast } from "../components/common/Toast/ToastContext";

interface SignupFields {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

type SignupErrors = Partial<Record<keyof SignupFields | "captcha", string>>;

const validate = (fields: SignupFields): SignupErrors => {
  const errors: SignupErrors = {};
  if (!fields.firstName) errors.firstName = "First name is required.";
  if (!fields.lastName) errors.lastName = "Last name is required.";
  if (!fields.email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }
  if (!fields.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (!fields.termsAccepted) {
    errors.termsAccepted = "You must accept the terms and conditions.";
  }
  return errors;
};

interface SignupFormProps {
  onSuccess?: (data: SignupFields, token: string) => void;
}

import { useSignupData } from "../context/SignupContext";

const useSignupForm = (props?: SignupFormProps) => {
  const { fields, setFields, captchaToken, setCaptchaToken } = useSignupData();
  const { error: showToastError } = useToast();
  const [errors, setErrors] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (field: keyof SignupFields) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFields((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCaptchaVerify = (token: string | null) => {
    setCaptchaToken(token);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    
    const currentCaptchaToken = captchaToken;
    if (!currentCaptchaToken) {
      validationErrors.captcha = "Please complete the reCAPTCHA verification";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    
    if (props?.onSuccess && currentCaptchaToken) {
      props.onSuccess(fields, currentCaptchaToken);
    }
  };

  return {
    fields,
    errors,
    showPassword,
    showConfirmPassword,
    loading,
    captchaVerified: !!captchaToken,
    setCaptchaVerified: handleCaptchaVerify,
    handleChange,
    togglePassword,
    toggleConfirmPassword,
    handleSubmit,
  };
};

export default useSignupForm;
