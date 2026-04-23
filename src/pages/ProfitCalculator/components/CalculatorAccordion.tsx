import React, { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className={`bg-brand-card dark:bg-brand-bg rounded-2xl border border-brand-inputBorder dark:border-white/5 overflow-hidden transition-all duration-300 ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center gap-3">
          <span className="text-[16px] font-bold text-brand-textPrimary dark:text-white tracking-tight">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {disabled && (
            <>
              <span className="text-[11px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Pro Feature
              </span>
              <Lock size={14} className="text-brand-primary" />
            </>
          )}
          {!disabled && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                size={18}
                className="text-brand-textSecondary"
              />
            </motion.div>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && !disabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0">
              <hr className="border-brand-inputBorder dark:border-[#1E293B]/80 mb-5" />
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalculatorAccordion;
