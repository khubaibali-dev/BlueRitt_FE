// src/components/common/cards/CollapsibleCard.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  subtitle,
  icon,
  headerRight,
  defaultOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

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
    <div className="bg-[#04132B] rounded-[20px] transition-all duration-300 border border-[#082656] shadow-2xl relative w-full mb-0 overflow-hidden">
      {/* Header (Trigger) */}
      <div
        className="w-full flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 rounded-[20px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4 sm:gap-3 flex-1">
          {icon && (
            <div className="standard-icon-circle w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-[16px] sm:text-[18px] font-semibold text-white mb-1 tracking-wide">{title}</h3>
            {subtitle && (
              <p className="text-[12px] sm:text-[13px] text-[#FFFFFFB2] leading-relaxed">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {headerRight && (
            <div onClick={(e) => e.stopPropagation()}>{headerRight}</div>
          )}
          <div
            className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          >
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className="transition-[height] duration-300 ease-in-out overflow-hidden"
        style={{ height: isOpen && height === undefined ? 'auto' : height }}
      >
        <div aria-hidden={!isOpen} ref={contentRef}>
          <hr className="border-slate-700 mx-6 sm:mx-8" />
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
