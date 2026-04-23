import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { startSubscription } from "../../../api/auth";
import { useToast } from "../../../components/common/Toast/ToastContext";
import PrimaryButton from "../../../components/common/button/PrimaryButton";
import starImg from "../../../assets/images/star.png";


const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error: showToastError } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use window.location.search directly for maximum reliability
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const packageSlug = searchParams.get("package");
  const billingPeriod = searchParams.get("billing_period");
  const isQuickSignupUser = searchParams.get("from_quick_signup")?.toLowerCase() === "true";
  const stripeCustomerId = searchParams.get("stripe_customer_id");

  console.log("RAW SEARCH:", window.location.search);
  console.log("EXTRACTED TOKEN:", token);

  const mutation = useMutation({
    mutationFn: (data: any) => startSubscription(data),
    onSuccess: async (response: any) => {
      if (response.data && response.data.url) {
        setRedirectUrl(response.data.url);
      } else {
        navigate("/trial/success");
      }
      setIsLoading(false);
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        "Verification failed. Please try again or contact support.";
      setError(msg);
      showToastError(msg);
      setIsLoading(false);
    },
    retry: false,
  });

  const called = React.useRef(false);

  useEffect(() => {
    if (token && !called.current) {
      called.current = true;
      mutation.mutate({
        token,
        email,
        packageSlug,
        subscriptionType: isQuickSignupUser ? "regular" : "user_customer_setup",
        billingPeriod: billingPeriod || "monthly",
        stripeCustomerId,
      } as any);
    } else if (!token) {
      const msg = "Invalid verification link. Please check your email or contact support.";
      setError(msg);
      showToastError(msg);
      setIsLoading(false);
    }
  }, [token]);

  const handleContinue = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  const isError = !!error;
  const showLoading = isLoading;

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-500">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            {showLoading ? "Verifying Email" : isError ? "Verification Failed" : redirectUrl ? "Trial Activated Successfully!" : "Email Verified!"}
          </h1>
          <p className="auth-subtitle">
            {showLoading ? "Please wait while we activate your trial..." : isError ? "Something went wrong with your link" : redirectUrl ? "Your trial has been activated. Redirecting you..." : "Your account is almost ready."}
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          {isError ? (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                <span className="text-red-500 text-3xl font-bold">!</span>
              </div>
              <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-8">
                {error}
              </p>
              <PrimaryButton onClick={() => navigate("/login")} fullWidth>
                Return to Login
              </PrimaryButton>
            </>
          ) : showLoading ? (
            <>
              <div className="w-16 h-16 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin mb-6" />
              <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-4">
                We are currently verifying your email address. This will only take a second...
              </p>
            </>
          ) : redirectUrl ? (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-8 text-[15px] leading-relaxed">
                Your email has been successfully verified. Click the button below to complete your checkout.
              </p>
              <PrimaryButton onClick={handleContinue} fullWidth>
                Continue to Checkout →
              </PrimaryButton>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-8 text-[15px] leading-relaxed">
                Your account has been activated successfully. Click the button below to start using BlueRitt.
              </p>
              <PrimaryButton onClick={() => navigate("/login")} fullWidth>
                Go to Login →
              </PrimaryButton>
            </>
          )}
        </div>
      </div>

      {/* ── NEED HELP ── */}
      <p className="auth-help-text">
        Need help?{" "}
        <a href="https://www.blueritt.com/contact-us/" target="_blank" rel="noopener noreferrer" className="auth-help-link">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default VerifyEmailPage;
