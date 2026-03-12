// src/components/auth/ReCaptchaWidget.tsx
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaWidgetProps {
  onVerify: (verified: boolean) => void;
}

const ReCaptchaWidget: React.FC<ReCaptchaWidgetProps> = ({ onVerify }) => (
  <div className="flex flex-col gap-[6px] w-full">
    <div
      className="
        flex items-center justify-center rounded-lg
        border border-[#082656]
        overflow-hidden py-3
      "
    >
      {/* 
        Google reCAPTCHA is ~304px wide. 
        We scale it to fill the container width more naturally while keeping it crisp.
      */}
      <div className="scale-105 sm:scale-115 origin-center transition-transform duration-300">
        <ReCAPTCHA
          sitekey="6LdnD4gsAAAAAGl9e-HLLnX5SwogpyVBrtaqHIgr"
          theme="dark"

          onChange={(token) => onVerify(!!token)}
        />
      </div>
    </div>
  </div>
);

export default ReCaptchaWidget;
