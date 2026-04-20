import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  className?: string;
  tooltipClassName?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  width = "280px",
  className = "",
  tooltipClassName = "",
}) => {
  return (
    <div className={`relative group/tooltip ${className}`}>
      {children}
      
      {/* Tooltip Content Container */}
      <div 
        className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-3 rounded-xl backdrop-blur-[20px] bg-white/90 dark:bg-black/20 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-[9999] text-left shadow-2xl scale-95 group-hover/tooltip:scale-100 origin-bottom border border-white/10 ${tooltipClassName}`}
        style={{ width }}
      >
        <div className="tooltip-pro-border" />
        <div className="text-brand-textPrimary dark:text-white text-[11px] font-medium leading-relaxed relative z-10">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
