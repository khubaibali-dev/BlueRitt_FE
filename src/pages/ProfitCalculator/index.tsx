import React, { useState, useEffect } from "react";
import { Search, Info, Globe } from "lucide-react";
import * as Yup from "yup";
import { Formik } from "formik";
import shadowBg from "../../assets/images/marganmax.png";
import ResultPanels from "./components/ResultPanels";
import MarginMaxTourModal from "./components/MarginMaxTourModal";
import BasicTab from "./Basic/BasicTab";
import AdvancedTab from "./Advance/AdvancedTab";
import FilterDropdown from "../../components/common/select/FilterDropdown";
import { COUNTRY_OPTIONS } from "../../utils/Country";
import { useProfitCalculation } from "../../hooks/useProfitCalculation";

const validationSchema = Yup.object({
  pi_sellingPrice: Yup.number().required("Selling Price is required.").typeError("Must be a number."),
  pi_quantity: Yup.number().required("Units Sold is required.").typeError("Must be a number."),
  psc_manufacturingCost: Yup.number().required("Product Manufacturing is required.").typeError("Must be a number."),
  psc_shippingCost: Yup.number().required("Shipping Cost is required.").typeError("Must be a number."),
  psc_orderQuantity: Yup.number().required("Order Quantity is required.").typeError("Must be a number."),
  fm_referrfalFees: Yup.number().required("Amazon Fees is required.").typeError("Must be a number."),
  fm_fbaFulfillmentFees: Yup.number().required("Fulfillment Cost is required.").typeError("Must be a number."),
  fm_monthlyStorageFees: Yup.number().required("Storage Cost is required.").typeError("Must be a number."),
  fm_returnsRate: Yup.number().required("Returns Rate is required.").typeError("Must be a number."),
  gc_imagingAndPhotographyCost: Yup.number().required("Imaging and Photography Cost is required.").typeError("Must be a number."),
});

const initialValues = {
  pi_sellingPrice: "0",
  pi_totalRevenue: "0",
  pi_quantity: "0",
  psc_manufacturingCost: "0",
  psc_shippingCost: "0",
  psc_orderQuantity: "0",
  psc_miscCost: "0",
  fm_model: "FBA",
  fm_referrfalFees: "0",
  fm_fbaFulfillmentFees: "0",
  fm_monthlyStorageFees: "0",
  fm_longTermStorageFees: "0",
  fm_inboundShippingCost: "0",
  fm_returnsRate: "0",
  fm_shippingFees: "0",
  fm_handlingCost: "0",
  fm_storageCost: "0",
  fm_miscCost: "0",
  marc_marketingCost: "0",
  marc_attributionCost: "0",
  marc_influencerCost: "0",
  marc_miscCost: "0",
  marc_marketingVATCost: "0",
  tax_region: "US",
  tax_VAT: "0",
  tax_GST: "0",
  tax_salesTax: "0",
  tax_miscCost: "0",
  gc_imagingAndPhotographyCost: "0",
  gc_videographyCost: "0",
  gc_productPackingCost: "0",
  gc_3dAnimationCost: "0",
  gc_miscCost: "0",
  pfc_vineProgramCost: "0",
  pfc_miscCost: "0",
  oc_preLaunchSamples: "0",
  oc_competitorProductSamples: "0",
  oc_employeesCost: "0",
  oc_anyOtherCost: "0",
};

const ProfitCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Basic" | "Advanced">("Basic");
  const [showTour, setShowTour] = useState(true);
  const [selectedMarketplace, setSelectedMarketplace] = useState("US");


  const {
    formData,
    setFormData,
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
  } = useProfitCalculation(initialValues);

  const displayProfitUnit = activeTab === "Advanced" ? netProfitUnit : grossProfitUnit;
  const marginPerc = (parseFloat(formData.pi_sellingPrice) || 0) > 0 ? ((parseFloat(displayProfitUnit) / (parseFloat(formData.pi_sellingPrice) || 0)) * 100).toFixed(1) : "0.0";
  const roiPerc = parseFloat(sourcingCostUnit) > 0 ? ((parseFloat(displayProfitUnit) / parseFloat(sourcingCostUnit)) * 100).toFixed(1) : "0.0";

  const countryOptions = COUNTRY_OPTIONS.map((opt) => ({
    ...opt,
    code: opt.value.toLowerCase(),
  }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => {
        // Synchronize Formik with hook
        useEffect(() => {
          setFormData(formik.values as any);
        }, [formik.values, setFormData]);

        return (
          <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative shadow-2xl min-h-screen">
            {/* Hero Banner Section */}
            <section className="dashboard-banner-container relative w-full pb-0 pt-12 sm:pt-16 lg:pt-20 rounded-t-[32px] flex flex-col items-center justify-start isolate !overflow-visible !min-h-0">
              <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[32px]">
                <img src={shadowBg} alt="" className="dashboard-banner-image" />
                <div className="calculator-hero-glow" />
                <div className="calculator-hero-fade" />
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
                <div className="calculator-toggle-wrapper">
                  <div className="calculator-toggle-container">
                    <button
                      type="button"
                      onClick={() => setActiveTab("Basic")}
                      className={`calculator-toggle-btn ${activeTab === 'Basic' ? 'calculator-toggle-btn-active' : 'calculator-toggle-btn-inactive'}`}
                    >
                      Basic
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("Advanced")}
                      className={`calculator-toggle-btn ${activeTab === 'Advanced' ? 'calculator-toggle-btn-active' : 'calculator-toggle-btn-inactive'}`}
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
                  <BasicTab
                    formData={formik.values as any}
                    handleFieldChange={formik.setFieldValue}
                    totalRevenue={totalRevenue}
                    sourcingCostUnit={sourcingCostUnit}
                    totalSourcingCost={totalSourcingCost}
                    fulfillmentCostUnit={fulfillmentCostUnit}
                    totalFulfillmentCost={totalFulfillmentCost}
                    errors={formik.errors}
                    touched={formik.touched}
                  />

                  <AdvancedTab
                    formData={formik.values as any}
                    handleFieldChange={formik.setFieldValue}
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
                    errors={formik.errors}
                    touched={formik.touched}
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
                    quantity={formik.values.pi_quantity}
                    isAdvanced={activeTab === "Advanced"}
                  />
                </div>

              </div>
            </div>

            {/* Tour Modal */}
            {showTour && <MarginMaxTourModal onClose={() => setShowTour(false)} />}
          </div>
        );
      }}
    </Formik>
  );
};

export default ProfitCalculator;
