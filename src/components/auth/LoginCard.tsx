// src/components/auth/LoginCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import PrimaryButton from "../ui/PrimaryButton";

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
    {/* Thin 4-pointed star shape */}
    <path
      d="M13 2L14.8 10.2H22L16 14.8L18.4 23L13 18.4L7.6 23L10 14.8L4 10.2H11.2L13 2Z"
      fill="white"
    />
  </svg>
);

const LoginCard: React.FC = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="brand-star-icon">
          <StarIcon />
        </div>

        <div className="text-center mb-2">
          <h1 className="text-[22px] font-bold text-white mb-[6px] tracking-tight">
            Welcome back!
          </h1>
          <p className="text-[14px] font-normal leading-[16px] tracking-[0px] text-[#7A9ABF]">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#3B82F6] font-semibold hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* ── CARD ── */}
      <div className="w-full figma-card-border brand-card-bg">
        <div className="px-8 pt-9 pb-8">
          <LoginForm />
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

      {/* ── LOGIN BUTTON ── */}
      <PrimaryButton type="submit" form="login-form">
        Login →
      </PrimaryButton>
    </div>
  );
};

export default LoginCard;
