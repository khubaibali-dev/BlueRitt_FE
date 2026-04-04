import React from "react";
import { Activity, TrendingUp } from "lucide-react";

interface ProductProfitGaugesProps {
  grossProfitAmount: string;
  netProfitAmount: string;
  grossProfitMargin: string;
  netProfitMargin: string;
}

const ProductProfitGauges: React.FC<ProductProfitGaugesProps> = ({
  grossProfitAmount,
  netProfitAmount,
  grossProfitMargin,
  netProfitMargin,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-10">
      {/* Gross Profit Card */}
      <div className="analysis-card-box p-4 flex flex-col relative h-[320px] transition-all hover:border-blue-500/20 group">
        <div className="flex items-start justify-between mb-2 ">
          <div className="flex items-center gap-4">
            <div className="quick-action-icon-circle !h-10 !w-10 text-white">
              <Activity size={22} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col !gap-0">
              <span className="analysis-metric-label">Gross Profit</span>
              <span className="analysis-metric-value">${grossProfitAmount || "0.00"}</span>
            </div>
          </div>
          <span className="text-[24px] font-black text-blue-500">{grossProfitMargin || "0.00"}%</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.32"
                strokeDashoffset={251.32 - (251.32 * (Math.max(0, parseFloat(grossProfitMargin) || 0)) / 100)}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[28px]  text-white">{Math.round(Math.max(0, parseFloat(grossProfitMargin) || 0))}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Net Profit Card */}
      <div className="analysis-card-box p-4 flex flex-col relative h-[320px] transition-all hover:border-purple-500/20 group">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="quick-action-icon-circle !h-10 !w-10 text-white">
              <TrendingUp size={22} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col !gap-0">
              <span className="analysis-metric-label">Net Profit</span>
              <span className="analysis-metric-value">${netProfitAmount || "0.00"}</span>
            </div>
          </div>
          <span className="text-[24px] font-black text-blue-500/80">{netProfitMargin || "0.00"}%</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.32"
                strokeDashoffset={251.32 - (251.32 * (Math.max(0, parseFloat(netProfitMargin) || 0)) / 100)}
                strokeLinecap="round"
                className="text-blue-600 transition-all duration-1000"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[28px]  text-white">{Math.round(Math.max(0, parseFloat(netProfitMargin) || 0))}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProfitGauges;
