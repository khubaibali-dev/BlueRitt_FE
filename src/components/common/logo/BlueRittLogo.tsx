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

  const fullLogo = theme === "dark" ? FullDark : FullLight;
  const markLogo = theme === "dark" ? MarkDark : MarkLight;

  return (
    <div className={`flex items-center relative transition-all duration-300 ${isCollapsed ? "justify-center w-[38px]" : "w-auto"} ${className}`}>
      {/* Full Logo - Defines container width when open */}
      <img
        src={fullLogo}
        alt="BlueRitt Logo"
        className={`object-contain block transition-opacity duration-300 ${isCollapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100 w-auto"
          } h-[26px]`}
      />
      
      {/* Mark Logo - Overlays when collapsed */}
      <img
        src={markLogo}
        alt="BlueRitt Logo Mark"
        className={`object-contain block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isCollapsed ? "opacity-100 scale-110" : "opacity-0 pointer-events-none scale-90"
          } h-[38px] w-[38px]`}
      />
    </div>
  );
};

export default BlueRittLogo;
