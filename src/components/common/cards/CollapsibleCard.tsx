// src/components/common/cards/CollapsibleCard.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
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
  showSaveButton?: boolean;
  onSave?: () => void;
  isSaving?: boolean;
  saveButtonText?: string;
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
  showSaveButton = false,
  onSave,
  isSaving = false,
  saveButtonText = "Save",
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
        className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between px-6 py-4 sm:px-8 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 cursor-pointer gap-y-4 gap-x-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-4 sm:gap-3 flex-1 min-w-0 order-1">
          {icon && (
            <div className="standard-icon-circle w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] shrink-0 bg-brand-bg dark:bg-[#081421] text-brand-primary dark:text-white">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-[16px] sm:text-[18px] font-bold text-brand-textPrimary dark:text-white mb-0.5 tracking-tight truncate">{title}</h3>
            {subtitle && (
              <p className="text-[12px] sm:text-[14px] text-brand-textSecondary dark:text-[#FFFFFFB2] leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">{subtitle}</p>
            )}
          </div>
        </div>

        {headerRight && (
          <div className="w-full sm:w-auto order-3 sm:order-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
            <div className="w-full">{headerRight}</div>
          </div>
        )}

        <div className="order-2 sm:order-3 ml-auto sm:ml-4 shrink-0 flex items-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
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

              {showSaveButton && (
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave?.();
                    }}
                    disabled={isSaving}
                    className={`bg-brand-gradient text-white px-10 py-2 sm:py-2.5 rounded-full text-[14px] font-semibold transition-transform hover:scale-[1.02]  active:scale-95 border-none flex items-center gap-2 ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSaving && <Loader2 size={16} className="animate-spin" />}
                    {isSaving ? "Saving..." : saveButtonText}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleCard;
