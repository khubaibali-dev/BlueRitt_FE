import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Layout, BarChart2, Share2, Heart, MessageCircle, Award, ChevronDown, ChevronUp, Star } from "lucide-react";
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

const TrendsProductDetailsDrawer: React.FC<TrendsProductDetailsDrawerProps> = ({ isOpen, onClose, onDiscoverSupplier, product, country = "US" }) => {
  const [activeTab, setActiveTab] = useState<"Details" | "Analysis">("Details");
  const [isHashtagsExpanded, setIsHashtagsExpanded] = useState(true);
  const navigate = useNavigate();

  // Real-time Analysis Query
  const { data: analysisData, isLoading: isAnalysisLoading } = useQuery({
    queryKey: ["tiktok-analysis", product?.title, country],
    queryFn: () => getTikTokShopAnalysis(product?.title || "", country),
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
            <h2 className="text-xl font-bold text-white tracking-tight">Product Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all text-white/70"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs - Synced with Explorer */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
            {(["Details", "Analysis"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-2 rounded-[10px] text-[13px] transition-all font-bold ${activeTab === tab
                  ? "text-white shadow-lg"
                  : "text-white hover:text-white hover:bg-white/5"
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
        <div className="mt-4 border-b border-[#1C263C] mx-6" />

        {/* Scrollable Body - Synced Scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 pb-10 space-y-8">

          {/* Content sections below remain high-fidelity but adjusted for layout */}
          {activeTab === "Details" ? (
            <>
              {/* Top Info Section - Only visible in Details */}
              <div className="flex gap-4 mb-8">
                <div className="w-28 h-28 rounded-[22px] overflow-hidden shrink-0 border border-white/10">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mt-2 mb-1 pr-2">
                    <h4 className="product-card-title pr-4 !text-[17px]">
                      {product.title}
                    </h4>
                    <div className="product-img-badge !static shrink-0 !rounded-full !bg-white/5 !border-none">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-[22px] font-black text-white">{product.price}</span>
                    <span className="product-img-badge !rounded-full !bg-white/5 !border-none">{formatNumber(product.view_count)} Views</span>
                  </div>
                </div>
              </div>
              <div className="border border-white/10" />
              {/* Engagement Stats */}
              <div className="space-y-4">
                <h5 className="text-[14px]  text-white tracking-tight">TikTok Engagement</h5>
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
                        <span className="product-metric-label block mb-0.5">{item.label}</span>
                        <span className="product-metric-value block !text-[12px]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-4">
                <h5 className="text-[14px]  text-white tracking-tight">Additional Metrics</h5>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "CTR", value: enrichedMetrics?.ctr || "0.00" },
                    { label: "CVR", value: enrichedMetrics?.cvr || "0.00" },
                    { label: "CPA", value: enrichedMetrics?.cpa || "$0.00" },
                    { label: "Impressions", value: enrichedMetrics?.impressions || "0K" },
                    { label: "Category", value: enrichedMetrics?.category || product.category || "N/A" },
                    { label: "Subcategory", value: enrichedMetrics?.subcategory1 || "N/A" }
                  ].map((metric, i) => (
                    <div key={i} className={`bg-[#04132B] border border-[#082656] rounded-[10px] p-3.5 flex flex-col justify-center ${isEnrichedLoading ? "skeleton-pulse" : ""}`}>
                      <span className="product-metric-label block mb-2">{metric.label}</span>
                      <span className="product-metric-value block !text-[13px]">{isEnrichedLoading ? "..." : metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hashtags Section */}
              <div className="bg-[#0E192B] border border-[#082656] rounded-[12px] p-4 transition-all duration-300">
                <button
                  onClick={() => setIsHashtagsExpanded(!isHashtagsExpanded)}
                  className="flex items-center justify-between w-full mb-1 group"
                >
                  <h5 className="text-[14px] text-white tracking-tight">Trending Hashtags</h5>
                  <div className="p-1 rounded-full hover:bg-white/5 transition-all">
                    {isHashtagsExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
                  </div>
                </button>
                {isHashtagsExpanded && (
                  <div className="flex flex-wrap gap-2.5 pt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {isCreativeLoading ? (
                      [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-20 bg-white/5 rounded-full skeleton-pulse" />
                      ))
                    ) : creativeData?.data?.info?.hashtags?.length ? (
                      creativeData.data.info.hashtags.map((tag, i) => (
                        <span key={i} className="hashtag-pill !px-4 !py-2 !rounded-full text-[12px]">#{tag}</span>
                      ))
                    ) : (
                      <span className="text-[12px] text-slate-500 italic">No hashtags found</span>
                    )}
                  </div>
                )}
              </div>

              {/* Demographics */}
              <div className="space-y-4 pb-4">
                <h5 className="text-[15px] font-bold text-white tracking-tight">Audience Insights</h5>
                <div className="bg-[#0E192B] border border-[#082656] rounded-[12px] p-5">
                  <h6 className="text-[13px] font-medium text-slate-300 mb-6">Age Demographics</h6>

                  <div className="space-y-4">
                    {isCreativeLoading ? (
                      [1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4 skeleton-pulse">
                          <div className="h-3 bg-white/10 rounded w-8" />
                          <div className="h-4 bg-white/5 rounded-full flex-1" />
                          <div className="h-3 bg-white/10 rounded w-10" />
                        </div>
                      ))
                    ) : creativeData?.data?.info?.audience_ages?.length ? (
                      creativeData.data.info.audience_ages.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                          <span className="text-[12px] font-bold text-slate-400 w-8">{getAgeLabel(item.age_level)}</span>
                          <div className="h-4 bg-[#051125] rounded-full overflow-hidden flex-1 relative">
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
                        <p className="text-slate-500 text-[12px]">Audience data is not available for this product.</p>
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
                  <h4 className="product-card-title !mb-1">{product.title}</h4>
                  <span className="product-price-primary !text-[20px]">{product.price}</span>
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
              <div className="border border-white/10" />

              {/* Comparison Section */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-[15px] font-semibold text-white tracking-tight mt-4">TikTok Shop Analysis - {product.category}</h5>
                  <p className="text-[12px] text-[#9F9F9F]">
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
                          <div className="w-16 h-16 rounded-xl bg-white/5 shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-white/10 rounded w-3/4" />
                            <div className="h-4 bg-white/5 rounded w-1/4" />
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                          {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="h-12 bg-white/5 rounded-lg" />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : analysisData?.products?.length ? (
                    analysisData.products.map((item: any, idx: number) => (
                      <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-4 mb-2">
                              <h6 className="product-card-title !leading-tight truncate">{item.title}</h6>
                              <div className="trending-badge-standard !px-2 !py-0.5">
                                BY {item.shop_name?.toUpperCase() || "TIKTOK SHOP"}
                              </div>
                            </div>
                            <span className="product-price-primary !text-[16px]">
                              ${item.price.toFixed(2)} <span className="text-[10px] text-[#9F9F9F] font-normal ml-1 uppercase tracking-widest">{item.currency || "USD"}</span>
                            </span>
                          </div>
                        </div>
                        <div className="border border-white/10" />
                        <div className="grid grid-cols-4 gap-3">
                          {[
                            { label: "Sales", value: item.sales_count >= 1000 ? `${(item.sales_count / 1000).toFixed(1)}K` : item.sales_count },
                            { label: "Rating", value: item.product_rating },
                            { label: "Reviews", value: item.review_count },
                            { label: "Ships From", value: item.shipping_info?.ship_from || "US" }
                          ].map((m, mIdx) => (
                            <div key={mIdx} className="bg-[#04132B] border border-[#082656] rounded-lg p-3 flex flex-col justify-center min-h-[54px]">
                              <span className="product-metric-label block mb-1.5">{m.label}</span>
                              <span className="product-metric-value block !text-[12px]">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-500">No additional shop analysis found for this keyword.</p>
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
