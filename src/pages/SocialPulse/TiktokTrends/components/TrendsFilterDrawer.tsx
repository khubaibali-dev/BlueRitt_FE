import React, { useState } from "react";
import { X } from "lucide-react";
import SelectField, { SelectOption } from "../../../../components/common/select/SelectField";

interface TrendsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryOptions: SelectOption[] = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
];

const periodOptions: SelectOption[] = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 30 Days", value: "30" },
  { label: "Last 90 Days", value: "90" },
  { label: "Last 120 Days", value: "120" },
];

const categoryOptions: SelectOption[] = [
  { label: "All Categories", value: "all" },
  { label: "Technology", value: "tech" },
  { label: "Fashion", value: "fashion" },
  { label: "Health & Beauty", value: "beauty" },
  { label: "Home & Garden", value: "home" },
  { label: "Toys & Hobbies", value: "toys" },
  { label: "Kitchen & Dining", value: "kitchen" },
];

const TrendsFilterDrawer: React.FC<TrendsFilterDrawerProps> = ({ isOpen, onClose }) => {
  const [country, setCountry] = useState("UK");
  const [period, setPeriod] = useState("30");
  const [category, setCategory] = useState("all");

  const handleClear = () => {
    setCountry("UK");
    setPeriod("30");
    setCategory("all");
  };

  const handleApply = () => {
    console.log("Applying filters:", { country, period, category });
    onClose();
  };

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
            onChange={setCountry}
          />

          {/* Time Range Selection */}
          <SelectField
            id="trend-period"
            label="Time Range"
            value={period}
            options={periodOptions}
            onChange={setPeriod}
          />

          {/* Category Selection */}
          <SelectField
            id="trend-category"
            label="Category (Optional)"
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />
        </div>

        {/* Footer */}
        <div className="filter-drawer-footer !border-t-0 mt-auto pb-10">
          <button
            onClick={handleClear}
            className="filter-clear-btn flex-1 figma-pill-border !text-white !font-bold"
          >
            Clear Filters
          </button>
          <button
            onClick={handleApply}
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
