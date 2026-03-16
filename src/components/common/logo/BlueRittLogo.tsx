import logo from "../../../assets/images/logo.png";
import whitelogo from "../../../assets/images/whitelogo.png";
import { useTheme } from "../../../context/ThemeContext";

const BlueRittLogo = ({ className = "" }) => {
  const { theme } = useTheme();
  
  // Use whitelogo for light mode (white mode) and logo for dark mode
  const logoSrc = theme === "light" ? whitelogo : logo;

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="BlueRitt Logo" 
        className="h-[26px] w-auto object-contain block"
      />
    </div>
  );
};

export default BlueRittLogo;
