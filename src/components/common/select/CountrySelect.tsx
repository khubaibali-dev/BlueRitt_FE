import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { countries as countryNames } from "../../../utils/Country";

export interface CountryDisplay {
  name: string;
  dialCode: string;
  code: string;
  flag?: string;
}

// Global export of all displayable countries
import { COUNTRY_OPTIONS } from "../../../utils/Country";

export const countries: CountryDisplay[] = countryNames
  .filter(c => COUNTRY_OPTIONS.some(opt => opt.label === c.name))
  .map(c => {
    const amazonOption = COUNTRY_OPTIONS.find(opt => opt.label === c.name);
    return {
      name: c.name,
      dialCode: c.dialCode,
      code: amazonOption ? amazonOption.value.toUpperCase() : "US",
    };
  });

interface CountrySelectProps {
  label?: string;
  value: string;
  onChange: (country: CountryDisplay) => void;
  error?: string;
  direction?: "up" | "down";
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  label,
  value,
  onChange,
  error,
  direction = "down"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  const selectedCountry = countries.find(c => c.name === value) || countries[0];

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
        <label className="text-[12px] font-bold leading-[16px] tracking-[0px] text-brand-textSecondary dark:text-white">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between gap-3 px-4 py-[12px] rounded-lg
            bg-brand-inputBg border transition-all duration-200
            focus:shadow-[0_0_0_2px_rgba(37,99,235,0.5)] outline-none
            ${error ? "border-red-500" : "border-brand-inputBorder"}
          `}
        >
          <div className="flex items-center gap-3 overflow-hidden text-left">
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt=""
              className="w-5 h-3.5 object-cover rounded-[2px] flex-shrink-0"
            />
            <span className="text-[14px] text-brand-textPrimary font-normal font-sans leading-[16px] tracking-[0px] whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedCountry.name}
            </span>
          </div>
          <svg
            className={`w-[20px] h-[20px] text-brand-textPrimary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path d="M5 7l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {isOpen && ReactDOM.createPortal(
          <div
            ref={portalRef}
            className={`
              absolute z-[9999] bg-brand-card border border-brand-inputBorder rounded-lg shadow-2xl max-h-[240px] overflow-y-auto custom-scrollbar
            `}
            style={{
              top: (direction === "up" ? coords.top - 8 : coords.top + 8) + window.scrollY,
              left: coords.left + window.scrollX,
              width: coords.width,
              transform: direction === "up" ? "translateY(-100%)" : "none"
            }}
          >
            {countries.map((country) => (
              <button
                key={country.name}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-hover transition-colors text-left"
                onClick={() => {
                  onChange(country);
                  setIsOpen(false);
                }}
              >
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt=""
                  className="w-5 h-3.5 object-cover rounded-[2px] flex-shrink-0"
                />
                <span className="text-[14px] text-brand-textPrimary">{country.name}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default CountrySelect;
