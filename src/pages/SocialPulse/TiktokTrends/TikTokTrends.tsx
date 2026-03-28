import React from "react";
import TrendsPageTemplate from "../shared/TrendsPageTemplate";
import TrendsEmptyState from "../shared/components/TrendsEmptyState";
import TrendsFilterDrawer from "./components/TrendsFilterDrawer";
import TrendProductCard from "./components/TrendProductCard";
import TrendHashtagCard from "./components/TrendHashtagCard";
import TrendsProductDetailsDrawer from "./components/TrendsProductDetailsDrawer";
import tiktokBanner from "../../../assets/images/tiktoktrends.png";
import { Package, Hash } from "lucide-react";

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
  return (
    <TrendsPageTemplate
      bannerImage={tiktokBanner}
      title="TikTok Trends"
      subtitle="Discover viral products and trending hashtags"
      tabs={[
        { label: "Product Trends", value: "product", icon: "Package" },
        { label: "Hashtag Trends", value: "hashtag", icon: "Hash", showUpgradeBadge: true },
      ]}
      metrics={[
        { label: "TikTok Trend Searches", value: "260", icon: "TrendingUp", progress: 75 },
        { label: "Supplier Discoveries", value: "612", icon: "Store", progress: 75 },
        { isAddon: true, label: "Add-ons", subtitle: "Purchase or Upgrade Plan", icon: "ShoppingCart" },
      ]}
      searchPlaceholder={{
        product: "Search for trending products...",
        hashtag: "Search for trending hashtags...",
      }}
      searchBtnText={{
        product: "Discover Trending Products",
        hashtag: "Discover Trending Hashtags",
      }}
      renderContent={(activeTab, hasSearched, openDetails, setSelectedProduct) => (
        <>
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
                    setSelectedProduct(product);
                    openDetails();
                  }}
                />
              ))}
            </div>
          ) : activeTab === "hashtag" && hasSearched ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-1">
                <span className="text-[17px] font-bold text-orange-500">8</span>
                <span className="text-[15px] font-medium text-slate-300">Hashtags from Last 120 Days of United States</span>
              </div>
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
            <TrendsEmptyState
              title="Discover Trending Products"
              description="Search for hashtags to see real-time TikTok engagement metrics and viral trends"
              Icon={Package}
            />
          ) : (
            <TrendsEmptyState
              title="Discover Trending Hashtags"
              description="Unlock deep insights into booming TikTok tags, audience demographics, and high-engagement content."
              Icon={Hash}
            />
          )}
        </>
      )}
      filterDrawer={(isOpen, onClose) => (
        <TrendsFilterDrawer isOpen={isOpen} onClose={onClose} />
      )}
      detailsDrawer={(isOpen, onClose, product) => (
        <TrendsProductDetailsDrawer isOpen={isOpen} onClose={onClose} product={product} />
      )}
    />
  );
};

export default TikTokTrends;
