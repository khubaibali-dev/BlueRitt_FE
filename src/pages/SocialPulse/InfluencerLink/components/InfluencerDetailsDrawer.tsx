import React from "react";
import { X, ExternalLink, Users, TrendingUp, Eye } from "lucide-react";

interface ProductItem {
  image: string;
  title: string;
}

interface InfluencerDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  influencer?: {
    name: string;
    followers: string;
    bio: string;
    image: string;
    following: string;
    posts: string;
    engagementRate: string;
  };
}

const mockProducts: ProductItem[] = [
  {
    image: "https://images.unsplash.com/photo-1594484208280-efa00f9e990c?auto=format&fit=crop&q=80&w=200",
    title: "JOICO Black Friday Favs"
  },
  {
    image: "https://images.unsplash.com/photo-1594484208280-efa00f9e990c?auto=format&fit=crop&q=80&w=200",
    title: "JOICO Black Friday Favs"
  },
  {
    image: "https://images.unsplash.com/photo-1594484208280-efa00f9e990c?auto=format&fit=crop&q=80&w=200",
    title: "JOICO Black Friday Favs"
  },
  {
    image: "https://images.unsplash.com/photo-1594484208280-efa00f9e990c?auto=format&fit=crop&q=80&w=200",
    title: "JOICO Black Friday Favs"
  },
  {
    image: "https://images.unsplash.com/photo-1594484208280-efa00f9e990c?auto=format&fit=crop&q=80&w=200",
    title: "JOICO Black Friday Favs"
  },
];

const InfluencerDetailsDrawer: React.FC<InfluencerDetailsDrawerProps> = ({ isOpen, onClose, influencer }) => {
  if (!influencer) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`filter-drawer-backdrop z-[100] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`filter-drawer-panel z-[110] w-full sm:!w-[680px] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* 1. Header */}
        <div className="p-6 border-b border-[#1C263C]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-white tracking-tight">Influencer Endorsed Products</h2>
              <p className="text-[14px] text-[#FFFFFF99]">All posted products</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full  text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar space-y-8">

          {/* 2. Influencer Info Row */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Profile with Gradient Border */}
                <div
                  className="p-[1px] rounded-full relative shadow-xl"
                  style={{ background: "linear-gradient(180deg, #FF5900 0%, #FF00FF 100%)" }}
                >
                  <div className="w-[84px] h-[84px] rounded-full overflow-hidden bg-[#04132B]">
                    <img src={influencer.image} alt={influencer.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-[17px] font-bold text-white tracking-tight">{influencer.name}</h3>
                  <span className="text-[13px] text-white">{influencer.followers} followers</span>
                </div>
              </div>

              <button className="text-blue-500 hover:text-blue-400 p-2 transition-all">
                <ExternalLink size={20} />
              </button>
            </div>

            <p className="text-[13px] text-[#FFFFFFB0] leading-[22px] max-w-md">
              {influencer.bio}
            </p>
          </div>

          <div className="h-[1px] bg-[#1C263C] w-full" />

          {/* 3. Stats Icons Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="quick-action-icon-circle !w-11 !h-11 shadow-lg border border-white/5">
                <Users size={20} className="text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="metric-label">Followers</span>
                <span className="text-[14px] font-bold text-white">{influencer.followers}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="quick-action-icon-circle !w-11 !h-11 shadow-lg border border-white/5">
                <TrendingUp size={20} className="text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="metric-label">Engagement</span>
                <span className="text-[14px] font-bold text-white">{influencer.engagementRate}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="quick-action-icon-circle !w-11 !h-11 shadow-lg border border-white/5">
                <Eye size={20} className="text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="metric-label">Views</span>
                <span className="text-[14px] font-bold text-white">8.5K</span>
              </div>
            </div>
          </div>

          {/* 4. Products List */}
          <div className="space-y-3">
            {mockProducts.map((product, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-[#04132B] border border-[#082656] rounded-[16px] hover:border-blue-500/20 transition-all group/item shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[56px] h-[56px] rounded-[12px] overflow-hidden border border-white/5">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-bold text-white tracking-tight leading-tight">{product.title}</h4>
                      <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 w-fit">
                        <span className="text-[11px] text-white tracking-wider">List</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2.5 px-4 h-[38px] rounded-full figma-pill-border text-white text-[13px] font-bold hover:bg-blue-500/10 transition-all hover:opacity-100">
                  View Product
                  <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default InfluencerDetailsDrawer;
