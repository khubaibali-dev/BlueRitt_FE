import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Award, Heart, Share2, MessageCircle, BarChart2, Layout, ChevronDown, ChevronUp, Star, Loader2, Package } from "lucide-react";
import { getProductImageWithFallback } from "../../../../utils/pexelsImageFallback";
import { useQuery } from "@tanstack/react-query";
import { getTikTokShopAnalysis, formatNumber, getTikTokCreativeCenterProductDetails, getTikTokCreativeCenterProducts } from "../../../../api/tiktokTrends";

interface TrendsProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDiscoverSupplier: () => void;
  product?: {
    id: string;
    title: string;
    image: string;
    category: string;
    price: string;
    metrics: {
      ctr: string;
      cvr: string;
      cpa: string;
      impressions: string;
      category?: string;
      category_id?: string;
      subcategory1?: string;
      subcategory2?: string;
    };
    post_count: number;
    review_count: number;
    comment_count: number;
    like_count: number;
    share_count: number;
    view_count: number;
    category_name: string;
  };
  country?: string;
}

const ImageWithFallback: React.FC<{ src: string; title: string; className?: string }> = ({ src, title, className = "" }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isFallbackLoading, setIsFallbackLoading] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  const handleImageError = async () => {
    if (fallbackAttempted) return;
    setFallbackAttempted(true);
    setIsFallbackLoading(true);

    try {
      const fallback = await getProductImageWithFallback({ title });
      if (fallback) {
        setImgSrc(fallback);
      }
    } catch (error) {
      console.error("❌ Fallback image failed:", error);
    } finally {
      setIsFallbackLoading(false);
    }
  };

  useEffect(() => {
    setFallbackAttempted(false);
    if (!src || src.includes('placeholder') || src === '') {
      handleImageError();
    } else {
      setImgSrc(src);
    }
  }, [src, title]);

  return (
    <div className={`relative overflow-hidden bg-brand-card-alt ${className}`}>
      {isFallbackLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
        </div>
      ) : imgSrc ? (
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-brand-textMuted">
          <Package size={20} />
        </div>
      )}
    </div>
  );
};

const TrendsProductDetailsDrawer: React.FC<TrendsProductDetailsDrawerProps> = ({ isOpen, onClose, onDiscoverSupplier, product, country = "US" }) => {
  const [activeTab, setActiveTab] = useState<"Details" | "Analysis">("Details");
  const [isHashtagsExpanded, setIsHashtagsExpanded] = useState(true);
  const navigate = useNavigate();

  // Real-time Analysis Query
  const { data: analysisData, isLoading: isAnalysisLoading } = useQuery({
    queryKey: ["tiktok-analysis", product?.title, "US", product?.metrics?.category_id],
    queryFn: () => getTikTokShopAnalysis(product?.title || "", "US", product?.metrics?.category_id),
    enabled: isOpen && activeTab === "Analysis" && !!product?.title,
  });

  // TikTok Creative Center Details Query
  const { data: creativeData, isLoading: isCreativeLoading } = useQuery({
    queryKey: ["tiktok-creative-center", product?.id],
    queryFn: () => getTikTokCreativeCenterProductDetails(product?.id || ""),
    enabled: isOpen && !!product?.id,
  });

  // TikTok Creative Center Enriched Metrics Query
  const { data: enrichedMetricsData, isLoading: isEnrichedLoading } = useQuery({
    queryKey: ["tiktok-creative-center-metrics", product?.title, country],
    queryFn: () => getTikTokCreativeCenterProducts({
      keyword: product?.title || "",
      country: country,
      limit: 1
    }),
    enabled: isOpen && !!product?.title,
  });

  const enrichedMetrics = (enrichedMetricsData?.products?.[0]?.metrics || product?.metrics) as any;

  if (!product) return null;

  // Helper to map age_level to raw labels from API
  const getAgeLabel = (level: number) => {
    if (!level) return "18+";

    // If it's a small index (1, 2, 3), map to standard start ages
    const indexMapping: Record<number, number> = {
      1: 18,
      2: 25,
      3: 35,
      4: 45,
      5: 55
    };

    const age = indexMapping[level] || level;
    return `${age}+`;
  };

  const handleDiscoverSupplier = () => {
    const finalMetrics = enrichedMetrics || product?.metrics;

    if (onDiscoverSupplier) {
      onDiscoverSupplier();
    } else {
      navigate("/explorer", {
        state: {
          product: {
            title: product.title,
            image: product.image,
            category: product.category,
            price: product.price,
            metrics: finalMetrics
          },
          autoSourceLink: true,
          isTikTokSource: true
        }
      });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`filter-drawer-backdrop z-[100] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`filter-drawer-panel z-[110] w-full sm:!w-[650px] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="p-6 pb-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-brand-textPrimary tracking-tight">Product Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-brand-hover text-brand-textSecondary hover:text-brand-textPrimary transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs - Synced with Explorer */}
          <div className="flex gap-2 p-1 bg-brand-card-alt rounded-xl w-fit border ">
            {(["Details", "Analysis"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-2 rounded-[10px] text-[13px] transition-all font-bold ${activeTab === tab
                  ? "text-white shadow-lg"
                  : "text-black dark:text-white dark:hover:bg-brand-hover"
                  }`}
                style={
                  activeTab === tab
                    ? { background: "linear-gradient(96.06deg, #155DFC -33.01%, #CD5150 124.28%)" }
                    : {}
                }
              >
                {tab === "Details" ? <Layout size={14} /> : <BarChart2 size={14} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Separator */}
        <div className="mt-4 border-b border-brand-inputBorder mx-6" />

        {/* Scrollable Body - Synced Scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 sm:pt-4 pb-6 space-y-5">

          {/* Content sections below remain high-fidelity but adjusted for layout */}
          {activeTab === "Details" ? (
            <>
              {/* Top Info Section - Final Responsive */}
              <div className="flex gap-3 sm:gap-4 mb-3">

                <ImageWithFallback
                  src={product.image}
                  title={product.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-[12px] shrink-0 border border-brand-inputBorder object-cover"
                />

                <div className="flex-1 min-w-0">

                  {/* Title + Price */}
                  <h4 className="product-card-title text-[14px] sm:text-[18px] mb-1 sm:mb-2 mt-1 line-clamp-2">
                    {product.title}
                  </h4>

                  <span className="text-[16px] sm:text-[24px] font-black text-brand-textPrimary">
                    {product.price}
                  </span>

                  {/* 👇 Category + Views same row */}
                  <div className="flex items-center justify-between mt-2 gap-2">

                    <span className="product-img-badge !rounded-full whitespace-nowrap text-[11px] sm:text-xs">
                      {product.category}
                    </span>

                    <span className="product-img-badge !rounded-full whitespace-nowrap text-[11px] sm:text-xs">
                      {formatNumber(product.view_count)} Views
                    </span>

                  </div>

                </div>
              </div>
              <div className="border-b border-brand-inputBorder" />
              {/* Engagement Stats */}
              <div className="space-y-2">
                <h5 className="text-[15px] font-bold text-brand-textPrimary tracking-tight">TikTok Engagement</h5>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: Award, label: "Posts", value: formatNumber(product.post_count) },
                    { icon: Heart, label: "Likes", value: formatNumber(product.like_count) },
                    { icon: Share2, label: "Shares", value: formatNumber(product.share_count) },
                    { icon: MessageCircle, label: "Comments", value: formatNumber(product.comment_count) }
                  ].map((item, i) => (
                    <div key={i} className="engagement-icon-box !p-3 !rounded-[20px]">
                      <div className="standard-icon-circle !w-9 !h-9 text-blue-400">
                        <item.icon size={14} className="text-white" />
                      </div>
                      <div className="text-center">
                        <span className="metric-label block mb-0.5">{item.label}</span>
                        <span className="metric-value block !text-[12px]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-4">
                <h5 className="text-[15px] font-bold text-brand-textPrimary tracking-tight">
                  Additional Metrics
                </h5>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { label: "CTR", value: enrichedMetrics?.ctr || "0.00" },
                    { label: "CVR", value: enrichedMetrics?.cvr || "0.00" },
                    { label: "CPA", value: enrichedMetrics?.cpa || "$0.00" },
                    { label: "Impressions", value: enrichedMetrics?.impressions || "0K" },
                    { label: "Category", value: enrichedMetrics?.category || product.category || "N/A", fullWidth: true },
                    { label: "Subcategory", value: enrichedMetrics?.subcategory1 || "N/A", fullWidth: true }
                  ].map((metric, i) => (
                    <div
                      key={i}
                      className={`
          product-metric-item 
          ${metric.fullWidth ? "col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2" : ""} 
          ${isEnrichedLoading ? "skeleton-pulse" : ""}
        `}
                    >
                      <span className="metric-label block mb-1 text-xs sm:text-sm">
                        {metric.label}
                      </span>

                      <span className="metric-value block text-[12px] sm:text-[13px]">
                        {isEnrichedLoading ? "..." : metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hashtags Section */}
              <div className="bg-[#FAFAFA] dark:bg-brand-card border border-brand-inputBorder rounded-[12px] p-4 transition-all duration-300">
                <button
                  onClick={() => setIsHashtagsExpanded(!isHashtagsExpanded)}
                  className="flex items-center justify-between w-full mb-1 group"
                >
                  <h5 className="text-[15px] font-bold text-brand-textPrimary tracking-tight">Trending Hashtags</h5>
                  <div className="p-1 rounded-full hover:bg-brand-hover transition-all">
                    {isHashtagsExpanded ? <ChevronUp size={20} className="text-brand-textPrimary" /> : <ChevronDown size={20} className="text-brand-textPrimary" />}
                  </div>
                </button>
                {isHashtagsExpanded && (
                  <div className="flex flex-wrap gap-2.5 pt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {isCreativeLoading ? (
                      [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-20 bg-brand-card-alt rounded-full skeleton-pulse" />
                      ))
                    ) : creativeData?.data?.info?.hashtags?.length ? (
                      creativeData.data.info.hashtags.map((tag, i) => (
                        <span key={i} className="hashtag-pill !px-4 !py-2 !rounded-full text-[12px]">#{tag}</span>
                      ))
                    ) : (
                      <span className="text-[12px] text-brand-textMuted italic">No hashtags found</span>
                    )}
                  </div>
                )}
              </div>

              {/* Demographics */}
              <div className="space-y-4 pb-4">
                <h5 className="text-[15px] font-bold text-brand-textPrimary tracking-tight">Audience Insights</h5>
                <div className="bg-brand-card border border-brand-inputBorder rounded-[12px] p-5">
                  <h6 className="text-[13px] font-medium text-brand-textSecondary mb-6">Age Demographics</h6>

                  <div className="space-y-4">
                    {isCreativeLoading ? (
                      [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 skeleton-pulse">
                          <div className="h-3 bg-brand-card-alt rounded w-8" />
                          <div className="h-4 bg-brand-card-alt rounded-full flex-1" />
                          <div className="h-3 bg-brand-card-alt rounded w-10" />
                        </div>
                      ))
                    ) : creativeData?.data?.info?.audience_ages?.length ? (
                      creativeData.data.info.audience_ages.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                          <span className="text-[12px] font-bold text-brand-textSecondary w-8">{getAgeLabel(item.age_level)}</span>
                          <div className="h-4 bg-brand-bg rounded-full overflow-hidden flex-1 relative">
                            <div
                              className="h-full rounded-full absolute left-0 top-0 transition-all duration-1000"
                              style={{
                                width: `${Math.min(item.score, 100)}%`,
                                background: "linear-gradient(90deg, #A7CFFF 0%, #FFFFFF 50%, #FF9E6F 100%)"
                              }}
                            />
                          </div>
                          <span className="text-[12px] font-bold text-[#6291DE] w-10 text-right">{item.score}%</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-brand-textSecondary text-[12px]">Audience data is not available for this product.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
              {/* Analysis Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="product-card-title !text-brand-textPrimary !mb-1">{product.title}</h4>
                  <span className="product-price-primary !text-brand-textPrimary !text-[20px]">{product.price}</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="standard-icon-circle !w-8 !h-8 flex items-center justify-center ">
                      <Star size={14} className="text-white" />
                    </div>
                    <div>
                      <span className="product-metric-label block">Rating</span>
                      <span className="product-metric-value block !text-[12px]">{product.metrics?.ctr || "4.5"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b border-brand-inputBorder" />

              {/* Comparison Section */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-[15px] font-semibold text-brand-textPrimary tracking-tight mt-4">TikTok Shop Analysis - {product.category}</h5>
                  <p className="text-[12px] text-brand-textSecondary">
                    {isAnalysisLoading ? (
                      "Analyzing marketplace data..."
                    ) : (
                      <>Found <span className="text-orange-400 font-bold">{analysisData?.products?.length || 0} products</span> with pricing and sales data</>
                    )}
                  </p>
                </div>

                <div className="space-y-10">
                  {isAnalysisLoading ? (
                    // Analysis Skeletons
                    [1, 2, 3].map((i) => (
                      <div key={i} className="space-y-4 skeleton-pulse">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl bg-brand-card-alt shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-brand-card-alt rounded w-3/4" />
                            <div className="h-4 bg-brand-card-alt rounded w-1/4" />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="h-12 bg-brand-card-alt rounded-lg" />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : analysisData?.products?.length ? (
                    analysisData.products.map((item: any, idx: number) => (
                      <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex gap-4">
                          <ImageWithFallback
                            src={item.image_url}
                            title={item.title}
                            className="w-16 h-16 rounded-[12px] border border-brand-inputBorder shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="mb-2">
                              <h6 className="product-card-title !leading-tight truncate">{item.title}</h6>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="product-price-primary !text-[16px]">
                                ${item.price.toFixed(2)}
                              </span>
                              <div className="trending-badge-standard !px-2 !py-0.5  !static">
                                BY {item.shop_name?.toUpperCase() || "TIKTOK SHOP"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-brand-inputBorder" />
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { label: "Sales", value: item.sales_count >= 1000 ? `${(item.sales_count / 1000).toFixed(1)}K` : item.sales_count },
                            { label: "Rating", value: item.product_rating },
                            { label: "Reviews", value: item.review_count },
                            { label: "Ships From", value: item.shipping_info?.ship_from || "US" }
                          ].map((m, mIdx) => (
                            <div key={mIdx} className="bg-[#FAFAFA] dark:bg-brand-card border border-brand-inputBorder rounded-lg p-3 flex flex-col justify-center min-h-[54px]">
                              <span className="product-metric-label block mb-1.5">{m.label}</span>
                              <span className="product-metric-value block !text-[12px]">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-brand-textSecondary">No additional shop analysis found for this keyword.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer Action - Now part of flow, not sticky */}
          <div className="flex justify-end mt-10 pb-2">
            <button
              onClick={handleDiscoverSupplier}
              className="btn-discover-supplier !w-full sm:!w-auto !px-10 !h-[40px]"
            >
              Discover Suppliers
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default TrendsProductDetailsDrawer;
