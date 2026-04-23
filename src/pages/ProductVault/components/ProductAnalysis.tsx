import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import bgAnalysis from "../../../assets/images/marginmax.png";
import bgAnalysisLight from "../../../assets/images/SourceLink-lightbg.png";
import {
  Box, Activity, ArrowLeft,
} from "lucide-react";
import { getSavedProductsDetail } from "../../../api/savedProducts";
import AnalysisSkeleton from "../../../components/common/Skeletons/AnalysisSkeleton";
import AmazonProductCard from "../../Explorer/components/Common/Cards/AmazonProductCard";
import TrendProductCard from "../../SocialPulse/TiktokTrends/components/TrendProductCard";
import ProductProfitGauges from "./ProductProfitGauges";
import SpkbgSupplierCard from "../../../components/common/SpkCards/SpkbgSupplierCard";
import { useUserDetails } from "../../../hooks/useUserDetails";
import { Lock } from "lucide-react";
import { checkIsTikTokProduct, normalizeAlibabaSupplier, normalizeAmazonProduct, normalizeTikTokProduct } from "../../../utils/cardDataNormalizers";


const ProductAnalysis: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product data - this includes historical_data now per the user's JSON
  const { data: productResponse, isLoading: isFetchingProduct } = useQuery({
    queryKey: ["saved-product-detail", id],
    queryFn: () => getSavedProductsDetail({ id: id! }),
    enabled: !!id,
  });

  const { data: userDetails } = useUserDetails();
  const features = userDetails?.features;

  const hasGrossAccess = features?.access_to_gross_profit ?? true;
  const hasNetAccess = features?.access_to_net_profit ?? true;

  const product = productResponse?.data;
  const amazonData = product?.amazon_product?.data || product?.amazon_product;
  const supplierInfo = product?.supplier_info;
  const alibabaData = product?.alibaba_product;

  const isTikTok = useMemo(() => checkIsTikTokProduct(product), [product]);
  const normalizedAmazon = useMemo(() => normalizeAmazonProduct(amazonData, product, isTikTok), [amazonData, product, isTikTok]);
  const normalizedTikTok = useMemo(() => normalizeTikTokProduct(amazonData, product, isTikTok), [amazonData, product, isTikTok]);
  const normalizedAlibaba = useMemo(() => normalizeAlibabaSupplier(supplierInfo, alibabaData), [supplierInfo, alibabaData]);

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

  // ── Same as ListingDetail ─────────────────────────────────────────────────
  const getProfitValue = (profit: number, revenue: number) => (profit * revenue) / 100;

  // Always use LAST history entry (product-level fields may be stale)
  const lastHistory = history.length > 0 ? history[history.length - 1] : null;

  // Revenue
  const totalRevenue = parseFloat((lastHistory?.product_revenue ?? product.total_revenue ?? "0").toString()) || 0;

  // Margin % — used for Gauge fill (same as ListingDetail Gauge value prop)
  const grossProfitMargin = parseFloat((lastHistory?.product_gross_profit_percentage ?? product.gross_profit ?? "0").toString()) || 0;
  const netProfitMargin = parseFloat((lastHistory?.product_net_profit_percentage ?? product.net_profit ?? "0").toString()) || 0;

  // Dollar amounts — calculated via getProfitValue (same as ListingDetail label)
  const grossProfitAmount = getProfitValue(grossProfitMargin, totalRevenue);
  const netProfitAmount = hasNetAccess ? getProfitValue(netProfitMargin, totalRevenue) : 0;

  return (
    <div className="analysis-page-container">
      {/* Background Image Layer - Perfectly Blended */}
      <div className="absolute top-0 left-0 right-0 h-[750px] z-0 pointer-events-none overflow-hidden">
        <img src={bgAnalysis} alt="" className="hidden dark:block  w-full h-full object-cover object-top opacity-100 mix-blend-screen" />
        <img src={bgAnalysisLight} alt="" className="block dark:hidden dashboard-banner-image w-full h-full object-cover object-top opacity-100" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-card-alt via-brand-card-alt/30 to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 sm:mb-10">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <h1 className="banner-heading-text !text-[22px] !text-left !ml-[-1px] !mb-0 font-black text-brand-textPrimary dark:text-white mt-2">
              {/* Analysis of <span className="">{normalizedAmazon?.title || normalizedTikTok?.title}</span> */}
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
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-full figma-pill-border text-brand-textPrimary dark:text-white text-[13px] font-bold hover:bg-brand-hover dark:hover:bg-white/5 transition-all  active:scale-95 uppercase tracking-[0.1em] flex items-center justify-center gap-2">
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>

        {/* Product & Supplier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 sm:mb-10">
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
            {normalizedAlibaba && (
              <SpkbgSupplierCard
                data={normalizedAlibaba}
                variant="selected"
              />
            )}
          </div>
        </div>

        {/* Metric Gauges */}
        <ProductProfitGauges
          grossProfitAmount={grossProfitAmount}
          total_revenue={totalRevenue}
          netProfitAmount={netProfitAmount}
          grossProfitMargin={grossProfitMargin}
          netProfitMargin={netProfitMargin}
          hasGrossAccess={hasGrossAccess}
          hasNetAccess={hasNetAccess}
        />

        {/* Calculation History Table */}
        <div className="analysis-card-box mb-6">
          <div className="p-6 flex items-center justify-between border-b border-brand-border dark:border-white/5 bg-brand-card dark:bg-[#081421]">
            <h2 className="text-[18px] font-black text-brand-textPrimary dark:text-white tracking-tight">Calculation History</h2>
          </div>

          <div className="invoice-table-wrapper !max-h-none !bg-transparent !mt-0 !border-none !rounded-none">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="invoice-table-th">Sr No.</th>
                  <th className="invoice-table-th">Product Sourcing Cost</th>
                  <th className="invoice-table-th">Product Revenue</th>
                  <th className="invoice-table-th">Gross Profit</th>
                  <th className="invoice-table-th">Net Profit</th>
                  <th className="invoice-table-th">Modified At</th>
                  <th className="invoice-table-th">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border dark:divide-white/5">
                {history.length > 0 ? history.map((calc: any, index: number) => (
                  <tr key={calc.id || index} className="hover:bg-white/5 transition-colors">
                    <td className="invoice-table-td font-medium !text-brand-textSecondary">{index + 1}</td>
                    <td className="invoice-table-td font-bold !text-brand-textPrimary dark:!text-white">${(calc.product_sourcing_cost || 0).toLocaleString()}</td>
                    <td className="invoice-table-td font-bold !text-brand-textPrimary dark:!text-white">${(calc.product_revenue || 0).toLocaleString()}</td>
                    <td className="invoice-table-td font-bold !text-brand-textPrimary dark:!text-white">
                      {hasGrossAccess ? `$${(calc.product_gross_profit || 0).toLocaleString()}` : (
                        <div className="flex items-center gap-1.5 text-slate-400 opacity-60">
                          <Lock size={12} /> <span className="text-[12px]">Locked</span>
                        </div>
                      )}
                    </td>
                    <td className="invoice-table-td font-bold !text-brand-textPrimary dark:!text-white">
                      {hasNetAccess ? `$${(calc.product_net_profit || 0).toLocaleString()}` : (
                        <div className="flex items-center gap-1.5 text-slate-400 opacity-60">
                          <Lock size={12} /> <span className="text-[12px]">Locked</span>
                        </div>
                      )}
                    </td>
                    <td className="invoice-table-td font-medium !text-brand-textSecondary">
                      {new Date(calc.modified_at || calc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="invoice-table-td">
                      <div className="flex items-center justify-start gap-2 text-slate-400">
                        <button
                          onClick={() => navigate(`/calculator/calculations/${calc.id}`)}
                          className="px-4 py-1.5  !py-2 !px-4 text-white dark:text-white bg-brand-gradient  hover:text-white rounded-full transition-all text-[12px] font-bold"
                        >
                          View Calculation
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
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
