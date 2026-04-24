// src/components/common/cards/CollapsibleCard.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children: React.ReactNode;
  scrollIntoViewOnOpen?: boolean;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  subtitle,
  icon,
  headerRight,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  children,
  scrollIntoViewOnOpen = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  // Sync internal state when defaultOpen changes
  useEffect(() => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(defaultOpen);
    }
  }, [defaultOpen, controlledIsOpen]);

  useEffect(() => {
    if (isOpen && scrollIntoViewOnOpen && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [isOpen, scrollIntoViewOnOpen]);

  return (
    <div
      ref={cardRef}
      className="bg-brand-card dark:bg-[#04132B] rounded-[14px] border border-brand-inputBorder dark:border-brand-border relative w-full mb-0 overflow-hidden shadow-sm dark:shadow-none"
    >
      {/* Header (Trigger) */}
      <div
        className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between px-6 py-4 sm:px-8 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 cursor-pointer gap-y-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-4 sm:gap-3 flex-1 min-w-[200px]">
          {icon && (
            <div className="standard-icon-circle w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] shrink-0 bg-brand-bg dark:bg-[#081421] text-brand-primary dark:text-white">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-[16px] sm:text-[18px] font-bold text-brand-textPrimary dark:text-white mb-0.5 tracking-tight">{title}</h3>
            {subtitle && (
              <p className="text-[12px] sm:text-[13px] text-brand-textSecondary dark:text-[#FFFFFFB2] leading-relaxed font-medium">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          {headerRight && (
            <div className="flex-1 sm:flex-initial" onClick={(e) => e.stopPropagation()}>
              {headerRight}
            </div>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-brand-textSecondary dark:text-slate-400" />
          </motion.div>
        </div>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <hr className="border-brand-inputBorder dark:border-slate-700 mx-6 sm:mx-8" />
            <div className="px-6 py-4 sm:px-8 sm:py-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleCard;
