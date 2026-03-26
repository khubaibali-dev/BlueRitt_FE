import React, { useState } from "react";
import {
  Search,
  Sparkles,
  ChevronDown,
  SlidersHorizontal,
  Crown,
} from "lucide-react";
import TrendsHeader from "./components/TrendsHeader";
import SocialPulseTabs from "./components/SocialPulseTabs";
import TrendsMetricCard from "./components/TrendsMetricCard";
import DiscoveryEmptyState from "./components/DiscoveryEmptyState";
import HashtagEmptyState from "./components/HashtagEmptyState";
import TrendsFilterDrawer from "./components/TrendsFilterDrawer";
import TrendProductCard from "./components/TrendProductCard";
import TrendHashtagCard from "./components/TrendHashtagCard";
import TrendsProductDetailsDrawer from "./components/TrendsProductDetailsDrawer";

import tiktokBanner from "../../../assets/images/tiktoktrends.png";

const mockHashtagData = [
  { hashtag: "fashiontrends", rank: 1 },
  { hashtag: "tiktokmademebuyit", rank: 2 },
  { hashtag: "amazonfinds", rank: 3 },
  { hashtag: "techgadgets", rank: 4 },
  { hashtag: "beautymusthaves", rank: 5 },
  { hashtag: "homedecor", rank: 6 },
  { hashtag: "fitnessgear", rank: 7 },
  { hashtag: "viralproducts", rank: 8 },
];

const mockProductData = [
  {
    title: "Wireless Bluetooth Headphones Pro Max",
    category: "Electronics",
    price: "$10.90",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    metrics: { ctr: "2.18", cvr: "10.44", cpa: "$47.57", impressions: "479.6K" }
  },
  {
    title: "Minimalist Leather Watch Series 7",
    category: "Accessories",
    price: "$24.50",
    image: "https://images.unsplash.com/photo-1524592093030-057036733ec5?auto=format&fit=crop&q=80&w=600",
    metrics: { ctr: "1.92", cvr: "8.15", cpa: "$32.40", impressions: "215.3K" }
  },
  {
    title: "Nordicin Silk Scarf Collection",
    category: "Fashion",
    price: "$89.00",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600",
    metrics: { ctr: "3.45", cvr: "12.20", cpa: "$18.90", impressions: "892.1K" }
  }
];

const TikTokTrends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"product" | "hashtag">("product");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(mockProductData[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    console.log("Searching for:", searchQuery);
  };

  // Dynamic Content based on Active Tab
  const searchPlaceholder = activeTab === "product"
    ? "Search for trending products..."
    : "Search for trending hashtags...";

  const searchBtnText = activeTab === "product"
    ? "Discover Trending Products"
    : "Discover Trending Hashtags";

  return (
    <div className="bg-brand-card-alt rounded-[32px] relative shadow-2xl overflow-hidden flex flex-col w-full animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">

      <section className="tiktok-banner-wrapper relative isolate">
        {/* Background Layer (Absolute) */}
        <div className="absolute inset-0 z-[-1]">
          <img src={tiktokBanner} alt="" className="tiktok-banner-image" />
          {/* Bottom Fade - Mirrors Dashboard exactly */}
          <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/5 to-transparent pointer-events-none" />
        </div>

        <div className="w-full max-w-[1240px] z-10 flex flex-col items-start text-left px-6 sm:px-1">
          {/* 1. Module Heading Section */}
          <TrendsHeader
            title="TikTok Trends"
            subtitle="Discover viral products and trending hashtags"
          />

          {/* 2. Controls Row: Tabs (Left) & Upgrade Button (Right) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              <SocialPulseTabs
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
            <TrendsMetricCard
              label="TikTok Trend Searches"
              value="260"
              icon="TrendingUp"
              progress={75}
            />
            <TrendsMetricCard
              label="Supplier Discoveries"
              value="612"
              icon="Store"
              progress={75}
            />
            <TrendsMetricCard
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

              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 h-[48px] bg-[#04132B] border border-[#082656] rounded-[14px] text-white text-[13px] font-bold hover:bg-white/5 transition-all whitespace-nowrap"
              >
                Filters <SlidersHorizontal size={14} className="opacity-50" />
              </button>
            </div>
          </div>
        </form>

        {/* Main Content Area / Product Results / Empty State */}
        <div className="animate-in fade-in zoom-in-95 duration-500 pb-10">
          {activeTab === "product" && hasSearched ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockProductData.map((product, index) => (
                <TrendProductCard
                  key={index}
                  title={product.title}
                  image={product.image}
                  category={product.category}
                  metrics={product.metrics}
                  price={product.price}
                  onDetailsClick={() => {
                    setSelectedProduct(product as any);
                    setIsDetailsOpen(true);
                  }}
                />
              ))}
            </div>
          ) : activeTab === "hashtag" && hasSearched ? (
            <div className="space-y-6">
              {/* Hashtag Search Summary */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[17px] font-bold text-orange-500">8</span>
                <span className="text-[15px] font-medium text-slate-300">Hashtags from Last 120 Days of United States</span>
              </div>

              {/* Hashtag Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockHashtagData.map((item, index) => (
                  <TrendHashtagCard
                    key={index}
                    hashtag={item.hashtag}
                    rank={item.rank}
                  />
                ))}
              </div>
            </div>
          ) : activeTab === "product" ? (
            <DiscoveryEmptyState />
          ) : (
            <HashtagEmptyState />
          )}
        </div>
      </div>

      {/* Slide-out Components */}
      <TrendsFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <TrendsProductDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        product={selectedProduct as any}
      />
    </div>
  );
};

export default TikTokTrends;
