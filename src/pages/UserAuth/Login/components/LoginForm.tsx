// src/pages/UserAuth/Login/components/LoginForm.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../../../components/common/input/InputField";
import { login } from "../../../../api/auth";
import { encryptPassword } from "../../../../utils/encryption";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";
import { Eye, EyeOff } from "lucide-react";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const togglePassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      recaptchaToken: null as string | null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
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
      <div className="text-center mb-6">
        <h1 className="auth-title">Welcome back!</h1>
        <p className="auth-subtitle">
          Please enter your details to sign in
        </p>
      </div>

      <form id="login-form" onSubmit={formik.handleSubmit} className="space-y-4">
        <InputField
          id="email"
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
              className="text-[#99A1AF] hover:text-white transition-colors flex items-center justify-center h-full pr-1"
              onClick={togglePassword}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />

        <ReCaptchaWidget
          onVerify={(token: string) => formik.setFieldValue("recaptchaToken", token)}
        />
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#6291DE] hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
