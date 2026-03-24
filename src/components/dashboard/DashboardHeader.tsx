import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Bell, ChevronDown, Menu } from "lucide-react";

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="dashboard-header">
      {/* Left: Greeting & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-[#94A3B8] hover:text-white"
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="header-greeting">
            Good Morning John!
          </h1>
          <p className="header-subtitle">
            Start your day with the best tools
          </p>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* Theme Toggle */}
        <div className="theme-toggle-wrapper">
          <button
            onClick={() => theme === 'light' && toggleTheme()}
            className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-[#1E293B] text-white shadow-sm' : 'text-[#64748B]'}`}
          >
            <Moon size={16} />
          </button>
          <button
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-[#64748B]'}`}
          >
            <Sun size={16} />
          </button>
        </div>

        {/* Notifications */}
        <button className="text-[#94A3B8] hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#020817]"></span>
        </button>

        {/* User Profile */}
        <div className="profile-section">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-[11px] text-[#94A3B8]">The Matrix</p>
          </div>
          <div className="user-avatar">
            JD
          </div>
          <ChevronDown size={14} className="hidden sm:block text-[#94A3B8]" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
