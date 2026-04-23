import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import starImg from "../../assets/images/star.png";

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard animate-pulse" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Subscription Active!
          </h1>
          <p className="auth-subtitle">
            Welcome to the premium experience.
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg overflow-hidden relative">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-8 border border-green-500/30 shadow-lg shadow-green-500/10">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-brand-textPrimary dark:text-white mb-3">Payment Successful</h3>
          <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-10 text-[15px] leading-relaxed max-w-[320px]">
            Your subscription has been activated successfully. You now have full access to all premium features of BlueRitt.
          </p>

          <PrimaryButton onClick={() => navigate("/login")} fullWidth>
            Go to Login
          </PrimaryButton>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <p className="auth-help-text">
        Ready to scale your business?{" "}
        <span className="text-brand-primary font-bold">Let's get started.</span>
      </p>
    </div>
  );
};

export default SubscriptionSuccess;
