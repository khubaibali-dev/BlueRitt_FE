import { Info, Lock, Percent, TrendingUp } from 'lucide-react';
import Tooltip from '../../../components/common/Tooltip/Tooltip';

interface ResultPanelsProps {
  grossProfitUnit: string;
  totalGrossProfit: string;
  netProfitUnit: string;
  totalNetProfit: string;
  marginPerc: string;
  roiPerc: string;
  quantity: string;
  isAdvanced: boolean;
  hasGrossAccess?: boolean;
  hasNetAccess?: boolean;
}

const ResultPanels: React.FC<ResultPanelsProps> = ({
  grossProfitUnit,
  totalGrossProfit,
  netProfitUnit,
  totalNetProfit,
  marginPerc,
  roiPerc,
  quantity,
  isAdvanced,
  hasGrossAccess = true,
  hasNetAccess = true,
}) => {
  const gradientStyle = { background: "linear-gradient(289.91deg, #2e6cf3ff -15.81%, rgba(233, 52, 113, 0.7) 49.09%, #ec5030ff 85.09%)" };

  return (
    <div className="flex flex-col gap-5">
      {/* SVG Definition for Gradient Lock Icon */}
      <svg width="0" height="0" className="absolute invisible">
        <defs>
          <linearGradient id="lockIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="8.62%" stopColor="#6291DE" />
            <stop offset="73.56%" stopColor="#FF00AA" />
            <stop offset="138.5%" stopColor="#FF5900" />
          </linearGradient>
        </defs>
      </svg>

      {/* Primary Result Panel (Vibrant Gradient) */}
      <div
        className="w-full rounded-[24px] p-7 text-white relative transition-all hover:scale-[1.01] min-h-[220px] flex flex-col"
        style={gradientStyle}
      >
        <div className="absolute top-6 right-4">
          <Tooltip
            content={
              <div className="space-y-1.5">
                <p className="font-bold text-[12px] text-brand-primary">Input Costs & Prices — Let MarginMax Do the Rest</p>
                <p className="text-[11px] leading-relaxed opacity-90">Please input cost and price details so MarginMax can automatically calculate your profit at every step. Simulate pricing easily—know your profit, we will do the math!</p>
              </div>
            }
            width="300px"
            tooltipClassName="!left-auto !right-0 !translate-x-0"
          >
            <button className="text-white hover:text-white/80 transition-opacity">
              <Info size={24} strokeWidth={2.5} />
            </button>
          </Tooltip>
        </div>

        <h3 className="text-[16px] font-medium mb-2 tracking-wide opacity-90">
          {isAdvanced ? "Net Profit per Unit" : "Gross Profit per Unit"}
        </h3>

        {/* Locked Overlay for Primary Panel */}
        {((isAdvanced && !hasNetAccess) || (!isAdvanced && !hasGrossAccess)) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center rounded-[24px] overflow-hidden">
            <div className="absolute inset-0 bg-[#6462620D] backdrop-blur-[4.8px]"></div>
            <span className="font-bold text-[18px] text-white tracking-wide relative z-30 drop-shadow-2xl">
              Upgrade to view this data
            </span>
            <div className="absolute top-7 right-7 z-30 drop-shadow-lg">
              <Lock size={32} stroke="url(#lockIconGradient)" strokeWidth={2.5} className="relative z-10" />
            </div>
          </div>
        )}

        <div className={`text-[30px] sm:text-[48px] font-bold tracking-tighter leading-none mb-2 drop-shadow-sm ${((isAdvanced && !hasNetAccess) || (!isAdvanced && !hasGrossAccess)) ? 'opacity-20 blur-[2px]' : ''}`}>
          ${isAdvanced ? netProfitUnit : grossProfitUnit}
        </div>
        <div className={`text-[13px] font-bold text-white mb-8 tracking-wide ${((isAdvanced && !hasNetAccess) || (!isAdvanced && !hasGrossAccess)) ? 'opacity-20 blur-[2px]' : ''}`}>
          Total: ${isAdvanced ? totalNetProfit : totalGrossProfit} <span className="mx-1.5 opacity-60">•</span> {quantity} units
        </div>

        <div className="flex gap-4">
          {/* Margin Box */}
          <div className={`flex-1 bg-white/10 rounded-[18px] p-4 border border-white/20 backdrop-blur-md flex flex-col gap-1.5 items-start ${((isAdvanced && !hasNetAccess) || (!isAdvanced && !hasGrossAccess)) ? 'opacity-20 blur-[1px]' : ''}`}>
            <div className="flex items-center gap-1.5 opacity-80">
              <Percent size={12} strokeWidth={2.5} />
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Margin</span>
            </div>
            <span className="text-[22px] font-bold tracking-tight leading-none">{marginPerc}%</span>
          </div>
          {/* ROI Box */}
          <div className={`flex-1 bg-white/10 rounded-[18px] p-4 border border-white/20 backdrop-blur-md flex flex-col gap-1.5 items-start ${((isAdvanced && !hasNetAccess) || (!isAdvanced && !hasGrossAccess)) ? 'opacity-20 blur-[1px]' : ''}`}>
            <div className="flex items-center gap-1.5 opacity-80">
              <TrendingUp size={12} strokeWidth={2.5} />
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold">ROI</span>
            </div>
            <span className="text-[22px] font-bold tracking-tight leading-none">{roiPerc}%</span>
          </div>
        </div>
      </div>

      {/* Formula Description (Primary) */}
      <div className="flex items-start gap-3 px-2 mb-2">
        <Tooltip
          content={
            <div className="space-y-1.5">
              <p className="font-bold text-[12px] text-brand-primary text-left">Input Costs & Prices — Let MarginMax Do the Rest</p>
              <p className="text-[11px] leading-relaxed opacity-90 text-left">Please input cost and price details so MarginMax can automatically calculate your profit at every step. Simulate pricing easily—know your profit, we will do the math!</p>
            </div>
          }
          width="280px"
        >
          <div className="mt-0.5 shrink-0 text-brand-textSecondary cursor-help">
            <Info size={16} />
          </div>
        </Tooltip>
        <p className="text-[11px] text-brand-textSecondary leading-relaxed font-medium">
          {isAdvanced
            ? "Net Profit = GP – Marketing, Graphics, Reviews, Additional costs, and Taxes."
            : "GP = Product Revenue – Product Sourcing Cost – Fulfillment Cost."
          }
        </p>
      </div>

      {/* Secondary Result Panel - Hide entirely if in Basic mode and user has access */}
      {(!(!isAdvanced && hasNetAccess)) && (
        <>
          {/* Secondary Result Panel */}
          <div
            className="w-full rounded-[24px] p-7 text-white relative transition-all flex flex-col min-h-[220px]"
            style={gradientStyle}
          >
            {/* Locked Overlay for Secondary Panel - ONLY show if user does NOT have access to that data */}
            {((isAdvanced && !hasGrossAccess) || (!isAdvanced && !hasNetAccess)) && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center rounded-[24px] overflow-hidden">
                <div
                  className="absolute inset-0 transition-all opacity-100 rounded-[24px]"
                  style={{ background: "#6462620D", backdropFilter: "blur(4.8px)" }}
                ></div>

                {/* Centered Text */}
                <span className="font-bold text-[18px] text-white tracking-wide relative z-30 drop-shadow-2xl">
                  Upgrade to view this data
                </span>

                {/* Top Right Lock Icon */}
                <div className="absolute top-7 right-7 z-30 drop-shadow-lg">
                  <Lock size={32} stroke="url(#lockIconGradient)" strokeWidth={2.5} className="relative z-10" />
                </div>
              </div>
            )}

            {/* Content */}
            <div className={((!isAdvanced) || (isAdvanced && !hasGrossAccess)) ? "opacity-20 blur-[2px] pointer-events-none" : ""}>
              <h3 className="text-[16px] font-medium mb-2 tracking-wide opacity-80">
                {isAdvanced ? "Gross Profit per Unit" : "Net Profit per Unit"}
              </h3>
              <div className="text-[30px] sm:text-[48px] font-bold tracking-tighter leading-none mb-2 drop-shadow-sm">
                ${isAdvanced ? grossProfitUnit : netProfitUnit}
              </div>
              <div className="text-[13px] font-bold text-white mb-8 tracking-wide">
                Total: ${isAdvanced ? totalGrossProfit : totalNetProfit} <span className="mx-1.5 opacity-60">•</span> {quantity} units
              </div>

              <div className="flex gap-4">
                {/* Margin Box */}
                <div className="flex-1 bg-white/10 rounded-[18px] p-4 border border-white/20 backdrop-blur-md flex flex-col gap-1.5 items-start">
                  <div className="flex items-center gap-1.5 opacity-80 text-white">
                    <Percent size={12} strokeWidth={2.5} />
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Margin</span>
                  </div>
                  <span className="text-[22px] font-bold tracking-tight leading-none text-white">
                    {isAdvanced ? marginPerc : "0.0"}%
                  </span>
                </div>
                {/* ROI Box */}
                <div className="flex-1 bg-white/10 rounded-[18px] p-4 border border-white/20 backdrop-blur-md flex flex-col gap-1.5 items-start">
                  <div className="flex items-center gap-1.5 opacity-80 text-white">
                    <TrendingUp size={12} strokeWidth={2.5} />
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold">ROI</span>
                  </div>
                  <span className="text-[22px] font-bold tracking-tight leading-none text-white">
                    {isAdvanced ? roiPerc : "0.0"}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Description (Secondary) */}
          <div className="flex items-start gap-3 px-2">

            <div className="mt-0.5 shrink-0 text-brand-textSecondary cursor-help">
              <Info size={16} />
            </div>
            <p className="text-[11px] text-brand-textSecondary leading-relaxed font-medium">
              {!isAdvanced
                ? "Net Profit = GP – Marketing, Graphics, Reviews, Additional costs, and Taxes."
                : "Gross Profit = Product Revenue – Product Sourcing Cost – Fulfillment Cost."
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultPanels;
