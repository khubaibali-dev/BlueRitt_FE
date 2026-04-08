// src/components/common/cards/CollapsibleCard.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children: React.ReactNode;
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
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const nextState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onToggle?.(nextState);
  };

  useEffect(() => {
    if (!isOpen) {
      setHeight(0);
    } else if (contentRef.current) {
      // Small timeout to allow DOM to calculate actual height
      setTimeout(() => {
        setHeight(contentRef.current?.scrollHeight);
      }, 10);
    }
  }, [isOpen]);

  return (
    <div className="bg-brand-card dark:bg-[#04132B] rounded-[24px] transition-all duration-300 border border-brand-border dark:border-brand-border relative w-full mb-0 overflow-hidden shadow-sm dark:shadow-none">
      {/* Header (Trigger) */}
      <div
        className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between px-6 py-4 sm:px-8 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 cursor-pointer gap-y-4"
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
          <div
            className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          >
            <ChevronDown className="w-5 h-5 text-brand-textSecondary dark:text-slate-400" />
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
        style={{ height: isOpen && height === undefined ? 'auto' : height }}
      >
        <div aria-hidden={!isOpen} ref={contentRef}>
          <hr className="border-brand-border dark:border-slate-700 mx-6 sm:mx-8" />
          {/* Inner padding for the content area with equalized top/bottom spacing */}
          <div className="px-6 py-4 sm:px-8 sm:py-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCard;
