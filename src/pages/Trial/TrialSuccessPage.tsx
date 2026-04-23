import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import starImg from "../../assets/images/star.png";

const TrialSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard animate-bounce duration-[2000ms]" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Trial Activated!
          </h1>
          <p className="auth-subtitle">
            Explore all features for free.
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg overflow-hidden relative">
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-8 border border-blue-500/30 shadow-lg shadow-blue-500/10">
            <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-brand-textPrimary dark:text-white mb-3">Trial Started</h3>
          <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-10 text-[15px] leading-relaxed max-w-[320px]">
            Your free trial has been successfully activated. You can now start exploring all the tools and data BlueRitt offers.
          </p>

          <PrimaryButton onClick={() => navigate("/login")} fullWidth>
            Login Now →
          </PrimaryButton>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <p className="auth-help-text">
        Need assistance?{" "}
        <a href="https://www.blueritt.com/contact-us/" target="_blank" rel="noopener noreferrer" className="auth-help-link">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default TrialSuccessPage;
