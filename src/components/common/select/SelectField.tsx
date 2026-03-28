// src/components/common/select/SelectField.tsx
import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  error = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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
    <div className="flex flex-col gap-[10px]" ref={dropdownRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-[14px] font-normal leading-[16px] tracking-[0px] text-[#FFFFFFB2] cursor-pointer"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between gap-3 px-4 py-[12px] rounded-lg
            bg-brand-inputBg border transition-all duration-200
            focus:shadow-[0_0_0_2px_rgba(37,99,235,0.5)] outline-none
            ${error ? "border-red-500" : "border-brand-inputBorder"}
          `}
        >
          <span
            className={`text-[14px] font-normal tracking-[0px] truncate ${selectedOption ? "text-brand-textPrimary" : "text-[#99A1AF]"
              }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-[24px] h-[24px] text-white transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M5 7l5 5 5-5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-[100] w-full mt-2 bg-brand-card border border-brand-inputBorder rounded-lg shadow-2xl max-h-[240px] overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full flex items-center px-4 py-3 hover:bg-[#15273F] transition-colors text-left text-[14px] ${value === option.value ? "bg-[#1A2E4B] text-brand-textPrimary font-medium" : "text-brand-textSecondary"
                  }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
