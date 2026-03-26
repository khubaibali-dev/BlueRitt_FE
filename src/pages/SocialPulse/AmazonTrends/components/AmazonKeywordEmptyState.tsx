import React from "react";
import { TrendingUp } from "lucide-react";

const AmazonKeywordEmptyState: React.FC = () => {
  return (
    <div className="w-full min-h-[440px] bg-[#04132B] border border-[#082656] rounded-[24px] flex flex-col items-center justify-center p-12 relative overflow-hidden group shadow-2xl">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none" />

      {/* Analytics Icon with Gradient Circle */}
      <div className="relative mb-8">
        <div className="!w-[72px] !h-[72px] rounded-full quick-action-icon-circle p-[1.5px] flex items-center justify-center shadow-2xl">
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <TrendingUp className="text-white group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center gap-3 max-w-[500px]">
        <h2 className="text-[20px] sm:text-[24px] text-white tracking-tight flex items-center gap-2 font-bold">
          Turn Amazon Trends Profitable
        </h2>
        <p className="text-[16px] text-slate-500 font-medium leading-relaxed max-w-[460px]">
          Enter a seed keyword and click "Analyze Search Volume" to discover high-converting terms and untapped market potential
        </p>
      </div>
    </div>
  );
};

export default AmazonKeywordEmptyState;
