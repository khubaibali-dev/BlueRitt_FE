import React from "react";
import BlueRittLogo from "../components/common/logo/BlueRittLogo";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import bgGlows from "../assets/images/bg-glows.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSelectPlanPage = location.pathname.includes("/select-plan");

  return (
    /*
      Figma shows the ENTIRE design lives inside a large dark rounded container.
      The background behind this container uses an image for the soft glows.
    */
    <div className="relative min-h-screen w-full bg-brand-bg flex items-center justify-center p-4 lg:p-10 overflow-auto transition-colors duration-300">

      {/* --- Background Image (Behind the main container) --- */}
      <img
        src={bgGlows}
        alt=""
        className="bg-glow-image transition-opacity duration-1000 opacity-100"
        aria-hidden="true"
      />
      {/* ------------------------------------------------------------- */}

      {/* The outer page frame — matches Figma's dark rounded rectangle */}
      <div className="auth-main-container relative z-10 w-full max-w-[1140px] min-h-[600px] lg:min-h-[800px] mx-auto rounded-[24px] flex flex-col">
        {/* Header / Logo + Theme Toggle */}
        <header className="absolute top-0 left-0 w-full z-20 px-6 pt-6 lg:px-10 lg:pt-10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isSelectPlanPage && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-brand-hover transition-colors text-brand-textPrimary"
                aria-label="Go back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <BlueRittLogo />
          </div>
        </header>

        {/* Main content — pushed down further */}
        <main className="relative z-10 flex flex-col items-center justify-center px-4 w-full flex-1 pt-[100px] pb-[60px] lg:pt-[90px] overflow-visible">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 pb-8 text-center space-y-0.5 px-4">
          <p className="text-[14px] sm:text-[16px] text-brand-textSecondary dark:text-[#FFFFFFB2]">
            BlueRitt® is a proprietary product of ReverCe Technologies Ltd. UK
          </p>
          <p className="text-[14px] sm:text-[16px] text-brand-accent font-semibold">
            © Copyright. All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
