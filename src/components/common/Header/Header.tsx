import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { Sun, Moon, ChevronDown, Menu } from "lucide-react";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
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
            className="text-white hover:text-white transition-colors shrink-0"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            {/* Title/Subtitle Group */}
            <div className="flex flex-col min-w-0">
              <h1 className="header-greeting !ml-0 truncate">
                Good Morning John!
              </h1>
              <p className="header-subtitle !ml-0 text-[11px] sm:text-[14px] truncate">
                Start your day with the best tools
              </p>
            </div>

            {/* Mobile-only Profile & Arrow - Placed next to text */}
            <div className="relative lg:hidden" ref={dropdownRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col items-start px-1 py-1 hover:bg-white/5 rounded-lg transition-all min-w-0 shrink-0"
              >
                <div className="flex items-center gap-1">
                  <p className="text-[11px] sm:text-[12px] font-semibold text-white leading-tight whitespace-nowrap">John Doe</p>
                  <ChevronDown
                    size={12}
                    className={`text-white transition-transform duration-300 shrink-0 ${isMenuOpen ? 'rotate-180' : ''}`}
                  />
                </div>
                <p className="text-[9px] sm:text-[10px] text-white/50 leading-tight whitespace-nowrap">The Matrix</p>
              </button>

              {/* Mobile-only Dropdown */}
              {isMenuOpen && (
                <div className="header-dropdown-menu absolute top-[calc(100%+8px)] left-auto right-0 w-40 bg-[#04132B] border border-[#1E293B] rounded-xl shadow-2xl z-[100] overflow-hidden">
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => { theme !== 'light' && toggleTheme(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors ${theme === 'light' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-[#9F9F9F] hover:bg-white/5'}`}
                    >
                      <div className="flex items-center gap-2">
                        <Sun size={14} />
                        <span>Light Mode</span>
                      </div>
                      {theme === 'light' && <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />}
                    </button>
                    <button
                      onClick={() => { theme !== 'dark' && toggleTheme(); setIsMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors ${theme === 'dark' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-[#9F9F9F] hover:bg-white/5'}`}
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
              className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-[#04132B] text-white shadow-sm' : 'text-white/40'}`}
            >
              <Moon size={18} />
            </button>
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-white/40'}`}
            >
              <Sun size={18} />
            </button>
          </div>

          <div className="profile-section border-l border-[#1E293B] pl-6 h-full flex items-center">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-semibold text-[#FFFFFF]">John Doe</p>
                <ChevronDown size={16} className="text-[#FFFFFF]" />
              </div>
              <p className="text-[12px] text-[#9F9F9F]">The Matrix</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
