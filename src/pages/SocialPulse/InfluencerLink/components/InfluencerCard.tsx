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
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({
  name,
  followers,
  following,
  posts,
  bio,
  engagementRate,
  engagementLevel,
  image
}) => {
  return (
    <div className="bg-[#04132B] border border-[#082656] rounded-[24px] p-4 flex flex-col gap-8 hover:border-blue-500/30 transition-all duration-300 group shadow-lg">

      {/* 1. Profile Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-[85px] h-[85px] rounded-full overflow-hidden border-2 border-orange-500/20 shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            {/* Soft Glow behind profile */}
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full z-0" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[17px] font-bold text-white tracking-tight">{name}</h3>
            <span className="text-[13px] text-slate-400 font-medium">{followers} followers</span>
          </div>
        </div>
        <button className="text-blue-500 hover:text-blue-400 transition-colors mt-1 p-2">
          <ExternalLink size={18} />
        </button>
      </div>

      {/* 2. Bio */}
      <p className="text-[13px] text-slate-400 font-medium leading-[22px]">
        {bio}
      </p>

      {/* 3. Stats Grid (3 columns) */}
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-white">
            <Users size={14} className="opacity-70" />
            <span className="text-[12px]   tracking-wider">Followers</span>
          </div>
          <span className="text-[15px] font-black text-white">{followers}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-white">
            <UserPlus size={14} className="opacity-70" />
            <span className="text-[12px]  tracking-wider">Following</span>
          </div>
          <span className="text-[15px] font-black text-white">{following}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-white">
            <Eye size={14} className="opacity-70" />
            <span className="text-[12px]  tracking-wider">Posts</span>
          </div>
          <span className="text-[15px] font-black text-white">{posts}</span>
        </div>
      </div>

      {/* 4. Engagement Metric Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="quick-action-icon-circle !w-10 !h-10  shadow-lg">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-medium text-white  tracking-tight">Engagement Rate</span>
            <span className="text-[14px] font-black text-white leading-tight">{engagementRate}</span>
          </div>
        </div>
        <div className="px-3 py-0.4 rounded-full bg-white/10 border border-white/20">
          <span className="text-[12px]  text-[#FF5900]  tracking-tight">{engagementLevel}</span>
        </div>
      </div>

      {/* 5. CTA Button */}
      <button className="w-full h-[48px] 
      figma-pill-border !rounded-full flex items-center justify-center text-[13px] font-black text-white hover:bg-white/5 transition-all">
        View Endorsed Products
      </button>

    </div>
  );
};

export default InfluencerCard;
