import React from "react";
import { Users, UserPlus, ExternalLink, Eye, TrendingUp } from "lucide-react";

interface InfluencerCardProps {
  name: string;
  followers: string;
  following: string;
  posts: string;
  bio: string;
  engagementRate: string;
  engagementLevel: string;
  image: string;
  profileLink: string;
  onViewDetails?: () => void;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  name,
  followers,
  following,
  posts,
  bio,
  engagementRate,
  engagementLevel,
  image,
  profileLink,
  onViewDetails
}) => {
  return (
    <div className="bg-white dark:bg-[#04132B] border border-brand-inputBorder dark:border-brand-inputBorder rounded-[24px] p-4 flex flex-col gap-8  transition-all duration-300 group ">

      {/* 1. Profile Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <div
              className="p-[1px] rounded-full relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-xl"
              style={{
                background: "linear-gradient(180deg, #FF5900 0%, #FF00FF 100%)"
              }}
            >
              <div className="w-[83px] h-[83px] rounded-full overflow-hidden bg-white dark:bg-[#04132B]">
                <img src={image} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Soft Glow behind profile */}
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full z-0" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="text-[17px] font-bold text-brand-textPrimary dark:text-white tracking-tight truncate">{name}</h3>
            <span className="text-[13px] text-brand-textSecondary dark:text-white">{followers} followers</span>
          </div>
        </div>
        <button
          onClick={() => window.open(profileLink, "_blank")}
          className="text-blue-500 hover:text-blue-400 transition-colors mt-1 p-2"
        >
          <ExternalLink size={18} />
        </button>
      </div>

      {/* 2. Bio */}
      <p className="text-[13px] text-brand-textSecondary dark:text-[#FFFFFFB0] leading-[22px] truncate">
        {bio}
      </p>

      {/* 3. Stats Grid (3 columns) */}
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-brand-textSecondary dark:text-white">
            <Users size={14} className="" />
            <span className="text-[12px] tracking-wider">Followers</span>
          </div>
          <span className="text-[15px] font-black text-brand-textPrimary dark:text-white">{followers}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-brand-textSecondary dark:text-white">
            <UserPlus size={14} className="" />
            <span className="text-[12px] tracking-wider">Following</span>
          </div>
          <span className="text-[15px] font-black text-brand-textPrimary dark:text-white">{following}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-brand-textSecondary dark:text-white">
            <Eye size={14} className="" />
            <span className="text-[12px] tracking-wider">Posts</span>
          </div>
          <span className="text-[15px] font-black text-brand-textPrimary dark:text-white">{posts}</span>
        </div>
      </div>

      {/* 4. Engagement Metric Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="quick-action-icon-circle !w-10 !h-10  bg-brand-hover dark:bg-white/10 hover:bg-brand-card transition-all">
            <TrendingUp size={18} className="text-brand-textPrimary dark:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-brand-textSecondary dark:text-white tracking-tight">Engagement Rate</span>
            <span className="text-[14px] font-black text-brand-textPrimary dark:text-white leading-tight">{engagementRate}</span>
          </div>
        </div>
        <div className="px-3 py-0.4 rounded-full bg-brand-hover dark:bg-white/10 border border-brand-border dark:border-white/20">
          <span className="text-[12px]  text-[#FF5900]  tracking-tight">{engagementLevel}</span>
        </div>
      </div>

      {/* 5. CTA Button */}
      <button
        onClick={onViewDetails}
        className="w-full h-[48px] figma-pill-border !rounded-full flex items-center justify-center text-[13px] font-black text-brand-textPrimary dark:text-white hover:bg-brand-hover dark:hover:bg-white/5 transition-all"
      >
        View Endorsed Products
      </button>

    </div>
  );
};

export default InfluencerCard;
