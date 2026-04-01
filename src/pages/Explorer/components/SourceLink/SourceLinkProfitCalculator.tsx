import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import AmazonProductCard from "../Common/Cards/AmazonProductCard";
import AlibabaSupplierCard from "../Common/Cards/AlibabaSupplierCard";
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

  // Normalize the selected product data (mirrors SupplierSourceLink logic)
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
    sellingPrice: normalizedProduct?.price || "0.00",
    manufacturingCost: parseCost(supplier?.cost || supplier?.price),
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
          <AmazonProductCard
            product={normalizedProduct}
            variant="selected"
            isCalculator={true}
          />

          <div className="mt-8 lg:mt-0">
            <AlibabaSupplierCard
              supplier={supplier}
              variant="selected"
            />
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
