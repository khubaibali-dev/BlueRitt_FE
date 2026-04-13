// src/pages/UserAuth/SignUp/components/SignupFormInner.tsx
import React from "react";
import useSignupForm from "../../../../hooks/useSignupForm";
import InputField from "../../../../components/common/input/InputField";
import SelectField from "../../../../components/common/select/SelectField";
import { countries } from "../../../../utils/Country";
import ReCaptchaWidget from "../../components/ReCaptchaWidget";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  onSuccess?: (data: any, token: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
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
  } = useSignupForm({ onSuccess });


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
        <SelectField
          id="country"
          label="Country"
          value={fields.country}
          options={countries.map(c => ({ 
            label: (
              <div className="flex items-center gap-2">
                <img src={`https://flagcdn.com/w20/${c.code}.png`} alt={c.name} className="w-5 h-[14px] object-cover rounded-[2px]" />
                <span>{c.name}</span>
              </div>
            ), 
            value: c.name 
          }))}
          onChange={(val) => {
            handleChange("country")({
              target: { value: val, type: "text" }
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          error={errors.country}
          direction="down"
        />
        <InputField
          id="whatsapp"
          label="Whatsapp(Optional)"
          placeholder="xxx xxxx xxx"
          prefix={countries.find(c => c.name === fields.country)?.dialCode}
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
          <span className="text-[13px] font-normal leading-[16px] tracking-[0px] text-brand-textSecondary">
            By creating an account you agree to our <a href="https://www.blueritt.com/blueritt-terms-conditions/" className="text-[#568AFC] underline font-bold">Terms & Conditions</a> and <a href="https://www.blueritt.com/privacy-policy/" className="text-[#568AFC] underline font-bold">Privacy Policy</a>
          </span>
        </label>
      </div>
      {errors.termsAccepted && <p className="text-xs text-red-400 mt-1" role="alert">{errors.termsAccepted}</p>}

    </form>
  );
};

export default SignupForm;
