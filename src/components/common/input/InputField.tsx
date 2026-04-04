// src/components/common/input/InputField.tsx
import React from "react";

interface InputFieldProps {
  id: string;
  label?: string;
  labelRight?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ComponentType<{ className?: string }>;
  prefix?: string;
  rightElement?: React.ReactNode;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  labelRight,
  type = "text",
  placeholder = "",
  value,
  onChange,
  icon: Icon,
  prefix,
  rightElement = null,
  autoComplete,
  required = false,
  error = "",
  readOnly = false,
}) => {
  return (
    <div className="flex flex-col gap-[6px]">
      {(label || labelRight) && (
        <div className="flex justify-between items-center pr-1">
          {label && (
            <label
              htmlFor={id}
              className="text-[12px] font-normal leading-[16px] tracking-[0px] text-[#FFFFFF]"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {labelRight && <div className="flex-shrink-0">{labelRight}</div>}
        </div>
      )}

      <div
        className={`
          flex items-center gap-3 px-4 py-[12px] rounded-lg
          bg-brand-inputBg border transition-all duration-200
          ${readOnly ? "opacity-70 cursor-default" : "focus-within:shadow-[0_0_0_2px_rgba(37,99,235,0.5)]"}
          ${error ? "border-red-500" : "border-brand-inputBorder"}
        `}
      >
        {Icon && (
          <Icon
            className="w-[18px] h-[18px] text-brand-textSecondary flex-shrink-0"
            aria-hidden="true"
          />
        )}

        {prefix && (
          <span className="text-[14px] font-medium text-brand-textSecondary border-r border-brand-inputBorder pr-2 flex-shrink-0">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          readOnly={readOnly}
          className="
            flex-1 bg-transparent text-[14px] font-normal leading-[16px] tracking-[0px] text-brand-textPrimary 
            placeholder-[#99A1AF] outline-none border-none ring-0
          "
        />

        {rightElement && (
          <div className="flex-shrink-0 flex items-center justify-center">{rightElement}</div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 mt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
