import { Info, Lock, Percent, TrendingUp } from 'lucide-react';

interface ResultPanelsProps {
  grossProfitUnit: string;
  totalGrossProfit: string;
  netProfitUnit: string;
  totalNetProfit: string;
  marginPerc: string;
  roiPerc: string;
  quantity: string;
  isAdvanced: boolean;
}

const ResultPanels: React.FC<ResultPanelsProps> = ({
  grossProfitUnit,
  totalGrossProfit,
  netProfitUnit,
  totalNetProfit,
  marginPerc,
  roiPerc,
  quantity,
  isAdvanced
}) => {
  const gradientStyle = { background: "linear-gradient(289.91deg, #155DFC -15.81%, rgba(233, 52, 113, 0.7) 49.09%, #E94424 85.09%)" };

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
        className="w-full rounded-[24px] p-7 text-white shadow-2xl relative overflow-hidden transition-all hover:scale-[1.01] min-h-[220px] flex flex-col"
        style={gradientStyle}
      >
        <button className="absolute top-6 right-6 text-white hover:text-white/80 transition-opacity">
          <Info size={24} strokeWidth={2.5} />
        </button>

        <h3 className="text-[16px] font-medium mb-2 tracking-wide opacity-90">
          {isAdvanced ? "Net Profit per Unit" : "Gross Profit per Unit"}
        </h3>
        <div className="text-[30px] sm:text-[48px] font-bold tracking-tighter leading-none mb-2 drop-shadow-sm">
          ${isAdvanced ? netProfitUnit : grossProfitUnit}
        </div>
        <div className="text-[13px] font-bold text-white mb-8 tracking-wide">
          Total: ${isAdvanced ? totalNetProfit : totalGrossProfit} <span className="mx-1.5 opacity-60">•</span> {quantity} units
        </div>

        <div className="flex gap-4">
          {/* Margin Box */}
          <div className="flex-1 bg-white/10 rounded-[18px] p-4 border border-white/20 backdrop-blur-md flex flex-col gap-1.5 items-start">
            <div className="flex items-center gap-1.5 opacity-80">
              <Percent size={12} strokeWidth={2.5} />
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Margin</span>
            </div>
            <span className="text-[22px] font-bold tracking-tight leading-none">{marginPerc}%</span>
          </div>
          {/* ROI Box */}
          <div className="flex-1 bg-white/10 rounded-[18px] p-4 border border-white/20 backdrop-blur-md flex flex-col gap-1.5 items-start">
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
        <div className="mt-0.5 shrink-0 text-slate-300">
          <Info size={16} />
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
          {isAdvanced
            ? "Net Profit = GP – Marketing, Graphics, Reviews, Additional costs, and Taxes."
            : "GP = Product Revenue – Product Sourcing Cost – Fulfillment Cost."
          }
        </p>
      </div>

      {/* Secondary Result Panel (Dimmable/Locked) */}
      <div
        className="w-full rounded-[24px] p-7 text-white shadow-2xl relative overflow-hidden transition-all flex flex-col min-h-[220px]"
        style={gradientStyle}
      >
        {/* Locked Overlay */}
        {!isAdvanced && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6 text-center">
            <div
              className="absolute inset-0 transition-all opacity-100"
              style={{ background: "#6462620D", backdropFilter: "blur(4.8px)" }}
            ></div>

            {/* Centered Text */}
            <span className="font-bold text-[18px] text-white tracking-wide relative z-30 drop-shadow-2xl">
              Upgrade to view this data
            </span>

            {/* Top Right Lock Icon (No BG, Gradient Color) */}
            <div className="absolute top-7 right-7 z-30 drop-shadow-lg">
              <Lock size={32} stroke="url(#lockIconGradient)" strokeWidth={2.5} className="relative z-10" />
              {/* Subtle outer glow for the icon to pop on colorful background */}
              <div className="absolute inset-0 blur-xl scale-125 opacity-30 bg-white invisible group-hover:visible"></div>
            </div>
          </div>
        )}

        {/* Content (Mirrors Primary Panel) */}
        <div className={!isAdvanced ? "opacity-40 pointer-events-none" : ""}>
          <h3 className="text-[16px] font-medium mb-2 tracking-wide opacity-80">
            {isAdvanced ? "Gross Profit per Unit" : "Net Profit per Unit"}
          </h3>
          <div className="text-[48px] sm:text-[56px] font-bold tracking-tighter leading-none mb-2 drop-shadow-sm">
            ${isAdvanced ? grossProfitUnit : "0.00"}
          </div>
          <div className="text-[13px] font-bold text-white mb-8 tracking-wide">
            Total: ${isAdvanced ? totalGrossProfit : "0.00"} <span className="mx-1.5 opacity-60">•</span> {quantity} units
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
        <div className="mt-0.5 shrink-0 text-slate-400">
          <Info size={16} />
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          {!isAdvanced
            ? "Net Profit = GP – Marketing, Graphics, Reviews, Additional costs, and Taxes."
            : "Gross Profit = Product Revenue – Product Sourcing Cost – Fulfillment Cost."
          }
        </p>
      </div>
    </div>
  );
};

export default ResultPanels;
