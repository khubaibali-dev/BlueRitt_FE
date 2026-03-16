
import React from "react";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";
import starImg from "../../../../assets/images/star.png";

const VerifyOTPCard: React.FC = () => {
  return (
    <div className="otp-container">
      {/* --- HEADER --- */}
      <div className="otp-header">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>
        <h1 className="otp-title">Check your email</h1>
        <p className="otp-subtitle">
          We've sent a verification code to <span className="otp-email">abc@gmail.com</span>
        </p>
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
          <PrimaryButton onClick={() => window.location.href = "/dashboard"}>Verify</PrimaryButton>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="otp-footer">
        Don't see a code? <span className="otp-resend">Resend code</span>
      </div>
    </div>
  );
};

export default VerifyOTPCard;
