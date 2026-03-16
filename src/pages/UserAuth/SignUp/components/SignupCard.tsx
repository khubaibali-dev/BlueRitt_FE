// src/pages/UserAuth/SignUp/components/SignupCard.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "./SignupFormInner";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";

import starImg from "../../../../assets/images/star.png";

const SignupCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-4">

      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-5">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Get Started
          </h1>
          <p className="auth-subtitle">
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
          <SignupForm onSuccess={() => navigate("/select-plan")} />
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
