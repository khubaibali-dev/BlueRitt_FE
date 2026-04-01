import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
import InputField from "../../../../components/common/input/InputField";
import { forgotPassword } from "../../../../api/auth";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";
import starImg from "../../../../assets/images/star.png";

const ForgotPasswordCard: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      recaptchaToken: null as string | null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      recaptchaToken: Yup.string().required("Please complete the reCAPTCHA"),
    }),
    onSubmit: (values) => {
      forgotPasswordMutation.mutate({
        email: values.email,
        recaptchaToken: values.recaptchaToken as string,
      });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("OTP resent successfully");
      setIsSubmitted(true);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.error || "Failed to send reset link";
      toast.error(msg);
    },
  });

  if (isSubmitted) {
    return (
      <div className="otp-container">
        <div className="flex flex-col items-center w-full">
          <div className="mb-4">
            <img src={starImg} alt="" className="brand-star-standard" />
          </div>
          <div className="text-center mb-2">
            <h1 className="auth-title">Check your email</h1>
            <p className="auth-subtitle">
              We've sent password reset instructions to <br />
              <span className="otp-email">{formik.values.email}</span>
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <Link to="/login">
            <PrimaryButton className="!w-auto min-w-[220px]">
              Back to Sign In
            </PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="otp-container">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">Forgot Password?</h1>
          <p className="auth-subtitle">
            Don't worry, it happens. Enter your email below.
          </p>
        </div>
      </div>

      {/* --- CARD --- */}
      <div className="otp-card">
        <div className="px-8 pt-9 pb-8 !gap-y-4">
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

          <div className="py-2">
            <ReCaptchaWidget
              onVerify={(token: string) => formik.setFieldValue("recaptchaToken", token)}
            />
            {formik.touched.recaptchaToken && formik.errors.recaptchaToken && (
              <p className="text-red-500 text-[10px] text-center mt-1 uppercase font-bold tracking-wider opacity-70">
                {formik.errors.recaptchaToken}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <PrimaryButton
          onClick={() => formik.handleSubmit()}
          className="!w-auto min-w-[220px]"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
        </PrimaryButton>
      </div>

      {/* --- FOOTER --- */}
      <div className="otp-footer">
        Remember your password?{" "}
        <Link to="/login" className="otp-resend !bg-transparent text-[#6291DE] !border-none !p-0">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;
