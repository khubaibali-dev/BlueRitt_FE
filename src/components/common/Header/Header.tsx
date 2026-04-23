import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import { Sun, Moon, Menu, User, CircleUser } from "lucide-react";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="dashboard-header relative">
      <div className="flex items-center justify-between w-full h-full">
        {/* Left: Greeting & Mobile menu toggle */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="text-brand-textPrimary hover:opacity-80 transition-all shrink-0"
          >
            <Menu size={24} />
          </button>

          <div className="flex flex-col min-w-0">
            <h1 className="header-greeting !ml-0 truncate">
              Welcome back {currentUser?.firstName || "User"}!
            </h1>
            <p className="header-subtitle !ml-0 text-[11px] sm:text-[14px] truncate">
              Find the right product for your business
            </p>
          </div>
        </div>

        {/* Right Section: Mobile Profile & Desktop Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile/Tablet Profile Dropdown */}
          <div className="relative lg:hidden" ref={dropdownRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded-lg transition-all min-w-0 shrink-0"
            >
              <div className=" flex items-center justify-center shrink-0">
                <CircleUser size={26} className="text-brand-textPrimary" />
              </div>
              <div className="flex flex-col items-start min-w-0 hidden sm:flex">
                <p className="text-[12px] font-semibold text-brand-textPrimary leading-tight whitespace-nowrap">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
              </div>
            </button>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <div className="header-dropdown-menu absolute top-[calc(100%+8px)] right-0 w-48 bg-white dark:bg-[#04132B] border border-brand-border dark:border-[#1E293B] rounded-xl shadow-2xl z-[100] overflow-hidden">
                <div className="p-1.5 space-y-1">
                  <button
                    onClick={() => { theme !== 'light' && toggleTheme(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${theme === 'light' ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-textSecondary dark:text-dim hover:bg-brand-hover dark:hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Sun size={15} />
                      <span>Light Mode</span>
                    </div>
                    {theme === 'light' && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />}
                  </button>
                  <button
                    onClick={() => { theme !== 'dark' && toggleTheme(); setIsMenuOpen(false); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${theme === 'dark' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-brand-textSecondary dark:text-dim hover:bg-brand-hover dark:hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Moon size={15} />
                      <span>Dark Mode</span>
                    </div>
                    {theme === 'dark' && <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Actions & Profile */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="theme-toggle-wrapper">
              <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-brand-bg text-brand-textPrimary shadow-sm' : 'text-brand-textSecondary'}`}
              >
                <Moon size={18} />
              </button>
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-textSecondary'}`}
              >
                <Sun size={18} />
              </button>
            </div>

            <div className="profile-section h-full flex items-center gap-0">
              <div className=" border-brand-input-border flex items-center justify-center shrink-0">
                <CircleUser size={26} className="text-brand-textPrimary" />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-[14px] font-semibold text-brand-textPrimary">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
