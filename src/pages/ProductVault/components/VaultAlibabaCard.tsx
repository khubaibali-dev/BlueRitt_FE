import React from "react";
import { Box, CheckCircle, ShieldCheck, Award, Star, Zap, Truck, TrendingUp, Info, Calendar } from "lucide-react";

interface VaultAlibabaCardProps {
  supplier: any;
}

const VaultAlibabaCard: React.FC<VaultAlibabaCardProps> = ({ supplier }) => {
  if (!supplier) return null;

  const {
    image,
    name,
    isVerified,
    TradeAssurance: tradeAssurance,
    isGoldMember: isGold,
    rating,
    storeAge,
    storeName,
    contact,
    price,
    id,
    minOrder,
    country
  } = supplier;

  return (
    <div className="discovery-card-list flex-col !p-0 isolate overflow-hidden relative h-full">
      <div className="px-5 py-4 border-b border-brand-inputBorder flex items-center gap-2 w-full">
        <Box size={14} className="text-[#FF5900]" />
        <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">Selected Supplier</span>
      </div>
      <div className="p-4 sm:p-2 w-full text-brand-textPrimary h-full flex flex-col">
        <div className="flex flex-col sm:flex-row gap-5 mb-6">
          <div className="product-img-wrapper-list !w-24 !h-24 mx-auto sm:mx-0 shrink-0 bg-white shadow-sm border border-brand-inputBorder">
            <img src={image} alt={name} className="w-full h-full object-cover p-2" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="product-card-title mb-4 lg:max-w-[450px] leading-tight text-[16px] font-semibold" title={name}>
              {name || "Alibaba Sourcing Partner"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {isVerified && (
                <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                  <CheckCircle size={10} /> Verified
                </div>
              )}
              {tradeAssurance && (
                <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                  <ShieldCheck size={10} /> Trade Assurance
                </div>
              )}
              {isGold && (
                <div className="brand-tag text-brand-textPrimary dark:text-[#FFFFFF] border-[#8B5CF64D] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase bg-[#0826560D] dark:bg-gradient-to-r dark:from-[rgba(255,89,0,0.2)] dark:to-[rgba(255,0,230,0.2)]">
                  <Award size={10} /> Gold
                </div>
              )}
              <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {rating}
              </div>
              {storeAge && (
                <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                  <Calendar size={10} /> Store Age: {storeAge}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-2 mt-4 pt-6 border-t border-brand-inputBorder px-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-brand-textSecondary shrink-0" />
              <span className="metric-label ">STORE</span>
            </div>
            <span className="metric-value">{storeName}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-brand-textSecondary shrink-0" />
              <span className="metric-label ">CONTACT</span>
            </div>
            <span className="metric-value">{contact}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Truck size={14} className="text-[#FF5900] shrink-0" />
              <span className="metric-label ">MANUFACTURING COST</span>
            </div>
            <span className="metric-value">{price && !String(price).startsWith('$') ? `$${price}` : price}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Box size={14} className="text-brand-textSecondary shrink-0" />
              <span className="metric-label ">ITEM ID</span>
            </div>
            <span className="metric-value">{id}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <TrendingUp size={14} className="text-brand-textSecondary shrink-0" />
              <span className="metric-label ">MIN. ORDER QTY</span>
            </div>
            <span className="metric-value">{minOrder}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Info size={14} className="text-brand-textSecondary shrink-0" />
              <span className="metric-label ">COUNTRY</span>
            </div>
            <span className="metric-value">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultAlibabaCard;
