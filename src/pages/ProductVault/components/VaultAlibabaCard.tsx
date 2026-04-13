import React from "react";
import { Box, CheckCircle2, ShieldCheck, Award, Star, Zap, Truck, TrendingUp, Info } from "lucide-react";

interface VaultAlibabaCardProps {
  supplier: any;
}

/**
 * Standardized Supplier Card for the Product Vault.
 * Features:
 * - Glassmorphism UI (backdrop-blur, semi-transparent background)
 * - Premium badges for verification, trade assurance, and gold membership
 * - Grid-based metrics including MANUFACTURING COST, MOQ, and Store details
 */
const VaultAlibabaCard: React.FC<VaultAlibabaCardProps> = ({ supplier }) => {
  if (!supplier) return null;

  return (
    <div className="bg-white dark:bg-[#04132B] border border-brand-inputBorder dark:border-white/10 rounded-[24px] overflow-hidden shadow-md dark:shadow-2xl relative p-6 h-full transition-all duration-500 dark:hover:border-blue-500/30">
      {/* Label Section */}
      <div className="flex items-center gap-2 mb-6">
        <Box size={14} className="text-orange-500" />
        <span className="text-[11px] text-orange-500 font-black tracking-[0.15em] uppercase">Selected Supplier</span>
      </div>

      {/* Main Info Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-brand-hover dark:bg-white/5 border border-brand-border dark:border-white/5 shadow-sm dark:shadow-2xl shrink-0">
          <img src={supplier.image} alt="" className="w-full h-full object-cover p-2" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[16px] text-brand-textPrimary dark:text-white font-bold mb-4 leading-tight">
            {supplier.name || "Alibaba Sourcing Partner"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {supplier.isVerified && (
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold tracking-widest text-[9px] uppercase flex items-center gap-1.5">
                <CheckCircle2 size={10} /> Verified
              </div>
            )}
            {supplier.TradeAssurance && (
              <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold tracking-widest text-[9px] uppercase flex items-center gap-1.5">
                <ShieldCheck size={10} /> Trade Assurance
              </div>
            )}
            {supplier.isGoldMember && (
              <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold tracking-widest text-[9px] uppercase flex items-center gap-1.5">
                <Award size={10} /> Gold
              </div>
            )}
            <div className="px-3 py-1 rounded-full bg-brand-hover dark:bg-white/5 border border-brand-border dark:border-white/10 text-brand-textPrimary dark:text-white font-bold text-[10px] flex items-center gap-1.5">
              <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {supplier.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mt-4 pt-8 border-t border-brand-border dark:border-white/5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-brand-textSecondary dark:text-slate-400 shrink-0" />
            <span className="metric-label">STORE</span>
          </div>
          <span className="metric-value">{supplier.storeName}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-brand-textSecondary dark:text-slate-400 shrink-0" />
            <span className="metric-label">CONTACT</span>
          </div>
          <span className="metric-value">{supplier.contact}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Truck size={14} className="text-brand-textSecondary dark:text-slate-400 shrink-0" />
            <span className="metric-label">MANUFACTURING COST</span>
          </div>
          <span className="metric-value">${supplier.price}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Box size={14} className="text-brand-textSecondary dark:text-slate-400 shrink-0" />
            <span className="metric-label">ITEM ID</span>
          </div>
          <span className="metric-value">{supplier.id}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-brand-textSecondary dark:text-slate-400 shrink-0" />
            <span className="metric-label">MOQ</span>
          </div>
          <span className="metric-value">{supplier.minOrder}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Info size={14} className="text-brand-textSecondary dark:text-slate-400 shrink-0" />
            <span className="metric-label">COUNTRY</span>
          </div>
          <span className="metric-value">{supplier.country}</span>
        </div>
      </div>
    </div>
  );
};

export default VaultAlibabaCard;
