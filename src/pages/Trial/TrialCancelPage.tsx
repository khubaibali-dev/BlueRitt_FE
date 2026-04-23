import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/button/PrimaryButton";
import starImg from "../../assets/images/star.png";

const TrialCancelPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-700">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard grayscale" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Trial Activation Cancelled
          </h1>
          <p className="auth-subtitle">
            The process was not completed.
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg overflow-hidden relative">
        <div className="px-8 pt-9 pb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-brand-textPrimary dark:text-white mb-2">Activation Interrupted</h3>
          <p className="text-brand-textPrimary dark:text-brand-textSecondary mb-8 text-[14px] leading-relaxed">
            We couldn't activate your free trial at this time. This usually happens if the verification process is interrupted.
          </p>
          
          <PrimaryButton onClick={() => navigate("/select-plan")} fullWidth>
            Try Again
          </PrimaryButton>
        </div>
      </div>

      {/* ── HELP ── */}
      <p className="auth-help-text">
        Need assistance?{" "}
        <a href="https://www.blueritt.com/contact-us/" target="_blank" rel="noopener noreferrer" className="auth-help-link">
          Support is here to help
        </a>
      </p>
    </div>
  );
};

export default TrialCancelPage;
