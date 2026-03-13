import React from "react";
import BlueRittLogo from "../ui/BlueRittLogo";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    /*
      Figma shows the ENTIRE design lives inside a large dark rounded container.
      The background behind this container uses an image for the soft glows.
    */
    <div className="relative min-h-screen w-full bg-brand-bg flex items-center justify-center p-4 lg:p-10 overflow-auto transition-colors duration-300">
      
      {/* --- Background Image (Behind the main container) --- */}
      {/* 
        INSTRUCTION: Save your background image as "bg-glows.png" 
        inside the "public" folder of your project (blueritt-login/public/bg-glows.png).
      */}
      <img 
        src="/bg-glows.png" 
        alt="" 
        className="bg-glow-image transition-opacity duration-1000 opacity-100"
        aria-hidden="true"
      />
      {/* ------------------------------------------------------------- */}

      {/* The outer page frame — matches Figma's dark rounded rectangle */}
      <div className="auth-main-container relative z-10 w-full max-w-[1140px] min-h-[600px] lg:min-h-[800px] mx-auto rounded-[24px] flex flex-col overflow-hidden">
        {/* Header / Logo + Theme Toggle */}
        <header className="absolute top-0 left-0 w-full z-20 px-6 pt-6 lg:px-10 lg:pt-10 flex justify-between items-center">
          <BlueRittLogo />
          
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-brand-card border border-brand-border text-brand-textPrimary hover:bg-brand-inputBg transition-all duration-300 shadow-lg"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </header>

        {/* Main content — pushed down further */}
        <main className="relative z-10 flex flex-col items-center justify-center px-4 w-full flex-1 pt-[100px] pb-[60px] lg:pt-[90px] overflow-visible">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 pb-8 text-center space-y-1">
          <p className="text-[12px] text-brand-textSecondary">
            BlueRitt® is a proprietary product of ReverCe Technologies Ltd. UK
          </p>
          <p className="text-[12px] text-brand-accent font-semibold">
            © Copyright. All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
