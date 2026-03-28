import React, { useState } from "react";
import {
  Search,
  Sparkles,
  ChevronDown,
  SlidersHorizontal,
  Crown,
} from "lucide-react";
import TrendsHeader from "./components/TrendsHeader";
import TrendsTabs, { TabOption } from "./components/TrendsTabs";
import TrendsMetricCard from "./components/TrendsMetricCard";

interface MetricData {
  label: string;
  value?: string;
  icon: string;
  progress?: number;
  subtitle?: string;
  isAddon?: boolean;
}

interface TrendsPageTemplateProps {
  bannerImage: string;
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
}

const TrendsPageTemplate: React.FC<TrendsPageTemplateProps> = ({
  bannerImage,
  title,
  subtitle,
  tabs,
  metrics,
  searchPlaceholder,
  searchBtnText,
  renderContent,
  filterDrawer,
  detailsDrawer
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="bg-brand-card-alt rounded-[32px] relative shadow-2xl overflow-hidden flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">

      {/* Banner Section */}
      <section className="tiktok-banner-wrapper relative isolate">
        <div className="absolute inset-0 z-[-1]">
          <img src={bannerImage} alt="" className="tiktok-banner-image" />
          <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/5 to-transparent pointer-events-none" />
        </div>

        <div className="w-full max-w-[1240px] z-10 flex flex-col items-start text-left px-6 sm:px-1">
          <TrendsHeader title={title} subtitle={subtitle} />

          {/* Tabs & Upgrade */}
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              <TrendsTabs
                options={tabs}
                activeTab={activeTab}
                onTabChange={(value) => {
                  setActiveTab(value);
                  setHasSearched(false);
                }}
              />
            </div>

            <button className="upgrade-gradient-btn group !rounded-full w-full sm:w-auto shrink-0">
              <Crown size={18} className="text-white group-hover:rotate-12 transition-transform" />
              Upgrade Your Plan
            </button>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {metrics.map((metric, idx) => (
              <TrendsMetricCard key={idx} {...metric} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="px-6 sm:px-10 mt-10 space-y-12 transition-all">
        {/* Search & Actions */}
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-3">
          <div className="flex-1 w-full figma-rect-border group overflow-hidden bg-[#04132B]/50 relative transition-all">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-white transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder[activeTab] || "Search..."}
              className="w-full bg-transparent py-4 pl-14 pr-6 text-white text-[15px] placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button type="submit" className="upgrade-gradient-btn !px-6 !rounded-[14px] whitespace-nowrap h-[48px] w-full sm:w-auto">
              <Sparkles size={16} />
              {searchBtnText[activeTab] || "Search"}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button type="button" className="btn-secondary-standard">
                Sort By <ChevronDown size={14} />
              </button>

              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="btn-secondary-standard"
              >
                Filters <SlidersHorizontal size={14} />
              </button>
            </div>
          </div>
        </form>

        <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
          {renderContent(activeTab, hasSearched, () => setIsDetailsOpen(true), setSelectedProduct)}
        </div>
      </div>

      {/* Drawers */}
      {filterDrawer && filterDrawer(isFilterOpen, () => setIsFilterOpen(false))}
      {detailsDrawer && detailsDrawer(isDetailsOpen, () => setIsDetailsOpen(false), selectedProduct)}
    </div>
  );
};

export default TrendsPageTemplate;
