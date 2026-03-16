import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Bell, ChevronDown } from "lucide-react";

const DashboardHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-[72px] bg-[#020817] border-b border-[#1E293B] flex items-center justify-between px-8 shrink-0">
      {/* Left: Greeting */}
      <div>
        <h1 className="text-[20px] font-semibold text-white tracking-tight">
          Good Morning John!
        </h1>
        <p className="text-[13px] text-[#94A3B8]">
          Start your day with the best tools
        </p>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <div className="flex items-center bg-[#0F172A] p-1 rounded-full border border-[#334155]">
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
        <div className="flex items-center gap-3 pl-6 border-l border-[#1E293B]">
          <div className="text-right">
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-[11px] text-[#94A3B8]">The Matrix</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#9333EA] flex items-center justify-center font-bold text-xs">
            JD
          </div>
          <ChevronDown size={14} className="text-[#94A3B8]" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
