// src/pages/UserAuth/SignUp/components/SignupFormInner.tsx
import React from "react";
import useSignupForm from "../../../../hooks/useSignupForm";
import InputField from "../../../../components/common/input/InputField";
import CountrySelect, { countries, Country } from "../../../../components/common/select/CountrySelect";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignupForm: React.FC = () => {
  const {
    fields,
    errors,
    showPassword,
    showConfirmPassword,
    setCaptchaVerified,
    handleChange,
    togglePassword,
    toggleConfirmPassword,
    handleSubmit,
  } = useSignupForm();

  const handleCountryChange = (country: { name: string, dialCode: string }) => {
    handleChange("country")({
      target: { value: country.name, type: "text" }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const PasswordToggle = (
    <button
      type="button"
      onClick={togglePassword}
      className="text-brand-textSecondary hover:text-brand-primary transition-colors duration-150 focus:outline-none flex items-center justify-center"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.4} />
      ) : (
        <Eye className="w-[18px] h-[18px]" strokeWidth={1.4} />
      )}
    </button>
  );

  const ConfirmPasswordToggle = (
    <button
      type="button"
      onClick={toggleConfirmPassword}
      className="text-brand-textSecondary hover:text-brand-primary transition-colors duration-150 focus:outline-none flex items-center justify-center"
      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
    >
      {showConfirmPassword ? (
        <EyeOff className="w-[18px] h-[18px]" strokeWidth={1.4} />
      ) : (
        <Eye className="w-[18px] h-[18px]" strokeWidth={1.4} />
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
          icon={User}
          error={errors.firstName}
        />
        <InputField
          id="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={fields.lastName}
          onChange={handleChange("lastName")}
          icon={User}
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
        icon={Mail}
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
        <InputField
          id="whatsapp"
          label="Whatsapp(Optional)"
          placeholder="xxx xxxx xxx"
          prefix={countries.find((c: Country) => c.name === fields.country)?.dialCode}
          value={fields.whatsapp}
          onChange={handleChange("whatsapp")}
          error={errors.whatsapp}
        />
      </div>

      <InputField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        value={fields.password}
        onChange={handleChange("password")}
        icon={Lock}
        error={errors.password}
        rightElement={PasswordToggle}
        autoComplete="new-password"
      />

      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm your password"
        value={fields.confirmPassword}
        onChange={handleChange("confirmPassword")}
        icon={Lock}
        error={errors.confirmPassword}
        rightElement={ConfirmPasswordToggle}
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
