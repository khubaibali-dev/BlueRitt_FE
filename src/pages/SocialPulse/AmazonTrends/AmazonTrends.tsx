import React from "react";
import TrendsPageTemplate from "../shared/TrendsPageTemplate";
import TrendsEmptyState from "../shared/components/TrendsEmptyState";
import AmazonFilterDrawer from "./components/AmazonFilterDrawer";
import AmazonProductCard from "./components/AmazonProductCard";
import AmazonRankedCard from "./components/AmazonRankedCard";
import AmazonProductDetailsDrawer from "./components/AmazonProductDetailsDrawer";
import amazonBanner from "../../../assets/images/tiktoktrends.png";
import { Package, Hash } from "lucide-react";

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
  return (
    <TrendsPageTemplate
      bannerImage={amazonBanner}
      title="Amazon Trends"
      subtitle="Discover viral products and high-volume keywords"
      tabs={[
        { label: "Product Trends", value: "product", icon: "Package" },
        { label: "Keyword Trends", value: "keyword", icon: "Hash", showUpgradeBadge: true },
      ]}
      metrics={[
        { label: "Amazon Trend Searches", value: "154", icon: "TrendingUp", progress: 45 },
        { label: "Supplier Discoveries", value: "423", icon: "Store", progress: 60 },
        { isAddon: true, label: "Add-ons", subtitle: "Purchase or Upgrade Plan", icon: "ShoppingCart" },
      ]}
      searchPlaceholder={{
        product: "Search for trending Amazon products...",
        keyword: "Search for trending Amazon keywords...",
      }}
      searchBtnText={{
        product: "Discover Trending Products",
        keyword: "Discover Trending Keywords",
      }}
      renderContent={(activeTab, hasSearched, openDetails, setSelectedProduct) => (
        <>
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
                    setSelectedProduct(product);
                    openDetails();
                  }}
                />
              ))}
            </div>
          ) : activeTab === "keyword" && hasSearched ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-1">
                <span className="text-[17px] font-bold text-orange-500">8</span>
                <span className="text-[15px] font-medium text-slate-300">Keywords from Last 90 Days in United States</span>
              </div>
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
            <TrendsEmptyState
              title="Discover Amazon Trends"
              description="Explore the most sought-after products on Amazon with real-time sales data and ranking insights."
              Icon={Package}
            />
          ) : (
            <TrendsEmptyState
              title="Amazon Keyword Analysis"
              description="Identify high-volume search terms and competitive keywords to dominate the Amazon marketplace."
              Icon={Hash}
            />
          )}
        </>
      )}
      filterDrawer={(isOpen, onClose) => (
        <AmazonFilterDrawer isOpen={isOpen} onClose={onClose} />
      )}
      detailsDrawer={(isOpen, onClose, product) => (
        <AmazonProductDetailsDrawer isOpen={isOpen} onClose={onClose} product={product} />
      )}
    />
  );
};

export default AmazonTrends;
