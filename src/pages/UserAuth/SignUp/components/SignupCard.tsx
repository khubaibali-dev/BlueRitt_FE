// src/pages/UserAuth/SignUp/components/SignupCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "./SignupFormInner";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";

/* 4-pointed sparkle star — matches Figma icon exactly */
const StarIcon: React.FC = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13 2L14.8 10.2H22L16 14.8L18.4 23L13 18.4L7.6 23L10 14.8L4 10.2H11.2L13 2Z"
      fill="white"
    />
  </svg>
);

const SignupCard: React.FC = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-4">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="brand-star-icon">
          <StarIcon />
        </div>

        <div className="text-center mb-2">
          <h1 className="text-[26px] font-bold text-brand-textPrimary mb-[8px] tracking-tight">
            Get Started
          </h1>
          <p className="text-[14px] font-normal leading-[16px] tracking-[0px] text-[#7A9ABF]">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[#3B82F6] font-semibold hover:underline transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg">
        <div className="px-8 pt-9 pb-8">
          <SignupForm />
        </div>
      </div>

      {/* ── NEED HELP ── */}
      <p className="text-[13px] text-[#7A9ABF] text-center">
        Need help?{" "}
        <a
          href="/support"
          className="text-[#3B82F6] font-semibold hover:underline transition-colors"
        >
          Contact Support
        </a>
      </p>

      {/* ── SIGNUP BUTTON ── */}
      <PrimaryButton type="submit" form="signup-form">
        Continue to Package Selection →
      </PrimaryButton>
    </div>
  );
};

export default SignupCard;
