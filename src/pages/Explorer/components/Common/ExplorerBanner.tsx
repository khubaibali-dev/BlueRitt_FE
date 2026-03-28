import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import explorerBg from "../../../../assets/images/explorer.png";
import starImg from "../../../../assets/images/star.png";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import PremiumSearchBar from "../../../../components/common/search/PremiumSearchBar";
import FilterDropdown from "../../../../components/common/select/FilterDropdown";
import { COUNTRY_OPTIONS } from "../../../../utils/Country";
import { PRODUCT_FILTER_OPTIONS } from "../../../../utils/SearchOptions";

interface ExplorerBannerProps {
  onSearch: () => void;
}

const ExplorerBanner: React.FC<ExplorerBannerProps> = ({ onSearch }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState(PRODUCT_FILTER_OPTIONS[0]);
  const pakistanOption = COUNTRY_OPTIONS.find(opt => opt.value === "PK") || COUNTRY_OPTIONS[0];
  const [selectedCountry, setSelectedCountry] = useState(pakistanOption);

  const handleSearchWithAI = () => {
    onSearch();
  };

  // Map country options to include code for flags
  const countryOptions = COUNTRY_OPTIONS.map((opt) => ({
    ...opt,
    code: opt.value, // ISO code for flagcdn
  }));

  return (
    <section className="explorer-banner-wrapper relative overflow-visible">
      {/* Background Image Layer with Bottom Fade */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[20px] sm:rounded-t-[32px]">
        <img
          src={explorerBg}
          alt=""
          className="explorer-banner-image"
        />
        {/* Bottom Fade Overlay - adjusted to only affect the very bottom so the orange shows through clearly */}
        <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Badge */}
      <div className="explorer-badge-wrapper">
        <div className="explorer-badge-pill">
          <img src={starImg} alt="" className="explorer-badge-icon" />
          <span className="explorer-badge-text">Blueritt Explorer</span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-[900px] px-3 sm:px-4">
        <h1 className="banner-heading-text">
          <span className="inline-flex items-center justify-center gap-4">
            Explore with IntelliScan
            <div className="relative flex items-center justify-center shrink-0 rounded-full w-[38px] h-[38px] bg-white/5 backdrop-blur-[20px] cursor-pointer hover:bg-white/10 transition-all z-10 info-icon-border">
              <span className="font-serif italic text-white text-[22px] font-bold leading-none pr-[2px]">i</span>
            </div>
          </span>
        </h1>

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
            onClick={() => setFilterOpen(true)}
          >
            Filters <SlidersHorizontal size={18} className="text-white" />
          </button>
        </div>

        {/* Search bar */}

        <PremiumSearchBar onSearch={handleSearchWithAI} className="max-w-[840px]" />
      </div>

      {/* Filter Drawer */}
      <FilterDrawer isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </section>
  );
};

export default ExplorerBanner;
