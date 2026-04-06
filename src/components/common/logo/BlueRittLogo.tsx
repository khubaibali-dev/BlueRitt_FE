import logo from "../../../assets/images/logo.png";
import whitelogo from "../../../assets/images/whitelogo.png";
import { useTheme } from "../../../context/ThemeContext";

interface BlueRittLogoProps {
  className?: string;
  isCollapsed?: boolean;
}

const BlueRittLogo: React.FC<BlueRittLogoProps> = ({ className = "", isCollapsed = false }) => {
  const { theme } = useTheme();
  
  // Use whitelogo for dark mode (white logo on dark bg) and logo for light mode (dark logo on white bg)
  const logoSrc = theme === "dark" ? whitelogo : logo;

  return (
    <div className={`flex items-center transition-all duration-300 ${isCollapsed ? "justify-center w-full" : ""} ${className}`}>
      <img 
        src={logoSrc} 
        alt="BlueRitt Logo" 
        className={`object-contain block transition-all duration-300 ${isCollapsed ? "h-[30px] w-[30px] min-w-[30px]" : "h-[26px] w-auto"}`}
      />
    </div>
  );
};

export default BlueRittLogo;
