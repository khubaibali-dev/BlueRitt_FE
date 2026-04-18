import FullDark from "../../../assets/images/Blueritt_logo/logo.svg";
import FullLight from "../../../assets/images/Blueritt_logo/logo.svg";
import MarkDark from "../../../assets/images/Blueritt_logo/logomark.svg";
import MarkLight from "../../../assets/images/Blueritt_logo/logomark.svg";
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
        className={`object-contain block transition-all duration-300 ${isCollapsed ? "h-[38px] w-[38px] scale-110" : "h-[26px] w-auto"
          }`}
      />
    </div>
  );
};

export default BlueRittLogo;
