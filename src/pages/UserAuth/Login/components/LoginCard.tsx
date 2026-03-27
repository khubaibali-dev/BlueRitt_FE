// src/pages/UserAuth/Login/components/LoginCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import PrimaryButton from "../../../../components/common/button/PrimaryButton";

import starImg from "../../../../assets/images/star.png";

const LoginCard: React.FC = () => {
  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-5">

      {/* ── HEADER ── */}
      <div className="flex flex-col items-center w-full">
        <div className="mb-4">
          <img src={starImg} alt="" className="brand-star-standard" />
        </div>

        <div className="text-center mb-2">
          <h1 className="auth-title">
            Welcome back!
          </h1>
          <p className="auth-subtitle">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="auth-link"
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
      <p className="auth-help-text">
        Need help?{" "}
        <a
          href="/support"
          className="auth-help-link"
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
