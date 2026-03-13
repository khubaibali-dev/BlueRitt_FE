// src/components/auth/SignupForm.tsx
import React from "react";
import useSignupForm from "../../hooks/useSignupForm";
import InputField from "../ui/InputField";
import CountrySelect from "../ui/CountrySelect";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCaptchaWidget from "./ReCaptchaWidget";

// --- SVG Icons ---
interface IconProps {
  className?: string;
}

const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 17c0-2.667 4-4 8-4s8 1.333 8 4v1H2v-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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



const SignupForm: React.FC = () => {
  const {
    fields,
    errors,
    showPassword,
    setCaptchaVerified,
    handleChange,
    togglePassword,
    handleSubmit,
  } = useSignupForm();

  // Custom handler for PhoneInput since it returns the string directly
  const handlePhoneChange = (value: string) => {
    handleChange("whatsapp")({
      target: { value, type: "text" }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCountryChange = (name: string) => {
    handleChange("country")({
      target: { value: name, type: "text" }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const PasswordToggle = (
    <button
      type="button"
      onClick={togglePassword}
      className="text-brand-textSecondary hover:text-brand-primary transition-colors duration-150 focus:outline-none"
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
    <form id="signup-form" onSubmit={handleSubmit} noValidate className="w-full space-y-4">

      {/* ── NAME FIELDS (Grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          label="First Name"
          placeholder="First Name"
          value={fields.firstName}
          onChange={handleChange("firstName")}
          icon={UserIcon}
          error={errors.firstName}
        />
        <InputField
          id="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={fields.lastName}
          onChange={handleChange("lastName")}
          icon={UserIcon}
          error={errors.lastName}
        />
      </div>

      {/* ── EMAIL FIELD ── */}
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

      {/* ── COUNTRY & WHATSAPP (Grid) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CountrySelect
          label="Country"
          value={fields.country}
          onChange={handleCountryChange}
          error={errors.country}
        />
        <div className="flex flex-col gap-[6px]">
          <label className="text-[14px]  leading-[16px] tracking-[0px] text-brand-textPrimary">
            Whatsapp(Optional)
          </label>
          <div className="phone-input-wrapper">
            <PhoneInput
              country={"pk"}
              value={fields.whatsapp}
              onChange={handlePhoneChange}
              placeholder="xxx xxxx xxx"
              dropdownStyle={{ zIndex: 100 }}
            />
          </div>
          {errors.whatsapp && <p className="text-xs text-red-400 mt-0.5" role="alert">{errors.whatsapp}</p>}
        </div>
      </div>

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
        autoComplete="new-password"
      />

      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={fields.confirmPassword}
        onChange={handleChange("confirmPassword")}
        icon={LockIcon}
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      {/* ── RECAPTCHA ── */}
      <ReCaptchaWidget onVerify={(val) => setCaptchaVerified(val)} />

      {/* ── TERMS & CONDITIONS ── */}
      <div className="flex items-start gap-3 mt-4">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={fields.termsAccepted}
              onChange={handleChange("termsAccepted")}
            />
            <div className={`w-[18px] h-[18px] rounded-sm border-2 flex items-center justify-center transition-all duration-200
              ${fields.termsAccepted ? "bg-[#3B82F6] border-[#3B82F6]" : "bg-transparent border-[#6B8CAD]"}`}>
              {fields.termsAccepted && (
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-[14px] font-normal leading-[16px] tracking-[0px] text-brand-textPrimary">
            By creating an account you agree to our Terms & Conditions & Privacy Policy
          </span>
        </label>
      </div>
      {errors.termsAccepted && <p className="text-xs text-red-400 mt-1" role="alert">{errors.termsAccepted}</p>}

    </form>
  );
};

export default SignupForm;
