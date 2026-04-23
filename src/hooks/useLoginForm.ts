// src/hooks/useLoginForm.ts
import { useState, ChangeEvent, FormEvent } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface LoginFields {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginFields | "captcha", string>>;

const validate = (fields: LoginFields): LoginErrors => {
  const errors: LoginErrors = {};
  if (!fields.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
};

const useLoginForm = () => {
  const { setAccessToken } = useAuth();
  const [fields, setFields] = useState<LoginFields>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (field: keyof LoginFields) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (apiError) setApiError("");
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  // Called by ReCaptchaWidget — receives the raw token string or null
  const handleCaptchaVerify = (tokenOrBool: string | boolean | null) => {
    if (typeof tokenOrBool === "string" && tokenOrBool) {
      setCaptchaVerified(true);
      setRecaptchaToken(tokenOrBool);
    } else if (typeof tokenOrBool === "boolean") {
      // Legacy boolean usage from existing ReCaptchaWidget (onChange={val => setCaptchaVerified(val)})
      setCaptchaVerified(tokenOrBool);
    } else {
      setCaptchaVerified(false);
      setRecaptchaToken(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError("");

    const validationErrors = validate(fields);
    
    if (!captchaVerified) {
      validationErrors.captcha = "Please complete the reCAPTCHA verification";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await login({
        email: fields.email,
        password: fields.password,
        recaptchaToken: recaptchaToken,
      });
      // Store token — API returns { access: "...", refresh: "..." }
      const token = response.data?.access || response.data?.token;
      if (token) {
        setAccessToken(token);
      }
      // Redirect to dashboard / home after successful login
      window.location.href = "/";
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        "Invalid email or password. Please try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    fields,
    errors,
    apiError,
    showPassword,
    loading,
    captchaVerified,
    setCaptchaVerified: handleCaptchaVerify,
    handleChange,
    togglePassword,
    handleSubmit,
  };
};

export default useLoginForm;
