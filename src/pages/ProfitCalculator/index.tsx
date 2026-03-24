import React, { useState } from "react";
import { Search, ChevronDown, Info, Globe } from "lucide-react";
import shadowBg from "../../assets/images/dashboard1.png";
import CalculatorAccordion from "./components/CalculatorAccordion";
import CalculatorField from "./components/CalculatorField";
import ResultPanels from "./components/ResultPanels";
import MarginMaxTourModal from "./components/MarginMaxTourModal";

const ProfitCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Basic" | "Advanced">("Basic");
  const [showTour, setShowTour] = useState(true);

  // Calculator State
  const [formData, setFormData] = useState({
    sellingPrice: "19.99",
    productQuantity: "100",
    manufacturingCost: "12.99",
    shippingCost: "2.50",
    otherSourcingCost: "1.00",
    orderQuantity: "100",
    fulfillmentCost: "4.50",
    marketingBudget: "500",
    graphicsCost: "150",
    reviewerCost: "200",
    additionalCost: "0.00"
  });

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Derived Calculations
  const sellingPrice = parseFloat(formData.sellingPrice) || 0;
  const productQuantity = parseFloat(formData.productQuantity) || 0;
  const mfgCost = parseFloat(formData.manufacturingCost) || 0;
  const shipCost = parseFloat(formData.shippingCost) || 0;
  const otherSrting = parseFloat(formData.otherSourcingCost) || 0;
  
  const totalRevenue = (sellingPrice * productQuantity).toFixed(2);
  const sourcingCostUnit = (mfgCost + shipCost + otherSrting).toFixed(2);
  const totalSourcingCost = (parseFloat(sourcingCostUnit) * productQuantity).toFixed(2);
  
  const fulfillmentCost = parseFloat(formData.fulfillmentCost) || 0;
  const grossProfitUnit = (sellingPrice - parseFloat(sourcingCostUnit) - fulfillmentCost).toFixed(2);
  const totalGrossProfit = (parseFloat(grossProfitUnit) * productQuantity).toFixed(2);
  const marginPerc = sellingPrice > 0 ? ((parseFloat(grossProfitUnit) / sellingPrice) * 100).toFixed(1) : "0.0";
  const roiPerc = parseFloat(sourcingCostUnit) > 0 ? ((parseFloat(grossProfitUnit) / parseFloat(sourcingCostUnit)) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-2xl min-h-screen">
      {/* Hero Banner Section */}
      <section className="dashboard-banner-container relative w-full pb-0 pt-12 sm:pt-16 lg:pt-20 rounded-t-[32px] flex flex-col items-center justify-start  isolate overflow-hidden !min-h-0">
        {/* Dashboard-style Background Image Setup */}
        <div className="absolute inset-0 z-[-1]">
          <img src={shadowBg} alt="" className="dashboard-banner-image" />
          <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/10 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center mt-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl  text-white mb-2 tracking-tight text-center">
            Calculate Your Product Profit
          </h1>
          <p className="text-[14px] sm:text-[15px] text-slate-300 mb-2 font-medium text-center">
            Search by ASIN to auto-fill product details instantly
          </p>

          {/* ASIN Search Box */}
          <div className="calculator-search-box">
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
                <button className="flex items-center gap-2 bg-[#FFFFFF0D] hover:bg-white/10 border-none px-4 py-1.5 rounded-full text-[13px] font-medium text-white transition-colors">
                  <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="w-[14px] h-auto rounded-sm" />
                  United States
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </div>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-gradient hover:brightness-110 active:scale-95 text-white px-8 py-2.5 rounded-full text-[13px] font-bold shadow-lg shadow-orange-500/20 transition-all">
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

          {/* Toggle Switch */}
          <div className="flex justify-center w-full mt-4 mb-0">
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

        {/* 2-Column Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pb-20">

          {/* Left Column: Form Accordions */}
          <div className="flex-1 w-full flex flex-col gap-4">
            <CalculatorAccordion title="Product Revenue" defaultOpen>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CalculatorField 
                  label="Selling Price" 
                  required 
                  prefix="$" 
                  value={formData.sellingPrice} 
                  onChange={(val) => handleFieldChange("sellingPrice", val)} 
                />
                <CalculatorField 
                  label="Product Quantity" 
                  required 
                  value={formData.productQuantity} 
                  onChange={(val) => handleFieldChange("productQuantity", val)} 
                />
                <CalculatorField label="Revenue/Unit" prefix="$" value={formData.sellingPrice} readOnly />
                <CalculatorField label="Total Revenue" prefix="$" value={totalRevenue} readOnly />
              </div>
            </CalculatorAccordion>

            <CalculatorAccordion title="Product Sourcing Cost" defaultOpen>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CalculatorField 
                  label="Product Manufacturing" 
                  required 
                  prefix="$" 
                  value={formData.manufacturingCost} 
                  onChange={(val) => handleFieldChange("manufacturingCost", val)} 
                />
                <CalculatorField 
                  label="Shipping Cost" 
                  required 
                  prefix="$"
                  value={formData.shippingCost} 
                  onChange={(val) => handleFieldChange("shippingCost", val)} 
                />
                <CalculatorField 
                  label="Other Sourcing Costs" 
                  prefix="$" 
                  value={formData.otherSourcingCost} 
                  onChange={(val) => handleFieldChange("otherSourcingCost", val)} 
                />
                <CalculatorField 
                  label="Order Quantity" 
                  required 
                  value={formData.orderQuantity} 
                  onChange={(val) => handleFieldChange("orderQuantity", val)} 
                />
                <CalculatorField label="Sourcing Cost/Unit" prefix="$" value={sourcingCostUnit} readOnly />
                <CalculatorField label="Total Sourcing Cost" prefix="$" value={totalSourcingCost} readOnly />
              </div>
            </CalculatorAccordion>

            <CalculatorAccordion title="Fulfillment Cost">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <CalculatorField 
                  label="Fulfillment Cost/Unit" 
                  prefix="$" 
                  value={formData.fulfillmentCost} 
                  onChange={(val) => handleFieldChange("fulfillmentCost", val)} 
                />
              </div>
            </CalculatorAccordion>

            <CalculatorAccordion title="Marketing and Ads Cost">
              <div className="p-2 text-slate-400 text-[13px]">Marketing settings...</div>
            </CalculatorAccordion>

            <CalculatorAccordion title="Graphics Design Cost">
              <div className="p-2 text-slate-400 text-[13px]">Graphics settings...</div>
            </CalculatorAccordion>

            <CalculatorAccordion title="Reviewer Program Cost">
              <div className="p-2 text-slate-400 text-[13px]">Reviewer settings...</div>
            </CalculatorAccordion>

            <CalculatorAccordion title="Additional Costs">
              <div className="p-2 text-slate-400 text-[13px]">Additional settings...</div>
            </CalculatorAccordion>
          </div>

          {/* Right Column: Sticky Results */}
          <div className="w-full lg:w-[380px] shrink-0 sticky top-[40px] flex flex-col gap-6">
            <ResultPanels 
              grossProfitUnit={grossProfitUnit}
              totalGrossProfit={totalGrossProfit}
              marginPerc={marginPerc}
              roiPerc={roiPerc}
              quantity={formData.productQuantity}
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
