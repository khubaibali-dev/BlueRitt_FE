// src/components/common/select/SelectField.tsx
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export interface SelectOption {
  label: React.ReactNode;
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
  className?: string;
  direction?: "up" | "down";
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  error = "",
  required = false,
  className = "",
  direction = "down",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
          top: direction === "up" ? rect.top : rect.bottom,
          left: rect.left,
          width: rect.width
        });
      }
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, direction]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideTrigger = dropdownRef.current && !dropdownRef.current.contains(event.target as Node);
      const isOutsidePortal = portalRef.current && !portalRef.current.contains(event.target as Node);

      if (isOpen && isOutsideTrigger && isOutsidePortal) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);



  return (
    <div className="flex flex-col gap-[6px]" ref={dropdownRef}>
      {label && (
        <div className="flex justify-between items-center pr-1">
          <label
            htmlFor={id}
            className={`text-[12px] font-bold leading-[16px] tracking-[0px] text-brand-textSecondary dark:text-white ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
      )}

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between gap-3 px-4 py-[12px] ${className || "rounded-lg"}
            bg-brand-inputBg border transition-all duration-200
            ${disabled ? "opacity-70 cursor-not-allowed bg-brand-inputBg/50" : "focus:shadow-[0_0_0_2px_rgba(37,99,235,0.5)] outline-none"}
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
            className={`w-[24px] h-[24px] text-brand-textPrimary transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${disabled ? "opacity-50" : ""}`}
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

        {isOpen && ReactDOM.createPortal(
          <div
            ref={portalRef}
            className="fixed z-[9999] bg-brand-card border border-brand-inputBorder rounded-lg shadow-2xl max-h-[240px] overflow-y-auto custom-scrollbar"
            style={{
              top: (direction === "up" ? coords.top - 8 : coords.top + 8),
              left: coords.left,
              width: coords.width,
              transform: direction === "up" ? "translateY(-100%)" : "none",
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`
                  w-full flex items-center px-4 py-3 hover:bg-brand-hover transition-colors text-left
                  ${value === option.value ? "bg-brand-hover text-brand-primary" : "text-brand-textPrimary"}
                `}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="text-[14px] font-normal">{option.label}</span>
              </button>
            ))}
          </div>,
          document.body
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
