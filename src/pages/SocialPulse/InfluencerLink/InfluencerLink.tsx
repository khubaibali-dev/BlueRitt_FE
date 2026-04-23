import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Info, Users, Crown } from "lucide-react";
import InfluencerHeader from "./components/InfluencerHeader";
import InfluencerCard from "../../../components/common/SpkCards/InfluencerCard";
import InfluencerDetailsDrawer from "./components/InfluencerDetailsDrawer";

import influencerBanner from "../../../assets/images/tiktoktrends.png";
import influencerBannerLight from "../../../assets/images/SocialPulse-light.png";
import { MANUAL_INFLUENCERS } from "../../../utils/infuluencers";
import { useUserDetails } from "../../../hooks/useUserDetails";

import Pagination from "../../../components/common/Pagination/Pagination";

const InfluencerLink: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);
  const { data: userDetails } = useUserDetails();

  const userPlan = userDetails?.subscription_status?.package?.slug?.toLowerCase() || "trial";

  const influencerLimit = useMemo(() => {
    // Robust detection for prepaid/one-time tiers
    if (userPlan.includes("premium")) return Infinity;
    if (userPlan.includes("advance")) return 50;
    if (userPlan.includes("basic")) return 10;
    return 10; // Default to trial
  }, [userPlan]);

  const influencersPerPage = 12;
  const listTopRef = useRef<HTMLDivElement>(null);

  const getEngagementLevel = (rate: number) => {
    if (rate >= 5) return "Excellent";
    if (rate >= 3) return "High";
    return "Good";
  };

  // 1. Data Mapping Layer
  const mappedInfluencers = useMemo(() => {
    return MANUAL_INFLUENCERS.map(inf => ({
      name: inf.influencer_name,
      followers: inf.followers || "0",
      following: inf.following || "0",
      posts: inf.post_count || "0",
      bio: inf.bio || "No bio available",
      engagementRate: `${inf.engagement_rate}%`,
      engagementLevel: getEngagementLevel(inf.engagement_rate || 0),
      image: inf.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(inf.influencer_name)}&background=random&size=400`,
      verified: inf.verified,
      profileLink: inf.profile_link
    }));
  }, []);

  // 2. Search Logic
  const filteredInfluencers = useMemo(() => {
    let result = mappedInfluencers;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = mappedInfluencers.filter(
        (inf) => inf.name.toLowerCase().includes(query) || inf.bio.toLowerCase().includes(query)
      );
    }
    return result;
  }, [searchQuery, mappedInfluencers]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredInfluencers.length / influencersPerPage);

  const currentPagedInfluencers = useMemo(() => {
    const start = (currentPage - 1) * influencersPerPage;
    return filteredInfluencers.slice(start, start + influencersPerPage);
  }, [filteredInfluencers, currentPage]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Scroll to top of list on page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const topPicks = useMemo(() => {
    // Helper function to parse follower strings like '1.5M' or '500K' into numbers
    const parseFollowers = (val: string | number) => {
      if (typeof val === 'number') return val;
      const str = String(val).toUpperCase();
      const num = parseFloat(str.replace(/[^0-9.]/g, ''));
      if (str.includes('M')) return num * 1000000;
      if (str.includes('K')) return num * 1000;
      return num;
    };

    return [...mappedInfluencers]
      .sort((a, b) => parseFollowers(b.followers) - parseFollowers(a.followers))
      .slice(0, 3);
  }, [mappedInfluencers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openDrawer = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setIsDrawerOpen(true);
  };


  return (
    <div className="bg-brand-card-alt rounded-[32px] relative overflow-hidden flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-700">

      {/* 1. Header & Search Banner Area */}
      <section className="tiktok-banner-wrapper relative isolate min-h-[480px]">
        {/* Background Layer (Absolute) */}
        <div className="absolute inset-0 z-[-1]">
          <img src={influencerBanner} alt="" className="tiktok-banner-image opacity-60 hidden dark:block" />
          <img src={influencerBannerLight} alt="" className="tiktok-banner-image opacity-100 block dark:hidden" />
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/20 to-transparent pointer-events-none" />
        </div>

        <div className="w-full max-w-[1240px] z-10 flex flex-col items-start px-1 sm:px-0">
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
                className="flex-1 w-full figma-rect-border group overflow-hidden relative transition-all border-brand-border dark:border-brand-border focus-within:border-orange-500/50 shadow-[0px_10px_15px_-3px_#0000000D] bg-white dark:bg-[#FFFFFF0D] backdrop-blur-[19.4px]"
              >
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search influencers by name or bio..."
                  className="w-full bg-transparent py-4 pl-14 pr-6 text-brand-textPrimary dark:text-white text-[15px] placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => navigate("/settings?tab=plan")}
                  className="upgrade-gradient-btn !px-6 !rounded-[14px] whitespace-nowrap h-[54px] w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Crown size={18} />
                  Upgrade Plan
                </button>
              </div>
            </form>

            {/* Upgrade Hint Text */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-1 w-full max-w-3xl mb-12">
              <div className="flex items-center gap-2 text-[14px] text-brand-textSecondary dark:text-[#FFFFFF99]">
                <Info size={24} className="text-brand-textPrimary dark:text-white" />
                <span className="text-[14px] leading-none">
                  You can view up to <span className="font-black text-[#FF5900]">{influencerLimit === Infinity ? "Unlimited" : influencerLimit}</span> influencers • All Posted Products
                </span>
                {userPlan !== "premium" && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                    <button
                      onClick={() => navigate("/settings?tab=plan")}
                      className="text-[14px] text-[#FF5900] hover:text-orange-300 transition-all text-left underline border-none bg-transparent cursor-pointer"
                    >
                      Upgrade to view more influencers
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Top Picks Section - Only show when NOT searching */}
            {!searchQuery && (
              <div className="space-y-8 w-full mt-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[20px] text-brand-textPrimary dark:text-white tracking-tight flex items-center gap-2">
                    Top Picks
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {topPicks.map((influencer, index) => {
                    const isLocked = index >= influencerLimit;
                    return (
                      <InfluencerCard
                        key={`top-${influencer.name}`}
                        {...influencer}
                        isLocked={isLocked}
                        onUpgrade={() => navigate("/settings?tab=plan")}
                        onViewDetails={() => !isLocked && openDrawer(influencer)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Content Sections Area */}
      <div className="px-6 sm:px-10 mt-12 z-20 space-y-16 pb-10 shadow-2xl" ref={listTopRef}>

        {/* All Influencers Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-1 border-b border-brand-border dark:border-brand-border pb-4">
            <h2 className="text-[20px] font-bold text-brand-textPrimary dark:text-white tracking-tight">
              {searchQuery ? `Search Results (${filteredInfluencers.length})` : "All Influencers"}
            </h2>
          </div>

          {currentPagedInfluencers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {currentPagedInfluencers.map((influencer, index) => {
                const globalIndex = (currentPage - 1) * influencersPerPage + index;
                const isLocked = globalIndex >= influencerLimit;
                return (
                  <InfluencerCard
                    key={`all-${influencer.name}`}
                    {...influencer}
                    isLocked={isLocked}
                    onUpgrade={() => navigate("/settings?tab=plan")}
                    onViewDetails={() => !isLocked && openDrawer(influencer)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-brand-card-alt dark:bg-[#FFFFFF05] rounded-[24px] border border-brand-border dark:border-brand-border">
              <Users size={48} className="mx-auto mb-4 text-brand-textSecondary/30 dark:text-[#FFFFFF33]" />
              <h3 className="text-brand-textPrimary dark:text-white text-[18px] font-bold mb-2">No influencers found</h3>
              <p className="text-brand-textSecondary dark:text-[#FFFFFF66] text-[14px]">Try searching for a different name or keyword.</p>
            </div>
          )}
        </div>

        {/* Pagination Section (Numerical style) */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Upgrade Action Footer */}
        {userPlan !== "premium" && (
          <div className="flex flex-col items-center justify-center pt-2 gap-4">
            <div className="w-full max-w-[200px] h-[1px] bg-gradient-to-r from-transparent via-[#082656] to-transparent" />
            <button
              onClick={() => navigate("/settings?tab=plan")}
              className="upgrade-gradient-btn !px-10 !h-[50px] !rounded-full shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all"
            >
              <Crown size={18} />
              Upgrade to see more
            </button>
          </div>
        )}

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
