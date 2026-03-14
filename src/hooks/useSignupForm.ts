// src/hooks/useSignupForm.ts
import { useState, ChangeEvent, FormEvent } from "react";

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

type SignupErrors = Partial<Record<keyof SignupFields, string>>;

const validate = (fields: SignupFields): SignupErrors => {
  const errors: SignupErrors = {};
  if (!fields.firstName) errors.firstName = "First name required hai.";
  if (!fields.lastName) errors.lastName = "Last name required hai.";
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
  if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords match nahi karte.";
  }
  if (!fields.termsAccepted) {
    errors.termsAccepted = "Aapko terms accept karni hungi.";
  }
  return errors;
};

const useSignupForm = () => {
  const [fields, setFields] = useState<SignupFields>({ 
    firstName: "",
    lastName: "",
    email: "", 
    country: "Pakistan",
    whatsapp: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });
  const [errors, setErrors] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const handleChange = (field: keyof SignupFields) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFields((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleCaptchaVerify = (tokenOrBool: string | boolean | null) => {
    if (typeof tokenOrBool === "string" && tokenOrBool) {
      setCaptchaVerified(true);
    } else if (typeof tokenOrBool === "boolean") {
      setCaptchaVerified(tokenOrBool);
    } else {
      setCaptchaVerified(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

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
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
  };

  return {
    fields,
    errors,
    showPassword,
    showConfirmPassword,
    loading,
    captchaVerified,
    setCaptchaVerified: handleCaptchaVerify,
    handleChange,
    togglePassword,
    toggleConfirmPassword,
    handleSubmit,
  };
};

export default useSignupForm;
