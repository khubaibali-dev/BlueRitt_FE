import React, { useState } from "react";
import { ChevronLeft, Box, Star, Save, TrendingUp, Truck } from "lucide-react";
import bgAnalysis from "../../../../assets/images/explorer.png";
import BasicTab from "../../../ProfitCalculator/Basic/BasicTab";
import AdvancedTab from "../../../ProfitCalculator/Advance/AdvancedTab";
import ResultPanels from "../../../ProfitCalculator/components/ResultPanels";
import { useProfitCalculation } from "../../../../hooks/useProfitCalculation";
import SaveToVaultModal from "../Common/SaveToVaultModal";

interface SourceLinkProfitCalculatorProps {
  product: any;
  supplier: any;
  onBack: () => void;
}

const SourceLinkProfitCalculator: React.FC<SourceLinkProfitCalculatorProps> = ({ product, supplier, onBack }) => {
  const [activeTab] = useState<"Basic" | "Advanced">("Basic");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Helper to parse price range "$17.38-19.43" -> "17.38"
  const parseCost = (costStr: string) => {
    if (!costStr) return "0.00";
    const matches = costStr.match(/\d+\.?\d*/);
    return matches ? matches[0] : "0.00";
  };

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
  } = useProfitCalculation({
    sellingPrice: product?.price?.toString() || "0.00",
    manufacturingCost: parseCost(supplier?.cost),
  });

  const displayProfitUnit = activeTab !== "Advanced" ? netProfitUnit : grossProfitUnit;
  const marginPerc = (parseFloat(formData.sellingPrice) || 0) > 0 ? ((parseFloat(displayProfitUnit) / (parseFloat(formData.sellingPrice) || 0)) * 100).toFixed(1) : "0.0";
  const roiPerc = parseFloat(sourcingCostUnit) > 0 ? ((parseFloat(displayProfitUnit) / parseFloat(sourcingCostUnit)) * 100).toFixed(1) : "0.0";

  return (
    <div className="discovery-results px-4 sm:px-4 py-6 sm:py-10 animate-in fade-in slide-in-from-right-full duration-500 w-full relative bg-[#051125] rounded-[24px] isolate min-h-screen overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
        <img src={bgAnalysis} alt="" className="w-full h-full object-cover object-top opacity-100 mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#030F23] via-[#030F23]/30 to-transparent" />
      </div>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-0 sm:px-2 pt-0 pb-10">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="bg-white/5 figma-pill-border px-4 py-2 rounded-full text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all font-inter mb-1"
          >
            <ChevronLeft size={16} /> Back
          </button>

          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="bg-brand-gradient px-6 py-2.5 rounded-full text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-orange-900/20 font-inter"
          >
            Save to Product Vault
          </button>
        </div>

        {/* Title Section */}
        <div className=" mb-8 md:mb-12 px-1">
          <h1 className="banner-heading-text !text-left !mb-0">
            Profit Calculation
          </h1>
          <p className="auth-subtitle max-w-[98%] md:max-w-[730px] mt-2 px-0 !text-left ml-4">
            Review selections and analyze detailed profit margins
          </p>
        </div>

        {/* Top Panels Hooked together */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-12">
          {/* Selected Product Card */}
          <div className="bg-[#04132B]/60 backdrop-blur-md border border-brand-inputBorder rounded-[24px] overflow-hidden shadow-2xl relative p-4">
            <div className="flex items-center gap-2 mb-4">
              <Box size={14} className="text-[#FF5900]" />
              <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">
                Selected Product
              </span>
            </div>
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 shrink-0">
                <img src={product?.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="product-card-title text-[15px] sm:text-[16px] mb-2">{product?.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="brand-tag brand-tag-default font-bold uppercase tracking-wider !px-3 !py-1 text-[10px]">Electronics</span>
                      <span className="brand-tag brand-tag-amazon font-bold uppercase tracking-wider !px-3 !py-1 text-[10px]">Amazon Choice</span>
                      <div className="flex gap-0.5 ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < 4 ? "#FFC107" : "transparent"} className={i < 4 ? "text-[#FFC107]" : "text-slate-600"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="product-old-price-primary text-[12px] block mb-1">${product?.oldPrice}</span>
                    <span className="product-price-primary text-[24px] block leading-none">${product?.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid - Moved Below and restored icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-2 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="quick-action-icon-circle !w-6 !h-6">
                  <Box size={14} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="metric-label leading-none mb-0.5">ASIN</span>
                  <span className="metric-value leading-none">{product?.asin}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="quick-action-icon-circle !w-6 !h-6">
                  <TrendingUp size={14} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="metric-label leading-none mb-0.5">MONTHLY SALES VOL</span>
                  <span className="metric-value leading-none">{product?.salesVol}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="quick-action-icon-circle !w-6 !h-6">
                  <span className="text-white font-bold text-[12px]">%</span>
                </div>
                <div className="flex flex-col">
                  <span className="metric-label leading-none mb-0.5">OFFERS</span>
                  <span className="metric-value leading-none">{product?.offers} sellers</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="quick-action-icon-circle !w-6 !h-6">
                  <Truck size={14} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="metric-label leading-none mb-0.5">DELIVERY</span>
                  <span className="metric-value leading-none">Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Supplier Card */}
          <div className="bg-[#04132B]/60 backdrop-blur-md border border-brand-inputBorder rounded-[24px] overflow-hidden shadow-2xl relative p-4">
            <div className="flex items-center gap-2 mb-6">
              <Box size={14} className="text-[#FF5900]" />
              <span className="text-[11px] text-[#FF5900] font-black tracking-[0.15em] uppercase">
                Selected Supplier
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/5 shrink-0 bg-[#081421]">
                <img src={supplier?.image} alt="" className="w-full h-full object-cover p-2" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="product-card-title text-[15px] sm:text-[16px] leading-tight max-w-[450px]">
                    2025 New Design App Tracker Smart Watch GPS Sports..
                  </h3>
                  <div className="flex gap-0.5 mt-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < 4 ? "#FFC107" : "transparent"} className={i < 4 ? "text-[#FFC107]" : "text-white/20"} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="brand-tag brand-tag-default border-[#00D1FF33] text-white/90 text-[10px] font-bold px-3 py-1">Verified</span>
                  <span className="brand-tag brand-tag-default border-[#00D1FF33] text-white/90 text-[10px] font-bold px-3 py-1">Trade Assurance</span>
                  <span className="brand-tag brand-tag-default border-[#00D1FF33] text-white/90 text-[10px] font-bold px-3 py-1">Store Age: {supplier?.age || "4 years"}</span>
                  <span className="brand-tag border-[#8B5CF64D] text-white text-[10px] font-bold px-3 py-1" style={{ background: 'linear-gradient(90deg, rgba(255, 89, 0, 0.2) 0%, rgba(255, 0, 230, 0.2) 100%)' }}>Gold</span>
                </div>
              </div>
            </div>

            {/* Supplier Info Grid - Reorganized into 2 Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr,1fr] gap-y-4 gap-x-4 lg:gap-x-12 border-t border-white/5 pt-3 mt-1">
              <div className="flex flex-col">
                <span className="metric-label mb-1">Store</span>
                <span className="metric-value leading-tight">Shenzhen Iwonlex Technology Co., Ltd.</span>
              </div>
              <div className="flex flex-col">
                <span className="metric-label mb-1 ">Manufacturing Cost</span>
                <span className="metric-value text-[#FF5900] text-[15px] font-black tracking-tight">{supplier?.cost || "$17.38-19.43"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-7 gap-x-4 lg:gap-x-12 mt-4">
              <div className="flex flex-col">
                <span className="metric-label mb-1">Seller</span>
                <span className="metric-value">{supplier?.contact || "Cherry Zhou"}</span>
              </div>
              <div className="flex flex-col">
                <span className="metric-label mb-1">Item ID</span>
                <span className="metric-value">{supplier?.id || "1601481983321"}</span>
              </div>
              <div className="flex flex-col">
                <span className="metric-label mb-1">Min. Order Qty</span>
                <span className="metric-value">{supplier?.minOrder || "1 set"}</span>
              </div>
              <div className="flex flex-col">
                <span className="metric-label mb-1">Country</span>
                <span className="metric-value">{supplier?.country || "China"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Form Accordions */}
          <div className="flex-1 w-full flex flex-col gap-4">
            <BasicTab
              formData={formData}
              handleFieldChange={handleFieldChange as any}
              totalRevenue={totalRevenue}
              sourcingCostUnit={sourcingCostUnit}
              totalSourcingCost={totalSourcingCost}
              fulfillmentCostUnit={fulfillmentCostUnit}
              totalFulfillmentCost={totalFulfillmentCost}
            />

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
            {/* <div className="flex justify-center w-full mb-4">
              <div className="bg-[#030B1C]/5 p-1 backdrop-blur-xl flex items-center figma-pill-border overflow-hidden">
                <button
                  onClick={() => setActiveTab("Basic")}
                  className={`px-8 py-1.5 rounded-full text-[12px] font-bold transition-all ${activeTab === 'Basic' ? 'bg-brand-gradient text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setActiveTab("Advanced")}
                  className={`px-8 py-1.5 rounded-full text-[12px] font-bold transition-all ${activeTab === 'Advanced' ? 'bg-brand-gradient text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Advanced
                </button>
              </div>
            </div> */}

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
      {/* Save to Vault Modal */}
      {isSaveModalOpen && (
        <SaveToVaultModal
          productTitle={product?.title || "Portable Blender"}
          onClose={() => setIsSaveModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SourceLinkProfitCalculator;
