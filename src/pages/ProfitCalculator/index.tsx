import React, { useState } from "react";
import { Search, Info, Globe } from "lucide-react";
import shadowBg from "../../assets/images/marganmax.png";
import ResultPanels from "./components/ResultPanels";
import MarginMaxTourModal from "./components/MarginMaxTourModal";
import BasicTab from "./Basic/BasicTab";
import AdvancedTab from "./Advance/AdvancedTab";
import FilterDropdown from "../../components/common/select/FilterDropdown";
import { COUNTRY_OPTIONS } from "../../utils/Country";

import { useProfitCalculation } from "../../hooks/useProfitCalculation";

const ProfitCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Basic" | "Advanced">("Basic");
  const [showTour, setShowTour] = useState(true);

  const {
    formData,
    handleFieldChange,
    totalRevenue,
    sourcingCostUnit,
    totalSourcingCost,
    fulfillmentCostUnit,
    totalFulfillmentCost,
    marketingCostUnit,
    totalMarketingCost,
    graphicsCostUnit,
    totalGraphicsCost,
    reviewerCostUnit,
    totalReviewerCost,
    additionalCostUnit,
    totalAdditionalCost,
    taxesUnit,
    totalTaxes,
    grossProfitUnit,
    totalGrossProfit,
    netProfitUnit,
    totalNetProfit,
  } = useProfitCalculation();

  const displayProfitUnit = activeTab === "Advanced" ? netProfitUnit : grossProfitUnit;
  const marginPerc = (parseFloat(formData.sellingPrice) || 0) > 0 ? ((parseFloat(displayProfitUnit) / (parseFloat(formData.sellingPrice) || 0)) * 100).toFixed(1) : "0.0";
  const roiPerc = parseFloat(sourcingCostUnit) > 0 ? ((parseFloat(displayProfitUnit) / parseFloat(sourcingCostUnit)) * 100).toFixed(1) : "0.0";

  const [selectedMarketplace, setSelectedMarketplace] = useState("US");

  const countryOptions = COUNTRY_OPTIONS.map((opt) => ({
    ...opt,
    code: opt.value.toLowerCase(),
  }));

  // ──────────────────────────────────────────────────────────────────────

  return (
    <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-2xl min-h-screen">
      {/* Hero Banner Section */}
      <section className="dashboard-banner-container relative w-full pb-0 pt-12 sm:pt-16 lg:pt-20 rounded-t-[32px] flex flex-col items-center justify-start isolate !overflow-visible !min-h-0">
        <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[32px]">
          <img src={shadowBg} alt="" className="dashboard-banner-image" />
          {/* Centered Rounded Glow - Covers Heading to Info icon area */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[10%] w-full max-w-4xl h-[70%] rounded-[100px] blur-[80px] opacity-80"
            style={{
              background: "linear-gradient(20deg, #020617 0%, #2648a7ff 50%, #e4e3e3ff 100%)"
            }}
          />
          {/* Bottom High-Intensity Blur Layer - Masked for seamless transition */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[260px] pointer-events-none"
            style={{
              backdropFilter: "blur(100px)",
              background: "linear-gradient(to top, #020617 0%, rgba(36, 66, 113, 0.4) 50%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)",
              maskImage: "linear-gradient(to top, black 50%, transparent 100%)"
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/20 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center mt-2">
          <h1 className="banner-heading-text !mb-1">
            Calculate Your Product Profit
          </h1>
          <p className="auth-subtitle mb-6 text-center max-w-[600px]">
            Search by ASIN to auto-fill product details instantly
          </p>

          {/* ASIN Search Box */}
          <div className="calculator-search-box !z-[60]">
            <input
              type="text"
              placeholder="Search products e.g. Apple watch"
              className="w-full bg-[#FFFFFF0D] border-none rounded-xl px-5 py-3.5 text-white text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] mb-5 transition-all"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <span className="text-[12px] text-white flex items-center gap-1.5 font-medium">
                  <Globe size={14} /> Marketplace:
                </span>
                <FilterDropdown
                  value={selectedMarketplace}
                  options={countryOptions}
                  onChange={(opt) => setSelectedMarketplace(opt.value)}
                  buttonClassName="flex items-center gap-2 bg-[#FFFFFF0D] hover:bg-[#FFFFFF1A] border border-white/5 px-4 py-2 rounded-full text-[13px] font-bold text-white transition-all shadow-sm w-[190px] justify-between whitespace-nowrap"
                  dropdownWidth="w-[200px]"
                />
              </div>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-gradient hover:brightness-110 active:scale-95 text-white px-8 py-2.5 rounded-full text-[13px] font-bold transition-all">
                <Search size={16} />
                Search ASIN
              </button>
            </div>

            <div className="mt-2 text-[11px] text-slate-400 text-left">
              <span className="font-semibold text-white">Pro tip:</span> Enter any Amazon ASIN to automatically fetch product details, pricing, and fees
            </div>
          </div>

          {/* Plan Info Pill */}
          <div className="w-full max-w-3xl flex items-center gap-2 text-[12px] text-slate-300 font-medium text-left mt-1">
            <Info size={22} className="text-white shrink-0" />
            <span>
              Advance plan - You have <span className="text-[#3B82F6] font-bold">260</span> Searches.
              Purchase Search <a href="/addons" className="text-[#F05A2B] hover:underline ml-1">Add-ons</a> OR
              <a href="/settings" className="text-[#F05A2B] hover:underline ml-1">Update your Subscription</a>
            </span>
          </div>

          {/* Basic / Advanced Toggle */}
          <div className="flex justify-center w-full mt-8 mb-0">
            <div className="bg-[#030B1C]/5 px-2 py-2 backdrop-blur-xl flex items-center figma-pill-border overflow-hidden">
              <button
                onClick={() => setActiveTab("Basic")}
                className={`px-8 py-2 rounded-full text-[13px] font-bold transition-all ${activeTab === 'Basic' ? 'bg-brand-gradient text-white shadow-lg shadow-orange-500/20' : 'text-white hover:text-white'}`}
              >
                Basic
              </button>
              <button
                onClick={() => setActiveTab("Advanced")}
                className={`px-8 py-2 rounded-full text-[13px] font-bold transition-all ${activeTab === 'Advanced' ? 'bg-brand-gradient text-white shadow-lg shadow-orange-500/20' : 'text-white hover:text-white'}`}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-14 relative z-10 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start pb-20">

          {/* Left Column: Form Accordions */}
          <div className="flex-1 w-full flex flex-col gap-4">
            {/* Basic tab accordions — always visible */}
            <BasicTab
              formData={formData}
              handleFieldChange={handleFieldChange as any}
              totalRevenue={totalRevenue}
              sourcingCostUnit={sourcingCostUnit}
              totalSourcingCost={totalSourcingCost}
              fulfillmentCostUnit={fulfillmentCostUnit}
              totalFulfillmentCost={totalFulfillmentCost}
            />

            {/* Advanced accordions — always visible, locked in Basic mode */}
            <AdvancedTab
              formData={formData}
              handleFieldChange={handleFieldChange as any}
              marketingCostUnit={marketingCostUnit}
              totalMarketingCost={totalMarketingCost}
              graphicsCostUnit={graphicsCostUnit}
              totalGraphicsCost={totalGraphicsCost}
              reviewerCostUnit={reviewerCostUnit}
              totalReviewerCost={totalReviewerCost}
              additionalCostUnit={additionalCostUnit}
              totalAdditionalCost={totalAdditionalCost}
              taxesUnit={taxesUnit}
              totalTaxes={totalTaxes}
              disabled={activeTab === "Basic"}
            />
          </div>

          {/* Right Column: Sticky Results */}
          <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-8 flex flex-col gap-6">
            <ResultPanels
              grossProfitUnit={grossProfitUnit}
              totalGrossProfit={totalGrossProfit}
              netProfitUnit={netProfitUnit}
              totalNetProfit={totalNetProfit}
              marginPerc={marginPerc}
              roiPerc={roiPerc}
              quantity={formData.productQuantity}
              isAdvanced={activeTab === "Advanced"}
            />
          </div>

        </div>
      </div>

      {/* Tour Modal */}
      {showTour && <MarginMaxTourModal onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default ProfitCalculator;
