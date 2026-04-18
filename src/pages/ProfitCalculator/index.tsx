import React, { useState, useEffect } from "react";
import { Search, Info, Globe, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, useFormikContext } from "formik";
import shadowBg from "../../assets/images/marganmax.png";
import shadowBgLight from "../../assets/images/Explorer-light.png";
import ResultPanels from "./components/ResultPanels";
import MarginMaxTourModal from "../../components/common/input/TourModels/MarginMaxTourModal";
import BasicTab from "./Basic/BasicTab";
import AdvancedTab from "./Advance/AdvancedTab";
import FilterDropdown from "../../components/common/select/FilterDropdown";
import { COUNTRY_OPTIONS } from "../../utils/Country";
import { useProfitCalculation } from "../../hooks/useProfitCalculation";
import { useUserDetails } from "../../hooks/useUserDetails";
import { getAmazonExplorerProductDetails } from "../../api/amazonExplorer";
import { getProfitProCalculations } from "../../api/savedProducts";
import AmazonProductCard from "../Explorer/components/Common/Cards/AmazonProductCard";
import { useToast } from "../../components/common/Toast/ToastContext";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
  marc_marketingCost: Yup.number().required("Marketing Cost is required.").typeError("Must be a number."),
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
  const [showTour, setShowTour] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState("US");
  const [searchAsin, setSearchAsin] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { error: toastError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const calculationId = searchParams.get("calculationId");
  const { data: userDetails } = useUserDetails();
  const hasGrossAccess = userDetails?.features?.access_to_gross_profit ?? true;
  const hasNetAccess = userDetails?.features?.access_to_net_profit ?? true;

  useEffect(() => {
    const hasCompleted = localStorage.getItem("blueritt_profit_calculator_tour_completed");
    if (!hasCompleted) {
      setShowTour(true);
    }
  }, []);

  const handleCloseTour = () => {
    setShowTour(false);
    localStorage.setItem("blueritt_profit_calculator_tour_completed", "true");
  };

  // 1. Fetch saved calculation if ID exists
  const { data: savedCalcResponse, isLoading: isLoadingSaved } = useQuery({
    queryKey: ["saved-calculation", calculationId],
    queryFn: () => getProfitProCalculations({ saveID: calculationId! }),
    enabled: !!calculationId,
  });

  const handleAsinSearch = async (formik: any) => {
    if (!searchAsin.trim()) {
      toastError("Please enter an ASIN to search");
      return;
    }

    try {
      setIsSearching(true);
      const response = await getAmazonExplorerProductDetails({
        asin: searchAsin.trim(),
        country: selectedMarketplace,
        source: "no_of_gross_profit_calculations"
      });

      if (response && response.data) {
        const product = response.data;
        setSelectedProduct(product);

        // Auto-fill Formik values
        const price = product.product_price?.replace(/[$,]/g, "") || "0";
        formik.setFieldValue("pi_sellingPrice", price);

        // Auto-fill Amazon Fees if possible
        if (product.product_offers?.[0]) {
          // We can add more logic here if backend provides more distinct fee data
        }
      }
    } catch (err: any) {
      console.error("ASIN Search error:", err);
      toastError(err.message || "Failed to fetch product details. Please check the ASIN.");
    } finally {
      setIsSearching(false);
    }
  };


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
      <ProfitCalculatorContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showTour={showTour}
        selectedMarketplace={selectedMarketplace}
        setSelectedMarketplace={setSelectedMarketplace}
        searchAsin={searchAsin}
        setSearchAsin={setSearchAsin}
        isSearching={isSearching}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        handleAsinSearch={handleAsinSearch}
        handleCloseTour={handleCloseTour}
        hasGrossAccess={hasGrossAccess}
        hasNetAccess={hasNetAccess}
        totalRevenue={totalRevenue}
        sourcingCostUnit={sourcingCostUnit}
        totalSourcingCost={totalSourcingCost}
        fulfillmentCostUnit={fulfillmentCostUnit}
        totalFulfillmentCost={totalFulfillmentCost}
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
        grossProfitUnit={grossProfitUnit}
        totalGrossProfit={totalGrossProfit}
        netProfitUnit={netProfitUnit}
        totalNetProfit={totalNetProfit}
        displayProfitUnit={displayProfitUnit}
        marginPerc={marginPerc}
        roiPerc={roiPerc}
        countryOptions={countryOptions}
        setFormData={setFormData}
        savedCalcResponse={savedCalcResponse}
        userDetails={userDetails}
        navigate={navigate}
      />
    </Formik>
  );
};

// Internal component to solve TypeScript and Hook rules error
const ProfitCalculatorContent: React.FC<any> = ({
  activeTab,
  setActiveTab,
  showTour,
  selectedMarketplace,
  setSelectedMarketplace,
  searchAsin,
  setSearchAsin,
  isSearching,
  selectedProduct,
  setSelectedProduct,
  handleAsinSearch,
  handleCloseTour,
  hasGrossAccess,
  hasNetAccess,
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
  displayProfitUnit,
  marginPerc,
  roiPerc,
  countryOptions,
  setFormData,
  savedCalcResponse,
  userDetails,
  navigate
}) => {
  const formik = useFormikContext<any>();

  // Synchronize Formik with hook
  useEffect(() => {
    setFormData(formik.values as any);
  }, [formik.values, setFormData]);

  // Populate form when saved calculation is loaded
  useEffect(() => {
    if (savedCalcResponse?.data) {
      const data = savedCalcResponse.data;
      const product = data.product;
      const sourcing = data.sourcing_cost;
      const fulfillment = data.fulfillment;
      const marketing = data.marketing_and_advertising;
      const taxesData = data.taxes;
      const graphics = data.graphics_and_visuals;
      const feedback = data.product_feedback;
      const other = data.other_costs;

      // Set marketplace
      if (fulfillment?.country) {
        setSelectedMarketplace(fulfillment.country);
      }

      // Map values to Formik
      formik.setValues({
        pi_sellingPrice: product?.selling_price || "0",
        pi_totalRevenue: product?.total_revenue || "0",
        pi_quantity: product?.quantity || "0",
        psc_manufacturingCost: sourcing?.manufacturing_cost || "0",
        psc_shippingCost: sourcing?.shipping_cost || "0",
        psc_orderQuantity: sourcing?.order_quantity || "0",
        psc_miscCost: sourcing?.miscellaneous_cost || "0",
        fm_model: fulfillment?.fulfillment_type || "FBA",
        fm_referrfalFees: fulfillment?.referral_fees || "0",
        fm_fbaFulfillmentFees: fulfillment?.fba_fulfillment_fees || "0",
        fm_monthlyStorageFees: fulfillment?.monthly_storage_fees || "0",
        fm_longTermStorageFees: fulfillment?.long_term_storage_fees || "0",
        fm_inboundShippingCost: fulfillment?.inbound_shipping_cost || "0",
        fm_returnsRate: fulfillment?.returns_refunds_rate || "0",
        fm_shippingFees: fulfillment?.shipping_fee || "0",
        fm_handlingCost: fulfillment?.handling_cost || "0",
        fm_storageCost: fulfillment?.storage_cost || "0",
        fm_miscCost: fulfillment?.miscellaneous_cost || "0",
        marc_marketingCost: marketing?.marketing_and_advertising_cost || "0",
        marc_attributionCost: marketing?.attribution_links_costs || "0",
        marc_influencerCost: marketing?.promotion_other_costs || "0",
        marc_miscCost: marketing?.miscellaneous_cost || "0",
        marc_marketingVATCost: marketing?.marketing_vat_costs || "0",
        tax_region: taxesData?.tax_region || "US",
        tax_VAT: taxesData?.vat || "0",
        tax_GST: taxesData?.gst || "0",
        tax_salesTax: taxesData?.sales_tax || "0",
        tax_miscCost: taxesData?.miscellaneous_cost || "0",
        gc_imagingAndPhotographyCost: graphics?.imaging_photography_cost || "0",
        gc_videographyCost: graphics?.videography_cost || "0",
        gc_productPackingCost: graphics?.packaging_design_cost || "0",
        gc_3dAnimationCost: graphics?.animation_3d_cost || "0",
        gc_miscCost: graphics?.miscellaneous_cost || "0",
        pfc_vineProgramCost: feedback?.vine_program_cost || "0",
        pfc_miscCost: feedback?.miscellaneous_cost || "0",
        oc_preLaunchSamples: other?.prelaunch_samples_cost || "0",
        oc_competitorProductSamples: other?.competitor_product_samples_cost || "0",
        oc_employeesCost: other?.employees_cost || "0",
        oc_anyOtherCost: other?.other_cost || "0",
      });

      // Set product card if available
      if (data.amazon_product) {
        setSelectedProduct(data.amazon_product.data || data.amazon_product);
      }

      // Handle advanced tab switch
      const marketingData = data.marketing_and_advertising || {};
      const advancedCost = marketingData.marketing_and_advertising_cost || "0";

      if (hasNetAccess && (advancedCost !== "0" || taxesData?.tax_region)) {
        setActiveTab("Advanced");
      } else {
        setActiveTab("Basic");
      }
    }
  }, [savedCalcResponse, hasNetAccess]);

  return (
    <div className="dashboard-container relative min-h-screen bg-brand-bg lg:p-1">
      <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative min-h-screen shadow-md">
        {/* Hero Banner Section */}
        <section className="dashboard-banner-container relative w-full pb-0 pt-12 sm:pt-16 lg:pt-20 rounded-t-[32px] flex flex-col items-center justify-start isolate !overflow-visible min-h-[500px]">
          <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[32px]">
            <img src={shadowBg} alt="" className="dashboard-banner-image hidden dark:block" />
            <img src={shadowBgLight} alt="" className="dashboard-banner-image block dark:hidden" />
            <div className="calculator-hero-glow dark:block hidden" />
            <div className="calculator-hero-fade" />
            <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/20 to-transparent dark:flex hidden pointer-events-none" />
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
                value={searchAsin}
                onChange={(e) => setSearchAsin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAsinSearch(formik)}
                placeholder="Enter ASIN (e.g. B07HL6FV5F)"
                className="w-full bg-brand-inputBg dark:bg-[#FFFFFF0D] border border-brand-inputBorder dark:border-none rounded-xl px-5 py-3.5 text-brand-textPrimary dark:text-white text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] mb-5 transition-all"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="text-[12px] text-brand-textPrimary dark:text-white flex items-center gap-1.5 font-medium">
                    <Globe size={14} /> Marketplace:
                  </span>
                  <FilterDropdown
                    value={selectedMarketplace}
                    options={countryOptions}
                    onChange={(opt) => setSelectedMarketplace(opt.value)}
                    buttonClassName="flex items-center gap-2 bg-brand-card-alt dark:bg-[#FFFFFF0D] hover:bg-brand-hover/10 dark:hover:bg-[#FFFFFF1A] border border-brand-inputBorder dark:border-white/5 px-4 py-2 rounded-full text-[13px] font-bold text-brand-textPrimary dark:text-white transition-all w-[190px] justify-between whitespace-nowrap"
                    dropdownWidth="w-[200px]"
                  />
                </div>

                <button
                  onClick={() => handleAsinSearch(formik)}
                  disabled={isSearching}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-gradient hover:brightness-110 active:scale-95 text-white px-8 py-2.5 rounded-full text-[13px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  {isSearching ? "Searching..." : "Search ASIN"}
                </button>
              </div>

              <div className="mt-2 text-[11px] text-slate-400 text-left">
                <span className="font-semibold text-brand-textPrimary dark:text-white">Pro tip:</span> Enter any Amazon ASIN to automatically fetch product details, pricing, and fees
              </div>
            </div>

            {/* Plan Info Pill */}
            <div className="w-full max-w-3xl flex items-center gap-2 text-[12px] text-brand-textSecondary dark:text-slate-300 font-medium text-left mt-1">
              <Info size={22} className="text-brand-textSecondary dark:text-white shrink-0" />
              <span>
                {userDetails?.subscription_status?.package?.name || userDetails?.profile?.plan || "Standard"} plan - You have <span className="text-[#3B82F6] font-bold">{userDetails?.search_quota?.no_of_gross_profit_calculations || 0}</span> Searches.
                Purchase Search <a href="/addons" className="text-[#F05A2B] hover:underline ml-1">Add-ons</a> OR
                <button
                  onClick={() => navigate("/settings?tab=plan")}
                  className="text-[#F05A2B] hover:underline ml-1 bg-transparent border-none p-0 cursor-pointer font-medium"
                >
                  Update your Subscription
                </button>
              </span>
            </div>

            <div className="calculator-toggle-wrapper">
              <div className="calculator-toggle-container gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("Basic")}
                  className={`calculator-toggle-btn flex items-center justify-center gap-2 ${activeTab === 'Basic' ? 'calculator-toggle-btn-active' : 'calculator-toggle-btn-inactive'}`}
                >
                  {!hasGrossAccess && <Lock size={12} className="opacity-70" />}
                  Basic
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Advanced")}
                  className={`calculator-toggle-btn flex items-center justify-center gap-2 ${activeTab === 'Advanced' ? 'calculator-toggle-btn-active' : 'calculator-toggle-btn-inactive'}`}
                >
                  {!hasNetAccess && <Lock size={12} className="opacity-70" />}
                  Advanced
                </button>
              </div>
            </div>

            {selectedProduct && (
              <div className="w-full max-w-[1200px] mt-8 animate-in fade-in zoom-in-95 duration-500">
                <AmazonProductCard
                  product={selectedProduct}
                  variant="selected"
                  isCalculator={true}
                />
              </div>
            )}
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-14 relative z-10 flex flex-col gap-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start pb-20 min-h-[800px]">

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
                handleBlur={formik.handleBlur}
              />

              <div className="relative isolate">
                {/* Targeted Locked Overlay for Advanced Section */}
                {activeTab === 'Advanced' && !hasNetAccess && (
                  <div className="absolute inset-0 z-[60] flex items-center justify-center rounded-[24px] overflow-hidden p-6 mt-0">
                    <div className="absolute inset-0 bg-white/30 dark:bg-[#030B1C]/40 backdrop-blur-[6px] border border-brand-border rounded-[24px]" />
                    <div className="relative z-10 text-center flex flex-col items-center max-w-[320px]">
                      <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 dark:bg-white/10 flex items-center justify-center mb-4 border border-brand-primary/20 dark:border-white/5 animate-bounce">
                        <Lock size={24} className="text-brand-primary dark:text-white" />
                      </div>
                      <h4 className="text-[20px] font-bold text-brand-textPrimary dark:text-white mb-2 leading-tight">
                        Net Profit Calculation Locked
                      </h4>
                      <p className="text-brand-textSecondary dark:text-white/60 text-[14px] mb-6 leading-relaxed">
                        Upgrade to the Pro plan to access detailed marketing, taxes, and net profit analytics.
                      </p>
                      <button
                        onClick={() => navigate("/settings?tab=plan")}
                        className="bg-brand-gradient hover:brightness-110 text-white px-8 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-brand-primary/20"
                      >
                        Unlock calculations
                      </button>
                    </div>
                  </div>
                )}

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
                  handleBlur={formik.handleBlur}
                  disabled={activeTab === "Basic" || !hasNetAccess}
                />
              </div>
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
                quantity={formik.values.pi_quantity.toString()}
                isAdvanced={activeTab === "Advanced"}
                hasGrossAccess={hasGrossAccess}
                hasNetAccess={hasNetAccess}
              />
            </div>

          </div>
        </div>

        {/* Tour Modal */}
        {showTour && <MarginMaxTourModal onClose={handleCloseTour} />}
      </div>
    </div>
  );
};

export default ProfitCalculator;
