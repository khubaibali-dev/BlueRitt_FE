import React, { useEffect } from "react";
import { X } from "lucide-react";
import SelectField from "../../../../components/common/select/SelectField";
import {
  categorySelectOptions,
  periodSelectOptions,
  countrySelectOptions,
  sortSelectOptions,
  sortOrderSelectOptions,
} from "../../../../utils/tiktokFilterOptions";

interface TrendsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  country: string;
  onCountryChange: (value: string) => void;
  period: string;
  onPeriodChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy?: string;
  onSortByChange?: (value: string) => void;
  sortOrder?: string;
  onSortOrderChange?: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}

const TrendsFilterDrawer: React.FC<TrendsFilterDrawerProps> = ({
  isOpen,
  onClose,
  country,
  onCountryChange,
  period,
  onPeriodChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onApply,
  onClear
}) => {
  // Lock body scroll when drawer is open (prevents browser native scrollbar)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        <div className="filter-drawer-body custom-scrollbar">
          {/* Country Selection */}
          <SelectField
            id="trend-country"
            label="Country"
            value={country}
            options={countrySelectOptions}
            onChange={onCountryChange}
          />

          {/* Time Range Selection */}
          <SelectField
            id="trend-period"
            label="Time Range"
            value={period}
            options={periodSelectOptions}
            onChange={onPeriodChange}
          />

          {/* Category Selection */}
          <SelectField
            id="trend-category"
            label="Category (Optional)"
            value={category}
            options={categorySelectOptions}
            onChange={onCategoryChange}
          />

          {/* Sorting Options */}
          <div className="pt-4 mt-4 border-t border-white/5 space-y-6">
            <SelectField
              id="trend-sort-by"
              label="Sort By"
              value={sortBy || "post"}
              options={sortSelectOptions}
              onChange={onSortByChange || (() => {})}
            />

            <SelectField
              id="trend-sort-order"
              label="Sort Order"
              value={sortOrder || "desc"}
              options={sortOrderSelectOptions}
              onChange={onSortOrderChange || (() => {})}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="filter-drawer-footer !border-t-0 mt-auto pb-10">
          <button
            onClick={onClear}
            className="filter-clear-btn flex-1 figma-pill-border"
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
