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
              <span className="truncate text-white/90">{selectedOption.label}</span>
            </>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-white flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute left-0 mt-2 ${dropdownWidth} bg-[#0A1629] border border-white/10 rounded-xl shadow-2xl z-[100] overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in duration-200`}
        >
          <div className="max-h-[230px] overflow-y-auto custom-scrollbar py-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left text-[13px] ${value === option.value ? "text-white font-medium bg-white/5" : "text-white/60"
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
