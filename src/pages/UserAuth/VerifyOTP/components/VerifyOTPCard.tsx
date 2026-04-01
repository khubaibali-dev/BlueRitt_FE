import React, { useRef, useEffect, useState } from "react";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
import starImg from "../../../../assets/images/star.png";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP, login } from "../../../../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyOTPCard: React.FC = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const { setAccessToken, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  
  const pendingEmail = localStorage.getItem("pending_otp_email") || "";
  const pendingPassword = sessionStorage.getItem("pending_otp_password") || "";

  useEffect(() => {
    // Focus the first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (response) => {
      toast.success("Verification successful!");
      
      // Update global auth state
      setAccessToken(response.data.access);
      
      const userProfile = response.data.user;
      setCurrentUser({
        firstName: userProfile.profile.first_name,
        lastName: userProfile.profile.last_name,
        phone: userProfile.profile.phone,
        fullName: userProfile.profile.full_name,
        email: userProfile.email,
      });

      // Clear pending credentials
      localStorage.removeItem("pending_otp_email");
      sessionStorage.removeItem("pending_otp_password");

      // Redirect to dashboard
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.error || error?.response?.data?.detail || "Invalid verification code";
      toast.error(msg);
    }
  });

  const resendMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("OTP resent successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to resend code");
    }
  });

  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const val = e.currentTarget.value;
    if (!/^\d*$/.test(val)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = val;
    setOtpValues(newOtpValues);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newOtpValues = [...otpValues];
    
    digits.forEach((digit, i) => {
      if (i < 6) newOtpValues[i] = digit;
    });

    setOtpValues(newOtpValues);
    const focusIndex = Math.min(digits.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = () => {
    const code = otpValues.join("");
    if (code.length === 6) {
      verifyMutation.mutate({ email: pendingEmail, otp: code });
    } else {
      toast.warn("Please enter all 6 digits");
    }
  };

  const handleResend = () => {
    if (resendMutation.isPending) return;
    if (!pendingEmail || !pendingPassword) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }
    resendMutation.mutate({
      email: pendingEmail,
      password: pendingPassword,
      recaptchaToken: null
    });
  };

  return (
    <div className="otp-container">
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">Check your email</h1>
          <p className="auth-subtitle">
            We've sent a verification code to <span className="otp-email">{pendingEmail || "your email"}</span>
          </p>
        </div>
      </div>

      <div className="otp-card">
        <div className="otp-card-content">
          <label className="otp-input-label">Enter verification code</label>
          <div className="otp-inputs">
            {otpValues.map((val, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                pattern="\d*"
                inputMode="numeric"
                maxLength={1}
                value={val}
                className="otp-input"
                onInput={(e) => handleInput(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={handlePaste}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center">
        <PrimaryButton 
          onClick={handleVerify}
          className="!w-auto min-w-[220px]"
          disabled={verifyMutation.isPending || otpValues.join("").length < 6}
        >
          {verifyMutation.isPending ? "Verifying..." : "Verify"}
        </PrimaryButton>
      </div>

      <div className="otp-footer">
        Don't see a code?{" "}
        <button 
          onClick={handleResend}
          disabled={resendMutation.isPending}
          className="otp-resend !bg-transparent !border-none !p-0"
        >
           {resendMutation.isPending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTPCard;
