import React from 'react';
import InputField from '../../../components/common/input/InputField';

interface CalculatorFieldProps {
  label: string;
  required?: boolean;
  prefix?: string;
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  type?: string;
  className?: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CalculatorField: React.FC<CalculatorFieldProps> = ({
  label,
  required,
  prefix,
  value,
  onChange,
  readOnly,
  type = "text",
  className = "",
  error,
  onBlur
}) => {
  return (
    <div className={className}>
      <InputField
        id={`calc-${label.replace(/\s+/g, '-').toLowerCase()}`}
        label={label}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        prefix={prefix}
        required={required}
        readOnly={readOnly}
        error={error}
        onBlur={onBlur}
        // InputField handles the rest of the styling
      />
    </div>
  );
};

export default CalculatorField;
