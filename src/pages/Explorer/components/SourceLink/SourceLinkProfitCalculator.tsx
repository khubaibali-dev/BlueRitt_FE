import { ChevronLeft, Lock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import AmazonProductCard from "../Common/Cards/AmazonProductCard";
import AlibabaSupplierCard from "../Common/Cards/AlibabaSupplierCard";
import TrendProductCard from "../../../SocialPulse/TiktokTrends/components/TrendProductCard";
import bgAnalysis from "../../../../assets/images/explorer.png";
import bgAnalysisLight from "../../../../assets/images/SourceLink-lightbg.png";
import BasicTab from "../../../ProfitCalculator/Basic/BasicTab";
import AdvancedTab from "../../../ProfitCalculator/Advance/AdvancedTab";
import ResultPanels from "../../../ProfitCalculator/components/ResultPanels";
import { useProfitCalculation } from "../../../../hooks/useProfitCalculation";
import SaveToVaultModal from "../Common/SaveToVaultModal";
import { useQuery } from "@tanstack/react-query";
import { getProfitProCalculations } from "../../../../api/savedProducts";
import { useUserDetails } from "../../../../hooks/useUserDetails";
import { TAX_OPTIONS } from "../../../../utils/taxConstants";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useFormikContext } from "formik";
import CalculatorSkeleton from "../../../../components/common/Skeletons/CalculatorSkeleton";
import { calculatorValidationSchema as validationSchema } from "../../../../utils/calculatorSchema";


interface SourceLinkProfitCalculatorProps {
  product?: any;
  supplier?: any;
  sourceType?: 'amazon' | 'tiktok';
  countryCode?: string;
  onBack?: () => void;
}

// Logic to sync Formik with outer state and handle historical data
const FormikHandler: React.FC<{
  savedCalcResponse: any;
  setFormData: (data: any) => void;
  setActiveTab: (tab: "Basic" | "Advanced") => void;
}> = ({ savedCalcResponse, setFormData, setActiveTab }) => {
  const formik = useFormikContext<any>();
  const hasPopulated = useRef(false);

  useEffect(() => {
    if (savedCalcResponse?.data && !hasPopulated.current) {
      const data = savedCalcResponse.data;
      const product = data.product;
      const sourcing = data.sourcing_cost;
      const fulfillment = data.fulfillment;
      const marketing = data.marketing_and_advertising;
      const taxesData = data.taxes;
      const graphics = data.graphics_and_visuals;
      const feedback = data.product_feedback;
      const other = data.other_costs;

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

      if (marketing?.marketing_and_advertising_cost !== "0") {
        setActiveTab("Advanced");
      }
      hasPopulated.current = true;
    }
  }, [savedCalcResponse, formik, setActiveTab]);

  useEffect(() => {
    setFormData(formik.values as any);
  }, [formik.values, setFormData]);

  return null;
};

const SourceLinkProfitCalculator: React.FC<SourceLinkProfitCalculatorProps> = ({ product: propProduct, supplier: propSupplier, sourceType = 'amazon', countryCode, onBack: propOnBack }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Basic" | "Advanced">("Basic");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(propProduct);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(propSupplier);

  const { data: userDetails } = useUserDetails();
  const hasGrossAccess = userDetails?.features?.access_to_gross_profit ?? true;
  const hasNetAccess = userDetails?.features?.access_to_net_profit ?? true;

  const { data: savedCalcResponse, isLoading: isLoadingSaved } = useQuery({
    queryKey: ["saved-calculation", id],
    queryFn: () => getProfitProCalculations({ saveID: id! }),
    enabled: !!id && (!propProduct || !propSupplier),
  });

  const onBack = propOnBack || (() => navigate(-1));

  useEffect(() => {
    if (savedCalcResponse) {
      const respData = savedCalcResponse.data || savedCalcResponse;
      const payload = respData.data && typeof respData.data === 'object' && !Array.isArray(respData.data) ? respData.data : respData;
      const actualPayload = Array.isArray(payload) ? payload[0] : payload;

      if (!actualPayload) return;

      const findKeyAndUnwrap = (obj: any, keys: string[]): any => {
        if (!obj || typeof obj !== 'object') return null;
        for (const key of keys) {
          if (obj[key]) return obj[key].data || obj[key];
        }
        for (const k in obj) {
          if (typeof obj[k] === 'object') {
            const found = findKeyAndUnwrap(obj[k], keys);
            if (found) return found;
          }
        }
        return null;
      };

      let amazonInfo = actualPayload.product?.amazon_product || actualPayload.amazon_product;
      let alibabaInfo = actualPayload.product?.alibaba_product || actualPayload.alibaba_product;

      if (!amazonInfo) {
        amazonInfo = findKeyAndUnwrap(actualPayload, ['amazon_product', 'amazonProduct', 'tiktok_product', 'tiktokProduct', 'amazon_data', 'product_data']);
      }
      if (!alibabaInfo) {
        alibabaInfo = findKeyAndUnwrap(actualPayload, ['alibaba_product', 'alibabaProduct', 'supplier_data', 'supplier', 'alibaba_data']);
      }

      const tiktokData = actualPayload.product?.tiktok_product || findKeyAndUnwrap(actualPayload, ['tiktok_product', 'tiktokProduct']);

      const productMetadata = amazonInfo || tiktokData || actualPayload.product_data || (actualPayload.asin || actualPayload.product_title ? actualPayload : null);
      if (productMetadata) {
        setSelectedProduct(productMetadata.data || productMetadata);
      }

      if (alibabaInfo) {
        setSelectedSupplier(alibabaInfo.data || alibabaInfo);
      }

      const marketingData = actualPayload.marketing_and_advertising || actualPayload.marketing || actualPayload.product?.marketing || {};
      const advancedCost = marketingData.marketing_and_advertising_cost || marketingData.ppc_costs || marketingData.marketing_cost;

      if (hasNetAccess && advancedCost && advancedCost !== "0") {
        setActiveTab("Advanced");
      } else {
        setActiveTab("Basic");
      }
    }
  }, [savedCalcResponse, hasNetAccess]);

  const normalizedProduct = React.useMemo(() => {
    if (!selectedProduct) return null;
    const p = selectedProduct;
    const tags: string[] = [];
    if (p.is_best_seller || p.best_seller) tags.push("Best Seller");
    if (p.is_amazon_choice || p.amazon_choice) tags.push("Amazon Choice");
    if (p.is_prime || p.prime) tags.push("Prime");
    if (p.climate_pledge_friendly || p.climate_pledge) tags.push("Climate Pledge");

    return {
      title: p.product_title || p.title || p.name || "Selected Product",
      image: p.product_photo || p.image || p.image_url || p.thumbnail || "",
      price: p.product_price?.toString().replace("$", "") || p.price?.toString().replace("$", "") || p.selling_price?.toString().replace("$", "") || "0.00",
      oldPrice: p.product_original_price?.toString().replace("$", "") || p.oldPrice?.toString().replace("$", "") || p.original_price?.toString().replace("$", "") || p.product_price?.toString().replace("$", "") || "0.00",
      asin: p.asin || p.product_id || "N/A",
      salesVol: p.sales_volume || p.salesVol || p.monthly_sales || "N/A",
      offers: p.product_num_offers?.toString() || p.offers?.toString() || p.num_offers?.toString() || "1",
      seller: p.product_seller_name || p.seller || p.seller_name || p.product_offers?.[0]?.seller || "Amazon.com",
      shipsFrom: p.ships_from || p.shipsFrom || p.product_offers?.[0]?.ships_from || p.delivery || "Amazon",
      country: p.seller_country || p.country || p.marketplace || "US",
      rating: parseFloat(p.product_star_rating || p.rating || p.star_rating || "4.5"),
      numRatings: p.product_num_ratings || p.ratings || p.rating_count || "0",
      dimensions: p.product_information?.["Product Dimensions"] || p.product_details?.["Product Dimensions"] || p.product_information?.["Package Dimensions"] || p.dimensions || "N/A",
      weight: p.product_information?.["Item Weight"] || p.product_details?.["Item Weight"] || p.weight || "N/A",
      tags: tags.length > 0 ? tags : (p.tags || [])
    };
  }, [selectedProduct]);

  const parseCost = (costStr: string) => {
    if (!costStr) return "0.00";
    const matches = costStr.match(/\d+\.?\d*/);
    return matches ? matches[0] : "0.00";
  };

  const initialValues = {
    pi_sellingPrice: normalizedProduct?.price || "0",
    pi_totalRevenue: "0",
    pi_quantity: "0",
    psc_manufacturingCost: parseCost(selectedSupplier?.cost || selectedSupplier?.price),
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
    tax_region: TAX_OPTIONS.find(opt => opt.code.toUpperCase() === (countryCode || normalizedProduct?.country)?.toUpperCase())?.code || "US",
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

  const getCalculatorPayload = () => {
    return {
      name: normalizedProduct?.title || "",
      description: "",
      category: "",
      saveNewCategory: "",
      source: sourceType === 'tiktok' ? 'TikTok Trends' : sourceType === 'amazon' ? 'Amazon Trends' : 'Explorer',
      alibaba_product: selectedSupplier,
      amazon_product: { data: selectedProduct },
      selling_price: formData.pi_sellingPrice,
      quantity: parseInt(formData.pi_quantity) || 0,
      total_revenue: totalRevenue,
      sourcing_cost: {
        manufacturing_cost: formData.psc_manufacturingCost,
        shipping_cost: formData.psc_shippingCost,
        logo_box_cost: formData.psc_productLogoCost,
        order_quantity: parseInt(formData.psc_orderQuantity) || 0,
      },
      fulfillment: {
        fulfillment_type: formData.fm_model,
        referral_fees: formData.fm_referrfalFees,
        fba_fulfillment_fees: formData.fm_fbaFulfillmentFees,
        monthly_storage_fees: formData.fm_monthlyStorageFees,
        long_term_storage_fees: formData.fm_longTermStorageFees,
        inbound_shipping_cost: formData.fm_inboundShippingCost,
        returns_rate: formData.fm_returnsRate,
        per_unit_cost: fulfillmentCostUnit,
        total_cost: totalFulfillmentCost,
      },
      marketing: {
        ppc_costs: formData.marc_marketingCost,
        attribution_costs: formData.marc_attributionCost,
        influencer_promotion_costs: formData.marc_influencerCost,
        marketing_vat: formData.marc_marketingVATCost,
        misc_costs: formData.marc_miscCost,
        per_unit_cost: marketingCostUnit,
        total_cost: totalMarketingCost,
      },
      graphics: {
        imaging_photography: formData.gc_imagingAndPhotographyCost,
        videography_cost: formData.gc_videographyCost,
        product_packaging_cost: formData.gc_productPackingCost,
        animation_3d_cost: formData.gc_3dAnimationCost,
        misc_costs: formData.gc_miscCost,
        per_unit_cost: graphicsCostUnit,
        total_cost: totalGraphicsCost,
      },
      vine_misc: {
        vine_program: formData.pfc_vineProgramCost,
        miscellaneous_cost: formData.pfc_miscCost,
        cost_per_unit: reviewerCostUnit,
        total: totalReviewerCost,
      },
      other_costs: {
        pre_launch_samples: formData.oc_preLaunchSamples,
        competitor_samples: formData.oc_competitorProductSamples,
        employee_cost: formData.oc_employeesCost,
        other_cost: formData.oc_anyOtherCost,
        per_unit_cost: additionalCostUnit,
        total_cost: totalAdditionalCost,
      },
      taxes: {
        region: formData.tax_region,
        vat: formData.tax_VAT,
        gst: formData.tax_GST,
        sales_tax: formData.tax_salesTax,
        miscellaneous_cost: formData.tax_miscCost,
        per_unit_cost: taxesUnit,
        total_cost: totalTaxes,
      },
      profit_calculation: {
        data: {
          revenue_per_unit: formData.pi_sellingPrice,
          total_revenue: totalRevenue,
          productSourcing_cost_per_unit: sourcingCostUnit,
          total_productSourcing_cost: totalSourcingCost,
          fulfillment_cost_per_unit: fulfillmentCostUnit,
          total_fulfillment_cost: totalFulfillmentCost,
          marketing_cost_per_unit: marketingCostUnit,
          total_marketing_cost: totalMarketingCost,
          graphics_cost_per_unit: graphicsCostUnit,
          total_graphics_cost: totalGraphicsCost,
          reviewer_cost_per_unit: reviewerCostUnit,
          total_reviewer_cost: totalReviewerCost,
          other_cost_per_unit: additionalCostUnit,
          total_other_cost: totalAdditionalCost,
          taxes_per_unit: taxesUnit,
          total_taxes: totalTaxes,
          gross_profit_per_unit: grossProfitUnit,
          total_gross_profit: totalGrossProfit,
          net_profit_per_unit: netProfitUnit,
          total_net_profit: totalNetProfit,
        },
      },
    };
  };

  if (!normalizedProduct && !id) {
    return (
      <div className="discovery-results px-4 py-10 flex items-center justify-center min-h-[500px] text-brand-textPrimary dark:text-white">
        <p className="text-sm font-medium opacity-70">No product selected for calculation.</p>
      </div>
    );
  }

  if (id && isLoadingSaved) {
    return <CalculatorSkeleton />;
  }

  if (id && !isLoadingSaved && !normalizedProduct) {
    return (
      <div className="discovery-results px-4 py-10 flex items-center justify-center min-h-[500px] text-brand-textPrimary dark:text-white">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-red-400">Unable to load historical calculation.</p>
          <button onClick={onBack} className="text-xs text-brand-primary underline">Go back to vault</button>
        </div>
      </div>
    );
  }
  if (!normalizedProduct) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values) => console.log(values)}
    >
      <CalculatorMainContent
        savedCalcResponse={savedCalcResponse}
        setFormData={setFormData}
        onBack={onBack}
        normalizedProduct={normalizedProduct}
        sourceType={sourceType}
        selectedProduct={selectedProduct}
        selectedSupplier={selectedSupplier}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasGrossAccess={hasGrossAccess}
        hasNetAccess={hasNetAccess}
        setIsSaveModalOpen={setIsSaveModalOpen}
        isSaveModalOpen={isSaveModalOpen}
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
        marginPerc={marginPerc}
        roiPerc={roiPerc}
        getCalculatorPayload={getCalculatorPayload}
        navigate={navigate}
      />
    </Formik>
  );
};

const CalculatorMainContent: React.FC<any> = ({
  onBack,
  normalizedProduct,
  sourceType,
  selectedProduct,
  selectedSupplier,
  savedCalcResponse,
  setFormData,
  activeTab,
  setActiveTab,
  hasGrossAccess,
  hasNetAccess,
  setIsSaveModalOpen,
  isSaveModalOpen,
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
  marginPerc,
  roiPerc,
  getCalculatorPayload,
  navigate
}) => {
  const formik = useFormikContext<any>();

  return (
    <>
      <FormikHandler
        savedCalcResponse={savedCalcResponse}
        setFormData={setFormData}
        setActiveTab={setActiveTab}
      />

      <div className="discovery-results px-4 sm:px-4 py-6 sm:py-10 animate-in fade-in slide-in-from-right-full duration-500 w-full relative bg-brand-card border border-brand-border rounded-[24px] isolate min-h-screen overflow-hidden">
        <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
          <img src={bgAnalysis} alt="" className="dashboard-banner-image !opacity-100 mix-blend-screen hidden dark:block" style={{ transform: 'scale(1.2)', objectPosition: 'left top' }} />
          <img src={bgAnalysisLight} alt="" className="dashboard-banner-image dark:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-card via-brand-card/30 to-transparent" />
        </div>

        <div className="flex-1 max-w-[1400px] mx-auto w-full px-0 sm:px-2 pt-0 pb-10">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="bg-black/5 dark:bg-white/5 figma-pill-border px-4 py-2 rounded-full text-brand-textPrimary text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all font-inter mb-1"
            >
              <ChevronLeft size={16} /> Back
            </button>

            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="bg-brand-gradient px-4 py-2.5 rounded-full text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all  shadow-orange-900/20 font-inter"
            >
              Save to Product Vault
            </button>
          </div>

          <div className=" mb-8 md:mb-12 px-1">
            <h1 className="banner-heading-text !text-left !mb-0">
              Profit Calculation
            </h1>
            <p className="auth-subtitle max-w-[98%] md:max-w-[730px] mt-2 px-0 !text-left ml-4">
              Review selections and analyze detailed profit margins
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
            {sourceType === 'tiktok' ? (
              <TrendProductCard
                title={normalizedProduct.title}
                image={normalizedProduct.image}
                category={selectedProduct?.category || "Trending"}
                price={`$${normalizedProduct.price}`}
                metrics={selectedProduct?.metrics || {}}
                variant="selected"
                isCalculator={true}
              />
            ) : (
              <AmazonProductCard
                product={normalizedProduct}
                variant="selected"
                isCalculator={true}
              />
            )}

            <div className="mt-8 lg:mt-0">
              <AlibabaSupplierCard
                supplier={selectedSupplier}
                variant="selected"
              />
            </div>
          </div>

          <div className="calculator-toggle-wrapper !mt-4 !mb-10">
            <div className={`calculator-toggle-container ${activeTab === 'Advanced' ? 'active-advanced' : ''}`}>
              {/* Background Slider */}
              <div className="calculator-toggle-slider"></div>

              <button
                onClick={() => setActiveTab("Basic")}
                className={`calculator-toggle-btn ${activeTab === 'Basic' ? 'calculator-toggle-btn-active' : 'calculator-toggle-btn-inactive'}`}
              >
                Basic
              </button>
              <button
                onClick={() => setActiveTab("Advanced")}
                className={`calculator-toggle-btn ${activeTab === 'Advanced' ? 'calculator-toggle-btn-active' : 'calculator-toggle-btn-inactive'}`}
              >
                {!hasNetAccess && <Lock size={12} className="opacity-70" />}
                Advanced
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start relative">
            <div className="flex-1 w-full flex flex-col gap-4">
              <BasicTab
                formData={formik.values as any}
                handleFieldChange={formik.setFieldValue}
                handleBlur={formik.handleBlur}
                totalRevenue={totalRevenue}
                sourcingCostUnit={sourcingCostUnit}
                totalSourcingCost={totalSourcingCost}
                fulfillmentCostUnit={fulfillmentCostUnit}
                totalFulfillmentCost={totalFulfillmentCost}
                errors={formik.errors}
                touched={formik.touched}
              />

              <div className="relative isolate">
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
                  handleBlur={formik.handleBlur}
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
                  disabled={activeTab === "Basic" || !hasNetAccess}
                />
              </div>
            </div>

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
                hasGrossAccess={hasGrossAccess}
                hasNetAccess={hasNetAccess}
              />
            </div>
          </div>
        </div>
        {isSaveModalOpen && (
          <SaveToVaultModal
            productTitle={normalizedProduct?.title || "Product"}
            calculatorData={getCalculatorPayload()}
            onClose={() => setIsSaveModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default SourceLinkProfitCalculator;
