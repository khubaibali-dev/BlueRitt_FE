import React from 'react';
import { Info, Lock } from 'lucide-react';

interface ResultPanelsProps {
  grossProfitUnit: string;
  totalGrossProfit: string;
  marginPerc: string;
  roiPerc: string;
  quantity: string;
}

const ResultPanels: React.FC<ResultPanelsProps> = ({ 
  grossProfitUnit, 
  totalGrossProfit, 
  marginPerc, 
  roiPerc,
  quantity 
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Gross Profit Panel */}
      <div 
        className="w-full rounded-[24px] p-6 text-white shadow-2xl relative overflow-hidden transition-all hover:scale-[1.02]"
        style={{ background: "linear-gradient(135deg, #FF5900 0%, #840765 100%)" }}
      >
        <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors">
          <Info size={18} />
        </button>
        
        <h3 className="text-[15px] font-medium mb-1 shrink-0">Gross Profit per Unit</h3>
        <div className="text-[40px] sm:text-[48px] font-bold tracking-tight leading-none mb-1">
          ${grossProfitUnit}
        </div>
        <div className="text-[11px] font-medium text-white/80 mb-6 tracking-wide">
          Total: ${totalGrossProfit} • {quantity} units
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-xl p-3 border border-white/20 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-wider text-white/80 mb-1 block">% Margin</span>
            <span className="text-[20px] font-bold tracking-tight">{marginPerc}%</span>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 border border-white/20 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-wider text-white/80 mb-1 block">% ROI</span>
            <span className="text-[20px] font-bold tracking-tight">{roiPerc}%</span>
          </div>
        </div>
      </div>
      
      {/* GP Formula Description */}
      <div className="flex items-start gap-2.5 px-1 mb-2">
        <div className="mt-0.5 shrink-0 text-slate-400">
          <Info size={14} />
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          GP = Product Revenue – Product Sourcing Cost – Fulfillment Cost.
        </p>
      </div>

      {/* Net Profit Panel (Locked State) */}
      <div className="w-full rounded-[24px] p-6 text-white shadow-2xl relative overflow-hidden bg-[#1A1829] border border-[#2D2342] group cursor-pointer">
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-[#0E0C1B]/50 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center transition-all group-hover:bg-[#0E0C1B]/40">
           <span className="font-bold text-[15px] text-white tracking-wide shadow-black drop-shadow-lg shadow-sm">Upgrade to view this data</span>
        </div>

        <button className="absolute top-5 right-5 text-[#E73986] z-20 transition-transform group-hover:scale-110">
          <Lock size={20} />
        </button>
        
        {/* Dim content behind blur */}
        <div className="opacity-40 pointer-events-none select-none">
          <h3 className="text-[15px] font-medium mb-1 text-slate-300">Net Profit per Unit</h3>
          <div className="text-[40px] sm:text-[48px] font-bold tracking-tight leading-none mb-1 text-slate-300">
            $0.00
          </div>
          <div className="text-[11px] font-medium text-slate-400 mb-6 tracking-wide">
            Total: $0.00 • {quantity} units
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1 bg-[#231E3B] rounded-xl p-3 border border-[#3A3258]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 block">% Margin</span>
              <span className="text-[20px] font-bold text-slate-300 tracking-tight">0.0%</span>
            </div>
            <div className="flex-1 bg-[#231E3B] rounded-xl p-3 border border-[#3A3258]">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 block">% ROI</span>
              <span className="text-[20px] font-bold text-slate-300 tracking-tight">0.0%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* NP Formula Description */}
      <div className="flex items-start gap-2.5 px-1">
        <div className="mt-0.5 shrink-0 text-slate-400">
           <Info size={14} />
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
          Net Profit = GP – Marketing, Graphics, Reviews, Additional costs, and Taxes.
        </p>
      </div>
    </div>
  );
};

export default ResultPanels;
