import React, { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";

interface CalculatorAccordionProps {
  title: string;
  defaultOpen?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const CalculatorAccordion: React.FC<CalculatorAccordionProps> = ({
  title,
  defaultOpen = false,
  disabled = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${disabled
        ? "bg-brand-card-alt dark:bg-[#04132B]/30 border-dashed border-brand-border/60 dark:border-[#082656]/60 opacity-50 cursor-not-allowed select-none"
        : "bg-brand-card dark:bg-[#04132B]/60 border-brand-border dark:border-[#082656]"
        }`}
    >
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-5 text-left text-brand-textPrimary transition-colors ${disabled ? "cursor-not-allowed" : "hover:bg-brand-bg/50 dark:hover:bg-white/5"
          }`}
      >
        <span className="font-semibold text-[15px] tracking-wide">{title}</span>

        <div className="flex items-center gap-2 shrink-0">
          {disabled && (
            <>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F05A2B] bg-[#F05A2B]/10 border border-[#F05A2B]/30 px-2 py-0.5 rounded-full">
                Advanced
              </span>
              <Lock size={14} className="text-brand-textSecondary" />
            </>
          )}
          {!disabled && (
            <ChevronDown
              size={18}
              className={`text-brand-textSecondary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>
      </button>

      {isOpen && !disabled && (
        <div className="p-5 pt-0">
          <hr className="border-brand-border dark:border-[#1E293B]/80 mb-5" />
          {children}
        </div>
      )}
    </div>
  );
};

export default CalculatorAccordion;

