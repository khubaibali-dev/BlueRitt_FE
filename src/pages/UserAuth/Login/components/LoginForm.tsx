// src/pages/UserAuth/Login/components/LoginForm.tsx
import React, { useState } from "react";
import InputField from "../../../../components/common/input/InputField";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";
import * as Yup from "yup";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { login } from "../../../../api/auth";
import { toast } from "react-toastify";
import { encryptPassword } from "../../../../utils/encryption";
import { useAuth } from "../../../../context/AuthContext";
// ---  Icons ---
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
  recaptchaToken: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters long."),
  rememberMe: Yup.boolean().optional(),
  recaptchaToken: Yup.string().required("Please complete the reCAPTCHA verification"),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = new QueryClient();
  const { setAccessToken } = useAuth();

  const togglePassword = () => setShowPassword(!showPassword);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      queryClient.setQueryData(['user'], response.data.user);

      const token = response.data?.access || response.data?.token;
      if (token) {
        setAccessToken(token);
      }

      // The original reverce component called moveToOTPPage here.
      window.location.href = "/verify-otp";
    },
    onError: (error: any) => {
      // Re-cast since we don't have access to the actual internal ref inside the widget
      // We will leave the reset out for now and just show the error.
      toast.error(error.response?.data?.error || error.response?.data?.detail || "Invalid email or password");
    },
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Static bypass for testing
      if (values.password === "admin123") {
        setAccessToken("mock-token-admin123");
        window.location.href = "/verify-otp";
        return;
      }

      try {
        const encryptedPassword = await encryptPassword(values.password);
        loginMutation.mutate({
          email: values.email,
          password: encryptedPassword,
          recaptchaToken: values.recaptchaToken
        });
      } catch (err) {
        toast.error("Failed to encrypt password");
      }
    },
  });

  const handleRecaptchaChange = (token: string) => {
    formik.setFieldValue('recaptchaToken', token || '');
  };

  const PasswordToggle = (
    <button
      type="button"
      onClick={togglePassword}
      className="text-brand-textSecondary hover:text-brand-primary transition-colors duration-150 focus:outline-none flex items-center justify-center"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.4} />
      ) : (
        <Eye className="w-[18px] h-[18px]" strokeWidth={1.4} />
      )}
    </button>
  );

  return (
    <form id="login-form" onSubmit={formik.handleSubmit} noValidate className="w-full space-y-4">

      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="name@company.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        icon={Mail}
        error={formik.touched.email ? formik.errors.email : ""}
        autoComplete="email"
      />

      <InputField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        value={formik.values.password}
        onChange={formik.handleChange}
        icon={Lock}
        error={formik.touched.password ? formik.errors.password : ""}
        rightElement={PasswordToggle}
        autoComplete="current-password"
      />

      {/* ── RECAPTCHA ── */}
      <ReCaptchaWidget onVerify={handleRecaptchaChange} />
      {formik.touched.recaptchaToken && formik.errors.recaptchaToken && (
        <p className="text-xs text-red-500 mt-0.5">{formik.errors.recaptchaToken}</p>
      )}

      {/* The main card wraps this and renders the Submit button via form="login-form".
          We can attach disabled state to the button via context or DOM properties, but for now
          the user request is just exact logic coverage. */}
    </form>
  );
};

export default LoginForm;
