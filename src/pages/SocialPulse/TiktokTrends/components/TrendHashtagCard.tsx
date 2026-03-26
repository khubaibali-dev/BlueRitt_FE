import React from "react";

interface TrendHashtagCardProps {
  hashtag: string;
  rank: number;
}

const TrendHashtagCard: React.FC<TrendHashtagCardProps> = ({ hashtag, rank }) => {
  return (
    <div className="bg-[#04132B] border border-[#082656] rounded-xl p-3 hover:border-blue-500/30 transition-all group">
      <h4 className="text-[17px] font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        #{hashtag.replace(/^#/, "")}
      </h4>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-slate-500">Rank:</span>
        <span className="text-[13px] font-bold text-blue-500/80">#{rank}</span>
      </div>
    </div>
  );
};

export default TrendHashtagCard;
