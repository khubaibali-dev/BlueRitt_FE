import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
  flag?: string; // Optional flag URL or emoji
  code?: string; // ISO code for flagcdn
}

interface FilterDropdownProps {
  value: string;
  options: FilterOption[];
  onChange: (option: FilterOption) => void;
  renderLabel?: (selected: FilterOption) => React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownWidth?: string;
  width?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  options,
  onChange,
  renderLabel,
  className = "",
  buttonClassName,
  dropdownWidth = "w-[160px]",
  width = "w-[150px]",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={buttonClassName ?? `dashboard-filter-btn ${width} justify-between whitespace-nowrap`}
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          {renderLabel ? (
            renderLabel(selectedOption)
          ) : (
            <>
              {selectedOption.code && (
                <img
                  src={`https://flagcdn.com/w40/${selectedOption.code.toLowerCase()}.png`}
                  alt=""
                  className="w-4 h-auto rounded-[1px] opacity-90 flex-shrink-0"
                />
              )}
              <span className="truncate text-brand-textPrimary dark:text-white/90 uppercase text-[12px] font-semibold tracking-wider">
                {selectedOption.label}
              </span>
            </>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-brand-textPrimary dark:text-white flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-2 ${dropdownWidth} bg-brand-card border border-brand-border rounded-xl shadow-2xl z-[100] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200`}
        >
          <div className="max-h-[220px] overflow-y-auto custom-scrollbar py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-brand-hover transition-colors text-left text-[13px] ${value === option.value ? "text-brand-primary font-medium bg-brand-hover" : "text-brand-textSecondary"
                  }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option.code && (
                  <img
                    src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
                    alt=""
                    className="w-4 h-auto rounded-[1px]"
                  />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
