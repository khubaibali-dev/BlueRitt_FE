import React from 'react';
import { Star, Zap, CheckCircle, ShieldCheck, Award, Calendar, Truck, Box, TrendingUp, Info } from "lucide-react";
import AIMatchScore from '../../SourceLink/AIMatchScore';

interface AlibabaSupplierCardProps {
  supplier: any;
  variant?: 'result-item' | 'selected';
  onCalculateProfit?: () => void;
  onContactSeller?: () => void;
}

const AlibabaSupplierCard: React.FC<AlibabaSupplierCardProps> = ({
  supplier,
  variant = 'result-item',
  onCalculateProfit,
  onContactSeller
}) => {
  if (!supplier) return null;

  if (variant === 'result-item') {
    return (
      <div className="discovery-card-list !flex-col !gap-0 !p-6 !items-stretch group shadow-md">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col sm:flex-row gap-5 flex-1">
            <div className="product-img-wrapper-list !w-28 !h-28 shadow-md mx-auto sm:mx-0 shrink-0">
              <img src={supplier.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="product-card-title mb-4 lg:max-w-[800px]">
                {supplier.name || "Alibaba Sourcing Partner"}
              </h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                {supplier.isVerified && (
                  <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                    <CheckCircle size={10} /> Verified
                  </div>
                )}
                {supplier.TradeAssurance && (
                  <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                    <ShieldCheck size={10} /> Trade Assurance
                  </div>
                )}
                <div className="brand-tag text-brand-textPrimary dark:text-[#FFFFFF] border-[#8B5CF64D] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase bg-[#0826560D] dark:bg-gradient-to-r dark:from-[rgba(255,89,0,0.2)] dark:to-[rgba(255,0,230,0.2)]">
                    <Award size={10} /> Gold
                  </div>
                <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                  <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {supplier.rating}
                </div>
                <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                  <Calendar size={10} /> Store Age: {supplier.storeAge}
                </div>
              </div>
            </div>
          </div>
          <AIMatchScore score={supplier.ai_match_score} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 items-end mt-8 pt-6 border-t border-brand-border">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Zap size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">STORE</span></div>
              <span className="metric-value">{supplier.storeName}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">CONTACT</span></div>
              <span className="metric-value">{supplier.contact}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Truck size={14} className="text-[#FF5900] shrink-0" /><span className="metric-label ">MANUFACTURING COST</span></div>
              <span className="metric-value text-[#FF5900] text-[15px] font-bold tracking-tight">{supplier.price}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Box size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">ITEM ID</span></div>
              <span className="metric-value">{supplier.id}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><TrendingUp size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">MIN. ORDER QTY</span></div>
              <span className="metric-value">{supplier.minOrder}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Info size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">COUNTRY</span></div>
              <span className="metric-value">{supplier.country}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button onClick={onCalculateProfit} className="flex-1 lg:flex-none btn-discover-supplier !px-10">Calculate Profit</button>
            <button onClick={onContactSeller} className="flex-1 lg:flex-none btn-product-details !px-10">Contact Seller</button>
          </div>
        </div>
      </div>
    );
  }

  // Variant: SELECTED (Used in Profit Calculator)
  return (
    <div className="bg-brand-card dark:bg-[#04132B]/60 backdrop-blur-md border border-brand-border rounded-[24px] overflow-hidden shadow-md relative p-4">
      <div className="flex items-center gap-2 mb-6">
        <Box size={14} className="text-[#FF5900]" />
        <span className="text-[11px] text-[#FF5900] font-black tracking-[0.15em] uppercase">Selected Supplier</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 mb-6">
        <div className="product-img-wrapper-list !w-24 !h-24 shadow-md mx-auto sm:mx-0 shrink-0 bg-white">
          <img src={supplier.image} alt="" className="w-full h-full object-cover p-2" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="product-card-title mb-4 lg:max-w-[450px] leading-tight">
            {supplier.name}
            2025 New Design App Tracker Smart Watch GPS Sports Smartwatch 10-Day Battery Life Waterproof IP67 Sleep Call Answering Features
          </h3>
          <div className="flex flex-wrap gap-2">
            {supplier.isVerified && (
              <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                <CheckCircle size={10} /> Verified
              </div>
            )}
            {supplier.TradeAssurance && (
              <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                <ShieldCheck size={10} /> Trade Assurance
              </div>
            )}
            <div className="brand-tag text-brand-textPrimary dark:text-[#FFFFFF] border-[#8B5CF64D] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase bg-[#0826560D] dark:bg-gradient-to-r dark:from-[rgba(255,89,0,0.2)] dark:to-[rgba(255,0,230,0.2)]">
                <Award size={10} /> Gold
              </div>
            <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
              <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {supplier.rating}
            </div>
            <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
              <Calendar size={10} /> Store Age: {supplier.storeAge || supplier.age}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mt-4 pt-6 border-t border-brand-border">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><Zap size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">STORE</span></div>
          <span className="metric-value">{supplier.storeName}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><CheckCircle size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">CONTACT</span></div>
          <span className="metric-value">{supplier.contact}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><Truck size={14} className="text-[#FF5900] shrink-0" /><span className="metric-label ">MANUFACTURING COST</span></div>
          <span className="metric-value text-[#FF5900] text-[15px] font-bold tracking-tight">{supplier.price || supplier.cost}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><Box size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">ITEM ID</span></div>
          <span className="metric-value">{supplier.id}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><TrendingUp size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">MIN. ORDER QTY</span></div>
          <span className="metric-value">{supplier.minOrder}</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2"><Info size={14} className="text-slate-400 shrink-0" /><span className="metric-label !text-slate-400">COUNTRY</span></div>
          <span className="metric-value">{supplier.country}</span>
        </div>
      </div>
    </div>
  );
};

export default AlibabaSupplierCard;
