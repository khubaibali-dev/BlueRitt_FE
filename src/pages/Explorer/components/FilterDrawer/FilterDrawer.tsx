import React, { useState } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import InputField from "../../../../components/common/input/InputField";
import SelectField, { SelectOption } from "../../../../components/common/select/SelectField";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_OPTIONS: SelectOption[] = [
  { label: "Electronics", value: "electronics" },
  { label: "Home & Kitchen", value: "home-kitchen" },
  { label: "Toys & Games", value: "toys-games" },
  { label: "Beauty & Personal Care", value: "beauty-personal" },
  { label: "Health & Household", value: "health-household" },
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");
  const [ratingCountMin, setRatingCountMin] = useState("");
  const [ratingCountMax, setRatingCountMax] = useState("");
  const [category, setCategory] = useState("");
  const [amazonChoice, setAmazonChoice] = useState<"yes" | "no" | null>(null);

  const handleClear = () => {
    setPriceMin("");
    setPriceMax("");
    setRatingMin("");
    setRatingMax("");
    setRatingCountMin("");
    setRatingCountMax("");
    setCategory("");
    setAmazonChoice(null);
  };

  const drawerContent = (
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
          <button onClick={onClose} className="filter-drawer-close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="filter-drawer-body">

          {/* Price Range */}
          <div className="filter-section">
            <label className="filter-section-label">Price Range (US $)</label>
            <div className="filter-input-row">
              <div className="filter-input-wrap">
                <InputField
                  id="priceMin"
                  type="number"
                  placeholder="Min ($)"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
              </div>
              <div className="filter-input-wrap">
                <InputField
                  id="priceMax"
                  type="number"
                  placeholder="Max ($)"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Star Ratings */}
          <div className="filter-section">
            <label className="filter-section-label">Star Ratings (0-5)</label>
            <div className="filter-input-row">
              <div className="filter-input-wrap">
                <InputField
                  id="ratingMin"
                  type="number"
                  placeholder="Min"
                  value={ratingMin}
                  onChange={(e) => setRatingMin(e.target.value)}
                />
              </div>
              <div className="filter-input-wrap">
                <InputField
                  id="ratingMax"
                  type="number"
                  placeholder="Max"
                  value={ratingMax}
                  onChange={(e) => setRatingMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Rating Count */}
          <div className="filter-section">
            <label className="filter-section-label">Rating Count</label>
            <div className="filter-input-row">
              <div className="filter-input-wrap">
                <InputField
                  id="ratingCountMin"
                  type="number"
                  placeholder="Min"
                  value={ratingCountMin}
                  onChange={(e) => setRatingCountMin(e.target.value)}
                />
              </div>
              <div className="filter-input-wrap">
                <InputField
                  id="ratingCountMax"
                  type="number"
                  placeholder="Max"
                  value={ratingCountMax}
                  onChange={(e) => setRatingCountMax(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category Select */}
          <div className="filter-section">
            <SelectField
              id="category"
              label="Product Category"
              value={category}
              options={CATEGORY_OPTIONS}
              onChange={(val) => setCategory(val)}
              placeholder="All Categories"
            />
          </div>

          {/* Amazon Choice */}
          <div className="filter-section border-t border-white/5 pt-6">
            <label className="filter-section-label">Is Amazon Choice?</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="amazon-choice"
                  checked={amazonChoice === "yes"}
                  onChange={() => setAmazonChoice("yes")}
                  className="filter-radio"
                />
                Yes
              </label>
              <label className="filter-radio-label">
                <input
                  type="radio"
                  name="amazon-choice"
                  checked={amazonChoice === "no"}
                  onChange={() => setAmazonChoice("no")}
                  className="filter-radio"
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="filter-drawer-footer">
          <button onClick={handleClear} className="filter-clear-btn figma-pill-border">
            Clear Filters
          </button>
          <button onClick={onClose} className="filter-apply-btn bg-brand-gradient">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(drawerContent, document.body);
};

export default FilterDrawer;
