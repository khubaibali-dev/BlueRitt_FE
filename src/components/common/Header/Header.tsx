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
        {/* Left: Greeting & Mobile menu / Profile on Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="text-brand-textPrimary hover:opacity-80 transition-all shrink-0"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            {/* Title/Subtitle Group */}
            <div className="flex flex-col min-w-0">
              <h1 className="header-greeting !ml-0 truncate">
                Welcome back {currentUser?.firstName || "User"}!
              </h1>
              <p className="header-subtitle !ml-0 text-[11px] sm:text-[14px] truncate">
                Find the right product for your business
              </p>
            </div>

            {/* Mobile-only Profile & Arrow - Placed next to text */}
            <div className="relative lg:hidden " ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-white/5 rounded-lg transition-all min-w-0 shrink-0"
              >
                <div className="w-7 h-7 rounded-full bg-brand-input-bg border border-brand-input-border flex items-center justify-center shrink-0">
                  <User size={14} className="text-brand-textPrimary" />
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <p className="text-[11px] sm:text-[12px] font-semibold text-brand-textPrimary leading-tight whitespace-nowrap ">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-brand-textSecondary leading-tight whitespace-nowrap">{currentUser?.email}</p>
                </div>
              </button>

              {/* Mobile-only Dropdown */}
              {isMenuOpen && (
                <div className="header-dropdown-menu absolute top-[calc(100%+8px)] left-auto right-0 w-40 bg-[#04132B] border border-[#1E293B] rounded-xl shadow-2xl z-[100] overflow-hidden">
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => { theme !== 'light' && toggleTheme(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors ${theme === 'light' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-dim hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Sun size={14} />
                        <span>Light Mode</span>
                      </div>
                      {theme === 'light' && <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />}
                    </button>
                    <button
                      onClick={() => { theme !== 'dark' && toggleTheme(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors ${theme === 'dark' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-dim hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Moon size={14} />
                        <span>Dark Mode</span>
                      </div>
                      {theme === 'dark' && <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Desktop Actions & Profile */}
        <div className="hidden lg:flex items-center gap-6">
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

          <div className="profile-section border-l border-[#1E293B] pl-2 h-full flex items-center gap-3">
            <div className=" flex items-center justify-center shrink-0 shadow-inner">
              <CircleUser size={28} className="text-brand-textPrimary" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-[14px] font-semibold text-brand-textPrimary">
                {currentUser?.firstName} {currentUser?.lastName}
              </p>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
