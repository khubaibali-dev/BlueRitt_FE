import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import bgAnalysis from "../../../assets/images/marginmax.png";
import bgAnalysisLight from "../../../assets/images/SourceLink-lightbg.png";
import {
  Box, Activity, ArrowLeft
} from "lucide-react";
import { getSavedProductsDetail } from "../../../api/savedProducts";
import AnalysisSkeleton from "../../../components/common/Skeletons/AnalysisSkeleton";
import AmazonProductCard from "../../Explorer/components/Common/Cards/AmazonProductCard";
import TrendProductCard from "../../SocialPulse/TiktokTrends/components/TrendProductCard";
import ProductProfitGauges from "./ProductProfitGauges";
import VaultAlibabaCard from "./VaultAlibabaCard";


const ProductAnalysis: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product data - this includes historical_data now per the user's JSON
  const { data: productResponse, isLoading: isFetchingProduct } = useQuery({
    queryKey: ["saved-product-detail", id],
    queryFn: () => getSavedProductsDetail({ id: id! }),
    enabled: !!id,
  });

  const product = productResponse?.data;
  const amazonData = product?.amazon_product?.data || product?.amazon_product;
  const supplierInfo = product?.supplier_info;
  const alibabaData = product?.alibaba_product;

  const isTikTok = useMemo(() => {
    const source = product?.source || amazonData?.source;
    return source === 'tiktok_trends' || (amazonData && (
      amazonData.cpa !== undefined ||
      amazonData.ctr !== undefined ||
      amazonData.cvr !== undefined ||
      amazonData.impression !== undefined ||
      amazonData.data?.cpa !== undefined
    ));
  }, [product, amazonData]);

  const normalizedAmazon = useMemo(() => {
    if (!amazonData || isTikTok) return null;
    const tags: string[] = [];
    const data = amazonData.data || amazonData;
    if (data.is_best_seller) tags.push("Best Seller");
    if (data.is_amazon_choice) tags.push("Amazon Choice");
    if (data.is_prime) tags.push("Prime");

    const amazonPrice = data.product_price?.toString().replace("$", "") || "";
    const finalPrice = product?.selling_price && product?.selling_price !== "0.00"
      ? product.selling_price
      : (amazonPrice || "0.00");

    return {
      title: data.product_title || data.title || product?.name || "Product",
      image: data.product_photo || data.image || "",
      price: finalPrice,
      oldPrice: data.product_original_price?.toString().replace("$", "") || finalPrice,
      asin: data.asin || "N/A",
      salesVol: data.sales_volume || "",
      offers: data.product_num_offers?.toString() || "",
      seller: data.product_seller_name || "",
      shipsFrom: data.ships_from || "",
      country: data.seller_country || "",
      rating: parseFloat(data.product_star_rating || "4.5"),
      numRatings: data.product_num_ratings || "",
      dimensions: data.product_information?.["Product Dimensions"] || "N/A",
      weight: data.product_information?.["Item Weight"] || "0.06 Pounds",
      tags: tags.length > 0 ? tags : (data.tags || [])
    };
  }, [amazonData, product, isTikTok]);

  const normalizedTikTok = useMemo(() => {
    if (!isTikTok || !amazonData) return null;
    const data = amazonData.data || amazonData;

    return {
      title: data.shop_product_title || data.url_title || product?.name || "TikTok Product",
      image: data.cover_url || data.product_photo || "",
      category: data.third_ecom_category?.value || data.first_ecom_category?.value || data.category || "Trending",
      price: (data.shop_price || data.cost || product?.selling_price || "0.00").toLocaleString(),
      metrics: {
        ctr: data.ctr ? (String(data.ctr).includes('%') ? data.ctr : data.ctr + "%") : "0%",
        cvr: data.cvr ? (String(data.cvr).includes('%') ? data.cvr : data.cvr + "%") : "0%",
        cpa: data.cpa ? (typeof data.cpa === "number" ? `$${data.cpa.toFixed(2)}` : data.cpa) : "$0.00",
        impressions: (data.impression || data.impressions || 0).toLocaleString(),
        post_count: data.post || 0,
        like_count: data.like || 0,
        share_count: data.share || 0,
        comment_count: data.comment || 0,
        total_ad_spent: data.cost ? `$${data.cost.toLocaleString()}` : "$0",
        subcategory1: data.second_ecom_category?.value || "",
        subcategory2: data.third_ecom_category?.value || "",
        post_change: data.post_change ? `${data.post_change}%` : "",
        play_rate_6s: data.play_six_rate ? `${data.play_six_rate}%` : "",
        e_com_type: data.ecom_type || "L3",
        category: data.first_ecom_category?.value || "Trending"
      }
    };
  }, [amazonData, isTikTok, product]);

  const normalizedAlibaba = useMemo(() => {
    const data = supplierInfo || alibabaData?.supplier || alibabaData?.item || alibabaData;
    if (!data) return null;

    const storeAgeValue = data.years_in_business || data.seller_store?.storeAge || data.storeAge || "14";
    const storeNameValue = data.supplier_name || data.company?.companyName || data.storeName || "Fujian Virtue Industry Co., Ltd.";
    const contactName = data.company?.companyContact?.name || data.contact || "Rita Zou";

    const skuModule = data.sku?.def || data.sku_listing?.def;
    const priceValue = data.price_per_unit || data.estimated_price ||
      skuModule?.priceModule?.priceFormatted ||
      skuModule?.priceModule?.priceList?.[0]?.priceFormatted ||
      data.price_per_unit || "1.79";

    const moqValue = data.min_order_quantity ||
      skuModule?.quantityModule?.minOrder?.quantityFormatted ||
      skuModule?.quantityModule?.minOrder?.quantity ||
      "500 pieces";

    const ratingValue = data.rating || data.seller_store?.storeEvaluates?.[0]?.score || "5.0";
    const countryValue = data.location || data.company_details?.companyAddress?.country || "China";
    const status = data.company_details?.status || data;

    const isVerifiedValue = (status.verified ?? status.isVerified ?? status.verified_supplier) ?? false;
    const isGoldValue = (status.gold ?? status.isGoldMember) ?? true;
    const tradeAssuranceValue = (status.tradeAssurance === "1" || status.TradeAssurance === true || status.trade_assurance === "1");

    let imageSrc = data.supplier_product_image || (data.images && data.images[0]) || data.image || "";
    if (typeof imageSrc === 'string' && imageSrc.startsWith('//')) imageSrc = `https:${imageSrc}`;

    return {
      id: data.itemId || data.id || "1601358669078",
      name: data.title || data.name || "Alibaba Sourcing Partner",
      image: imageSrc,
      rating: ratingValue,
      storeAge: storeAgeValue,
      storeName: storeNameValue,
      contact: contactName,
      price: priceValue.toString().replace("$", ""),
      minOrder: moqValue,
      country: countryValue,
      isVerified: isVerifiedValue,
      TradeAssurance: tradeAssuranceValue,
      isGoldMember: isGoldValue
    };
  }, [supplierInfo, alibabaData]);

  const history = useMemo(() => {
    return product?.historical_data || [];
  }, [product]);

  if (isFetchingProduct) {
    return <AnalysisSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-slate-500">
        <Box size={48} className="mb-4 opacity-20" />
        <p className="text-[16px] font-medium">Product analysis was not found.</p>
        <button onClick={() => navigate(-1)} className="mt-6 text-blue-400 font-bold hover:text-blue-300 transition-colors">
          Return to Vault
        </button>
      </div>
    );
  }

  // Use values from the product object if specifically provided, or look at history
  const grossProfitAmount = product.gross_profit || history[0]?.product_gross_profit || "0.00";
  const netProfitAmount = product.net_profit || history[0]?.product_net_profit || "0.00";
  const grossProfitMargin = product.percentage_gross_profit || history[0]?.product_gross_profit_percentage || "0.0";
  const netProfitMargin = product.percentage_net_profit || history[0]?.product_net_profit_percentage || "0.0";

  return (
    <div className="analysis-page-container">
      {/* Background Image Layer - Perfectly Blended */}
      <div className="absolute top-0 left-0 right-0 h-[750px] z-0 pointer-events-none overflow-hidden">
        <img src={bgAnalysis} alt="" className="hidden dark:block  w-full h-full object-cover object-top opacity-100 mix-blend-screen" />
        <img src={bgAnalysisLight} alt="" className="block dark:hidden dashboard-banner-image w-full h-full object-cover object-top opacity-100" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-card-alt via-brand-card-alt/30 to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 sm:mb-10">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <h1 className="banner-heading-text !text-[30px] !text-left !ml-[-1px] !mb-0 font-black text-brand-textPrimary dark:text-white">
              Analysis of <span className="text-blue-400 capitalize">{normalizedAmazon?.title.split(' ').slice(0, 3).join(' ') || normalizedTikTok?.title.split(' ').slice(0, 3).join(' ')}...</span>
            </h1>
            <p className="auth-subtitle !text-left font-medium opacity-80 ml-2 text-brand-textSecondary dark:text-brand-textSecondary">Full performance breakdown and sourcing insights</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                const rawCat = product?.category || product?.category_id;
                const catId = typeof rawCat === 'object' ? rawCat?.id : rawCat;

                if (catId) {
                  navigate(`/products?collectionId=${catId}`);
                } else {
                  navigate("/products");
                }
              }}
              className="flex-1 sm:flex-none px-8 py-2.5 rounded-full figma-pill-border text-brand-textPrimary dark:text-white text-[13px] font-bold hover:bg-brand-hover dark:hover:bg-white/5 transition-all shadow-lg active:scale-95 uppercase tracking-[0.1em] flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>

        {/* Product & Supplier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
          <div className="h-full">
            {isTikTok && normalizedTikTok ? (
              <TrendProductCard
                title={normalizedTikTok.title}
                image={normalizedTikTok.image}
                category={normalizedTikTok.category}
                price={`$${normalizedTikTok.price}`}
                metrics={normalizedTikTok.metrics}
                variant="selected"
                isCalculator={true}
              />
            ) : (
              <AmazonProductCard
                product={normalizedAmazon}
                variant="selected"
                isCalculator={true}
              />
            )}
          </div>
          <div className="h-full">
            <VaultAlibabaCard supplier={normalizedAlibaba} />
          </div>
        </div>

        {/* Metric Gauges */}
        <ProductProfitGauges
          grossProfitAmount={grossProfitAmount}
          netProfitAmount={netProfitAmount}
          grossProfitMargin={grossProfitMargin}
          netProfitMargin={netProfitMargin}
        />

        {/* Calculation History Table */}
        <div className="analysis-card-box mb-6">
          <div className="p-6 sm:p-6 flex items-center justify-between border-b border-brand-border dark:border-white/5">
            <h2 className="text-[18px] font-black text-brand-textPrimary dark:text-white tracking-tight">Calculation History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="analysis-table-th">Sr No.</th>
                  <th className="analysis-table-th">Product Sourcing Cost</th>
                  <th className="analysis-table-th">Product Revenue</th>
                  <th className="analysis-table-th">Gross Profit</th>
                  <th className="analysis-table-th">Net Profit</th>
                  <th className="analysis-table-th">Modified At</th>
                  <th className="analysis-table-th text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border dark:divide-white/5">
                {history.length > 0 ? history.map((calc: any, index: number) => (
                  <tr key={calc.id || index} className="hover:bg-brand-hover dark:hover:bg-white/[0.02] transition-colors">
                    <td className="analysis-table-td font-medium !text-brand-textSecondary">{index + 1}</td>
                    <td className="analysis-table-td font-bold">${(calc.product_sourcing_cost || 0).toLocaleString()}</td>
                    <td className="analysis-table-td font-bold">${(calc.product_revenue || 0).toLocaleString()}</td>
                    <td className="analysis-table-td font-bold">${(calc.product_gross_profit || 0).toLocaleString()}</td>
                    <td className="analysis-table-td font-bold">${(calc.product_net_profit || 0).toLocaleString()}</td>
                    <td className="analysis-table-td font-medium !text-brand-textSecondary">
                      {new Date(calc.modified_at || calc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="analysis-table-td text-right">
                      <button className="btn-analysis-view">
                        View Calculations
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3 opacity-20">
                        <Activity size={40} className="text-brand-textPrimary dark:text-white" />
                        <span className="text-[14px] font-bold text-brand-textPrimary dark:text-white uppercase tracking-widest">No Historical Data</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-3 border-t border-brand-border dark:border-white/5 bg-brand-card dark:bg-white/[0.01]">
            <span className="text-[12px] text-brand-textSecondary dark:text-slate-500 font-bold  tracking-widest">
              Showing 1 to {history.length} of {history.length} results
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalysis;
