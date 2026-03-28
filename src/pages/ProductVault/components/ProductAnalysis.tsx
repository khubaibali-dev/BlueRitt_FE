import bgAnalysis from "../../../assets/images/marginmax.png";
import { ArrowLeft, Box, TrendingUp, CheckCircle2, Activity } from "lucide-react";

interface ProductAnalysisProps {
  product: {
    title: string;
    image: string;
    price: string;
    oldPrice: string;
    asin: string;
    growth?: string;
  };
  onBack: () => void;
}

const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ product, onBack }) => {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto relative isolate">
      {/* Background Image Layer with Bottom Fade - Perfectly Blended like Dashboard */}
      <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
        <img src={bgAnalysis} alt="" className="w-full h-full object-cover object-top opacity-100 mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-card-alt via-brand-card-alt/30 to-transparent" />
      </div>
      {/* Detail Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 sm:mb-10">
        <div className="flex flex-col gap-1 w-full md:w-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-300 text-[14px] font-bold mb-3 transition-colors w-fit group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Vault
          </button>
          <h1 className="banner-heading-text !ml-[-15px] !mb-0">
            Product Vault with <span className="text-blue-400 break-words">{product.title.split(' ').slice(0, 3).join(' ')}...</span>
          </h1>
          <p className="auth-subtitle">Manage and analyze your saved products</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-8 py-2 rounded-full figma-pill-border text-white text-[13px] font-bold hover:bg-blue-500/10 transition-all shadow-lg active:scale-95">
            Move
          </button>
          <button className="flex-1 sm:flex-none px-8 py-2 rounded-full bg-gradient-to-r from-[#D05942] to-[#D4375F] text-white text-[13px] font-bold hover:brightness-110 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
            Remove
          </button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-10">
        {/* Selected Product Card */}
        <div className="vault-card-alt group">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Box size={16} />
            </div>
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">Selected Product</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-32 aspect-square sm:h-32 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/5">
              <img src={product.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col flex-1 justify-between py-1">
              <h3 className="text-[14px] sm:text-[15px] text-white font-medium line-clamp-2 mb-4 leading-relaxed group-hover:text-blue-400 transition-colors">
                {product.title}
              </h3>
              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">${product.price}</span>
                  <span className="text-[12px] text-slate-500 line-through tracking-wide">${product.oldPrice}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ASIN</span>
                  <span className="text-[12px] sm:text-[13px] text-white font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">{product.asin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Supplier Card */}
        <div className="vault-card-alt group">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
              <Box size={16} />
            </div>
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">Selected Supplier</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-32 aspect-square sm:h-32 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/5">
              <img src={product.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col flex-1 justify-between py-1">
              <h3 className="text-[14px] sm:text-[15px] text-white font-medium line-clamp-2 mb-4 leading-relaxed group-hover:text-blue-400 transition-colors">
                {product.title}
              </h3>
              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">${product.price}</span>
                  <span className="text-[12px] text-slate-500 line-through tracking-wide">${product.oldPrice}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-300 text-[10px] font-bold tracking-widest uppercase">
                    CHINA
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] sm:text-[11px] font-bold">
                    <CheckCircle2 size={12} /> Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-10">
        {/* Gross Profit Detail */}
        <div className="vault-metric-card group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <div className="standard-icon-circle w-14 h-14 bg-[#081421] text-white shrink-0 shadow-lg shadow-blue-500/10">
                <Activity size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-slate-400 font-medium tracking-wide">Gross Profit</span>
                <span className="text-3xl sm:text-2xl font-bold text-white tracking-tight">$0.00</span>
              </div>
            </div>
            <span className="text-[24px] sm:text-[32px] font-bold text-blue-500/90 leading-none">0.00%</span>
          </div>

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="283" strokeDashoffset="283" strokeLinecap="round" className="text-blue-500/40" />
            </svg>
            <span className="absolute text-2xl sm:text-3xl font-bold text-white/30">0%</span>
          </div>
        </div>

        {/* Net Profit Detail */}
        <div className="vault-metric-card group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <div className="standard-icon-circle w-14 h-14 bg-[#081421] text-white shrink-0 shadow-lg shadow-blue-600/10">
                <TrendingUp size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] text-slate-400 font-medium tracking-wide">Net Profit</span>
                <span className="text-3xl sm:text-2xl font-bold text-white tracking-tight">$0.00</span>
              </div>
            </div>
            <span className="text-[24px] sm:text-[32px] font-bold text-blue-600/90 leading-none">0.00%</span>
          </div>

          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mx-auto">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray="283" strokeDashoffset="283" strokeLinecap="round" className="text-blue-600/40" />
            </svg>
            <span className="absolute text-2xl sm:text-3xl font-bold text-white/30">0%</span>
          </div>
        </div>
      </div>

      {/* Calculation History Table */}
      <div className="vault-table-container group">
        <div className="p-6 sm:p-5 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Calculation History</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 tracking-[0.12em] whitespace-nowrap">
                    SR NO.
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] whitespace-nowrap">
                    PRODUCT SOURCING COST
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] whitespace-nowrap">
                    PRODUCT REVENUE
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] whitespace-nowrap">
                    GROSS PROFIT
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] whitespace-nowrap">
                    NET PROFIT
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] whitespace-nowrap">
                    MODIFIED AT
                  </th>
                  <th className="px-6 sm:px-8 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] text-right whitespace-nowrap">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 bg-transparent">
                <tr className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 sm:px-8 py-6 text-[13px] text-slate-400 font-bold whitespace-nowrap">
                    1
                  </td>
                  <td className="px-6 sm:px-8 py-6 text-[13px] text-white/90 font-bold whitespace-nowrap">
                    $0.00
                  </td>
                  <td className="px-6 sm:px-8 py-6 text-[13px] text-white/90 font-bold whitespace-nowrap">
                    $0.00
                  </td>
                  <td className="px-6 sm:px-8 py-6 text-[13px] text-white/90 font-bold whitespace-nowrap">
                    $0.00
                  </td>
                  <td className="px-6 sm:px-8 py-6 text-[13px] text-white/90 font-bold whitespace-nowrap">
                    $0.00
                  </td>
                  <td className="px-6 sm:px-8 py-6 text-[12px] text-slate-400 font-medium whitespace-nowrap">
                    Jan 23, 2026
                  </td>
                  <td className="px-6 sm:px-8 py-6 text-right whitespace-nowrap">
                    <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D05942] to-[#D4375F] text-white text-[12px] font-semibold hover:brightness-110 transition-all shadow-md shadow-orange-500/10 active:scale-95 whitespace-nowrap">
                      View Calculations
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex items-center justify-between bg-white/[0.02] border-t border-white/5">
          <p className="text-[12px] text-slate-500 font-medium tracking-wide">Showing 1 to 1 of 1 results</p>
        </div>
      </div>
    </div>

  );
};

export default ProductAnalysis;
