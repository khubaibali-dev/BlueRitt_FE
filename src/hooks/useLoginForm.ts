// src/hooks/useLoginForm.ts
import { useState, ChangeEvent, FormEvent } from "react";

interface LoginFields {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginFields, string>>;

const validate = (fields: LoginFields): LoginErrors => {
  const errors: LoginErrors = {};
  if (!fields.email) {
    errors.email = "Email required hai.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Valid email address daalen.";
  }
  if (!fields.password) {
    errors.password = "Password required hai.";
  } else if (fields.password.length < 6) {
    errors.password = "Password kam az kam 6 characters ka hona chahiye.";
  }
  return errors;
};

const useLoginForm = () => {
  const [fields, setFields] = useState<LoginFields>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleChange = (field: keyof LoginFields) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!captchaVerified) {
      alert("Please verify you are not a robot.");
      return;
    }
    setLoading(true);
    // API call yahan hogi
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    // Success handling
  };

  return {
    fields,
    errors,
    showPassword,
    loading,
    captchaVerified,
    setCaptchaVerified,
    handleChange,
    togglePassword,
    handleSubmit,
  };
};

export default useLoginForm;
