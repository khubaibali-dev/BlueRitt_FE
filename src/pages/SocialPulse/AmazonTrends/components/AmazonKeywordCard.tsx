import React from "react";
import { TrendingUp, Award, Search, Zap } from "lucide-react";

interface AmazonKeywordCardProps {
  keyword: string;
  rank: number;
}

const AmazonKeywordCard: React.FC<AmazonKeywordCardProps> = ({ keyword, rank }) => {
  return (
    <div className="flex items-center justify-between p-5 rounded-[20px] bg-[#04132B] border border-[#082656] group hover:border-orange-500/30 transition-all duration-300 shadow-xl hover:shadow-orange-500/5">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#081421] border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
          {rank === 1 ? (
            <Award size={20} className="text-[#FFD700]" />
          ) : rank <= 3 ? (
            <TrendingUp size={18} className="text-orange-500" />
          ) : (
            <Search size={18} className="text-slate-500" />
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-black text-orange-500 uppercase tracking-widest">
              RANK #{rank}
            </span>
            {rank <= 3 && (
              <div className="bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 flex items-center gap-1">
                <Zap size={10} fill="#F05A2B" className="text-orange-500" />
                <span className="text-[9px] font-black text-orange-500 uppercase tracking-tight">Hot</span>
              </div>
            )}
          </div>
          <h4 className="text-[16px] font-bold text-white group-hover:text-orange-500 transition-colors">
            {keyword}
          </h4>
        </div>
      </div>

      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all active:scale-95">
        <TrendingUp size={18} />
      </button>
    </div>
  );
};

export default AmazonKeywordCard;
