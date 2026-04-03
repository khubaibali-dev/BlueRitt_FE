import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, Info, Users, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Crown } from "lucide-react";
import InfluencerHeader from "./components/InfluencerHeader";
import InfluencerCard from "./components/InfluencerCard";
import InfluencerDetailsDrawer from "./components/InfluencerDetailsDrawer";

import influencerBanner from "../../../assets/images/tiktoktrends.png";
import { MANUAL_INFLUENCERS } from "../../../utils/infuluencers";

const InfluencerLink: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any>(null);

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
    if (!searchQuery.trim()) return mappedInfluencers;
    const query = searchQuery.toLowerCase();
    return mappedInfluencers.filter(
      inf => inf.name.toLowerCase().includes(query) || inf.bio.toLowerCase().includes(query)
    );
  }, [searchQuery, mappedInfluencers]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredInfluencers.length / influencersPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

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

  const topPicks = useMemo(() => mappedInfluencers.slice(0, 3), [mappedInfluencers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const openDrawer = (influencer: any) => {
    setSelectedInfluencer(influencer);
    setIsDrawerOpen(true);
  };

  const pageNumbers = getPageNumbers();

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

            {/* Top Picks Section - Only show when NOT searching */}
            {!searchQuery && (
              <div className="space-y-8 w-full mt-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[20px]  text-white tracking-tight flex items-center gap-2">
                    Top Picks
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {topPicks.map((influencer) => (
                    <InfluencerCard
                      key={`top-${influencer.name}`}
                      {...influencer}
                      onViewDetails={() => openDrawer(influencer)}
                    />
                  ))}
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
          <div className="flex items-center justify-between px-1 border-b border-[#082656] pb-4">
            <h2 className="text-[20px] font-bold text-white tracking-tight">
              {searchQuery ? `Search Results (${filteredInfluencers.length})` : "All Influencers"}
            </h2>
          </div>

          {currentPagedInfluencers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {currentPagedInfluencers.map((influencer) => (
                <InfluencerCard
                  key={`all-${influencer.name}`}
                  {...influencer}
                  onViewDetails={() => openDrawer(influencer)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-[#FFFFFF05] rounded-[24px] border border-[#082656]">
              <Users size={48} className="mx-auto mb-4 text-[#FFFFFF33]" />
              <h3 className="text-white text-[18px] font-bold mb-2">No influencers found</h3>
              <p className="text-[#FFFFFF66] text-[14px]">Try searching for a different name or keyword.</p>
            </div>
          )}
        </div>

        {/* Pagination Section (Numerical style) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8 pb-4">
            {/* First Page */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-[10px] bg-[#04132B] border border-[#082656] flex items-center justify-center text-white/70 hover:bg-[#082656] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsLeft size={16} />
            </button>

            {/* Previous */}
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-[10px] bg-[#04132B] border border-[#082656] flex items-center justify-center text-white/70 hover:bg-[#082656] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((page, idx) => (
              <button
                key={idx}
                onClick={() => typeof page === "number" && handlePageChange(page)}
                disabled={page === "..."}
                className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-[14px] font-bold transition-all
                  ${page === currentPage
                    ? "bg-[#3B82F6] text-white border border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : page === "..."
                      ? "text-white/40 cursor-default"
                      : "bg-[#04132B] border border-[#082656] text-white/70 hover:bg-[#082656] hover:text-white"}`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-[10px] bg-[#04132B] border border-[#082656] flex items-center justify-center text-white/70 hover:bg-[#082656] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>

            {/* Last Page */}
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-[10px] bg-[#04132B] border border-[#082656] flex items-center justify-center text-white/70 hover:bg-[#082656] hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        )}

        {/* Upgrade Action Footer */}
        <div className="flex flex-col items-center justify-center pt-2 gap-4">
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
