import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Box,
  TrendingUp,
  Truck,
  Zap,
  CheckCircle,
  ShieldCheck,
  Award,
  Star,
  Calendar
} from "lucide-react";
import bgAnalysis from "../../../../assets/images/explorer.png";
import AIMatchScore from "./AIMatchScore";

interface SupplierSourceLinkProps {
  product: any;
  onBack: () => void;
  onCalculateProfit: (supplier: any) => void;
}

const SupplierSourceLink: React.FC<SupplierSourceLinkProps> = ({ product, onBack, onCalculateProfit }) => {
  // Mock data for recommended suppliers
  const suppliers = [
    {
      id: "1601481983321",
      name: "Shenzhen Iwonlex Technology Co., Ltd.",
      contact: "Cherry Zhou",
      minOrder: "1 set",
      cost: "$17.38-19.43",
      country: "China",
      rating: 4.6,
      age: "4 years",
      matchScore: 84.64,
      verified: true,
      tradeAssurance: true,
      goldSupplier: true,
      image: product?.image // Using same image for mock
    },
    {
      id: "1601481983322",
      name: "Shenzhen Iwonlex Technology Co., Ltd.",
      contact: "Cherry Zhou",
      minOrder: "1 set",
      cost: "$17.38-19.43",
      country: "China",
      rating: 4.6,
      age: "4 years",
      matchScore: 62.64,
      verified: true,
      tradeAssurance: true,
      goldSupplier: true,
      image: product?.image
    },
    {
      id: "1601481983323",
      name: "Shenzhen Iwonlex Technology Co., Ltd.",
      contact: "Cherry Zhou",
      minOrder: "1 set",
      cost: "$17.38-19.43",
      country: "China",
      rating: 4.6,
      age: "4 years",
      matchScore: 20.25,
      verified: true,
      tradeAssurance: true,
      goldSupplier: true,
      image: product?.image
    }
  ];

  return (
    <div className="discovery-results px-6 sm:px-4 py-10 animate-in fade-in slide-in-from-right-full duration-500 w-full relative bg-[#051125] rounded-[24px] isolate min-h-screen overflow-hidden">
      {/* Background Image Layer with Bottom Fade - Perfectly Blended like Product Analysis */}
      <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
        <img src={bgAnalysis} alt="" className="w-full h-full object-cover object-top opacity-100 mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#030F23] via-[#030F23]/30 to-transparent" />
      </div>


      <div className="flex-1 max-w-[1400px] mx-auto w-full px-2 pt-0 pb-10">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-white/5 figma-pill-border px-4 py-2 rounded-full text-white text-[13px] font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={16} /> Back
          </button>

          <button
            onClick={() => suppliers.length > 0 && onCalculateProfit(suppliers[0])}
            className="bg-white/5 figma-pill-border px-4 py-2 rounded-full text-white text-[13px] font-bold flex items-center gap-2 hover:bg-white/10 transition-all font-inter"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* Hero Header Section */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4 mb-4">

            <h1 className="banner-heading-text !mb-0">
              AI-Powered Supplier <br className="hidden sm:block" />
              Matching with SourceLink
            </h1>

            {/* Info Icon */}
            <div className="relative group shrink-0 md:mt-12">
              <div className="figma-pill-border w-[32px] h-[32px] md:w-[36px] md:h-[36px] cursor-help transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                <span className="text-white text-[18px] md:text-[22px] font-black italic font-serif select-none">
                  i
                </span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full mb-3 md:mb-5 left-1/2 -translate-x-1/2 w-[260px] sm:w-[300px] md:w-[320px] p-3 md:p-4 rounded-xl backdrop-blur-[20px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 text-left shadow-2xl scale-95 group-hover:scale-100 origin-bottom">
                <div className="tooltip-pro-border" />
                <p className="text-white text-[11px] md:text-[12px] font-medium leading-relaxed relative z-10">
                  BlueRitt’s AI matches your product with verified, high-rated suppliers and assigns a fit score.
                </p>
              </div>
            </div>

          </div>

          <p className="auth-subtitle max-w-[98%] md:max-w-[730px] mx-auto mt-4 px-2">
            AI-powered supplier matching to connect you with verified and relevant sourcing partners instantly.
          </p>
        </div>

        {/* Selected Product Panel */}
        <div className="discovery-card-list flex-col !p-0 mb-12 isolate">
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2 w-full">
            <Box size={14} className="text-[#FF5900]" />
            <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">
              Selected Product
            </span>
          </div>

          <div className="p-4 sm:p-5 w-full">
            <div className="flex flex-col lg:flex-row gap-5 items-start">
              {/* Product Image */}
              <div className="product-img-wrapper-list !w-[100px] !h-[100px] shadow-2xl mx-auto lg:mx-0 shrink-0">
                <img src={product?.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Product Info & Metrics */}
              <div className="flex-1 w-full flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-2 mt-1">
                  <h3 className="product-card-title text-[15px] sm:text-[16px] lg:max-w-[600px] text-center lg:text-left">
                    {product?.title}
                  </h3>
                  <div className="flex items-baseline gap-2 shrink-0 self-center lg:self-auto">
                    <span className="product-old-price-primary text-[14px]">${product?.oldPrice}</span>
                    <span className="product-price-primary text-[22px]">${product?.price}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:justify-between gap-y-5 lg:gap-y-4">                  {/* Core Metrics Grid */}
                  <div className="product-metrics-row-list !mt-0">
                    <div className="flex items-center gap-3">
                      <Box size={14} className="text-slate-400 shrink-0" />
                      <div className="flex flex-col">
                        <span className="metric-label leading-none mb-1">ASIN</span>
                        <span className="metric-value leading-none">{product?.asin}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp size={14} className="text-slate-400 shrink-0" />
                      <div className="flex flex-col">
                        <span className="metric-label leading-none mb-1">MONTHLY SALES VOL</span>
                        <span className="metric-value leading-none">{product?.salesVol}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-bold text-[16px] shrink-0 leading-none">%</span>
                      <div className="flex flex-col">
                        <span className="metric-label leading-none mb-1">OFFERS</span>
                        <span className="metric-value leading-none">{product?.offers} sellers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck size={14} className="text-slate-400 shrink-0" />
                      <div className="flex flex-col">
                        <span className="metric-label leading-none mb-1">DELIVERY</span>
                        <span className="metric-value leading-none">Free</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Rating */}
                  <div className="flex flex-wrap items-center gap-3 justify-center">
                    <div className="flex items-center gap-2">
                      <span className="brand-tag brand-tag-default px-3 py-1">Electronics</span>
                      <span className="brand-tag brand-tag-amazon px-3 py-1">Amazon Choice</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < 4 ? "#FFC107" : "transparent"} className={i < 4 ? "text-[#FFC107]" : "text-slate-400"} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Metrics Grid - Dynamic Balancing to maximize 1400px layout */}
            <div className="grid grid-cols-2 md:flex md:flex-row items-stretch gap-2 mt-4">
              <div className="flex-[1.6] bg-[#081421]/60 py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[48px] shadow-inner hover:border-white/10 transition-colors">
                <span className="text-[12px] text-[#FFFFFF] tracking-widest mb-1 opacity-60">Seller Name</span>
                <span className="text-[11px] text-white font-bold leading-tight">DataVision Computer Video</span>
              </div>
              <div className="flex-[1.6] bg-[#081421]/60 py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[48px] shadow-inner hover:border-white/10 transition-colors">
                <span className="text-[12px] text-[#FFFFFF] tracking-widest mb-1 opacity-60">Ships From</span>
                <span className="text-[11px] text-white font-bold leading-tight">DataVision Computer Video</span>
              </div>
              <div className="flex-[1.2] bg-[#081421]/60 py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[48px] shadow-inner hover:border-white/10 transition-colors">
                <span className="text-[12px] text-[#FFFFFF] tracking-widest mb-1 opacity-60">Seller Country</span>
                <span className="text-[11px] text-white font-bold leading-tight">US</span>
              </div>
              <div className="flex-[1.2] bg-[#081421]/60 py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[48px] shadow-inner hover:border-white/10 transition-colors">
                <span className="text-[12px] text-[#FFFFFF] tracking-widest mb-1 opacity-60">Seller Rating</span>
                <span className="text-[11px] text-white font-bold leading-tight">4.0</span>
              </div>
              <div className="flex-[1.4] bg-[#081421]/60 py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[48px] shadow-inner hover:border-white/10 transition-colors">
                <span className="text-[12px] text-[#FFFFFF] tracking-widest mb-1 opacity-60">Item Dimensions</span>
                <span className="text-[11px] text-white font-bold leading-tight">9.4×3×1.2 in</span>
              </div>
              <div className="flex-[1] bg-[#081421]/60 py-2.5 px-4 rounded-xl border border-brand-inputBorder flex flex-col justify-center min-h-[48px] shadow-inner hover:border-white/10 transition-colors">
                <span className="text-[12px] text-[#FFFFFF] tracking-widest mb-1 opacity-60">Item Weight</span>
                <span className="text-[11px] text-white font-bold leading-tight">1.28 oz</span>
              </div>
            </div>

            {/* Panel Footer Actions */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 w-full border-t border-white/5 pt-5">
              <button className="flex-1 sm:flex-none btn-product-details !px-8 !h-[42px] !font-bold">
                Copy Seller Link
              </button>
              <button className="flex-1 sm:flex-none btn-discover-supplier !px-10 !h-[42px] !font-bold">
                Open Product
              </button>
            </div>
          </div>
        </div>

        {/* Suppliers Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 px-2">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <span className="text-[#FF5900] text-[20px] sm:text-[24px] font-black mt-0.5 sm:mt-0 shrink-0">6</span>
            <h2 className="text-[16px] sm:text-[20px] text-white tracking-tight leading-snug">
              Recommended Suppliers for your product & AI Match Scores
            </h2>
          </div>
          <button className="bg-[#04132B] border border-brand-inputBorder rounded-xl px-4 py-2 flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto text-white text-[13px] sm:text-[14px] hover:bg-white/5 transition-all shrink-0">
            <span className="font-semibold">Sort By</span>
            <ChevronRight size={14} className="rotate-90 text-slate-400" />
          </button>
        </div>

        {/* Supplier Cards List */}
        <div className="space-y-4">
          {suppliers.map((supplier, i) => (
            <div key={i} className="discovery-card-list !flex-col !gap-0 !p-6 !items-stretch group shadow-2xl">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Left: Supplier Image & Title */}
                <div className="flex flex-col sm:flex-row gap-5 flex-1">
                  <div className="product-img-wrapper-list !w-32 !h-32 shadow-2xl mx-auto sm:mx-0 shrink-0">
                    <img src={supplier.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="product-card-title text-center sm:text-left text-[16px] sm:text-[18px] mb-4 lg:max-w-[800px]">
                      {supplier.name} {/* Using supplier name as description placeholder since that was the original behavior or title text */}
                      2025 New Design App Tracker Smart Watch GPS Sports Smartwatch 10-Day Battery Life Waterproof IP67 Sleep Call Answering Features
                    </h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                      <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                        <CheckCircle size={10} /> Verified
                      </div>
                      <div className="brand-tag brand-tag-default border-[#00D1FF33] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase">
                        <ShieldCheck size={10} /> Trade Assurance
                      </div>
                      <div className="brand-tag text-[#FFFFFF] border-[#8B5CF64D] !px-3 !py-1 flex items-center gap-1.5 font-bold tracking-widest text-[9px] uppercase" style={{ background: 'linear-gradient(90deg, rgba(255, 89, 0, 0.2) 0%, rgba(255, 0, 230, 0.2) 100%)' }}>
                        <Award size={10} /> Gold Supplier
                      </div>
                      <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                        <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {supplier.rating}
                      </div>
                      <div className="brand-tag brand-tag-default !px-3 !py-1 flex items-center gap-1.5 font-bold text-[10px]">
                        <Calendar size={10} /> Store Age: {supplier.age}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Match Score Side Circle */}
                <AIMatchScore score={supplier.matchScore} />
              </div>

              {/* Supplier Grid Details Container */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 items-end mt-8 pt-6 border-t border-white/5">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-slate-400 shrink-0" />
                      <span className="metric-label !text-slate-400">STORE</span>
                    </div>
                    <span className="metric-value">{supplier.name}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-slate-400 shrink-0" />
                      <span className="metric-label !text-slate-400">CONTACT</span>
                    </div>
                    <span className="metric-value">{supplier.contact}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-[#FF5900] shrink-0" />
                      <span className="metric-label ">MANUFACTURING COST</span>
                    </div>
                    <span className="metric-value text-[#FF5900] text-[15px] font-bold tracking-tight">{supplier.cost}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Box size={14} className="text-slate-400 shrink-0" />
                      <span className="metric-label !text-slate-400">ITEM ID</span>
                    </div>
                    <span className="metric-value">{supplier.id}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-slate-400 shrink-0" />
                      <span className="metric-label !text-slate-400">MIN. ORDER QTY</span>
                    </div>
                    <span className="metric-value">{supplier.minOrder}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <Info size={14} className="text-slate-400 shrink-0" />
                      <span className="metric-label !text-slate-400">COUNTRY</span>
                    </div>
                    <span className="metric-value">{supplier.country}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <button
                    onClick={() => onCalculateProfit(supplier)}
                    className="flex-1 lg:flex-none btn-discover-supplier !px-10"
                  >
                    Calculate Profit
                  </button>
                  <button className="flex-1 lg:flex-none btn-product-details !px-10">
                    Contact Seller
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierSourceLink;
