import React, { useState } from "react";
import { X } from "lucide-react";
import SelectField, { SelectOption } from "../../../../components/common/select/SelectField";

interface AmazonFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const marketplaceOptions: SelectOption[] = [
  { label: "Amazon.com (USA)", value: "US" },
  { label: "Amazon.co.uk (UK)", value: "UK" },
  { label: "Amazon.de (Germany)", value: "DE" },
  { label: "Amazon.fr (France)", value: "FR" },
  { label: "Amazon.ca (Canada)", value: "CA" },
  { label: "Amazon.com.au (Australia)", value: "AU" },
];

const periodOptions: SelectOption[] = [
  { label: "Last 7 Days", value: "7" },
  { label: "Last 30 Days", value: "30" },
  { label: "Last 90 Days", value: "90" },
  { label: "BSR Top 100", value: "bsr" },
];

const amazonCategoryOptions: SelectOption[] = [
  { label: "All Departments", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Home & Kitchen", value: "home" },
  { label: "Beauty & Personal Care", value: "beauty" },
  { label: "Toys & Games", value: "toys" },
  { label: "Clothing, Shoes & Jewelry", value: "clothing" },
  { label: "Sports & Outdoors", value: "sports" },
  { label: "Automotive", value: "automotive" },
];

const AmazonFilterDrawer: React.FC<AmazonFilterDrawerProps> = ({ isOpen, onClose }) => {
  const [marketplace, setMarketplace] = useState("US");
  const [period, setPeriod] = useState("30");
  const [category, setCategory] = useState("all");

  const handleClear = () => {
    setMarketplace("US");
    setPeriod("30");
    setCategory("all");
  };

  const handleApply = () => {
    console.log("Applying Amazon filters:", { marketplace, period, category });
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
      <div className={`filter-drawer-panel w-full sm:!w-[520px] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="filter-drawer-header">
          <h3 className="filter-drawer-title">Filters</h3>
          <button onClick={onClose} className="filter-drawer-close !outline-none">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="filter-drawer-body custom-scrollbar overflow-y-auto">
          {/* Marketplace Selection */}
          <SelectField
            id="amazon-marketplace"
            label="Selected Country"
            value={marketplace}
            options={marketplaceOptions}
            onChange={setMarketplace}
          />

          {/* Time Range Selection */}
          <SelectField
            id="amazon-period"
            label="Trend Type"
            value={period}
            options={periodOptions}
            onChange={setPeriod}
          />

          {/* Category Selection */}
          <SelectField
            id="amazon-category"
            label="Category"
            value={category}
            options={amazonCategoryOptions}
            onChange={setCategory}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-4 pb-10">
            <button
              onClick={handleClear}
              className="filter-clear-btn flex-1 figma-pill-border !text-white !font-bold h-[48px]"
            >
              Clear Filters
            </button>
            <button
              onClick={handleApply}
              className="filter-apply-btn flex-1 bg-brand-gradient !py-3 shadow-orange-500/20 active:scale-95 transition-all text-white font-bold rounded-full h-[48px]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmazonFilterDrawer;
