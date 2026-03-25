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
import bgAnalysis from "../../../assets/images/explorer.png";

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

            <h1 className="text-[26px] sm:text-[32px] md:text-[40px] text-white tracking-tight leading-tight">
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

          <p className="max-w-[90%] md:max-w-[700px] mx-auto text-slate-400 text-[13px] md:text-[14px] font-medium leading-relaxed">
            AI-powered supplier matching to connect you with verified and relevant sourcing partners instantly.
          </p>
        </div>

        {/* Selected Product Panel */}
        <div className="bg-[#04132B]/60 backdrop-blur-md border border-brand-inputBorder rounded-[24px] overflow-hidden shadow-2xl mb-12 isolate">
          <div className="px-4 py-4 flex items-center gap-2">
            <Box size={14} className="text-[#FF5900]" />
            <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">
              Selected Product
            </span>
          </div>

          <div className="px-4 pb-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              {/* Product Image */}
              <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-2xl mx-auto lg:mx-0">
                <img src={product?.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Product Info & Metrics */}
              <div className="flex-1 w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-2 mb-3 mt-2">
                  <h3 className="text-white font-bold text-[16px] tracking-tight leading-tight lg:max-w-[600px] text-center lg:text-left">
                    {product?.title}
                  </h3>
                  <div className="flex items-baseline gap-3 shrink-0 self-center lg:self-auto">
                    <span className="text-slate-500 text-[14px] line-through font-medium">${product?.oldPrice}</span>
                    <span className="text-white text-[22px] font-bold tracking-tighter">${product?.price}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:justify-between gap-y-4">
                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="quick-action-icon-circle !w-6 !h-6">
                        <Box size={14} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">ASIN</span>
                        <span className="text-[12px] text-white font-bold leading-none">{product?.asin}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="quick-action-icon-circle !w-6 !h-6">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">MONTHLY SALES VOL</span>
                        <span className="text-[12px] text-white font-bold leading-none">{product?.salesVol}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="quick-action-icon-circle !w-6 !h-6">
                        <span className="text-white font-bold text-[14px]">%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">OFFERS</span>
                        <span className="text-[12px] text-white font-bold leading-none">{product?.offers} sellers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="quick-action-icon-circle !w-6 !h-6">
                        <Truck size={14} className="text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-0.5">DELIVERY</span>
                        <span className="text-[12px] text-white font-bold leading-none">Free</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Rating */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/5 text-slate-400 text-[11px] px-4 py-1.5 rounded-full font-bold">Electronics</span>
                      <span className="bg-white/5 text-slate-400 text-[11px] px-4 py-1.5 rounded-full font-bold">Amazon Choice</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < 4 ? "#FFC107" : "transparent"} className={i < 4 ? "text-[#FFC107]" : "text-slate-600"} />
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
            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
              <button className="w-full sm:w-auto px-8 py-3 rounded-xl relative figma-pill-border font-bold text-white text-[14px] transition-all group overflow-hidden">
                <span className="relative z-10">Copy Seller Link</span>
              </button>
              <button className="w-full sm:w-auto px-10 py-3 rounded-full bg-brand-gradient text-[14px] font-bold hover:opacity-90 transition-all shadow-xl shadow-orange-900/20">
                Open Product
              </button>
            </div>
          </div>
        </div>

        {/* Suppliers Section Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <span className="text-[#FF5900] text-[24px] font-black">6</span>
            <h2 className="text-[20px]  text-white tracking-tight">Recommended Suppliers for your product & AI Match Scores</h2>
          </div>
          <button className="bg-[#04132B] border border-brand-inputBorder rounded-xl px-4 py-2 flex items-center gap-3 text-white text-[13px] font-bold hover:bg-white/5 transition-all">
            Sort By <ChevronRight size={14} className="opacity-60 rotate-90" />
          </button>
        </div>

        {/* Supplier Cards List */}
        <div className="space-y-4">
          {suppliers.map((supplier, i) => (
            <div key={i} className="bg-[#04132B]/80 backdrop-blur-md border border-brand-inputBorder rounded-[24px] p-6 shadow-2xl relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row gap-10">
                {/* Left: Supplier Image & Title */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shrink-0 group-hover:scale-102 transition-transform duration-500 mx-auto sm:mx-0">
                    <img src={supplier.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-[16px] mb-4 tracking-tight leading-snug lg:max-w-[600px] transition-colors mt-4 text-center sm:text-left">
                      2025 New Design App Tracker Smart Watch GPS Sports Smartwatch 10-Day Battery Life Waterproof IP67 Sleep Call Answering Features
                    </h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2.5">
                      <div className="bg-white/10 text-white text-[9px]  uppercase tracking-widest px-3 py-1 rounded-full border border-[#00D1FF33] flex items-center gap-1.5">
                        <CheckCircle size={10} /> Verified
                      </div>
                      <div className="bg-white/10 text-white text-[9px]  uppercase tracking-widest px-3 py-1 rounded-full border border-[#00D1FF33] flex items-center gap-1.5">
                        <ShieldCheck size={10} /> Trade Assurance
                      </div>
                      <div className="text-white text-[9px]  uppercase tracking-widest px-3 py-1 rounded-full border border-[#8B5CF64D] flex items-center gap-1.5" style={{ background: 'linear-gradient(90deg, rgba(255, 89, 0, 0.2) 0%, rgba(255, 0, 230, 0.2) 100%)' }}>
                        <Award size={10} /> Gold Supplier
                      </div>
                      <div className="bg-white/5 text-white text-[9px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                        <Star size={10} fill="#FFC107" className="text-[#FFC107]" /> {supplier.rating}
                      </div>
                      <div className="bg-white/5 text-white text-[9px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                        <Calendar size={10} /> Store Age: {supplier.age}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Match Score Side Circle - Dynamic Theme (Green >= 80%, Yellow < 80%) */}
                <div className="flex flex-col items-center justify-center shrink-0 py-4 lg:py-0 border-t border-white/5 lg:border-0">
                  <div className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center text-center ${supplier.matchScore >= 80 ? 'gradient-border' : 'gradient-border-yellow'}`}>
                    <span className="text-[20px] font-black text-white leading-none mb-0.5">{supplier.matchScore}%</span>
                    <span className="text-[12px] text-white font-medium leading-tight">AI Match <br /> Score</span>
                  </div>
                </div>
              </div>

              {/* Supplier Grid Details Container */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-10 items-end mt-10 pt-4 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Zap size={14} className="shrink-0" />
                      <span className="text-[14px]  uppercase tracking-widest">Store</span>
                    </div>
                    <span className="text-[14px] text-white ">{supplier.name}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <CheckCircle size={14} className="shrink-0" />
                      <span className="text-[14px]  uppercase tracking-widest">Contact</span>
                    </div>
                    <span className="text-[14px] text-white ">{supplier.contact}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Truck size={14} className="shrink-0 text-[#FF5900]" />
                      <span className="text-[14px]  uppercase tracking-widest">Manufacturing Cost</span>
                    </div>
                    <span className="text-[14px] text-[#FF5900]  tracking-tight">{supplier.cost}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Box size={14} className="shrink-0" />
                      <span className="text-[14px]  uppercase tracking-widest">Item ID</span>
                    </div>
                    <span className="text-[14px] text-white ">{supplier.id}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <TrendingUp size={14} className="shrink-0" />
                      <span className="text-[14px] font-black uppercase tracking-widest">Min. Order QTY</span>
                    </div>
                    <span className="text-[14px] text-white ">{supplier.minOrder}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Info size={14} className="shrink-0" />
                      <span className="text-[14px]  uppercase tracking-widest">Country</span>
                    </div>
                    <span className="text-[14px] text-white ">{supplier.country}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <button 
                    onClick={() => onCalculateProfit(supplier)}
                    className="flex-1 lg:flex-none bg-brand-gradient text-white px-10 py-3 rounded-full font-bold text-[14px] shadow-lg shadow-brand-blue/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 lg:min-w-[200px]"
                  >
                    Calculate Profit
                  </button>
                  <button className="flex-1 lg:flex-none figma-pill-border text-white px-10 py-3 rounded-full font-bold text-[14px] hover:bg-white/5 transition-all flex items-center justify-center gap-2 lg:min-w-[200px]">
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
