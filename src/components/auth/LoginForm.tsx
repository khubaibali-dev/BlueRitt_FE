// src/components/auth/LoginForm.tsx
import React from "react";
import useLoginForm from "../../hooks/useLoginForm";
import InputField from "../ui/InputField";
import ReCaptchaWidget from "./ReCaptchaWidget";

// --- SVG Icons ---
interface IconProps {
  className?: string;
}

const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5.833A1.667 1.667 0 014.167 4.167h11.666A1.667 1.667 0 0117.5 5.833v8.334a1.667 1.667 0 01-1.667 1.666H4.167A1.667 1.667 0 012.5 14.167V5.833z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 5.833L10 10.833l7.5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.833 9.167V6.667a4.167 4.167 0 018.334 0v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3.333" y="9.167" width="13.334" height="8.333" rx="1.667" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="10" cy="13.333" r="1.25" fill="currentColor" />
  </svg>
);

const EyeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.667 10S4.167 4.167 10 4.167 18.333 10 18.333 10 15.833 15.833 10 15.833 1.667 10 1.667 10z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const EyeOffIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 2.5l15 15M8.82 8.82A2.5 2.5 0 0012.5 11.18M6.59 5.76C4.4 7.1 2.5 10 2.5 10s2.5 4.167 7.5 4.167c1.3 0 2.44-.3 3.41-.77" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 10s-2.5 4.167-7.5 4.167" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LoginForm: React.FC = () => {
  const {
    fields,
    errors,
    showPassword,
    setCaptchaVerified,
    handleChange,
    togglePassword,
    handleSubmit,
  } = useLoginForm();

  const PasswordToggle = (
    <button
      type="button"
      onClick={togglePassword}
      className="text-[#7A9ABF] hover:text-white transition-colors duration-150 focus:outline-none"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOffIcon className="w-[18px] h-[18px]" />
      ) : (
        <EyeIcon className="w-[18px] h-[18px]" />
      )}
    </button>
  );

  return (
    <form id="login-form" onSubmit={handleSubmit} noValidate className="w-full space-y-4">

      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="name@company.com"
        value={fields.email}
        onChange={handleChange("email")}
        icon={MailIcon}
        error={errors.email}
        autoComplete="email"
      />

      <InputField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        value={fields.password}
        onChange={handleChange("password")}
        icon={LockIcon}
        error={errors.password}
        rightElement={PasswordToggle}
        autoComplete="current-password"
      />

      {/* ── RECAPTCHA ── */}
      <ReCaptchaWidget onVerify={(val) => setCaptchaVerified(val)} />

    </form>
  );
};

export default LoginForm;

