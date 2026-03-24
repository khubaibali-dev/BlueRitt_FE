import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CalculatorAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CalculatorAccordion: React.FC<CalculatorAccordionProps> = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#04132B]/60 border border-[#082656] rounded-2xl overflow-hidden transition-all duration-300 shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-[15px] tracking-wide">{title}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="p-5 pt-0">
          <hr className="border-[#1E293B]/80 mb-5" />
          {children}
        </div>
      )}
    </div>
  );
};

export default CalculatorAccordion;
