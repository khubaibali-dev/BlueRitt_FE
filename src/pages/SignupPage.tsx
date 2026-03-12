// src/pages/SignupPage.tsx
import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import SignupCard from "../components/auth/SignupCard";

const SignupPage: React.FC = () => {
  return (
    <AuthLayout>
      <SignupCard />
    </AuthLayout>
  );
};

export default SignupPage;
