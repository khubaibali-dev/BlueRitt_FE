import React, { useState } from "react";
import { Search, Info, Crown } from "lucide-react";
import InfluencerHeader from "./components/InfluencerHeader";
import InfluencerCard from "./components/InfluencerCard";
import InfluencerDetailsDrawer from "./components/InfluencerDetailsDrawer";

import influencerBanner from "../../../assets/images/tiktoktrends.png";

const mockInfluencerData = [
  {
    name: "Marcus Johnson",
    followers: "89.0K",
    following: "12.3K",
    posts: "42.0K",
    bio: "Lifestyle content creator sharing daily inspiration and wellness tips with a global community.",
    engagementRate: "12.3%",
    engagementLevel: "Excellent",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sarah Chen",
    followers: "124.5K",
    following: "1.1K",
    posts: "1.2K",
    bio: "Tech enthusiast and software engineer exploring the intersection of AI and human creativity.",
    engagementRate: "8.7%",
    engagementLevel: "High",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Elena Rodriguez",
    followers: "45.2K",
    following: "890",
    posts: "3.4K",
    bio: "Travel photographer capturing hidden gems around the Mediterranean and Southeast Asia.",
    engagementRate: "15.4%",
    engagementLevel: "Excellent",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  }
];

const InfluencerLink: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for influencer:", searchQuery);
  };

  const openDrawer = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-brand-card-alt rounded-[32px] relative shadow-2xl overflow-hidden flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-700 pb-4">

      {/* 1. Header & Search Banner Area */}
      <section className="tiktok-banner-wrapper relative isolate min-h-[480px]">
        {/* Background Layer (Absolute) */}
        <div className="absolute inset-0 z-[-1]">
          <img src={influencerBanner} alt="" className="tiktok-banner-image opacity-60" />
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/20 to-transparent pointer-events-none" />
        </div>

        <div className="w-full max-w-[1240px] z-10 flex flex-col items-start px-6 sm:px-2">
          {/* 1. Module Heading */}
          <InfluencerHeader
            title="Discover Influencers"
            subtitle="Connect with verified creators and explore their endorsed products"
          />

          {/* 2. Search Area */}
          <div className="w-full space-y-5">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-3 w-full">
              {/* Search Input Container */}
              <div
                className="flex-1 w-full figma-rect-border group overflow-hidden relative transition-all border-[#082656] focus-within:border-orange-500/50 shadow-[0px_10px_15px_-3px_#0000000D] bg-[#FFFFFF0D] backdrop-blur-[19.4px]"
              >
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-white transition-colors">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search influencers by name or bio..."
                  className="w-full bg-transparent py-4 pl-14 pr-6 text-white text-[15px] placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <button type="submit" className="upgrade-gradient-btn !px-6 !rounded-[14px] whitespace-nowrap h-[54px] w-full sm:w-auto flex items-center justify-center gap-2">
                  <Search size={18} />
                  Find Top Talent
                </button>
              </div>
            </form>

            {/* Upgrade Hint Text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-1 w-full max-w-3xl mb-12">
              <div className="flex items-center gap-2 text-[14px] text-[#FFFFFF99]">
                <Info size={24} className="text-white" />
                <span className="text-[14px] leading-none">
                  You can view up to <span className="font-black text-[#FF5900]">50</span> influencers • All Posted Products
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                <button className="text-[14px] text-[#FF5900] hover:text-orange-300 transition-all text-left underline">
                  Upgrade to view more influencers
                </button>
              </div>
            </div>

            {/* Top Picks Section (Moved to Header Area) */}
            <div className="space-y-8 w-full mt-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-[20px]  text-white tracking-tight flex items-center gap-2">

                  Top Picks
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockInfluencerData.map((influencer, i) => (
                  <InfluencerCard 
                    key={`top-${i}`} 
                    {...influencer} 
                    onViewDetails={() => openDrawer(influencer)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Sections Area */}
      <div className="px-6 sm:px-10 mt-12 z-20 space-y-16 pb-10 shadow-2xl">

        {/* All Influencers Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-1 border-b border-[#082656] pb-4">
            <h2 className="text-[20px] font-bold text-white tracking-tight">
              All Influencers
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {/* Repeating mock for visual density */}
            {[...mockInfluencerData, ...mockInfluencerData].map((influencer, i) => (
              <InfluencerCard 
                key={`all-${i}`} 
                {...influencer} 
                onViewDetails={() => openDrawer(influencer)}
              />
            ))}
          </div>
        </div>

        {/* Pagination / Upgrade Action */}
        <div className="flex flex-col items-center justify-center pt-8 gap-10">
          <div className="w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#082656] to-transparent" />
          <button className="upgrade-gradient-btn !px-10 !h-[50px] !rounded-full shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all">
            <Crown size={18} />
            Upgrade to see more
          </button>
        </div>

      </div>

      <InfluencerDetailsDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        influencer={selectedInfluencer}
      />
    </div>
  );
};

export default InfluencerLink;
