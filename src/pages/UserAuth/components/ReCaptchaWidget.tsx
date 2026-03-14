// src/pages/UserAuth/components/ReCaptchaWidget.tsx
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "../../../context/ThemeContext";

interface ReCaptchaWidgetProps {
  onVerify: (token: string) => void;
}

const ReCaptchaWidget: React.FC<ReCaptchaWidgetProps> = ({ onVerify }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div
        className="
          flex items-center justify-center rounded-lg
         
          overflow-hidden py-3 transition-colors duration-300
        "
      >
        {/* 
          Google reCAPTCHA is ~304px wide. 
          We scale it to fill the container width more naturally while keeping it crisp.
        */}
        <div className="scale-105 sm:scale-115 origin-center transition-transform duration-300">
          <ReCAPTCHA
            key={theme}
            sitekey="6LcKJoosAAAAAL1Q4t2sbAXzExvdieXu1wz62Yl2"
            theme={theme}
            onChange={(token) => onVerify(token || "")}
          />
        </div>
      </div>
    </div>
  );
};

export default ReCaptchaWidget;
