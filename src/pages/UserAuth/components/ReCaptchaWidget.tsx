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
    <div className="flex flex-col items-center justify-center p-2 ">
      <div className="relative group">
        <div className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="scale-[0.9] sm:scale-1 origin-center transition-transform duration-300">
          {/* <ReCAPTCHA
            key={theme}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            theme={theme}
            onChange={(token) => onVerify(token || "")}
          /> */}
        </div>
      </div>

      {/* --- Dev Bypass --- */}
      {/* {window.location.hostname === "localhost" && (
        <button
          type="button"
          onClick={() => onVerify("dev-bypass-token")}
          className="mt-4 px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-white/40 hover:text-white/80 border border-white/10 hover:border-brand-primary/50 rounded-lg transition-all"
        >
        </button>
      )} */}
    </div>
  );
};

export default ReCaptchaWidget;
