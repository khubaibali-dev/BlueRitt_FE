import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import starImg from "../../assets/images/star.png";

const SubscriptionCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard grayscale opacity-70" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Payment Cancelled
          </h1>
          <p className="auth-subtitle">
            You haven't been charged.
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-brand-textPrimary dark:text-white mb-2">Setup Interrupted</h3>
          <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-8 text-[14px] leading-relaxed">
            The subscription process was cancelled. No charges were made to your account. You can try again whenever you're ready.
          </p>

          <div className="flex flex-col w-full gap-3">
            <PrimaryButton onClick={() => navigate("/select-plan")} fullWidth>
              Return to Pricing
            </PrimaryButton>
            <button
              onClick={() => navigate("/login")}
              className="text-[13px] font-bold text-brand-textSecondary hover:text-brand-textPrimary transition-all py-2"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>

      {/* ── HELP ── */}
      <p className="auth-help-text">
        Having trouble with payment?{" "}
        <a href="https://www.blueritt.com/contact-us/" target="_blank" rel="noopener noreferrer" className="auth-help-link">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default SubscriptionCancel;
