import { ChevronDown, SlidersHorizontal } from "lucide-react";
import shadowBg from "../../../assets/images/dashboard1.png";
import starImg from "../../../assets/images/star.png";
import PremiumSearchBar from "../../../components/common/search/PremiumSearchBar";

const Banner = () => {
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  return (
    <section className="dashboard-banner-container mb-12 relative overflow-hidden isolate rounded-t-[32px]">
      {/* Background Image Layer with Bottom Fade */}
      <div className="absolute inset-0 z-[-1]">
        <img src={shadowBg} alt="" className="dashboard-banner-image" />
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/10 to-transparent pointer-events-none" />
      </div>

      {/* Top Star */}
      <div className="explorer-badge-wrapper">
        <img src={starImg} alt="" className="brand-star-standard" />
      </div>

      <h2 className="text-xl sm:text-2xl md:text-[32px] font-semibold text-white text-center mb-6 sm:mb-8 tracking-tight px-4 leading-tight">
        Find Your Next Winning Product  <br />
        <span className="block mt-2 sm:mt-4 opacity-90">with IntelliScan</span>
      </h2>
 
      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-center sm:justify-between w-full max-w-[840px] mb-6 sm:mb-10 gap-3 sm:gap-4 px-4 sm:px-1">
        <div className="flex items-center gap-2 sm:gap-4 justify-center sm:justify-start">
          <button className="dashboard-filter-btn text-[12px] sm:text-[14px] px-3 sm:px-5 py-2 sm:py-2.5">
            Product <ChevronDown size={14} className="opacity-60" />
          </button>
          <button className="dashboard-filter-btn gap-2 sm:gap-3 text-[12px] sm:text-[14px] px-3 sm:px-5 py-2 sm:py-2.5">
            <div className="flex flex-col gap-[2px] w-3.5 sm:w-4">
              <div className="h-[3px] sm:h-[4px] w-full bg-[#006600]"></div>
              <div className="h-[3px] sm:h-[4px] w-full bg-[#006600]"></div>
            </div>
            Pakistan <ChevronDown size={14} className="opacity-60" />
          </button>
        </div>
        <button className="dashboard-filter-btn text-[12px] sm:text-[14px] px-3 sm:px-5 py-2 sm:py-2.5">
          Filters <SlidersHorizontal size={14} className="ml-1 opacity-60" />
        </button>
      </div>

      {/* Search bar */}
      <PremiumSearchBar onSearch={handleSearch} className="max-w-[840px]" />
    </section>
  );
};

export default Banner;
