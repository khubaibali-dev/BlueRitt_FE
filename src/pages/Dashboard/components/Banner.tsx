import { ChevronDown, SlidersHorizontal } from "lucide-react";
import shadowBg from "../../../assets/images/shadow.png";
import starImg from "../../../assets/images/star.png";
import aiIcon from "../../../assets/images/Icon.png";

const Banner = () => (
  <section className="dashboard-banner-container mb-12">
    <img src={shadowBg} alt="" className="dashboard-shadow-overlay" />

    {/* Top Star */}
    <div className="flex items-center justify-center mb-8">
      <img src={starImg} alt="" className="brand-star-standard" />
    </div>

    <h2 className="text-3xl sm:text-[42px] text-white mb-8 sm:mb-12 tracking-tight leading-[1.1] max-w-[700px]">
      Find Your Next Winning Product with IntelliScan
    </h2>

    {/* Filter Row */}
    <div className="flex flex-wrap items-center justify-between w-full max-w-[840px] mb-5 gap-4 px-1">
      <div className="flex items-center gap-4">
        <button className="filter-pill whitespace-nowrap">
          Product <ChevronDown size={16} className="opacity-60" />
        </button>
        <button className="filter-pill gap-3 whitespace-nowrap">
          <div className="flex flex-col gap-[2px] w-4">
            <div className="h-[4px] w-full bg-[#006600]"></div>
            <div className="h-[4px] w-full bg-[#006600]"></div>
          </div>
          Pakistan <ChevronDown size={16} className="opacity-60" />
        </button>
      </div>
      <button className="filter-pill whitespace-nowrap">
        Filters <SlidersHorizontal size={16} className="ml-1 opacity-60" />
      </button>
    </div>

    {/* Search bar */}
    <div className="search-input-premium flex-col sm:flex-row gap-4 sm:gap-0 h-auto sm:h-[72px] !items-center p-3 sm:p-2 sm:pr-2">
      <div className="hidden sm:flex items-center justify-center pl-2 pr-2">
        <img src={starImg} alt="" className="brand-star-standard" style={{ width: '40px', height: '40px' }} />
      </div>
      <input
        type="text"
        placeholder="Search by ASIN, keyword, or category..."
        className="inner-input flex-1 w-full bg-transparent border-none outline-none text-white text-[16px] px-4 placeholder-white/60 mb-2 sm:mb-0"
      />
      <button className="search-ai-btn whitespace-nowrap w-full sm:w-auto justify-center">
        <img src={aiIcon} alt="" className="w-5 h-5 object-contain" />
        Search with AI
      </button>
    </div>
  </section>
);

export default Banner;
