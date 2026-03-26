import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, ChevronDown, List, LayoutGrid, ChevronRight, ChevronLeft, Sparkles, Settings2, ShoppingBag, ShoppingCart } from "lucide-react";
import DiscoveryProductCard from "./DiscoveryProductCard";
import bgAnalysis from "../../../../assets/images/explorer.png";
import ProductDetailsDrawer from "../ProductDetails/ProductDetailsDrawer";
import SupplierSourceLink from "../SourceLink/SupplierSourceLink";
import MetricCard from "../Common/MetricCard";
import CountrySelect from "../../../../components/common/select/CountrySelect";
import SelectField from "../../../../components/common/select/SelectField";
import SourceLinkProfitCalculator from "../SourceLink/SourceLinkProfitCalculator";

interface DiscoveryResultsProps {
   onBack: () => void;
}

const DiscoveryResults: React.FC<DiscoveryResultsProps> = ({ onBack }) => {
   const location = useLocation();
   const navigate = useNavigate();
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
   const [country, setCountry] = useState("Pakistan");
   const [searchType, setSearchType] = useState("Product");
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<any>(null);
   const [showSourceLink, setShowSourceLink] = useState(false);
   const [sourceProduct, setSourceProduct] = useState<any>(null);
   const [showProfitCalc, setShowProfitCalc] = useState(false);
   const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

   useEffect(() => {
      if (location.state?.autoSourceLink && location.state?.product) {
         setSourceProduct(location.state.product);
         setShowSourceLink(true);
      }
   }, [location.state]);

   const handleOpenSourceLink = (product: any) => {
      setSourceProduct(product);
      setShowSourceLink(true);
      setIsDrawerOpen(false); // Close drawer if open
   };

   const handleOpenDetails = (product: any) => {
      setSelectedProduct(product);
      setIsDrawerOpen(true);
   };

   const handleOpenProfitCalc = (supplier: any) => {
      setSelectedSupplier(supplier);
      setShowProfitCalc(true);
   };

   // Mock Data for the 6 metrics in the analytical row
   const metrics = [
      { label: "Competing Products", value: "49,791", icon: "Box" },
      { label: "Avg. Price", value: "$212.4", icon: "DollarSign" },
      { label: "Avg. Rating", value: "4.0", icon: "Percent" },
      { label: "Avg. Reviews", value: "4,262", icon: "MessageSquare" },
      { label: "Avg. Monthly Revenue", value: "$195,727.9", icon: "TrendingUp" },
      { label: "Total Annual Revenue", value: "$2,387,880.1", icon: "BarChart3" },
   ];

   // Mock Data for Products
   const products = [
      {
         title: "Portable Blender USB Rechargeable - 380ml",
         image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=1000&auto=format&fit=crop",
         price: "24.99",
         oldPrice: "34.99",
         growth: "+142%",
         ratings: "2,326",
         asin: "B0FQF5BZ82",
         offers: "7",
         salesVol: "10,000/mo",
         tags: ["Electronics", "Amazon Choice"],
         rating: 4.5
      },
      {
         title: "Portable Blender USB Rechargeable - 380ml",
         image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=1000&auto=format&fit=crop",
         price: "24.99",
         oldPrice: "34.99",
         growth: "+142%",
         ratings: "2,326",
         asin: "B0FQF5BZ82",
         offers: "7",
         salesVol: "10,000/mo",
         tags: ["Electronics", "Amazon Choice"],
         rating: 4.5
      },
      {
         title: "Portable Blender USB Rechargeable - 380ml",
         image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?q=80&w=1000&auto=format&fit=crop",
         price: "24.99",
         oldPrice: "34.99",
         growth: "+142%",
         ratings: "2,326",
         asin: "B0FQF5BZ82",
         offers: "7",
         salesVol: "10,000/mo",
         tags: ["Electronics", "Amazon Choice"],
         rating: 4.5
      }
   ];

   if (showProfitCalc) {
      return (
         <SourceLinkProfitCalculator
            product={sourceProduct}
            supplier={selectedSupplier}
            onBack={() => setShowProfitCalc(false)}
         />
      );
   }

   if (showSourceLink) {
      return (
         <SupplierSourceLink 
            product={sourceProduct} 
            onBack={() => {
               if (location.state?.autoSourceLink) {
                  navigate(-1);
               } else {
                  setShowSourceLink(false);
               }
            }} 
            onCalculateProfit={handleOpenProfitCalc}
         />
      );
   }

   return (
      <div className="discovery-results px-6 sm:px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full overflow-hidden relative bg-[#030F23] rounded-[24px] isolate">
         {/* Background Image Layer with Bottom Fade - Perfectly Blended like Product Analysis */}
         <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
            <img src={bgAnalysis} alt="" className="w-full h-full object-cover object-top opacity-100 mix-blend-screen" />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#030F23] via-[#030F23]/30 to-transparent" />
         </div>

         {/* Back Button */}
         <button
            onClick={onBack}
            className="mb-6 text-white hover:text-slate-300 transition-colors flex items-center gap-1 text-[12px] font-bold group"
         >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Explorer
         </button>

         {/* Top Header Row */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="discovery-top-card-premium">
               <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="quick-action-icon-circle">
                        <Search size={20} className="text-white" />
                     </div>
                     <span className="text-white font-semibold text-[15px] tracking-tight">Product Searches</span>
                  </div>
                  <span className="text-[26px] font-bold" style={{ color: '#FF5900' }}>612</span>
               </div>
            </div>
            <div className="discovery-top-card-premium">
               <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="quick-action-icon-circle">
                        <ShoppingBag size={20} className="text-white" />
                     </div>
                     <span className="text-white font-semibold text-[15px] tracking-tight">Supplier Discoveries</span>
                  </div>
                  <span className="text-[26px] font-bold" style={{ color: '#FF5900' }}>612</span>
               </div>
            </div>
            <div className="discovery-top-card-premium">
               <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className="quick-action-icon-circle">
                        <ShoppingCart size={20} className="text-white" />
                     </div>
                     <span className="text-white font-semibold text-[15px] tracking-tight">Add-ons</span>
                  </div>
                  <button className="font-bold text-[16px] hover:opacity-80 transition-opacity whitespace-nowrap" style={{ color: '#FF5900' }}>
                     Purchase Add Ons
                  </button>
               </div>
            </div>
         </div>

         {/* Main Filter Bar */}
         <div className="flex flex-col lg:flex-row gap-3 mb-10 items-center px-1">
            <div className="flex gap-2 shrink-0">
               <div className="w-[160px]">
                  <CountrySelect
                     value={country}
                     onChange={(c) => setCountry(c.name)}
                  />
               </div>
               <div className="w-[130px]">
                  <SelectField
                     id="search-type"
                     value={searchType}
                     onChange={(v) => setSearchType(v)}
                     options={[
                        { label: "Product", value: "Product" },
                        { label: "Supplier", value: "Supplier" },
                        { label: "Brand", value: "Brand" }
                     ]}
                  />
               </div>
            </div>
            <div className="flex-1 relative w-full figma-card-border overflow-hidden">
               <div className="relative  rounded-xl flex items-center h-[52px] px-4 ">
                  <Search className="text-slate-300 mr-2" size={18} />
                  <input
                     type="text"
                     placeholder="Blender.."
                     className="bg-transparent border-none w-full text-white placeholder:text-slate-300 focus:outline-none text-[15px] font-medium"
                  />
               </div>
            </div>
            <div className="flex gap-2 shrink-0">
               <button className="bg-brand-gradient text-white px-5 h-[48px] rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-all sm:w-full w-[180px]">
                  <Sparkles size={16} fill="white" className="text-white" /> Search with AI
               </button>
               <button className="bg-[#1A1A2E]/60 backdrop-blur-sm border border-brand-inputBorder h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all hover:bg-white/10">
                  <span className="text-[14px] font-semibold">Filters</span>
                  <Settings2 size={16} />
               </button>
            </div>
         </div>

         {/* Analytics Row */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            {metrics.map((m, i) => (
               <MetricCard key={i} {...m} />
            ))}
         </div>

         <div className="flex justify-end mb-10 px-2 mt-4">
            <button className="bg-white/5 figma-pill-border rounded-full px-5 py-2 flex items-center gap-2 text-[12px] font-bold text-white hover:bg-white/10 transition-all group">
               Search Volume <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         {/* Results Controls */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0 mb-8 px-2">
            <div>
               <h2 className="text-[24px] sm:text-[28px] text-white tracking-tight leading-tight mb-1">Discovery Results</h2>
               <p className="text-[14px] sm:text-[15px] text-white/60 font-medium">6 products match your query</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="bg-[#121223] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 text-white text-[13px] sm:text-[14px] font-bold hover:bg-white/5 transition-all">
                  Sort by <ChevronDown size={14} className="opacity-60" />
               </button>
               <div className="bg-[#121223] border border-white/10 rounded-xl flex p-1">
                  <button
                     onClick={() => setViewMode('grid')}
                     className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  >
                     <LayoutGrid size={18} />
                  </button>
                  <button
                     onClick={() => setViewMode('list')}
                     className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  >
                     <List size={18} />
                  </button>
               </div>
            </div>
         </div>

         {/* Product Grid / List Container */}
         <div className={
            viewMode === 'grid'
               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
               : "flex flex-col gap-6 mb-12"
         }>
            {products.map((p, i) => (
               <DiscoveryProductCard
                  key={i}
                  {...p}
                  viewMode={viewMode}
                  onDetailsClick={() => handleOpenDetails(p)}
                  onDiscoverSuppliers={() => handleOpenSourceLink(p)}
               />
            ))}
         </div>

         {/* Product Details Side Drawer */}
         <ProductDetailsDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onDiscoverSuppliers={() => handleOpenSourceLink(selectedProduct)}
            product={selectedProduct}
         />

         <style>{`
        .discovery-top-card-premium {
           @apply bg-[#0C0E1E] border border-white/10 rounded-[20px] p-6 shadow-2xl;
        }
        .discovery-filter-select-premium {
           @apply bg-[#0F0F1E] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-4 hover:border-white/30 transition-all shadow-inner;
        }
      `}</style>
      </div>
   );
};

export default DiscoveryResults;
