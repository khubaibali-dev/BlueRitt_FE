import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={22} className="text-[#082656] hover:text-[#568AFC] transition-colors" />
      ) : (
        <Sun size={22} className="text-[#F05A2B] hover:text-yellow-400 transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;

