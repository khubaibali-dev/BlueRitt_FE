import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center dark:bg-white/5 
      bg-black/5 justify-center p-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={22} className="text-black dark:text-white transition-colors" />
      ) : (
        <Sun size={22} className="text-black dark:text-white transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;

