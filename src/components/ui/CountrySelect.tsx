// src/components/ui/CountrySelect.tsx
import React, { useState, useRef, useEffect } from "react";

interface Country {
  name: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  { name: "Pakistan", code: "PK", flag: "🇵🇰" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  // Add more as needed
];

interface CountrySelectProps {
  label?: string;
  value: string;
  onChange: (name: string) => void;
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ label, value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find(c => c.name === value) || countries[0];

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
    <div className="flex flex-col gap-[6px]" ref={dropdownRef}>
      {label && (
        <label className="text-[14px] font-normal leading-[16px] tracking-[0px] text-white">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between gap-3 px-4 py-[11px] rounded-lg
            bg-[#081421] border transition-all duration-200
            focus:shadow-[0_0_0_2px_rgba(37,99,235,0.5)] outline-none
            ${error ? "border-red-500" : "border-[#172D4A]"}
          `}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              className="w-5 h-auto rounded-sm flex-shrink-0"
            />
            <span className="text-[14px] text-white font-normal font-sans tracking-[0px] whitespace-nowrap overflow-hidden text-ellipsis">
              {selectedCountry.name}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-[#7A9ABF] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path d="M5 7l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-[100] w-full mt-2 bg-[#0B1828] border border-[#172D4A] rounded-lg shadow-2xl max-h-[240px] overflow-y-auto custom-scrollbar">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#15273F] transition-colors text-left"
                onClick={() => {
                  onChange(country.name);
                  setIsOpen(false);
                }}
              >
                <img
                  src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-5 h-auto rounded-sm"
                />
                <span className="text-[14px] text-white">{country.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default CountrySelect;
