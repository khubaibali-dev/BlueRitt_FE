import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Star, TrendingUp, Box, Percent, BarChart3, Truck, DollarSign, ChevronDown, ChevronUp, AlertTriangle, Check, Store, Zap } from "lucide-react";

interface ProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    image: string;
    price: string;
    oldPrice: string;
    asin: string;
    growth: string;
    ratings: string;
    rating: number;
    offers: string;
    salesVol: string;
  } | null;
  onDiscoverSuppliers?: () => void;
}

const ProductDetailsDrawer: React.FC<ProductDetailsDrawerProps> = ({ isOpen, onClose, onDiscoverSuppliers, product }) => {
  const [activeTab, setActiveTab] = useState('Details');
  const [expandedSection, setExpandedSection] = useState<string | null>('About Product');
  const [displayProduct, setDisplayProduct] = useState(product);

  // Keep the product data during the close animation
  useEffect(() => {
    if (product) {
      setDisplayProduct(product);
    }
  }, [product]);

  // If we have never had a product, don't render anything
  if (!displayProduct) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return createPortal(
    <>
      {/* Backdrop - Uses transition-opacity via CSS classes */}
      <div
        className={`product-details-drawer-backdrop ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel - Uses transition-transform via CSS classes */}
      <div className={`product-details-drawer-panel ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Product Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white text-white hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
            {['Details', 'Reviews', 'Offers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-[14px] text-[13px]  transition-all ${activeTab === tab
                  ? 'text-white shadow-lg font-bold'
                  : 'text-white hover:text-white hover:bg-white/5'
                  }`}
                style={activeTab === tab ? { background: 'linear-gradient(96.06deg, #155DFC -33.01%, #CD5150 124.28%)' } : {}}
              >
                {tab === 'Details' && <Box size={14} />}
                {tab === 'Reviews' && <Star size={14} />}
                {tab === 'Offers' && <DollarSign size={14} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Header Tab Separator */}
        <div className="mt-4 border-b border-[#1C263C] mx-6" />

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

          {activeTab === 'Details' && (
            <>
              {/* Top Info Section */}
              <div className="flex gap-2 mb-6">
                <div className="w-28 h-28 rounded-[22px] overflow-hidden shrink-0 border border-white/10">
                  <img src={displayProduct.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 mt-2">
                    <h3 className="text-white font-bold text-[15px] leading-tight tracking-tight">{displayProduct.title}</h3>
                    <span className="bg-white/5 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-white/5 font-bold uppercase tracking-wider">Electronics</span>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-[18px] font-bold text-white tracking-tight leading-none">${displayProduct.price}</div>
                      <div className="text-[13px] text-slate-500 line-through font-medium mt-1.5 ml-0.5">${displayProduct.oldPrice}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2.5 mt-1">
                      <div className="bg-white/5 rounded-full px-2.5 py-1.5 flex items-center gap-0.5 border border-white/5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="#FFC107" className="text-[#FFC107]" />
                        ))}
                      </div>
                      <span className="bg-white/5 text-slate-400 text-[10px] px-4 py-1.5 rounded-full border border-white/5 font-bold uppercase tracking-wider mb-1">Amazon Choice</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Row */}
              <div className="flex items-center gap-4 mb-9">
                <div className="bg-[#4B48ED1A] text-white text-[13px] px-3 py-1.5 rounded-full flex items-center gap-2 font-bold border border-[#4B48ED33]">
                  <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
                  <TrendingUp size={14} /> {displayProduct.growth}
                </div>
                <span className="text-slate-500 text-[13px] font-medium">{displayProduct.ratings} ratings</span>
              </div>

              {/* Separator */}
              <div className="border-b border-[#1C263C] mb-10" />

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 mb-12 px-2">
                {[
                  { label: "ASIN", value: displayProduct.asin, icon: Box },
                  { label: "MONTHLY SALES VOL", value: displayProduct.salesVol, icon: BarChart3 },
                  { label: "OFFERS", value: `${displayProduct.offers} sellers`, icon: Percent },
                  { label: "DELIVERY", value: "Free", icon: Truck }
                ].map((m, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div className="!w-12 !h-12 rounded-full quick-action-icon-circle flex items-center justify-center mb-1 text-white shadow-xl">
                      <m.icon size={22} className={i === 2 ? "text-slate-400" : "text-white"} />
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-[0.1em] mb-1">{m.label}</span>
                    <span className="text-[15px] text-white font-bold tracking-tight">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Seller / Shipping Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                  <span className="text-[11px] text-slate-500 uppercase font-bold tracking-widest leading-tight">Seller Name</span>
                  <span className="text-[15px] text-white font-bold tracking-tight">DataVision Computer Video</span>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                  <span className="text-[11px] text-slate-500 uppercase font-bold tracking-widest leading-tight">Ships From</span>
                  <span className="text-[15px] text-white font-bold tracking-tight">DataVision Computer Video</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                    <span className="text-[11px] text-slate-500 font-bold tracking-widest leading-tight">Seller Country</span>
                    <span className="text-[15px] text-white font-bold tracking-tight uppercase">US</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                    <span className="text-[11px] text-slate-500 font-bold tracking-widest leading-tight">Seller Rating</span>
                    <div className="flex items-center gap-2">
                      <div className="!w-6 !h-6 rounded-full flex items-center justify-center quick-action-icon-circle">
                        <Star size={11} className="text-white" />
                      </div>
                      <span className="text-[15px] text-white font-bold tracking-tight">4.0</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                    <span className="text-[11px] text-slate-500 font-bold tracking-widest leading-tight">Item Dimensions</span>
                    <span className="text-[15px] text-white font-bold tracking-tight">9.4×3×1.2 in</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                    <span className="text-[11px] text-slate-500 font-bold tracking-widest leading-tight">Item Weight</span>
                    <span className="text-[15px] text-white font-bold tracking-tight">1.28 oz</span>
                  </div>
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="flex flex-col gap-3 mb-10">
                {['About Product', 'Product Information', 'Product Details'].map((section) => (
                  <div key={section} className="border border-brand-inputBorder rounded-[12px]  overflow-hidden bg-[#04132B]">
                    <button
                      onClick={() => toggleSection(section)}
                      className="w-full flex items-center justify-between p-4 px-6 text-[13px] font-bold text-white hover:bg-white/5 transition-colors"
                    >
                      {section}
                      {expandedSection === section ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                    </button>
                    {expandedSection === section && (
                      <div className="p-6 pt-0 border-t border-white/5 mx-6 py-4">
                        <ul className="flex flex-col gap-3">
                          <li className="flex gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#FF5900] mt-1.5 shrink-0" />
                            <p className="text-[12px] text-slate-400 leading-relaxed font-medium">
                              <span className="text-white font-bold">Hypertension Notifications:</span> Apple Watch Series 11 can spot signs of chronic high blood pressure and notify you of possible hypertension.
                            </p>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Reviews' && (
            <div className="flex flex-col">
              {/* Alert Bar */}
              <div className="bg-[#FF4D4D1A] border border-[#FF4D4D33] rounded-xl p-4 flex items-center gap-3 mb-6">
                <AlertTriangle className="text-[#FF4D4D] shrink-0" size={20} />
                <span className="text-[#FF4D4D] text-[13px] font-medium leading-tight">This product is sold by Amazon and we do not recommend purchasing it.</span>
              </div>

              {/* Summary Card */}
              <div className="bg-[#04132B] border border-brand-inputBorder rounded-[12px] p-6 mb-6 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div>
                    <h3 className="text-white font-bold text-[18px] mb-1">Customer Reviews</h3>
                    <p className="text-slate-500 text-[13px]">Based on verified purchases</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-white text-[32px] font-bold">4.8</span>
                      <span className="text-slate-500 text-[14px]">out of 5</span>
                    </div>
                    <div className="flex gap-0.5 justify-end my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < 4 ? "#FFC107" : "transparent"} className={i < 4 ? "text-[#FFC107]" : "text-slate-600"} />
                      ))}
                    </div>
                    <p className="text-slate-500 text-[12px]">2326 global ratings</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {[
                    { label: '5 star', percent: '73%', width: '73%' },
                    { label: '4 star', percent: '33%', width: '33%' },
                    { label: '3 star', percent: '16%', width: '16%' },
                    { label: '2 star', percent: '7%', width: '7%' },
                    { label: '1 star', percent: '5%', width: '5%' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-slate-400 text-[12px] w-10 shrink-0">{item.label}</span>
                      <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: item.width,
                            background: 'linear-gradient(90.15deg, #2B7FFF -25.84%, #FFFFFF 49.25%, #FF5900 124.33%)'
                          }}
                        />
                      </div>
                      <span className="text-[#4B48ED] text-[12px] font-bold w-10 text-right">{item.percent}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {[1, 2].map((_, idx) => (
                  <div key={idx} className="bg-[#04132B] border border-brand-inputBorder rounded-[12px] p-6 shadow-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#155DFC] flex items-center justify-center text-white font-bold text-[14px]">MJ</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-[15px]">Michael Johnson</span>
                            <span className="verified-badge-premium">
                              <Check size={10} /> Verified
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#FFC107" className="text-[#FFC107]" />)}
                            </div>
                            <span className="text-slate-500 text-[12px]">• February 10, 2026</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-white font-bold text-[16px] mb-3">Upgrading from Series 5 — Absolutely Amazing!</h4>
                    <p className="text-slate-400 text-[13px] leading-relaxed mb-4">
                      I upgraded from my Apple Watch Series 5 (2019) to the Series 11 [GPS 42mm], and it's incredible. The jet black aluminum case with the black sport band looks sleek and feels super comfortable on my wrist. The battery life is noticeably better, and the new health features are game-changing...
                    </p>
                    <button className="text-[#155DFC] text-[13px] font-bold hover:underline">Read more</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Offers' && (
            <div className="flex flex-col">
              {/* Alert Bar */}
              <div className="bg-[#FF4D4D1A] border border-[#FF4D4D33] rounded-xl p-4 flex items-center gap-3 mb-6">
                <AlertTriangle className="text-[#FF4D4D] shrink-0" size={20} />
                <span className="text-[#FF4D4D] text-[13px] font-medium leading-tight">This product is sold by Amazon and we do not recommend purchasing it.</span>
              </div>

              {/* Available Offers Summary */}
              <div className="bg-[#04132B] border border-brand-inputBorder rounded-[20px] p-6 mb-6 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white font-bold text-[18px] mb-1">Available Offers</h3>
                    <p className="text-slate-500 text-[13px]">Compare prices from different sellers</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Best Price</span>
                    <span className="text-[#2B7FFF] text-[28px] font-bold tracking-tight leading-none">$281.21</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "TOTAL OFFERS", value: "8" },
                    { label: "NEW FROM", value: "$299.00" },
                    { label: "USED FROM", value: "$281.21" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-[#081421] p-4 rounded-xl border border-white/5">
                      <span className="text-[9px] text-slate-500 font-black tracking-widest block mb-2 uppercase">{stat.label}</span>
                      <span className="text-white text-[16px] font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offer List */}
              <div className="space-y-4">
                {[1, 2].map((_, idx) => (
                  <div key={idx} className="bg-[#04132B] border border-brand-inputBorder rounded-[12px] p-6 shadow-xl relative overflow-hidden">

                    <div className="grid grid-cols-2 gap-x-12 gap-y-5 mb-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Ships From</span>
                        <span className="text-white text-[15px] font-bold">Amazon.com</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        {idx === 1 ? (
                          <div className="bg-[#1E1B0A] text-[#FFB800] text-[9px] px-2.5 py-0.5 rounded-full border border-[#FFB8004D] font-bold flex items-center gap-1 w-fit ml-auto mb-1 uppercase tracking-wider">
                            <Zap size={10} fill="#FFB800" /> Best Deal
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px] font-bold tracking-wide">Price</span>
                        )}
                        <span className="text-white text-[24px] font-bold tracking-tight leading-none">$299.00</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Minimum Price</span>
                        <span className="text-white text-[15px] font-bold">$399.00</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Rating</span>
                        <div className="flex gap-0.5 justify-end mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill={i < 4 ? "#FFC107" : "transparent"} className={i < 4 ? "text-[#FFC107]" : "text-slate-600"} />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Rating Info</span>
                        <span className="text-white text-[15px] font-bold">3,639 ratings</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Product Condition</span>
                        <span className="text-[#94A3B8] text-[12px] font-bold bg-white/5 px-3 py-0.5 rounded-full w-fit ml-auto">New</span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Seller</span>
                        <span className="text-white text-[15px] font-bold">Amazon.com</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="text-slate-500 text-[11px] font-bold tracking-wide">Delivery Price</span>
                        <span className="text-[#2B7FFF] text-[11px] font-black uppercase tracking-widest bg-[#2B7FFF1A] px-3 py-1 rounded-full w-fit ml-auto border border-[#2B7FFF33]">Free</span>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-5 mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-slate-500 text-[13px] font-medium">
                        <Store size={16} />
                        <span>Sold by Amazon.com</span>
                      </div>
                      <button className="px-6 py-2 rounded-full figma-pill-border text-white text-[13px] font-bold hover:bg-[#2B7FFF1A] transition-all">
                        View Offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-10">
            <button 
              onClick={onDiscoverSuppliers}
              className="bg-brand-gradient py-3 px-8 rounded-full text-white text-[14px] font-bold hover:opacity-90 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Discover Suppliers
            </button>
          </div>
        </div>

      </div>
    </>,
    document.body
  );
};

export default ProductDetailsDrawer;
