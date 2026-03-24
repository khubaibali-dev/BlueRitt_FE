import React, { useState } from "react";
import { MoreVertical, Star, TrendingUp, Box, DollarSign, BarChart3, MoveRight, ExternalLink, Trash2, Activity } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  growth: string;
  ratings: string;
  asin: string;
  offers: string;
  salesVol: string;
  onAnalyze?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  oldPrice,
  growth,
  ratings,
  asin,
  offers,
  salesVol,
  onAnalyze
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={() => onAnalyze?.()}
      className="bg-[#040D1B] border border-[#1E293B]/50 rounded-[28px] overflow-hidden flex flex-col transition-all hover:border-blue-500/30 hover:shadow-2xl group relative h-[600px] cursor-pointer"
    >
      {/* Product Image Section (Exact Half Height) */}
      <div className="relative h-1/2 w-full overflow-hidden bg-[#081421]">
        <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />

        <div
          className="absolute top-4 left-4 rounded-full px-3 py-1.5 flex items-center gap-1 border border-white/30 shadow-xl shadow-black/10 glass-badge-white"
        >
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} size={13} fill="#FFC700" className="text-[#FFC700]" />
          ))}
          <Star size={13} fill="#E2E8F0" className="text-[#E2E8F0]" />
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          className="absolute top-4 right-4 p-2 rounded-xl text-white border border-white/30 hover:bg-white/40 transition-all z-20 shadow-xl shadow-black/10 glass-badge-white"
        >
          <MoreVertical size={20} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div
            className="absolute top-12 right-3 w-[180px] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-30 animate-in fade-in slide-in-from-top-2 duration-200 glass-dropdown-dark"
          >

            <button className="w-full flex items-center gap-3 px-4 py-3 text-[12px] text-white hover:bg-white/5 transition-colors text-left">
              <MoveRight size={14} className="text-white" /> Move to Collection
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onAnalyze?.(); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-[11px] text-white hover:bg-white/5 transition-colors text-left">
              <ExternalLink size={14} className="text-white" /> View Product Source
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-[12px] text-red-400 hover:bg-red-400/10 transition-colors text-left">
              <Trash2 size={14} /> Remove from Vault
            </button>
          </div>
        )}
      </div>

      {/* Content Section (Exact Half Height) */}
      <div className="h-1/2 p-6 flex flex-col">
        <h3 className="text-[14px] text-white font-medium leading-snug mb-4 line-clamp-3">
          {title}
        </h3>

        {/* Price and Growth */}
        <div className="flex items-end justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight">${price}</span>
            <span className="text-[12px] text-slate-500 line-through">${oldPrice}</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
              <TrendingUp size={10} />
              {growth}
            </div>
            <span className="text-[10px] text-slate-500 font-medium mt-1">{ratings} ratings</span>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-white/5 mt-auto">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="quick-action-icon-circle !w-8 !h-8 mb-1">
              <Box size={14} className="text-white" />
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">ASIN</span>
            <span className="text-[10px] text-white/90 font-bold">{asin}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="quick-action-icon-circle !w-8 !h-8 mb-1">
              <DollarSign size={14} className="text-white" />
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">OFFERS</span>
            <span className="text-[10px] text-white/90 font-bold">{offers}</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="quick-action-icon-circle !w-8 !h-8 mb-1">
              <BarChart3 size={14} className="text-white" />
            </div>
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">SALES VOL</span>
            <span className="text-[10px] text-white/90 font-bold">{salesVol}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-3 mt-4 text-white text-[13px] font-bold transition-all active:scale-95 figma-pill-border hover:bg-white/5">
          Save My Search
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
