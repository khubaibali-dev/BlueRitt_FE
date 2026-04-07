import React, { useState, useEffect } from "react";
import { X, ExternalLink, Users, TrendingUp, Eye } from "lucide-react";
import { getInfluencerPosts, InfluencerPost } from "../../../../api/amazonTrends";

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

const InfluencerDetailsDrawer: React.FC<InfluencerDetailsDrawerProps> = ({ isOpen, onClose, influencer }) => {
  const [posts, setPosts] = useState<InfluencerPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!isOpen || !influencer?.name) return;

      setIsLoading(true);
      try {
        const response = await getInfluencerPosts({ influencer_name: influencer.name });
        if (response.status === "success" && response.data) {
          setPosts(response.data.posts || []);
        }
      } catch (error) {
        console.error("Error fetching influencer posts:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isOpen, influencer?.name]);

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
              <h2 className="text-[20px] font-bold text-brand-textPrimary dark:text-white tracking-tight">Influencer Endorsed Products</h2>
              <p className="text-[14px] text-brand-textSecondary dark:text-[#FFFFFF99]">All posted products</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-brand-textSecondary dark:text-white/70 hover:text-brand-textPrimary dark:hover:text-white hover:bg-brand-hover dark:hover:bg-white/5 transition-all"
            >
              <X size={20} className="text-brand-textPrimary dark:text-white" />
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
                  <div className="w-[84px] h-[84px] rounded-full overflow-hidden bg-white dark:bg-[#04132B]">
                    <img src={influencer.image} alt={influencer.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-[17px] font-bold text-brand-textPrimary dark:text-white tracking-tight">{influencer.name}</h3>
                  <span className="text-[13px] text-brand-textSecondary dark:text-white">{influencer.followers} followers</span>
                </div>
              </div>

              <button className="text-blue-500 hover:text-blue-400 p-2 transition-all">
                <ExternalLink size={20} />
              </button>
            </div>

            <p className="text-[13px] text-brand-textSecondary dark:text-[#FFFFFFB0] leading-[22px] max-w-md">
              {influencer.bio}
            </p>
          </div>

          <div className="h-[1px] bg-brand-border dark:bg-[#1C263C] w-full" />

          {/* 3. Stats Icons Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="quick-action-icon-circle !w-11 !h-11 shadow-lg border border-brand-border dark:border-white/5 bg-brand-hover dark:bg-transparent">
                <Users size={20} className="text-brand-textPrimary dark:text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="metric-label">Followers</span>
                <span className="text-[14px] font-bold text-brand-textPrimary dark:text-white">{influencer.followers}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="quick-action-icon-circle !w-11 !h-11 shadow-lg border border-brand-border dark:border-white/5 bg-brand-hover dark:bg-transparent">
                <TrendingUp size={20} className="text-brand-textPrimary dark:text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="metric-label">Engagement</span>
                <span className="text-[14px] font-bold text-brand-textPrimary dark:text-white">{influencer.engagementRate}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="quick-action-icon-circle !w-11 !h-11 shadow-lg border border-brand-border dark:border-white/5 bg-brand-hover dark:bg-transparent">
                <Eye size={20} className="text-brand-textPrimary dark:text-white" />
              </div>
              <div className="flex flex-col items-center">
                <span className="metric-label">Posts</span>
                <span className="text-[14px] font-bold text-brand-textPrimary dark:text-white">{influencer.posts}</span>
              </div>
            </div>
          </div>

          {/* 4. Products List */}
          <div className="space-y-3 pb-4">
            {isLoading ? (
              // 5x Skeleton Cards
              [...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-white dark:bg-[#04132B] border border-brand-border dark:border-[#082656] rounded-[16px] animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[56px] h-[56px] rounded-[12px] bg-white/5" />
                    <div className="flex flex-col gap-2.5 flex-1 min-w-[200px]">
                      <div className="h-4 w-3/4 bg-white/5 rounded-md" />
                      <div className="h-3 w-1/4 bg-white/5 rounded-full" />
                    </div>
                  </div>
                  <div className="w-24 h-[38px] rounded-full bg-white/5" />
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.map((post, idx) => (
                <div
                  key={post.post_id || idx}
                  className="flex items-center justify-between p-3.5 bg-white dark:bg-[#04132B] border border-brand-border dark:border-[#082656] rounded-[16px] hover:border-brand-primary dark:hover:border-blue-500/20 transition-all group/item "
                >
                  <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div className="w-[56px] h-[56px] rounded-[12px] overflow-hidden border border-white/5 shrink-0">
                      <img src={post.post_thumbnail} alt={post.post_title} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-bold text-brand-textPrimary dark:text-white tracking-tight leading-tight line-clamp-1">{post.post_title}</h4>
                        <div className="px-2 py-0.5 rounded-full bg-brand-hover dark:bg-white/5 border border-brand-border dark:border-white/10 w-fit shrink-0">
                          <span className="text-[11px] text-brand-textSecondary dark:text-white tracking-wider">{post.post_type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.open(post.post_url, "_blank")}
                    className="flex items-center gap-2.5 px-4 h-[38px] rounded-full figma-pill-border border-brand-border dark:border-none text-brand-textPrimary dark:text-white text-[13px] font-bold hover:bg-brand-hover dark:hover:bg-blue-500/10 transition-all hover:opacity-100 shrink-0 ml-4"
                  >
                    View Product
                    <ExternalLink size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-brand-textSecondary/40 dark:text-white/40 italic">No products found for this influencer.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default InfluencerDetailsDrawer;
