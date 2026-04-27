import React, { forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "../../../context/ThemeContext";

interface ReCaptchaWidgetProps {
  onVerify: (token: string) => void;
}

const ReCaptchaWidget = forwardRef<ReCAPTCHA, ReCaptchaWidgetProps>(({ onVerify }, ref) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center p-2 ">
      <div className="relative group">
        <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="scale-[0.9] sm:scale-1 origin-center transition-transform duration-300">
          <ReCAPTCHA
            ref={ref}
            key={theme}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            theme={theme}
            onChange={(token) => onVerify(token || "")}
          />
        </div>
      </div>
    </div>
  );
});

export default ReCaptchaWidget;
