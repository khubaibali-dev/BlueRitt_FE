import React, { useState } from "react";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Package,
} from "lucide-react";
import TrendsTabs, { TabOption } from "./components/TrendsTabs";
import TrendsMetricCard from "./components/TrendsMetricCard";
import SelectField, { SelectOption } from "../../../components/common/select/SelectField";
import PageHeader from "../../../components/common/PageHeader/PageHeader";

interface MetricData {
  label: string;
  value?: string;
  icon: string;
  progress?: number;
  subtitle?: string;
  isAddon?: boolean;
  onClick?: () => void;
  tooltipContent?: string;
}

interface TrendsPageTemplateProps {
  bannerImage: string;
  lightBannerImage?: string;
  title: string;
  subtitle: string;
  tabs: TabOption[];
  metrics: MetricData[];
  searchPlaceholder: {
    [key: string]: string;
  };
  searchBtnText: {
    [key: string]: string;
  };
  renderContent: (
    activeTab: string,
    hasSearched: boolean,
    openDetails: () => void,
    setSelectedProduct: (product: any) => void
  ) => React.ReactNode;
  filterDrawer?: (isOpen: boolean, onClose: () => void) => React.ReactNode;
  detailsDrawer?: (isOpen: boolean, onClose: () => void, product: any) => React.ReactNode;
  analyzingScreen?: React.ReactNode;
  inlineFilters?: React.ReactNode;
  showFilterButton?: boolean;
  sortBy?: string;
  onSortByChange?: (value: string) => void;
  sortOptions?: SelectOption[];
  showProductPageHeader?: boolean;
  // Controlled props
  activeTab?: string;
  onTabChange?: (value: string) => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: (e: React.FormEvent) => void;
  hasSearched?: boolean;
  metricsAction?: React.ReactNode;
  showSearchForm?: boolean;
  rightSidebar?: React.ReactNode;
  searchDisabled?: boolean;
}

const TrendsPageTemplate: React.FC<TrendsPageTemplateProps> = ({
  bannerImage,
  lightBannerImage,
  title,
  subtitle,
  tabs,
  metrics,
  searchPlaceholder,
  searchBtnText,
  renderContent,
  filterDrawer,
  detailsDrawer,
  analyzingScreen,
  inlineFilters,
  showFilterButton = true,
  sortBy,
  onSortByChange,
  sortOptions,
  showProductPageHeader = false,
  activeTab: controlledActiveTab,
  onTabChange: controlledOnTabChange,
  searchQuery: controlledSearchQuery,
  onSearchChange: controlledOnSearchChange,
  onSearch: controlledOnSearch,
  hasSearched: controlledHasSearched,
  metricsAction,
  showSearchForm = true,
  rightSidebar,
  searchDisabled = false,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0].value);
  const [internalSearchQuery, setInternalSearchQuery] = useState("");
  const [internalHasSearched, setInternalHasSearched] = useState(false);

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const searchQuery = controlledSearchQuery !== undefined ? controlledSearchQuery : internalSearchQuery;
  const hasSearched = controlledHasSearched !== undefined ? controlledHasSearched : internalHasSearched;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (controlledOnSearch) {
      controlledOnSearch(e);
    } else {
      setInternalHasSearched(true);
    }
  };

  const handleTabChange = (value: string) => {
    if (controlledOnTabChange) {
      controlledOnTabChange(value);
    } else {
      setInternalActiveTab(value);
      setInternalHasSearched(false);
    }
  };

  const handleSearchChange = (value: string) => {
    if (controlledOnSearchChange) {
      controlledOnSearchChange(value);
    } else {
      setInternalSearchQuery(value);
    }
  };

  return (
    <div className={`bg-brand-card-alt rounded-[32px] relative overflow-hidden flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-700 ${analyzingScreen ? 'h-[600px]' : 'min-h-[600px]'}`}>

      {/* Shared Banner Background */}
      <div className="absolute top-0 left-0 right-0 h-[420px] z-0 pointer-events-none overflow-hidden isolate">
        <img src={bannerImage} alt="" className={`tiktok-banner-image ${lightBannerImage ? 'hidden dark:block' : ''}`} />
        {lightBannerImage && (
          <img src={lightBannerImage} alt="" className="tiktok-banner-image block dark:hidden" />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-[260px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/20 to-transparent" />
      </div>

      <div className={`relative z-10 flex flex-col ${rightSidebar ? 'lg:flex-row' : ''} w-full flex-1`}>
        {/* Main Part (Left) */}
        <div className="flex-1 flex flex-col min-w-0 pb-2">
          {/* Top Banner Content Section */}
          <section className="relative min-h-[400px] flex flex-col pt-14 pb-4 mx-4">
            <div className="w-full max-w-[1240px] z-10 flex flex-col items-start text-left px-6 sm:px-1">
              <div className="w-full flex justify-between items-start">
                <PageHeader title={title} subtitle={subtitle} />
                <div className="mt-2">{metricsAction}</div>
              </div>

              {/* Tabs */}
              {tabs.length > 1 && (
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 sm:gap-6 mb-8 sm:mb-12">
                  <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
                    <TrendsTabs
                      options={tabs}
                      activeTab={activeTab}
                      onTabChange={handleTabChange}
                    />
                  </div>
                </div>
              )}

              {/* tiktoktrends Row */}
              {showProductPageHeader && (
                <div className="flex mb-4 items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="w-10 h-10 rounded-xl 
    bg-gradient-to-b from-black/10 to-[#6b96f3] 
    border border-brand-inpuBorder dark:border-none
    flex items-center justify-center 
    text-brand-primary shadow-2xl shadow-brand-primary/10 
    text-brand-textSecondary dark:text-[#FFFFFFB2]">

                    <Package size={22} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[16px] font-medium dark:text-white tracking-tight  leading-none mb-1">Products Trends</h3>
                    <p className="text-[12px] dark:text-[#FFFFFF99] font-medium tracking-tight">Discover viral products</p>
                  </div>
                </div>
              )}
              <div className={`grid grid-cols-1 md:grid-cols-2 ${rightSidebar ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-3'} gap-4 w-full`}>
                {metrics.map((metric, idx) => (
                  <TrendsMetricCard key={idx} {...metric} />
                ))}
              </div>
            </div>
          </section>

          {/* Body Content Area */}
          <div className="px-6 sm:px-4 mt-0 space-y-8 transition-all">
            {/* Search & Actions Area */}
            <div className="space-y-6">
              {showSearchForm && (
                <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-3">
                  <div className="flex-1 w-full figma-rect-border !rounded-[12px] group overflow-hidden bg-[#E5E3E333] dark:bg-[#04132B]/50 relative transition-all">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-textPrimary dark:group-focus-within:text-white transition-colors">
                      <Search size={20} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder={searchPlaceholder[activeTab] || "Search..."}
                      className="w-full bg-transparent py-3 pl-14 pr-6 text-brand-textPrimary dark:text-white text-[15px] placeholder-[#08265675] dark:placeholder-slate-500 rounded-[12px] outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                    {searchBtnText[activeTab] && (
                      <button
                        type="submit"
                        disabled={searchDisabled}
                        className={`upgrade-gradient-btn !px-6 !rounded-[12px] whitespace-nowrap h-[44px] w-full sm:w-auto transition-all ${searchDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110'}`}
                      >
                        <Sparkles size={16} />
                        {searchBtnText[activeTab]}
                      </button>
                    )}

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {onSortByChange && sortOptions && (
                        <div className="w-[160px]">
                          <SelectField
                            id="header-sort"
                            value={sortBy || ""}
                            options={sortOptions}
                            onChange={onSortByChange}
                            placeholder="Sort By"
                            className="!rounded-[12px] !bg-brand-card/50 !h-[44px] flex items-center"
                          />
                        </div>
                      )}

                      {showFilterButton && (
                        <button
                          type="button"
                          onClick={() => setIsFilterOpen(true)}
                          className="btn-secondary-standard"
                        >
                          Filters <SlidersHorizontal size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}

              {/* Inline Filters */}
              {inlineFilters && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  {inlineFilters}
                </div>
              )}
            </div>

            <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
              {renderContent(activeTab, hasSearched, () => setIsDetailsOpen(true), setSelectedProduct)}
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        {rightSidebar && (
          <>
            <div className="hidden lg:block w-[1px] border-l border-white/[0.05] dark:border-[#082656] mx-4 xl:mx-1"></div>
            <div className="w-full lg:w-[310px] xl:w-[350px] flex flex-col p-8 lg:p-4 xl:p-5 gap-8 mt-[40px] pb-6">
              {rightSidebar}
            </div>
          </>
        )}
      </div>

      {/* Drawers */}
      {filterDrawer && filterDrawer(isFilterOpen, () => setIsFilterOpen(false))}
      {detailsDrawer && detailsDrawer(isDetailsOpen, () => setIsDetailsOpen(false), selectedProduct)}
      {analyzingScreen}
    </div>
  );
};

export default TrendsPageTemplate;
