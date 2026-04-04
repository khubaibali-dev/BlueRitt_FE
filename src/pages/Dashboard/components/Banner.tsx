import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import shadowBg from "../../../assets/images/dashboard1.png";
import starImg from "../../../assets/images/star.png";
import PremiumSearchBar from "../../../components/common/search/PremiumSearchBar";
import FilterDropdown from "../../../components/common/select/FilterDropdown";
import FilterDrawer, { FilterState } from "../../Explorer/components/FilterDrawer/FilterDrawer";
import { COUNTRY_OPTIONS } from "../../../utils/Country";
import { PRODUCT_FILTER_OPTIONS } from "../../../utils/SearchOptions";

const Banner = () => {
  const [filterType, setFilterType] = useState(PRODUCT_FILTER_OPTIONS[0]);
  const pakistanOption = COUNTRY_OPTIONS.find(opt => opt.value === "PK") || COUNTRY_OPTIONS[0];
  const [selectedCountry, setSelectedCountry] = useState(pakistanOption);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({} as FilterState);

  const handleSearch = (value: string) => {
    console.log("Searching for:", value, "with filters:", filters);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  // Map country options to include code for flags
  const countryOptions = COUNTRY_OPTIONS.map((opt) => ({
    ...opt,
    code: opt.value, // ISO code for flagcdn
  }));

  return (
    <section className="dashboard-banner-container relative isolate rounded-t-[32px]">
      {/* Background Image Layer with Bottom Fade */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[32px]">
        <img src={shadowBg} alt="" className="dashboard-banner-image" />
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Star */}
      <div className="explorer-badge-wrapper">
        <img src={starImg} alt="" className="brand-star-standard" />
      </div>

      <h2 className="banner-heading-text">
        Find Your Next Winning Product
        <span className="page-header-subtitle mt-2 sm:mt-1">with IntelliScan</span>
      </h2>

      {/* Filter Row */}
      <div className="dashboard-filter-row">
        <div className="dashboard-filter-group">
          <FilterDropdown
            value={filterType.value}
            options={PRODUCT_FILTER_OPTIONS}
            onChange={(opt) => setFilterType(opt)}
            width="w-[140px]"
            dropdownWidth="w-[140px]"
          />
          <FilterDropdown
            value={selectedCountry.value}
            options={countryOptions}
            onChange={(opt) => setSelectedCountry(opt)}
            width="w-[190px]"
            dropdownWidth="w-[200px]"
          />
        </div>
        <button
          className="dashboard-filter-btn"
          onClick={() => setIsFilterOpen(true)}
        >
          Filters <SlidersHorizontal size={18} className="text-white" />
        </button>
      </div>

      {/* Search bar */}
      <PremiumSearchBar
        onSearch={handleSearch}
        className="max-w-[840px]"
      />

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
        country={selectedCountry.value}
      />
    </section>
  );
};

export default Banner;
