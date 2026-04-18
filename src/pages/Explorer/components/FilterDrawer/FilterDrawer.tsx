import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { X, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../../../components/common/input/InputField";
import SelectField, { SelectOption } from "../../../../components/common/select/SelectField";
import { getAmazonCategoriesandSubcategories } from "../../../../api/product";

export interface FilterState {
  min_price?: number;
  max_price?: number;
  min_star_rating?: number;
  max_star_rating?: number;
  min_reviews?: number;
  max_reviews?: number;
  category?: string;
  is_amazon_choice?: boolean;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
  country?: string;
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, onApply, initialFilters, country = "US" }) => {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["amazon-categories-subcategories", country],
    queryFn: () => getAmazonCategoriesandSubcategories(country),
    enabled: isOpen,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const categoriesList: SelectOption[] = useMemo(() => {
    const resData = (categoriesData as any)?.data?.res || (categoriesData as any)?.res || [];
    if (!Array.isArray(resData)) return [];
    return resData.map((cat: any) => ({
      label: cat.category,
      value: cat.category,
    }));
  }, [categoriesData]);

  const [priceMin, setPriceMin] = useState(initialFilters?.min_price?.toString() || "");
  const [priceMax, setPriceMax] = useState(initialFilters?.max_price?.toString() || "");
  const [ratingMin, setRatingMin] = useState(initialFilters?.min_star_rating?.toString() || "");
  const [ratingMax, setRatingMax] = useState(initialFilters?.max_star_rating?.toString() || "");
  const [ratingCountMin, setRatingCountMin] = useState(initialFilters?.min_reviews?.toString() || "");
  const [ratingCountMax, setRatingCountMax] = useState(initialFilters?.max_reviews?.toString() || "");
  const [category, setCategory] = useState(initialFilters?.category || "");

  const [amazonChoice, setAmazonChoice] = useState<"yes" | "no" | null>(
    initialFilters?.is_amazon_choice === true ? "yes" : (initialFilters?.is_amazon_choice === false ? "no" : null)
  );


  const handleClear = () => {
    setPriceMin("");
    setPriceMax("");
    setRatingMin("");
    setRatingMax("");
    setRatingCountMin("");
    setRatingCountMax("");
    setCategory("");
    setAmazonChoice(null);
    onApply({});
  };

  const handleApply = () => {
    onApply({
      min_price: priceMin ? parseFloat(priceMin) : undefined,
      max_price: priceMax ? parseFloat(priceMax) : undefined,
      min_star_rating: ratingMin ? parseFloat(ratingMin) : undefined,
      max_star_rating: ratingMax ? parseFloat(ratingMax) : undefined,
      min_reviews: ratingCountMin ? parseInt(ratingCountMin) : undefined,
      max_reviews: ratingCountMax ? parseInt(ratingCountMax) : undefined,
      category: category || undefined,
      is_amazon_choice: amazonChoice === "yes" ? true : (amazonChoice === "no" ? false : undefined),
    });
    onClose();
  };

  const drawerContent = (
    <>
      <div
        className={`filter-drawer-backdrop ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div className={`filter-drawer-panel ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="filter-drawer-header">
          <h3 className="filter-drawer-title">Filters</h3>
          <button onClick={onClose} className="filter-drawer-close">
            <X size={20} />
          </button>
        </div>

        <div className="filter-drawer-body custom-scrollbar">
          <div className="filter-section">
            <label className="filter-section-label">Price Range ({country === "US" ? "$" : country})</label>
            <div className="filter-input-row">
              <div className="filter-input-wrap">
                <InputField
                  id="priceMin"
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  preventScientific={true}
                />
              </div>
              <div className="filter-input-wrap">
                <InputField
                  id="priceMax"
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  preventScientific={true}
                />
              </div>
            </div>
          </div>

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
                  preventScientific={true}
                />
              </div>
              <div className="filter-input-wrap">
                <InputField
                  id="ratingMax"
                  type="number"
                  placeholder="Max"
                  value={ratingMax}
                  onChange={(e) => setRatingMax(e.target.value)}
                  preventScientific={true}
                />
              </div>
            </div>
          </div>

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
                  preventScientific={true}
                />
              </div>
              <div className="filter-input-wrap">
                <InputField
                  id="ratingCountMax"
                  type="number"
                  placeholder="Max"
                  value={ratingCountMax}
                  onChange={(e) => setRatingCountMax(e.target.value)}
                  preventScientific={true}
                />
              </div>
            </div>
          </div>

          {/* <div className="filter-section">
            <label className="filter-section-label">Product Category</label>
            {isCategoriesLoading ? (
              <div className="flex items-center gap-2 text-brand-textSecondary text-[13px] py-3 px-4 bg-brand-inputBg rounded-xl border border-brand-border">
                <Loader2 size={16} className="animate-spin text-brand-primary" />
                Loading categories...
              </div>
            ) : (
              <div className="space-y-4">
                <SelectField
                  id="filter-category"
                  value={category}
                  options={categoriesList}
                  onChange={(val) => {
                    setCategory(val);
                  }}
                  placeholder="All Categories"
                />
              </div>
            )}
          </div> */}

          <div className="filter-section border-t border-brand-border pt-6 space-y-6">
            <div className="space-y-4">
              <label className="filter-section-label">Is Amazon Choice?</label>
              <div className="flex items-center gap-6">
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
        </div>

        <div className="filter-drawer-footer">
          <button onClick={handleClear} className="filter-clear-btn figma-pill-border">
            Clear Filters
          </button>
          <button onClick={handleApply} className="filter-apply-btn bg-brand-gradient">
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(drawerContent, document.body);
};

export default FilterDrawer;
