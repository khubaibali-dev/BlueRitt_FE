import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink, Package, Heart, Share2, MessageCircle } from "lucide-react";

interface TrendProductCardProps {
  title: string;
  image: string;
  category: string;
  price?: string;
  metrics: {
    ctr: string;
    cvr: string;
    cpa: string;
    impressions: string;
    post_count?: number | string;
    like_count?: number | string;
    share_count?: number | string;
    comment_count?: number | string;
    e_com_type?: string;
    total_ad_spent?: string;
    subcategory1?: string;
    subcategory2?: string;
    post_change?: string;
    play_rate_6s?: string;
    category?: string;
  };
  variant?: "grid" | "selected";
  onDetailsClick?: () => void;
  onDiscoverSupplier?: () => void;
  onOpenProduct?: () => void;
  onCopyLink?: () => void;
  isCopied?: boolean;
  isCalculator?: boolean;
}

const TrendProductCard: React.FC<TrendProductCardProps> = ({
  title,
  image,
  category,
  price = "$10.90",
  metrics,
  variant = "grid",
  onDetailsClick,
  onDiscoverSupplier,
  onOpenProduct,
  onCopyLink,
  isCopied = false,
  isCalculator = false
}) => {
  const navigate = useNavigate();

  if (variant === "selected") {
    return (
      <div className="discovery-card-list flex-col !p-0 isolate">
        <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2 w-full">
          <Package size={14} className="text-[#FF5900]" />
          <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">Selected TikTok Trend</span>
        </div>
        <div className="p-4 sm:p-2 w-full">
          <div className="flex flex-col lg:flex-row gap-5 items-start">
            <div className="product-img-wrapper-list !w-[100px] !h-[100px] shadow-2xl mx-auto lg:mx-0 shrink-0 bg-[#081421]">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 w-full flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-2 mt-1">
                <h3 className="product-card-title text-[15px] sm:text-[16px] lg:max-w-[600px] text-center lg:text-left">{title}</h3>
                <div className="flex items-baseline gap-2 shrink-0 self-center lg:self-auto">
                  <span className="product-price-primary text-[22px]">{price}</span>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between w-full">
                {/* Only show these icons if NOT isCalculator */}
                {!isCalculator && (
                  <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0 text-white"><Package size={14} /></div>
                      <div className="flex flex-col"><span className="metric-label">Posts</span><span className="metric-value">{metrics.post_count || 0}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0 text-white"><Heart size={14} /></div>
                      <div className="flex flex-col"><span className="metric-label">Likes</span><span className="metric-value">{metrics.like_count || 0}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0 text-white"><Share2 size={14} /></div>
                      <div className="flex flex-col"><span className="metric-label">Shares</span><span className="metric-value">{metrics.share_count || 0}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0 text-white"><MessageCircle size={14} /></div>
                      <div className="flex flex-col"><span className="metric-label">Comments</span><span className="metric-value">{metrics.comment_count || 0}</span></div>
                    </div>
                  </div>
                )}

                <div className={`flex items-center gap-2 ${isCalculator ? 'mt-1' : 'mt-4 lg:mt-0'}`}>
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[12px] text-white/80">{category}</div>
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[12px] text-white/80">{metrics.impressions} Views</div>
                </div>
              </div>
            </div>
          </div>

          {isCalculator ? (
            <div className="grid mt-4 pt-2 border-t border-white/5 grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 px-1">
              {[
                { label: "Sub-Category", value: metrics.subcategory1 || "Makeup & Perfume" },
                { label: "Sub-Category", value: metrics.subcategory2 || "Perfume" },
                { label: "Impressions", value: metrics.impressions },
                { label: "Post Change", value: metrics.post_change || "-3.19%", isRed: String(metrics.post_change || "").includes('-') },
                { label: "Total Ad Spend", value: metrics.total_ad_spent || "$4,020" },
                { label: "6s Play Rate", value: metrics.play_rate_6s || "4.46%" },
                { label: "E-com Type", value: metrics.e_com_type || "L3" },
                { label: "Views", value: metrics.impressions },
                { label: "Shares", value: metrics.share_count || 0 },
                { label: "Comments", value: metrics.comment_count || 0 },
                { label: "Posts", value: metrics.post_count || 0 },
                { label: "CTR", value: metrics.ctr ? (String(metrics.ctr).includes('%') ? metrics.ctr : metrics.ctr + "%") : "0%" },
                { label: "CVR", value: metrics.cvr ? (String(metrics.cvr).includes('%') ? metrics.cvr : metrics.cvr + "%") : "0%" },
                { label: "CPA", value: metrics.cpa },
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <span className="text-[12px] text-white/50 mb-0 opacity-80">{m.label}</span>
                  <span className={`text-[14px] font-medium leading-tight truncate ${m.isRed ? 'text-[#ff4e4e] font-bold' : 'text-white'}`}>{m.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid mt-6 gap-2 px-1 ${isCalculator ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"}`}>
              {[
                { label: "CTR", value: metrics.ctr },
                { label: "CVR", value: metrics.cvr },
                { label: "CPA", value: metrics.cpa },
                { label: "Impressions", value: metrics.impressions },
                { label: "E Com Type", value: metrics.e_com_type || "L3" },
                { label: "Total Ad Spent", value: metrics.total_ad_spent || "$0" },
                ...(isCalculator ? [
                  { label: "Category", value: metrics.category || category || "N/A" },
                  { label: "Subcategory", value: metrics.subcategory1 || "N/A" }
                ] : [])
              ].map((m, i) => (
                <div key={i} className="flex-[1] bg-transparent py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[58px]">
                  <span className="text-[12px] text-[#FFFFFF] mb-1 opacity-80">{m.label}</span>
                  <span className="text-[14px] text-white font-bold leading-tight truncate">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {!isCalculator && (onOpenProduct || onCopyLink) && (
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 w-full px-1">
              <button 
                onClick={onCopyLink}
                className="flex-1 sm:flex-none border border-brand-inputBorder hover:bg-white/5 transition-all text-white !rounded-full !px-8 !py-2.5 text-[14px] font-semibold flex items-center justify-center gap-2"
              >
                {isCopied ? "Copied!" : "Copy Product Link"}
              </button>
              {onOpenProduct && (
                <button onClick={onOpenProduct} className="flex-1 sm:flex-none btn-discover-supplier !px-8 !py-2.5 !font-bold">
                  Open Product
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleDiscoverSupplier = () => {
    if (onDiscoverSupplier) {
      onDiscoverSupplier();
    } else {
      navigate("/explorer", {
        state: {
          product: {
            title,
            image,
            category,
            price,
            metrics
          },
          autoSourceLink: true,
          isTikTokSource: true
        }
      });
    }
  };

  return (
    <div className="trend-product-card group animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Image Section */}
      <div className="relative aspect-[1/1.1] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Carousel Overlays */}
        <button className="carousel-arrow left-4">
          <ChevronLeft size={20} />
        </button>
        <button className="carousel-arrow right-4">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-3 mb-5">
          <h3 className="product-card-title flex-1 !text-[18px] group-hover:text-blue-400">
            {title}
          </h3>
          <div className="product-img-badge !static shrink-0">
            {category}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="product-metric-grid mb-6">
          <div className="product-metric-item">
            <span className="product-metric-label">CTR</span>
            <span className="product-metric-value">{metrics.ctr}</span>
          </div>
          <div className="product-metric-item">
            <span className="product-metric-label">CVR</span>
            <span className="product-metric-value">{metrics.cvr}</span>
          </div>
          <div className="product-metric-item">
            <span className="product-metric-label">CPA</span>
            <span className="product-metric-value">{metrics.cpa}</span>
          </div>
          <div className="product-metric-item">
            <span className="product-metric-label">Impressions</span>
            <span className="product-metric-value">{metrics.impressions}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1">
          <button
            onClick={() => onDetailsClick?.()}
            className="btn-product-details w-full sm:flex-1 !rounded-full !font-normal !px-2.5 !py-2.5"
          >
            Product Details <ExternalLink size={14} className="" />
          </button>
          <button
            onClick={handleDiscoverSupplier}
            className="btn-discover-supplier w-full sm:flex-1 !font-normal !rounded-full !px-2.5 !py-2.5"
          >
            Discover Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendProductCard;
