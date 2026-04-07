import FullDark from "../../../assets/images/logo/dark-mode-logo.png";
import FullLight from "../../../assets/images/logo/light-mode-logo.png";
import MarkDark from "../../../assets/images/logo/dark-mode-mark.png";
import MarkLight from "../../../assets/images/logo/light-mode-mark.png";
import { useTheme } from "../../../context/ThemeContext";

interface BlueRittLogoProps {
  className?: string;
  isCollapsed?: boolean;
}

const BlueRittLogo: React.FC<BlueRittLogoProps> = ({ className = "", isCollapsed = false }) => {
  const { theme } = useTheme();

  // Decide which variant to show based on collapsed state and theme
  const logoSrc = isCollapsed
    ? (theme === "dark" ? MarkDark : MarkLight)
    : (theme === "dark" ? FullDark : FullLight);

  return (
    <div className={`flex items-center transition-all duration-300 ${isCollapsed ? "justify-center w-full" : ""} ${className}`}>
      <img
        src={logoSrc}
        alt="BlueRitt Logo"
        className={`object-contain block transition-all duration-300 ${isCollapsed ? "h-[32px] w-[32px]" : "h-[26px] w-auto"
          }`}
      />
    </div>
  );
};

export default BlueRittLogo;
