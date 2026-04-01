import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrendsPageTemplate from "../shared/TrendsPageTemplate";
import TrendsEmptyState from "../shared/components/TrendsEmptyState";
import TrendsFilterDrawer from "./components/TrendsFilterDrawer";
import TrendProductCard from "./components/TrendProductCard";
import TrendHashtagCard from "./components/TrendHashtagCard";
import TrendsProductDetailsDrawer from "./components/TrendsProductDetailsDrawer";
import tiktokBanner from "../../../assets/images/tiktoktrends.png";
import { Package, Hash } from "lucide-react";
import TrendSkeleton from "./components/TrendSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getTikTokTrendingProducts, getTikTokTrendingHashtags, formatNumber } from "../../../api/tiktokTrends";
import { useUserDetails } from "../../../hooks/useUserDetails";

const TikTokTrends: React.FC = () => {
  const navigate = useNavigate();
  const { data: userDetails } = useUserDetails();
  const [activeTab, setActiveTab] = useState("product");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Filter States
  const [country, setCountry] = useState("US");
  const [period, setPeriod] = useState("30");
  const [category, setCategory] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Product Trends Query
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError
  } = useQuery({
    queryKey: ["tiktok-product-trends", country, period, category, currentSearch, fetchTrigger],
    queryFn: () => getTikTokTrendingProducts({
      country,
      last: period,
      category,
      keyword: currentSearch,
      limit: 20
    }),
    enabled: hasSearched && activeTab === "product",
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  // Hashtag Trends Query
  const {
    data: hashtagData,
    isLoading: isHashtagLoading,
    isError: isHashtagError
  } = useQuery({
    queryKey: ["tiktok-hashtag-trends", country, period, category, fetchTrigger],
    queryFn: () => getTikTokTrendingHashtags({
      country,
      period,
      limit: 20
    }),
    enabled: hasSearched && activeTab === "hashtag",
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentSearch(searchQuery);
    setHasSearched(true);
    setFetchTrigger(prev => prev + 1);
  };

  const handleApplyFilters = () => {
    setFetchTrigger(prev => prev + 1);
  };

  const handleClearFilters = () => {
    setCountry("US");
    setPeriod("30");
    setCategory("");
    setFetchTrigger(prev => prev + 1);
  };

  return (
    <TrendsPageTemplate
      bannerImage={tiktokBanner}
      title="TikTok Trends"
      subtitle="Discover viral products and trending hashtags"
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        setHasSearched(false);
      }}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onSearch={handleSearch}
      hasSearched={hasSearched}
      tabs={[
        { label: "Product Trends", value: "product", icon: "Package" },
        { label: "Hashtag Trends", value: "hashtag", icon: "Hash", showUpgradeBadge: true },
      ]}
      metrics={[
        {
          label: "TikTok Trend Searches",
          value: userDetails?.search_quota.tiktok_searches?.toString() || "0",
          icon: "TrendingUp",
          progress: 100
        },
        {
          label: "Supplier Discoveries",
          value: userDetails?.search_quota.supplier_discovery?.toString() || "0",
          icon: "Store",
          progress: 100
        },
        {
          isAddon: true,
          label: "Add-ons",
          subtitle: "Purchase or Upgrade Plan",
          icon: "ShoppingCart",
          onClick: () => navigate("/addons")
        },
      ]}
      searchPlaceholder={{
        product: "Search for trending products...",
        hashtag: "Search for trending hashtags...",
      }}
      searchBtnText={{
        product: "Discover Trending Products",
        hashtag: "Discover Trending Hashtags",
      }}
      renderContent={(tab, searched, openDetails, setSelectedProduct) => {
        const isLoading = tab === "product" ? isProductLoading : isHashtagLoading;
        const isError = tab === "product" ? isProductError : isHashtagError;
        const data = tab === "product" ? productData?.data?.products : hashtagData?.data?.list;

        if (isLoading) {
          return <TrendSkeleton type={tab as "product" | "hashtag"} count={6} />;
        }

        if (isError) {
          return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-red-400 font-medium text-lg">Oops! Something went wrong.</p>
              <p className="text-slate-500">Please try again later or refine your search.</p>
            </div>
          );
        }

        if (searched && (!data || data.length === 0)) {
          return (
            <TrendsEmptyState
              title="No Results Found"
              description="We couldn't find any trends matching your criteria. Try adjusting your filters or search terms."
              Icon={tab === "product" ? Package : Hash}
            />
          );
        }

        return (
          <>
            {tab === "product" && searched ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((product: any, index: number) => (
                  <TrendProductCard
                    key={product.id || index}
                    title={product.title}
                    image={product.image_url || product.cover_url}
                    category={product.category || product.first_ecom_category?.value || "Trending"}
                    metrics={{
                      ctr: product.ctr || "0.00",
                      cvr: product.cvr || "0.00",
                      cpa: product.cpa || "$0.00",
                      impressions: product.views_count ? formatNumber(product.views_count) : "0"
                    }}
                    price={product.price || product.current_price || "N/A"}
                    onDetailsClick={() => {
                      setSelectedProduct({
                        id: product.product_id || product.id || String(index),
                        title: product.title || product.name,
                        image: product.image_url || product.cover_url || product.image,
                        category: product.category || product.first_ecom_category?.value || "Trending",
                        price: product.price || product.current_price || "N/A",
                        metrics: {
                          ctr: product.ctr || "0.00",
                          cvr: product.cvr || "0.00",
                          cpa: product.cpa || "$0.00",
                          impressions: product.views_count ? formatNumber(product.views_count) : "0"
                        },
                        post_count: product.post_count || 0,
                        review_count: product.review_count || product.reviews_count || 0,
                        comment_count: product.comments_count || 0,
                        like_count: product.likes_count || 0,
                        share_count: product.shares_count || 0,
                        view_count: product.views_count || 0
                      });
                      openDetails();
                    }}
                  />
                ))}
              </div>
            ) : tab === "hashtag" && searched ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[17px] font-bold text-orange-500">{data.length}</span>
                  <span className="text-[15px] font-medium text-slate-300">Hashtags found for your selection</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.map((item: any, index: number) => (
                    <TrendHashtagCard
                      key={index}
                      hashtag={item.hashtag_name || item.hashtag}
                      rank={index + 1}
                    />
                  ))}
                </div>
              </div>
            ) : tab === "product" ? (
              <TrendsEmptyState
                title="Discover Trending Products"
                description="Search for products to see real-time TikTok engagement metrics and viral trends"
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
        );
      }}
      filterDrawer={(isOpen, onClose) => (
        <TrendsFilterDrawer
          isOpen={isOpen}
          onClose={onClose}
          country={country}
          onCountryChange={setCountry}
          period={period}
          onPeriodChange={setPeriod}
          category={category}
          onCategoryChange={setCategory}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      )}
      detailsDrawer={(isOpen, onClose, product) => (
        <TrendsProductDetailsDrawer isOpen={isOpen} onClose={onClose} product={product} country={country} />
      )}
    />
  );
};

export default TikTokTrends;
