import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-wrapper !flex">
      <button
        onClick={() => theme === 'light' && toggleTheme()}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'dark' 
            ? 'bg-brand-bg text-brand-textPrimary shadow-sm' 
            : 'text-brand-textSecondary'
        }`}
        aria-label="Switch to dark mode"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => theme === 'dark' && toggleTheme()}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'light' 
            ? 'bg-white text-brand-primary shadow-sm' 
            : 'text-brand-textSecondary'
        }`}
        aria-label="Switch to light mode"
      >
        <Sun size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;

