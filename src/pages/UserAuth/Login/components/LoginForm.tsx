// src/pages/UserAuth/Login/components/LoginForm.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useToast } from "../../../../components/common/Toast/ToastContext";
import InputField from "../../../../components/common/input/InputField";
import { login } from "../../../../api/auth";
import { encryptPassword } from "../../../../utils/encryption";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";
import { Eye, EyeOff } from "lucide-react";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();

  const togglePassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      recaptchaToken: null as string | null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required."),
      password: Yup.string().required("Password is required."),
    }),
    onSubmit: async (values) => {
      if (!values.recaptchaToken) {
        setCaptchaError("Please complete the reCAPTCHA verification");
        return;
      }
      setCaptchaError("");
      try {
        const encryptedPassword = await encryptPassword(values.password);
        loginMutation.mutate({
          email: values.email,
          password: encryptedPassword,
          recaptchaToken: values.recaptchaToken,
        });
      } catch (err) {
        console.error("Encryption failed:", err);
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response, variables) => {
      if (response.data.user) {
        queryClient.setQueryData(['user'], response.data.user);
      }
      localStorage.setItem("pending_otp_email", variables.email);
      sessionStorage.setItem("pending_otp_password", variables.password);
      window.location.href = "/verify-otp";
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.error || "Invalid credentials or login failed";
      toast.error(msg);
    },
  });

  return (
    <div className="login-card-content">

      <form id="login-form" onSubmit={formik.handleSubmit} className="space-y-4">
        <InputField
          id="email"
          required
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email ? formik.errors.email : ""}
          autoComplete="email"
        />

        <InputField
          id="password"
          label="Password"
          required
          labelRight={
            <Link
              to="/forgot-password"
              className="text-xs text-[#6291DE] hover:underline"
            >
              Forgot Password?
            </Link>
          }
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password ? formik.errors.password : ""}
          rightElement={
            <button
              type="button"
              className="text-brand-textSecondary hover:text-brand-textPrimary transition-colors flex items-center justify-center h-full pr-1"
              onClick={togglePassword}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />

        <div className="space-y-1">
          <ReCaptchaWidget
            onVerify={(token: string) => {
              formik.setFieldValue("recaptchaToken", token);
              setCaptchaError("");
            }}
          />
          {captchaError && (
            <p className="text-xs text-red-400 mt-1 text-center" role="alert">
              {captchaError}
            </p>
          )}
        </div>
      </form>


    </div>
  );
};

export default LoginForm;
