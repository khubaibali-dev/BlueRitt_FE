import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "../../../../components/common/Toast/ToastContext";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
import InputField from "../../../../components/common/input/InputField";
import { resetPassword } from "../../../../api/auth";
import { encryptPassword } from "../../../../utils/encryption";
import starImg from "../../../../assets/images/star.png";
import { Eye, EyeOff } from "lucide-react";

enum PageState {
  Form = "Form",
  Success = "Success",
  Invalid = "Invalid",
}

const ResetPasswordCard: React.FC = () => {
  const [page, setPage] = useState<PageState>(PageState.Form);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState<string>("");
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");

    if (!tokenParam) {
      setPage(PageState.Invalid);
      toast.error("Invalid or missing password reset token");
    } else {
      setToken(tokenParam);
    }
  }, [location.search, toast]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        const encryptedPassword = await encryptPassword(values.password);
        resetPasswordMutation.mutate({
          newPassword: encryptedPassword,
          otp: token,
        });
      } catch (err) {
        console.error("Encryption failed:", err);
        toast.error("Encryption failed. Please try again.");
      }
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setPage(PageState.Success);
      toast.success("Your password has been reset successfully");
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.error || "An error occurred. Please try again.";
      toast.error(msg);
    },
  });

  if (page === PageState.Success) {
    return (
      <div className="otp-container">
        <div className="flex flex-col items-center w-full">
          <div className="mb-4">
            <img src={starImg} alt="" className="brand-star-standard" />
          </div>
          <div className="text-center mb-2">
            <h1 className="auth-title">Success!</h1>
            <p className="auth-subtitle">
              Your password has been reset successfully. <br />
              You can now log in with your new password.
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

  if (page === PageState.Invalid) {
    return (
      <div className="otp-container">
        <div className="flex flex-col items-center w-full">
          <div className="mb-4">
            <img src={starImg} alt="" className="brand-star-standard" />
          </div>
          <div className="text-center mb-2">
            <h1 className="auth-title text-red-500">Invalid Link</h1>
            <p className="auth-subtitle">
              The password reset link is invalid or has expired. <br />
              Please request a new password reset.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-6">
          <Link to="/forgot-password">
            <PrimaryButton className="!w-auto min-w-[220px]">
              Request New Link
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
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">
            Please enter your new password below.
          </p>
        </div>
      </div>

      {/* --- CARD --- */}
      <div className="otp-card">
        <div className="px-8 pt-9 pb-8 flex flex-col gap-y-4">
          <InputField
            id="password"
            label="New Password"
            required
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : ""}
            rightElement={
              <button
                type="button"
                className="text-brand-textSecondary hover:text-brand-textPrimary transition-colors flex items-center justify-center h-full pr-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            }
          />

          <InputField
            id="confirmPassword"
            label="Confirm Password"
            required
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
            rightElement={
              <button
                type="button"
                className="text-brand-textSecondary hover:text-brand-textPrimary transition-colors flex items-center justify-center h-full pr-1"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            }
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <PrimaryButton
          onClick={() => formik.handleSubmit()}
          className="!w-auto min-w-[220px]"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
        </PrimaryButton>
      </div>

      {/* --- FOOTER --- */}
      <div className="otp-footer">
        Back to{" "}
        <Link to="/login" className="otp-resend !bg-transparent text-[#6291DE] !border-none !p-0">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordCard;
