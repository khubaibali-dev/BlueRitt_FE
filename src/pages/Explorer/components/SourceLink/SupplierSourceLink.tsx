import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import bgAnalysis from "../../../../assets/images/explorer.png";
import bgAnalysisLight from "../../../../assets/images/SourceLink-lightbg.png";
import AmazonProductCard from "../Common/Cards/AmazonProductCard";
import AlibabaSupplierCard from "../Common/Cards/AlibabaSupplierCard";
import SelectField from "../../../../components/common/select/SelectField";
import TrendProductCard from "../../../SocialPulse/TiktokTrends/components/TrendProductCard";
import Tooltip from "../../../../components/common/Tooltip/Tooltip";
import { checkIsTikTokProduct, normalizeAmazonProduct, normalizeTikTokProduct } from "../../../../utils/cardDataNormalizers";

interface SupplierSourceLinkProps {
  product: any;
  suppliers?: any[]; // Passed from results screen
  sourceType?: 'amazon' | 'tiktok';
  onBack: () => void;
  onCalculateProfit: (supplier: any) => void;
}

const SupplierSourceLink: React.FC<SupplierSourceLinkProps> = ({
  product,
  suppliers: incomingSuppliers,
  sourceType = 'amazon',
  onBack,
  onCalculateProfit
}) => {
  const [copy, setCopy] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");



  const SORT_OPTIONS = [
    { label: "Default", value: "default" },
    { label: "Min Rating", value: "rating_low" },
    { label: "Max Rating", value: "rating_high" },
    { label: "Min Order Quantity", value: "moq_low" },
    { label: "Max Order Quantity", value: "moq_high" },
    { label: "Min Store Age Years", value: "age_low" },
    { label: "Max Store Age Years", value: "age_high" },
    { label: "Min Manufacturing Cost", value: "cost_low" },
    { label: "Max Manufacturing Cost", value: "cost_high" },
  ];

  const parsePriceRange = (priceStr: string): number => {
    if (!priceStr || priceStr === "N/A") return 0;
    // Extract first numeric value (e.g. from "$1.20 - $2.50" or "$1.20")
    const matches = priceStr.match(/(\d+(?:\.\d+)?)/);
    return matches ? parseFloat(matches[1]) : 0;
  };

  const parseMOQ = (moqStr: string): number => {
    if (!moqStr || moqStr === "N/A") return 0;
    const matches = moqStr.match(/(\d+)/);
    return matches ? parseInt(matches[1]) : 0;
  };

  const parseStoreAge = (ageStr: string): number => {
    if (!ageStr || ageStr === "N/A") return 0;
    const matches = ageStr.match(/(\d+)/);
    return matches ? parseInt(matches[1]) : 0;
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  // Normalize the selected product data
  const normalizedProduct = React.useMemo(() => {
    if (!product) return null;
    const isTikTok = checkIsTikTokProduct(product) || sourceType === 'tiktok';
    return isTikTok
      ? normalizeTikTokProduct(product, product, true)
      : normalizeAmazonProduct(product, product, false);
  }, [product, sourceType]);

  // Map incoming suppliers to the format expected by the UI
  const suppliers = React.useMemo(() => {
    if (!incomingSuppliers || incomingSuppliers.length === 0) return [];

    return incomingSuppliers.map((s: any, index: number) => {

      if (s.name && s.cost) return s;

      const fixUrl = (url?: string) => {
        if (!url) return "";
        return url.startsWith("//") ? `https:${url}` : url;
      };

      const item = s.item || s;
      const seller = item.seller_store || s.seller || {};
      let imageUrl = fixUrl(item.product_photo || item.image);
      if (!imageUrl && item.images && Array.isArray(item.images) && item.images.length > 0) {
        imageUrl = fixUrl(item.images[0]);
      }
      if (!imageUrl) imageUrl = normalizedProduct?.image;

      return {
        id: item.itemId,
        name: item.title || seller.storeName || "Elite Global Sourcing",
        price:
          item?.sku_listing?.def?.priceModule?.priceFormatted ||
          item?.sku_listing?.def?.priceModule?.price ||
          item?.sku?.def?.priceModule?.priceList?.[0]?.minPrice ||
          "N/A",
        currency: item?.sku?.def?.priceModule?.currencyCode || item?.sku_listing?.def?.priceModule?.currencyCode || "$",
        storeName: item?.company?.companyName || item?.company_details?.companyName || "Direct Factory",
        contact: item?.company?.companyContact?.name || item?.company_details?.companyContact?.name || "Factory Direct",
        minOrder: item?.sku?.def?.quantityModule?.minOrder?.quantityFormatted ||
          item?.sku?.def?.quantityModule?.minOrder?.quantity ||
          "100+ units",
        country: item?.company_details?.companyAddress?.country || item?.company?.companyAddress?.country || "CN",
        rating: item.seller_store?.storeEvaluates?.[4]?.score,
        storeAge: item.seller_store.storeAge || "5 YRS",
        ai_match_score: (Number(s.score || s.absolute_score || s.matchScore || s.ai_match_score || (95 - index * 5))).toFixed(2),
        isGoldMember: item.company_details.status.gold,
        isVerified: item.company_details?.status?.verified,
        TradeAssurance: item.company_details?.status?.tradeAssurance,
        isAssessed: item.company_details?.status?.assessed,
        image: imageUrl,
        storeUrl: fixUrl(seller.storeUrl || item.company_details?.storeUrl || item.company?.storeUrl),
        itemUrl: fixUrl(item.itemUrl || item.productUrl),
      };
    });
  }, [incomingSuppliers, normalizedProduct]);

  const sortedSuppliers = useMemo(() => {
    let sorted = [...suppliers];
    switch (sortBy) {
      case "rating_low":
        return sorted.sort((a, b) => (parseFloat(a.rating) || 0) - (parseFloat(b.rating) || 0));
      case "rating_high":
        return sorted.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
      case "moq_low":
        return sorted.sort((a, b) => parseMOQ(a.minOrder) - parseMOQ(b.minOrder));
      case "moq_high":
        return sorted.sort((a, b) => parseMOQ(b.minOrder) - parseMOQ(a.minOrder));
      case "age_low":
        return sorted.sort((a, b) => parseStoreAge(a.storeAge) - parseStoreAge(b.storeAge));
      case "age_high":
        return sorted.sort((a, b) => parseStoreAge(b.storeAge) - parseStoreAge(a.storeAge));
      case "cost_low":
        return sorted.sort((a, b) => parsePriceRange(a.price) - parsePriceRange(b.price));
      case "cost_high":
        return sorted.sort((a, b) => parsePriceRange(b.price) - parsePriceRange(a.price));
      default:
        // Default to sorting by AI Match Score descending
        return sorted.sort((a, b) => (parseFloat(b.ai_match_score) || 0) - (parseFloat(a.ai_match_score) || 0));
    }
  }, [suppliers, sortBy]);

  if (!normalizedProduct) return null;

  return (
    <div className="discovery-results px-0 sm:px-4 py-10 animate-in fade-in slide-in-from-right-full duration-500 w-full relative bg-brand-card rounded-[24px] isolate min-h-screen overflow-hidden">

      <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
        <img src={bgAnalysis} alt="" className="dashboard-banner-image object-top !opacity-100 mix-blend-screen hidden dark:block" style={{ transform: 'scale(1.2)', objectPosition: 'left top' }} />
        <img src={bgAnalysisLight} alt="" className="dashboard-banner-image dark:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-card via-brand-card/30 to-transparent" />
      </div>


      <div className="flex-1 max-w-[1400px] mx-auto w-full px-2 pt-0 pb-10">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-black/5 dark:bg-white/5 figma-pill-border px-4 py-2 rounded-full text-brand-textPrimary text-[13px] font-bold flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={16} /> Back
          </button>

          <button
            onClick={() => suppliers.length > 0 && onCalculateProfit(suppliers[0])}
            className="bg-black/5 dark:bg-white/5 figma-pill-border px-4 py-2 rounded-full text-brand-textPrimary text-[13px] font-bold flex items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-all font-inter"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* Hero Header Section */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <div className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-1 mb-4">

            <h1 className="banner-heading-text !mb-0">
              AI-Powered Supplier <br className="hidden sm:block" />
              Matching with SourceLink
            </h1>

            {/* Info Icon */}
            <Tooltip
              content="BlueRitt’s AI engine matches your selected Product with Verified, Trade-assured, Gold and High-rated Suppliers, then generates an AI Match Score — the higher the score, the better the supplier fit."
              className="md:mt-12"
              width="320px"
            >
              <div className="figma-pill-border w-[24px] h-[24px] md:w-[24px] md:h-[24px] cursor-help transition-all duration-300 hover:scale-110 flex items-center justify-center bg-black/5 dark:bg-transparent">
                <span className="text-brand-textPrimary text-[16px] md:text-[16px] font-black italic font-serif select-none">
                  i
                </span>
              </div>
            </Tooltip>

          </div>

          <p className="auth-subtitle max-w-[98%] md:max-w-[730px] mx-auto mt-4 px-2">
            AI-powered supplier matching to connect you with verified and relevant sourcing partners instantly.
          </p>
        </div>

        {sourceType === 'tiktok' ? (
          normalizedProduct && (
            <TrendProductCard
              {...normalizedProduct}
              variant="selected"
              onOpenProduct={() => {
                const url = product.itemUrl || product.product_url || product.url || (suppliers.length > 0 ? suppliers[0].itemUrl : "");
                if (url) window.open(url, '_blank');
              }}
              onCopyLink={() => {
                const url = product.itemUrl || product.product_url || product.url || (suppliers.length > 0 ? suppliers[0].itemUrl : "");
                if (url) handleCopy(url);
              }}
              isCopied={copy}
            />
          )
        ) : (
          normalizedProduct && (
            <AmazonProductCard
              product={normalizedProduct}
              variant="selected"
              onCopyLink={() => handleCopy(product.offer?.seller_link || product.itemUrl || product.product_url || product.url)}
              onOpenProduct={() => window.open(product.offer?.seller_link || product.itemUrl || product.product_url || product.url, '_blank')}
              isCopied={copy}
            />
          )
        )}

        {/* Suppliers Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 mt-8 px-2">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <span className="text-[#FF5900] text-[20px] sm:text-[24px] font-black mt-0.5 sm:mt-0 shrink-0">{suppliers.length}</span>
            <h2 className="text-[16px] sm:text-[20px] text-brand-textPrimary tracking-tight leading-snug">
              Recommended Alibaba Suppliers for Your Product & AI Match Scores
            </h2>
          </div>
          <div className="w-[200px] h-fit">
            <SelectField
              id="supplier-sort"
              value={sortBy}
              onChange={(v) => setSortBy(v)}
              options={SORT_OPTIONS}
              placeholder="Sort By"
            />
          </div>
        </div>

        <div className="space-y-4 pt-6">
          {sortedSuppliers.map((supplier, i) => (
            <AlibabaSupplierCard
              key={i}
              supplier={supplier}
              variant="result-item"
              onCalculateProfit={() => onCalculateProfit(supplier)}
              onContactSeller={() => window.open(supplier.storeUrl, "_blank")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierSourceLink;
