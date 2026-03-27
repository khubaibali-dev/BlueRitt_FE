
import React from "react";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
import starImg from "../../../../assets/images/star.png";

const VerifyOTPCard: React.FC = () => {
  return (
    <div className="otp-container">
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Check your email
          </h1>
          <p className="auth-subtitle">
            We've sent a verification code to <span className="otp-email">abc@gmail.com</span>
          </p>
        </div>
      </div>

      {/* --- CARD --- */}
      <div className="otp-card">
        <div className="otp-card-content">
          <label className="otp-input-label">Enter verification code</label>
          <div className="otp-inputs">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="otp-input"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <PrimaryButton 
          onClick={() => window.location.href = "/dashboard"}
          className="!w-auto min-w-[220px]"
        >
          Verify
        </PrimaryButton>
      </div>

      {/* --- FOOTER --- */}
      <div className="otp-footer">
        Don't see a code? <span className="otp-resend">Resend code</span>
      </div>
    </div>
  );
};

export default VerifyOTPCard;
