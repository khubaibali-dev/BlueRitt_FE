import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import * as Yup from "yup";
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
import { TAX_OPTIONS } from "../../../../utils/taxConstants";

const validationSchema = Yup.object({
  pi_sellingPrice: Yup.number()
    .label("Selling Price")
    .required("Selling Price is required.")
    .typeError("Selling Price must be a valid number. Please enter a numeric value."),
  pi_quantity: Yup.number()
    .required("Units Sold is required.")
    .typeError("Units Sold must be a valid number. Please enter a numeric value."),
  pi_totalRevenue: Yup.number()
    .optional()
    .typeError("Total Revenue must be a valid number."),

  psc_manufacturingCost: Yup.number()
    .label("Product Manufacturing")
    .required("Product Manufacturing is required.")
    .typeError("Product Manufacturing must be a valid number. Please enter a numeric value."),
  psc_shippingCost: Yup.number()
    .label("Shipping Cost")
    .required("Shipping Cost is required.")
    .typeError("Shipping Cost must be a valid number. Please enter a numeric value."),
  psc_orderQuantity: Yup.number()
    .label("Order Quantity")
    .required("Order Quantity is required.")
    .typeError("Order Quantity must be a valid number. Please enter a numeric value."),
  psc_miscCost: Yup.number()
    .label("Other Sourcing Costs")
    .optional()
    .typeError("Other Sourcing Costs must be a valid number."),
  psc_perUnitCost: Yup.number()
    .label("Cost Per Unit")
    .optional()
    .typeError("Cost Per Unit must be a valid number."),
  psc_totalCost: Yup.number()
    .label("Total Cost")
    .optional()
    .typeError("Total Cost must be a valid number."),

  fm_model: Yup.string().required("Fulfillment Model is required.").default("FBA"),
  fm_referrfalFees: Yup.number()
    .label("Amazon Fees")
    .required("Amazon Fees is required.")
    .typeError("Amazon Fees must be a valid number. Please enter a numeric value."),
  fm_fbaFulfillmentFees: Yup.number()
    .label("Fulfillment Cost")
    .required("Fulfillment Cost is required.")
    .typeError("Fulfillment Cost must be a valid number. Please enter a numeric value."),
  fm_monthlyStorageFees: Yup.number()
    .label("Storage Cost")
    .required("Storage Cost is required.")
    .typeError("Storage Cost is required."),
  fm_longTermStorageFees: Yup.number()
    .label("Inbounding Cost")
    .optional()
    .typeError("Inbounding Cost must be a valid number."),
  fm_inboundShippingCost: Yup.number()
    .label("Other FBA Costs")
    .optional()
    .typeError("Other FBA Costs must be a valid number."),
  fm_returnsRate: Yup.number()
    .label("Returns Rate")
    .required("Returns Rate is required.")
    .typeError("Returns Rate must be a valid number. Please enter a numeric value."),
  fm_shippingFees: Yup.number()
    .label("Shipping Delivery Charges")
    .optional()
    .typeError("Shipping Delivery Charges must be a valid number."),
  fm_handlingCost: Yup.number()
    .label("Fulfillment Cost")
    .optional()
    .typeError("Fulfillment Cost must be a valid number."),
  fm_storageCost: Yup.number()
    .label("Storage Cost")
    .optional()
    .typeError("Storage Cost must be a valid number."),
  fm_miscCost: Yup.number()
    .label("Other FBM Cost")
    .optional()
    .typeError("Other FBM Cost must be a valid number."),
  fm_totalCost: Yup.number()
    .label("Total Cost")
    .optional()
    .typeError("Total Cost must be a valid number."),
  fm_perUnitCost: Yup.number()
    .label("Cost Per Unit")
    .optional()
    .typeError("Cost Per Unit must be a valid number."),

  marc_marketingCost: Yup.number()
    .label("Marketing Cost")
    .required("Marketing Cost is required.")
    .typeError("Marketing Cost must be a valid number."),
  marc_attributionCost: Yup.number()
    .label("Attribution Links")
    .optional()
    .typeError("Attribution Links must be a valid number."),
  marc_influencerCost: Yup.number()
    .label("Promotion/Other Costs")
    .optional()
    .typeError("Promotion/Other Costs must be a valid number."),
  marc_miscCost: Yup.number()
    .label("PPC VAT")
    .optional()
    .typeError("PPC VAT must be a valid number."),
  marc_marketingVATCost: Yup.number()
    .label("Marketing VAT Cost")
    .optional()
    .typeError("Marketing VAT Cost must be a valid number."),
  marc_totalCost: Yup.number()
    .label("Total Cost")
    .optional()
    .typeError("Total Cost must be a valid number."),
  marc_perUnitCost: Yup.number()
    .label("Per Unit Cost")
    .optional()
    .typeError("Per Unit Cost must be a valid number."),

  tax_VAT: Yup.number().label("VAT").optional().typeError("VAT must be a valid number."),
  tax_GST: Yup.number().label("GST").optional().typeError("GST must be a valid number."),
  tax_salesTax: Yup.number().label("Sales Tax").optional().typeError("Sales Tax must be a valid number."),
  tax_miscCost: Yup.number().label("Miscellaneous Cost").optional().typeError("Miscellaneous Cost must be a valid number."),

  gc_imagingAndPhotographyCost: Yup.number()
    .required("Imaging and Photography Cost is required.")
    .typeError("Imaging and Photography Cost must be a valid number."),
  gc_videographyCost: Yup.number().optional().typeError("Videography Cost must be a valid number."),
  gc_productPackingCost: Yup.number().optional().typeError("Packaging Cost must be a valid number."),
  gc_3dAnimationCost: Yup.number().optional().typeError("3D Animation Cost must be a valid number."),
  gc_miscCost: Yup.number().optional().typeError("Misc Graphics Cost must be a valid number."),
  gc_totalCost: Yup.number().optional().typeError("Total Graphics Cost must be a valid number."),
  gc_perUnitCost: Yup.number().optional().typeError("Graphics Cost Per Unit must be a valid number."),

  pfc_vineProgramCost: Yup.number().optional().typeError("Vine Program Cost must be a valid number."),
  pfc_miscCost: Yup.number().optional().typeError("Misc Feedback Cost must be a valid number."),
  pfc_totalCost: Yup.number().optional().typeError("Total Feedback Cost must be a valid number."),
  pfc_perUnitCost: Yup.number().optional().typeError("Feedback Cost Per Unit must be a valid number."),

  oc_competitorProductSamples: Yup.number().optional().typeError("Competitor Samples must be a valid number."),
  oc_preLaunchSamples: Yup.number()
    .label("Pre-Launch Samples")
    .optional()
    .typeError("Pre-Launch Samples must be a valid number."),
  oc_employeesCost: Yup.number().optional().typeError("Employees Cost must be a valid number."),
  oc_anyOtherCost: Yup.number().optional().typeError("Any Other Cost must be a valid number."),
  oc_totalCost: Yup.number().optional().typeError("Total Other Cost must be a valid number."),
  oc_perUnitCost: Yup.number().optional().typeError("Other Cost Per Unit must be a valid number."),
});

interface SourceLinkProfitCalculatorProps {
  product: any;
  supplier: any;
  sourceType?: 'amazon' | 'tiktok';
  countryCode?: string;
  onBack: () => void;
}

const SourceLinkProfitCalculator: React.FC<SourceLinkProfitCalculatorProps> = ({ product, supplier, sourceType = 'amazon', countryCode, onBack }) => {
  const [activeTab, setActiveTab] = useState<"Basic" | "Advanced">("Basic");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const normalizedProduct = React.useMemo(() => {
    if (!product) return null;
    const tags: string[] = [];
    if (product.is_best_seller) tags.push("Best Seller");
    if (product.is_amazon_choice) tags.push("Amazon Choice");
    if (product.is_prime) tags.push("Prime");
    if (product.climate_pledge_friendly) tags.push("Climate Pledge");

    return {
      title: product.product_title || product.title || "Selected Product",
      image: product.product_photo || product.image || "",
      price: product.product_price?.toString().replace("$", "") || product.price?.toString().replace("$", "") || "0.00",
      oldPrice: product.product_original_price?.toString().replace("$", "") || product.oldPrice?.toString().replace("$", "") || product.product_price?.toString().replace("$", "") || "0.00",
      asin: product.asin || "N/A",
      salesVol: product.sales_volume || product.salesVol || "N/A",
      offers: product.product_num_offers?.toString() || product.offers?.toString() || "1",
      seller: product.product_seller_name || product.seller || product.product_offers?.[0]?.seller || "Amazon.com",
      shipsFrom: product.ships_from || product.shipsFrom || product.product_offers?.[0]?.ships_from || product.delivery || "Amazon",
      country: product.seller_country || product.country || "US",
      rating: parseFloat(product.product_star_rating || product.rating || "4.5"),
      numRatings: product.product_num_ratings || product.ratings || "0",
      dimensions: product.product_information?.["Product Dimensions"] || product.product_details?.["Product Dimensions"] || product.product_information?.["Package Dimensions"] || product.dimensions || "N/A",
      weight: product.product_information?.["Item Weight"] || product.product_details?.["Item Weight"] || product.weight || "N/A",
      tags: tags.length > 0 ? tags : (product.tags || [])
    };
  }, [product]);

  const parseCost = (costStr: string) => {
    if (!costStr) return "0.00";
    const matches = costStr.match(/\d+\.?\d*/);
    return matches ? matches[0] : "0.00";
  };

  const initialValues = {
    pi_sellingPrice: normalizedProduct?.price || "0",
    pi_totalRevenue: "0",
    pi_quantity: "0",
    psc_manufacturingCost: parseCost(supplier?.cost || supplier?.price),
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
      category: "", // Will be assigned in the modal
      saveNewCategory: "",
      source: sourceType === 'tiktok' ? 'TikTok Trends' : sourceType === 'amazon' ? 'Amazon Trends' : 'Explorer',
      alibaba_product: supplier,
      amazon_product: { data: product },
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

  if (!normalizedProduct) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => {
        useEffect(() => {
          setFormData(formik.values as any);
        }, [formik.values, setFormData]);

        return (
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
                  className="bg-brand-gradient px-6 py-2.5 rounded-full text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-orange-900/20 font-inter"
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-12">
                {sourceType === 'tiktok' ? (
                  <TrendProductCard
                    title={normalizedProduct.title}
                    image={normalizedProduct.image}
                    category={product.category || "Trending"}
                    price={`$${normalizedProduct.price}`}
                    metrics={product.metrics || {}}
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
                    supplier={supplier}
                    variant="selected"
                  />
                </div>
              </div>

              {/* Basic / Advanced Toggle */}
              <div className="flex justify-center w-full mt-4 mb-10">
                <div className="bg-[#030B1C]/5 dark:bg-[#030B1C]/5 px-2 py-2 backdrop-blur-xl flex items-center figma-pill-border overflow-hidden rounded-full">
                  <button
                    onClick={() => setActiveTab("Basic")}
                    className={`px-8 py-2 rounded-full text-[13px] font-bold transition-all ${activeTab === 'Basic' ? 'bg-brand-gradient text-white shadow-lg shadow-orange-500/20' : 'text-brand-textSecondary hover:text-brand-textPrimary'}`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setActiveTab("Advanced")}
                    className={`px-8 py-2 rounded-full text-[13px] font-bold transition-all ${activeTab === 'Advanced' ? 'bg-brand-gradient text-white shadow-lg shadow-orange-500/20' : 'text-brand-textSecondary hover:text-brand-textPrimary'}`}
                  >
                    Advanced
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
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
            {isSaveModalOpen && (
              <SaveToVaultModal
                productTitle={product?.title || "Product"}
                calculatorData={getCalculatorPayload()}
                onClose={() => setIsSaveModalOpen(false)}
              />
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default SourceLinkProfitCalculator;
