import React from "react";
import { Activity, TrendingUp, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductProfitGaugesProps {
  grossProfitAmount: number | string;
  total_revenue?: number;
  netProfitAmount: number | string;
  grossProfitMargin: number | string;
  netProfitMargin: number | string;
  hasGrossAccess?: boolean;
  hasNetAccess?: boolean;
}

const LockedOverlay: React.FC<{ type: "Gross" | "Net" }> = ({ type }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[12px] overflow-hidden p-6">
      <div className="absolute inset-0 bg-white/30 dark:bg-black/40 backdrop-blur-[4px] border border-brand-inputBorder dark:border-white/10 rounded-[12px]" />
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 dark:bg-white/10 flex items-center justify-center mb-3 border border-brand-primary/20 dark:border-white/5">
          <Lock size={20} className="text-brand-primary dark:text-white" />
        </div>
        <h4 className="text-[16px] font-bold text-brand-textPrimary dark:text-white mb-1.5 leading-tight">
          Upgrade your package to access {type} Profit
        </h4>
        <p className="text-brand-textSecondary dark:text-white/60 text-[12px] mb-5 max-w-[210px] leading-relaxed">
          Get access to detailed profit calculations and analytics

        </p>
        <button
          onClick={() => navigate("/settings?tab=plan")}
          className="bg-brand-gradient hover:brightness-110 text-white px-6 py-2 rounded-full text-[12px] font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-brand-primary/20"
        >
          <ArrowRight size={14} />
          Update Subscription
        </button>
      </div>
    </div>
  );
};

const ProductProfitGauges: React.FC<ProductProfitGaugesProps> = ({
  grossProfitAmount,
  netProfitAmount,
  grossProfitMargin,
  netProfitMargin,
  hasGrossAccess = true,
  hasNetAccess = true,
}) => {
  // Margin % — drives the fill (same as ListingDetail: Gauge value = gross_profit %)
  const grossMarginNum = parseFloat(grossProfitMargin.toString()) || 0;
  const netMarginNum   = parseFloat(netProfitMargin.toString())   || 0;

  const grossClamped = Math.min((grossMarginNum - 0) / (100 - 0), 1);
  const netClamped = Math.min((netMarginNum - 0) / (100 - 0), 1);

  const circumference = 251.32;

  // strokeDashoffset = circumference * (1 - clampedPercentage)
  const grossOffset = hasGrossAccess ? circumference * (1 - grossClamped) : circumference;
  const netOffset = hasNetAccess ? circumference * (1 - netClamped) : circumference;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 sm:mb-10">
      {/* Gross Profit Card */}
      <div className="relative group overflow-hidden rounded-[12px]">
        {!hasGrossAccess && <LockedOverlay type="Gross" />}
        <div className={`analysis-card-box p-4 flex flex-col relative h-[320px] transition-all border group ${!hasGrossAccess ? 'blur-[0.5px] opacity-95' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className={`quick-action-icon-circle !h-10 !w-10 text-white dark:text-white bg-blue-500 ${!hasGrossAccess ? 'opacity-50' : ''}`}>
                <Activity size={22} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col !gap-0">
                <span className="analysis-metric-label">Gross Profit</span>
                <span className="analysis-metric-value">${hasGrossAccess ? (typeof grossProfitAmount === 'number' ? grossProfitAmount.toFixed(2) : grossProfitAmount) : "0.00"}</span>
              </div>
            </div>
            <span className={`text-[24px] font-black text-blue-500 ${!hasGrossAccess ? 'opacity-50' : ''}`}>{hasGrossAccess ? grossMarginNum.toFixed(2) : "0.00"}%</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="currentColor" className="text-slate-100 dark:text-white/10" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={grossOffset}
                  strokeLinecap="round"
                  className={`text-blue-500 transition-all duration-1000 ${!hasGrossAccess ? 'opacity-30' : ''}`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-[28px] font-black ${!hasGrossAccess ? 'opacity-30' : ''}`}>{hasGrossAccess ? Math.round(grossMarginNum) : "0"}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Net Profit Card */}
      <div className="relative group overflow-hidden rounded-[12px]">
        {!hasNetAccess && <LockedOverlay type="Net" />}
        <div className={`analysis-card-box p-4 flex flex-col relative h-[320px] transition-all hover:border-purple-500/20 group ${!hasNetAccess ? 'blur-[0.5px] opacity-95' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className={`quick-action-icon-circle !h-10 !w-10 text-white dark:text-white bg-purple-600 ${!hasNetAccess ? 'opacity-50' : ''}`}>
                <TrendingUp size={22} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col !gap-0">
                <span className="analysis-metric-label">Net Profit</span>
                <span className="analysis-metric-value">${hasNetAccess ? (typeof netProfitAmount === 'number' ? netProfitAmount.toFixed(2) : netProfitAmount) : "0.00"}</span>
              </div>
            </div>
            <span className={`text-[24px] font-black text-blue-500/80 ${!hasNetAccess ? 'opacity-50' : ''}`}>{hasNetAccess ? netMarginNum.toFixed(2) : "0.00"}%</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" stroke="currentColor" className="text-slate-100 dark:text-white/10" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={netOffset}
                  strokeLinecap="round"
                  className={`text-blue-600 transition-all duration-1000 ${!hasNetAccess ? 'opacity-30' : ''}`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-[28px] font-black ${!hasNetAccess ? 'opacity-30' : ''}`}>{hasNetAccess ? Math.round(netMarginNum) : "0"}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductProfitGauges;
