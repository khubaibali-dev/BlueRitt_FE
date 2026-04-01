import React from "react";
import { X } from "lucide-react";
import SelectField, { SelectOption } from "../../../../components/common/select/SelectField";

interface TrendsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
  onCountryChange: (value: string) => void;
  period: string;
  onPeriodChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

const countryOptions: SelectOption[] = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Japan", value: "JP" },
  { label: "Brazil", value: "BR" },
];

const periodOptions: SelectOption[] = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 30 Days", value: "30" },
  { label: "Last 90 Days", value: "90" },
  { label: "Last 120 Days", value: "120" },
];

const categoryOptions: SelectOption[] = [
  { label: "All Categories", value: "" },
  { label: "Technology", value: "tech" },
  { label: "Fashion", value: "fashion" },
  { label: "Health & Beauty", value: "beauty" },
  { label: "Home & Garden", value: "home" },
  { label: "Toys & Hobbies", value: "toys" },
  { label: "Kitchen & Dining", value: "kitchen" },
];

const TrendsFilterDrawer: React.FC<TrendsFilterDrawerProps> = ({
  isOpen,
  onClose,
  country,
  onCountryChange,
  period,
  onPeriodChange,
  category,
  onCategoryChange,
  onApply,
  onClear
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`filter-drawer-backdrop ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`filter-drawer-panel ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="filter-drawer-header">
          <h3 className="filter-drawer-title">Filters</h3>
          <button onClick={onClose} className="filter-drawer-close !outline-none">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="filter-drawer-body custom-scrollbar overflow-y-auto">
          {/* Country Selection */}
          <SelectField
            id="trend-country"
            label="Country"
            value={country}
            options={countryOptions}
            onChange={onCountryChange}
          />

          {/* Time Range Selection */}
          <SelectField
            id="trend-period"
            label="Time Range"
            value={period}
            options={periodOptions}
            onChange={onPeriodChange}
          />

          {/* Category Selection */}
          <SelectField
            id="trend-category"
            label="Category (Optional)"
            value={category}
            options={categoryOptions}
            onChange={onCategoryChange}
          />
        </div>

        {/* Footer */}
        <div className="filter-drawer-footer !border-t-0 mt-auto pb-10">
          <button
            onClick={onClear}
            className="filter-clear-btn flex-1 figma-pill-border !text-white !font-bold"
          >
            Clear Filters
          </button>
          <button
            onClick={onApply}
            className="filter-apply-btn flex-1 !py-3 shadow-orange-500/20 bg-brand-gradient"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default TrendsFilterDrawer;
