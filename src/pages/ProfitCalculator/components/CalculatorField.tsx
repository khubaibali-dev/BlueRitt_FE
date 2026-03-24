import React from 'react';

interface CalculatorFieldProps {
  label: string;
  required?: boolean;
  prefix?: React.ReactNode;
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  type?: string;
  className?: string;
}

const CalculatorField: React.FC<CalculatorFieldProps> = ({
  label,
  required,
  prefix,
  value,
  onChange,
  readOnly,
  type = "text",
  className = ""
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <label className="text-[12px] font-medium text-slate-300">
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div
        className={`
          flex items-center bg-[#FFFFFF0D] border border-transparent rounded-xl px-4 py-3 transition-colors
          ${readOnly ? 'opacity-90 cursor-default' : 'focus-within:border-[#3B82F6]/50'}
        `}
      >
        {prefix && <div className="text-slate-400 text-[14px] mr-2 flex items-center justify-center">{prefix}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          className="w-full bg-transparent text-[14px] font-bold text-white placeholder-slate-500 outline-none"
        />
      </div>
    </div>
  );
};

export default CalculatorField;
