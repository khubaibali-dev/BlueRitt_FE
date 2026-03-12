// src/components/auth/AuthLayout.tsx
import React from "react";
import BlueRittLogo from "../ui/BlueRittLogo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    /*
      Figma shows the ENTIRE design lives inside a large dark rounded container.
      The background behind this container uses an image for the soft glows.
    */
    <div className="relative min-h-screen w-full bg-[#060E1C] flex items-center justify-center p-4 lg:p-10 overflow-auto">
      
      {/* --- Background Image (Behind the main container) --- */}
      {/* 
        INSTRUCTION: Save your background image as "bg-glows.png" 
        inside the "public" folder of your project (blueritt-login/public/bg-glows.png).
      */}
      <img 
        src="/bg-glows.png" 
        alt="" 
        className="bg-glow-image"
        aria-hidden="true"
      />
      {/* ------------------------------------------------------------- */}

      {/* The outer page frame — matches Figma's dark rounded rectangle */}
      <div className="auth-main-container relative z-10 w-full max-w-[1280px] min-h-[600px] lg:min-h-[800px] mx-auto rounded-[24px] flex flex-col">
        {/* Header / Logo */}
        <header className="absolute top-0 left-0 w-full z-20 px-6 pt-6 lg:px-10 lg:pt-10">
          <BlueRittLogo />
        </header>

        {/* Main content — pushed down further */}
        <main className="relative z-10 flex flex-col items-center justify-center px-4 w-full flex-1 pt-[100px] pb-[60px] lg:pt-[90px] overflow-visible">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 pb-8 text-center space-y-1">
          <p className="text-[12px] text-[#5E7A96]">
            BlueRitt® is a proprietary product of ReverCe Technologies Ltd. UK
          </p>
          <p className="text-[12px] text-[#3B82F6] font-semibold">
            © Copyright. All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
