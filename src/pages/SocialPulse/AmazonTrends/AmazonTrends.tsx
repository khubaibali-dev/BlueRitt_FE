import React, { useState } from "react";
import {
  Search,
  Sparkles,
  ChevronDown,
  SlidersHorizontal,
  Crown,
} from "lucide-react";
import AmazonHeader from "./components/AmazonHeader";
import AmazonTabs from "./components/AmazonTabs";
import AmazonMetricCard from "./components/AmazonMetricCard";
import AmazonDiscoveryEmptyState from "./components/AmazonDiscoveryEmptyState";
import AmazonKeywordEmptyState from "./components/AmazonKeywordEmptyState";
import AmazonFilterDrawer from "./components/AmazonFilterDrawer";
import AmazonProductCard from "./components/AmazonProductCard";
import AmazonRankedCard from "./components/AmazonRankedCard";
import AmazonProductDetailsDrawer from "./components/AmazonProductDetailsDrawer";

import amazonBanner from "../../../assets/images/tiktoktrends.png";


const mockGeneralProductData = [
  {
    title: "Wireless Bluetooth Headphones Pro Max",
    category: "Electronics",
    price: "$24.99",
    oldPrice: "$34.99",
    rating: "4.5+",
    views: "12.5K Views",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    metrics: { ctr: "4.12", cvr: "15.40", cpa: "$12.50", impressions: "1.2M" }
  },
  {
    title: "Minimalist Leather Watch Series 7",
    category: "Accessories",
    price: "$24.50",
    oldPrice: "$45.00",
    rating: "4.8+",
    views: "8.2K Views",
    image: "https://images.unsplash.com/photo-1524592093030-057036733ec5?auto=format&fit=crop&q=80&w=600",
    metrics: { ctr: "2.85", cvr: "12.15", cpa: "$25.40", impressions: "512.3K" }
  },
  {
    title: "Eco-Friendly Bamboo Cutting Board Set",
    category: "Kitchen",
    price: "$29.99",
    oldPrice: "$39.99",
    rating: "4.2+",
    views: "15.1K Views",
    image: "https://images.unsplash.com/photo-1584305323473-d3921c172288?auto=format&fit=crop&q=80&w=600",
    metrics: { ctr: "3.20", cvr: "9.80", cpa: "$14.90", impressions: "342.1K" }
  }
];

const mockRankedData = [
  { rank: 1, title: "Portable Blender USB Rechargeable - 380ml", price: "$24.99", oldPrice: "$34.99", rating: "4.5+", ratingCount: "2,326 ratings", image: "https://images.unsplash.com/photo-1584305323473-d3921c172288?auto=format&fit=crop&q=80&w=600" },
  { rank: 2, title: "Portable Blender USB Rechargeable - 380ml", price: "$24.99", oldPrice: "$34.99", rating: "4.5+", ratingCount: "2,326 ratings", image: "https://images.unsplash.com/photo-1584305323473-d3921c172288?auto=format&fit=crop&q=80&w=600" },
  { rank: 3, title: "Portable Blender USB Rechargeable - 380ml", price: "$24.99", oldPrice: "$34.99", rating: "4.5+", ratingCount: "2,326 ratings", image: "https://images.unsplash.com/photo-1584305323473-d3921c172288?auto=format&fit=crop&q=80&w=600" }
];

const AmazonTrends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"product" | "keyword">("product");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(mockGeneralProductData[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    console.log("Searching for:", searchQuery);
  };

  // Dynamic Content based on Active Tab
  const searchPlaceholder = activeTab === "product"
    ? "Search for trending Amazon products..."
    : "Search for trending Amazon keywords...";

  const searchBtnText = activeTab === "product"
    ? "Discover Trending Products"
    : "Discover Trending Keywords";

  return (
    <div className="bg-brand-card-alt rounded-[32px] relative shadow-2xl overflow-hidden flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">

      <section className="tiktok-banner-wrapper relative isolate">
        {/* Background Layer (Absolute) */}
        <div className="absolute inset-0 z-[-1]">
          <img src={amazonBanner} alt="" className="tiktok-banner-image" />
          {/* Bottom Fade - Mirrors Dashboard exactly */}
          <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/5 to-transparent pointer-events-none" />
        </div>

        <div className="w-full max-w-[1240px] z-10 flex flex-col items-start text-left px-6 sm:px-1">
          {/* 1. Module Heading Section */}
          <AmazonHeader
            title="Amazon Trends"
            subtitle="Discover viral products and high-volume keywords"
          />

          {/* 2. Controls Row: Tabs (Left) & Upgrade Button (Right) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              <AmazonTabs
                activeTab={activeTab}
                onTabChange={(tab: any) => {
                  setActiveTab(tab);
                  setHasSearched(false);
                }}
              />
            </div>

            <button className="upgrade-gradient-btn group !rounded-full w-full sm:w-auto shrink-0">
              <Crown size={18} className="text-white group-hover:rotate-12 transition-transform" />
              Upgrade Your Plan
            </button>
          </div>

          {/* 3. Metrics Row (Integrated into Banner Area) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <AmazonMetricCard
              label="Amazon Trend Searches"
              value="154"
              icon="TrendingUp"
              progress={45}
            />
            <AmazonMetricCard
              label="Supplier Discoveries"
              value="423"
              icon="Store"
              progress={60}
            />
            <AmazonMetricCard
              isAddon
              label="Add-ons"
              subtitle="Purchase or Upgrade Plan"
              icon="ShoppingCart"
            />
          </div>
        </div>
      </section>

      {/* 
          MAIN CONTENT AREA
          Contains Search actions and Discovery views
      */}
      <div className="px-6 sm:px-10 mt-10 space-y-12 transition-all">
        {/* Search & Actions Row */}
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Input Container */}
          <div className="flex-1 w-full figma-rect-border group overflow-hidden bg-[#04132B]/50 relative transition-all">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-white transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent py-4 pl-14 pr-6 text-white text-[15px] placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button type="submit" className="upgrade-gradient-btn !px-6 !rounded-[14px] whitespace-nowrap h-[48px] w-full sm:w-auto">
              <Sparkles size={16} />
              {searchBtnText}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button type="button" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-[48px] bg-[#04132B] border border-[#082656] rounded-[14px] text-white text-[13px] font-bold hover:bg-white/5 transition-all whitespace-nowrap">
                Sort By <ChevronDown size={14} className="opacity-50" />
              </button>

              {activeTab === "product" && (
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-[48px] bg-[#04132B] border border-[#082656] rounded-[14px] text-white text-[13px] font-bold hover:bg-white/5 transition-all whitespace-nowrap"
                >
                  Filters <SlidersHorizontal size={14} className="opacity-50" />
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Main Content Area / Product Results / Empty State */}
        <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
          {activeTab === "product" && hasSearched ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockGeneralProductData.map((product: any, index: number) => (
                <AmazonProductCard
                  key={index}
                  title={product.title}
                  image={product.image}
                  category={product.category}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  rating={product.rating}
                  views={product.views}
                  onDetailsClick={() => {
                    setSelectedProduct(product as any);
                    setIsDetailsOpen(true);
                  }}
                />
              ))}
            </div>
          ) : activeTab === "keyword" && hasSearched ? (
            <div className="space-y-6">
              {/* Keyword Search Summary */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[17px] font-bold text-orange-500">8</span>
                <span className="text-[15px] font-medium text-slate-300">Keywords from Last 90 Days in United States</span>
              </div>

              {/* Keyword Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockRankedData.map((item, index) => (
                  <AmazonRankedCard
                    key={index}
                    rank={item.rank}
                    title={item.title}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    rating={item.rating}
                    ratingCount={item.ratingCount}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          ) : activeTab === "product" ? (
            <AmazonDiscoveryEmptyState />
          ) : (
            <AmazonKeywordEmptyState />
          )}
        </div>
      </div>

      {/* Slide-out Components */}
      <AmazonFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <AmazonProductDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        product={selectedProduct as any}
      />
    </div>
  );
};

export default AmazonTrends;
