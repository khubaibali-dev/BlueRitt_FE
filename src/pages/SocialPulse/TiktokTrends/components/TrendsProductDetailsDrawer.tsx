import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Layout, BarChart2, Share2, Heart, MessageCircle, Award, ChevronDown, ChevronUp } from "lucide-react";

interface TrendsProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    title: string;
    image: string;
    category: string;
    price: string;
    metrics: {
      ctr: string;
      cvr: string;
      cpa: string;
      impressions: string;
    };
  };
}

const TrendsProductDetailsDrawer: React.FC<TrendsProductDetailsDrawerProps> = ({ isOpen, onClose, product }) => {
  const [activeTab, setActiveTab] = useState<"Details" | "Analysis">("Details");
  const [isHashtagsExpanded, setIsHashtagsExpanded] = useState(true);
  const navigate = useNavigate();

  if (!product) return null;

  const handleDiscoverSupplier = () => {
    navigate("/explorer", {
      state: {
        product: {
          title: product.title,
          image: product.image,
          category: product.category,
          price: product.price,
        },
        autoSourceLink: true
      }
    });
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
                    <div className="product-img-badge !static shrink-0">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-[22px] font-black text-white">{product.price}</span>
                    <span className="product-img-badge">5.66 Views</span>
                  </div>
                </div>
              </div>
              <div className="border border-white/10" />
              {/* Engagement Stats */}
              <div className="space-y-4">
                <h5 className="text-[14px]  text-white tracking-tight">TikTok Engagement</h5>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: Award, label: "Posts", value: "253" },
                    { icon: Heart, label: "Likes", value: "125.0K" },
                    { icon: Share2, label: "Shares", value: "8.5K" },
                    { icon: MessageCircle, label: "Comments", value: "3.2K" }
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
                    { label: "CTR", value: product.metrics.ctr },
                    { label: "CVR", value: product.metrics.cvr },
                    { label: "CPA", value: product.metrics.cpa },
                    { label: "Impressions", value: product.metrics.impressions }
                  ].map((metric, i) => (
                    <div key={i} className="bg-[#04132B] border border-[#082656] rounded-[10px] p-3.5 flex flex-col justify-center">
                      <span className="product-metric-label block mb-2">{metric.label}</span>
                      <span className="product-metric-value block !text-[13px]">{metric.value}</span>
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
                    {['#lipsync', '#lipstick', '#lipcombo', '#lipgloss', '#wicked'].map((tag, i) => (
                      <span key={i} className="hashtag-pill !px-4 !py-2 !rounded-full text-[12px]">{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Demographics */}
              <div className="space-y-4 pb-4">
                <h5 className="text-[15px] font-bold text-white tracking-tight">Audience Insights</h5>
                <div className="bg-[#0E192B] border border-[#082656] rounded-[12px] p-5">
                  <h6 className="text-[13px] font-medium text-slate-300 mb-6">Age Demographics</h6>

                  <div className="space-y-4">
                    {[
                      { range: "25+", percentage: 39 },
                      { range: "18+", percentage: 33 },
                      { range: "35+", percentage: 16 },
                      { range: "45+", percentage: 7 },
                      { range: "55+", percentage: 5 }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <span className="text-[12px] font-bold text-slate-400 w-8">{item.range}</span>
                        <div className="h-4 bg-[#051125] rounded-full overflow-hidden flex-1 relative">
                          <div
                            className="h-full rounded-full absolute left-0 top-0 transition-all duration-1000"
                            style={{
                              width: `${item.percentage}%`,
                              background: "linear-gradient(90deg, #A7CFFF 0%, #FFFFFF 50%, #FF9E6F 100%)"
                            }}
                          />
                        </div>
                        <span className="text-[12px] font-bold text-[#6291DE] w-10 text-right">{item.percentage}%</span>
                      </div>
                    ))}
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
                      <Layout size={14} className="text-white" />
                    </div>
                    <div>
                      <span className="product-metric-label block">Sales</span>
                      <span className="product-metric-value block !text-[12px]">1,323</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="standard-icon-circle !w-8 !h-8 flex items-center justify-center ">
                      <Heart size={14} className="text-white" />
                    </div>
                    <div>
                      <span className="product-metric-label block">Ratings</span>
                      <span className="product-metric-value block !text-[12px]">4.3</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-white/10" />

              {/* Comparison Section */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-[15px] font-semibold text-white tracking-tight mt-4">TikTok Shop Analysis - {product.category}</h5>
                  <p className="text-[12px] text-[#9F9F9F]">Found <span className="text-orange-400 font-bold">10 products</span> with pricing and sales data</p>
                </div>

                <div className="space-y-10">
                  {/* Item 1: 4 Metrics */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h6 className="product-card-title !leading-tight truncate">{product.title}</h6>
                          <div className="trending-badge-standard !px-2 !py-0.5">
                             BY TIKTOK SHOP
                          </div>
                        </div>
                        <span className="product-price-primary !text-[16px]">${product.price.replace('$','')} <span className="text-[10px] text-[#9F9F9F] font-normal ml-1 uppercase tracking-widest">USD</span></span>
                      </div>
                    </div>
                    <div className="border border-white/10" />
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: "CTR", value: "2.18" },
                        { label: "CVR", value: "10.44" },
                        { label: "CPA", value: "$47.57" },
                        { label: "Impressions", value: "479.6K" }
                      ].map((m, idx) => (
                        <div key={idx} className="bg-[#04132B] border border-[#082656] rounded-lg p-3 flex flex-col justify-center min-h-[54px]">
                          <span className="product-metric-label block mb-1.5">{m.label}</span>
                          <span className="product-metric-value block !text-[12px]">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Item 2: 5 Metrics */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h6 className="product-card-title !leading-tight truncate">{product.title}</h6>
                          <div className="trending-badge-standard !px-2 !py-0.5">
                             BY TIKTOK SHOP
                          </div>
                        </div>
                        <span className="product-price-primary !text-[16px]">${product.price.replace('$','')} <span className="text-[10px] text-[#9F9F9F] font-normal ml-1 uppercase tracking-widest">USD</span></span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: "Sales", value: "3,658" },
                        { label: "Rating", value: "4.5" },
                        { label: "Reviews", value: "53" },
                        { label: "Ships From", value: "US" },
                        { label: "Shipping", value: "Free" }
                      ].map((m, idx) => (
                        <div key={idx} className="bg-[#04132B] border border-[#082656] rounded-lg p-3 flex flex-col justify-center min-h-[54px]">
                          <span className="product-metric-label block mb-1.5">{m.label}</span>
                          <span className="product-metric-value block !text-[12px]">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
