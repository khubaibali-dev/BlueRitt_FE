import React from 'react';
import { Star, Zap, CheckCircle, ShieldCheck, Award, Calendar, Truck, Box, TrendingUp, Info } from "lucide-react";
import AIMatchScore from '../../../pages/Explorer/components/SourceLink/AIMatchScore';

export interface SpkbgSupplierCardData {
  name: string;
  image: string;
  isVerified?: boolean;
  tradeAssurance?: boolean;
  isGold?: boolean;
  rating?: number | string;
  storeAge?: string | number;
  aiScore?: number;
  storeName?: string;
  contact?: string;
  price?: string;
  id?: string;
  minOrder?: string | number;
  country?: string;
}

interface SpkbgSupplierCardProps {
  data: SpkbgSupplierCardData;
  variant?: 'result-item' | 'selected';
  onCalculateProfit?: () => void;
  onContactSeller?: () => void;
}

const SpkbgSupplierCard: React.FC<SpkbgSupplierCardProps> = ({
  data,
  variant = 'result-item',
  onCalculateProfit,
  onContactSeller
}) => {
  const {
    name,
    image,
    isVerified,
    tradeAssurance,
    isGold = true, // Default to true as seen in CSS
    rating = 4.5,
    storeAge = "1 year",
    aiScore = 0,
    storeName = "N/A",
    contact = "N/A",
    price = "N/A",
    id = "N/A",
    minOrder = "N/A",
    country = "US"
  } = data;

  if (variant === 'result-item') {
    return (
      <div className="discovery-card-list !flex-col !gap-0 !p-6 !items-stretch group">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col sm:flex-row gap-5 flex-1">
            <div className="product-img-wrapper-list !w-28 !h-28  mx-auto sm:mx-0 shrink-0">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="product-card-title mb-4 lg:max-w-[800px]">
                {name || "Alibaba Sourcing Partner"}
              </h3>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
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
                <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                  <Calendar size={10} /> Store Age: {storeAge}
                </div>
              </div>
            </div>
          </div>
          <AIMatchScore score={aiScore} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 items-end mt-4 pt-2 border-t border-brand-border">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Zap size={14} className=" shrink-0" /><span className="metric-label ">STORE</span></div>
              <span className="metric-value">{storeName}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><CheckCircle size={14} className=" shrink-0" /><span className="metric-label ">CONTACT</span></div>
              <span className="metric-value">{contact}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Truck size={14} className="text-[#FF5900] shrink-0" /><span className="metric-label ">MANUFACTURING COST</span></div>
              <span className="metric-value text-[#FF5900] ">{price}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Box size={14} className=" shrink-0" /><span className="metric-label ">ITEM ID</span></div>
              <span className="metric-value">{id}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><TrendingUp size={14} className=" shrink-0" /><span className="metric-label ">MIN. ORDER QTY</span></div>
              <span className="metric-value">{minOrder}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2"><Info size={14} className=" shrink-0" /><span className="metric-label ">COUNTRY</span></div>
              <span className="metric-value">{country}</span>
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

  // Variant: SELECTED
  return (
    <div className="discovery-card-list flex-col !p-0 isolate overflow-hidden relative">
      <div className="px-5 py-4 border-b border-brand-inputBorder flex items-center gap-2 w-full">
        <Box size={14} className="text-[#FF5900]" />
        <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">Selected Supplier</span>
      </div>
      <div className="p-4 sm:p-2 w-full text-brand-textPrimary">
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <div className="product-img-wrapper-list !w-24 !h-24 mx-auto sm:mx-0 shrink-0 bg-white">
            <img src={image} alt={name} className="w-full h-full object-cover p-2" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="product-card-title mb-4 leading-tight">
              {name}
            </h3>
            <div className="flex items-center flex-nowrap gap-2">
              {isVerified && (
                <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1.5 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                  <CheckCircle size={10} /> Verified
                </div>
              )}
              {tradeAssurance && (
                <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1.5 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                  <ShieldCheck size={10} /> Trade Assurance
                </div>
              )}
              {isGold && (
                <div className="brand-tag text-brand-textPrimary dark:text-[#FFFFFF] border-[#8B5CF64D] !px-3 !py-1.5 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase bg-[#0826560D] dark:bg-gradient-to-r dark:from-[rgba(255,89,0,0.2)] dark:to-[rgba(255,0,230,0.2)]">
                  <Award size={10} /> Gold
                </div>
              )}
              <div className="brand-tag brand-tag-default !px-3 !py-1.5 flex items-center gap-1.5 font-bold text-[10px]">
                <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {rating}
              </div>
              <div className="brand-tag brand-tag-default !px-3 !py-1.5 flex items-center gap-1.5 font-bold text-[10px]">
                <Calendar size={10} /> Store Age: {storeAge}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mt-4 pt-6 border-t border-brand-border px-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><Zap size={14} className=" shrink-0" /><span className="metric-label ">STORE</span></div>
            <span className="metric-value">{storeName}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><CheckCircle size={14} className=" shrink-0" /><span className="metric-label ">CONTACT</span></div>
            <span className="metric-value">{contact}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><Truck size={14} className="text-[#FF5900] shrink-0" /><span className="metric-label ">MANUFACTURING COST</span></div>
            <span className="metric-value">{price}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><Box size={14} className=" shrink-0" /><span className="metric-label ">ITEM ID</span></div>
            <span className="metric-value">{id}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><TrendingUp size={14} className=" shrink-0" /><span className="metric-label ">MIN. ORDER QTY</span></div>
            <span className="metric-value">{minOrder}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2"><Info size={14} className=" shrink-0" /><span className="metric-label ">COUNTRY</span></div>
            <span className="metric-value">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpkbgSupplierCard;
