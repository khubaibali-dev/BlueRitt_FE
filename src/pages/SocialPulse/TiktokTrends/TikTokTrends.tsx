import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrendsPageTemplate from "../shared/TrendsPageTemplate";
import TrendsEmptyState from "../shared/components/TrendsEmptyState";
import TrendProductCard from "./components/TrendProductCard";
import TrendHashtagCard from "./components/TrendHashtagCard";
import TrendSkeleton from "./components/TrendSkeleton";
import TrendsProductDetailsDrawer from "./components/TrendsProductDetailsDrawer";
import TrendsFilterDrawer from "./components/TrendsFilterDrawer";
import { useQuery } from "@tanstack/react-query";
import { getTikTokTrendingProducts, getTikTokCreativeCenterProducts, getTikTokTrendingHashtags, formatNumber } from "../../../api/tiktokTrends";
import { useUserDetails } from "../../../hooks/useUserDetails";
import SupplierSourceLink from "../../Explorer/components/SourceLink/SupplierSourceLink";
import SourceLinkProfitCalculator from "../../Explorer/components/SourceLink/SourceLinkProfitCalculator";
import AnalyzingScreen from "../../Explorer/components/Discovery/AnalyzingScreen";
import { aliBabaProductMatcher } from "../../../api/product";
import { Package, Hash, ChevronRight } from "lucide-react";
import tiktokBanner from "../../../assets/images/tiktoktrends.png";

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
  const [sortBy, setSortBy] = useState("post");
  
  // Applied Filter States
  const [appliedCountry, setAppliedCountry] = useState("US");
  const [appliedPeriod, setAppliedPeriod] = useState("30");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [appliedSortBy, setAppliedSortBy] = useState("post");
  const [sortOrder, setSortOrder] = useState("desc");
  const [appliedSortOrder, setAppliedSortOrder] = useState("desc");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Discovery View States
  const [view, setView] = useState<"list" | "discovery">("list");
  const [selectedProductForDiscovery, setSelectedProductForDiscovery] = useState<any>(null);
  const [discoverySuppliers, setDiscoverySuppliers] = useState<any[]>([]);
  const [showProfitCalc, setShowProfitCalc] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Product Trends Query
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError
  } = useQuery({
    queryKey: ["tiktokTrendingProducts", activeTab, appliedCountry, appliedPeriod, appliedCategory, appliedSortBy, currentSearch, fetchTrigger],
    queryFn: () => getTikTokTrendingProducts({
      keyword: currentSearch,
      country: appliedCountry,
      last: appliedPeriod,
      category: appliedCategory,
      order_by: appliedSortBy,
      order_type: appliedSortOrder,
      limit: 50
    }),
    enabled: hasSearched && activeTab === "product"
  });

  // Hashtag Trends Query
  const {
    data: hashtagData,
    isLoading: isHashtagLoading,
    isError: isHashtagError
  } = useQuery({
    queryKey: ["tiktokTrendingHashtags", appliedCountry, appliedPeriod, appliedCategory, currentSearch, fetchTrigger],
    queryFn: () => getTikTokTrendingHashtags({
      country: appliedCountry,
      period: appliedPeriod,
      industry_id: appliedCategory,
      limit: 50
    }),
    enabled: hasSearched && activeTab === "hashtag"
  });

  const handleSearch = () => {
    setCurrentSearch(searchQuery);
    setHasSearched(true);
    setAppliedCountry(country);
    setAppliedPeriod(period);
    setAppliedCategory(category);
    setAppliedSortBy(sortBy);
    setAppliedSortOrder(sortOrder);
    setFetchTrigger(prev => prev + 1);
    setSelectedProductForDiscovery(null);
    setDiscoverySuppliers([]);
  };

  const handleApplyFilters = () => {
    setAppliedCountry(country);
    setAppliedPeriod(period);
    setAppliedCategory(category);
    setAppliedSortBy(sortBy);
    setAppliedSortOrder(sortOrder);
    setFetchTrigger(prev => prev + 1);
  };

  const handleClearFilters = () => {
    setCountry("US");
    setPeriod("30");
    setCategory("");
    setSortBy("post");
    setSortOrder("desc");
    setAppliedCountry("US");
    setAppliedPeriod("30");
    setAppliedCategory("");
    setAppliedSortBy("post");
    setAppliedSortOrder("desc");
    setFetchTrigger(prev => prev + 1);
  };

  const handleDiscoverSupplier = async (product: any) => {
    setIsAnalyzing(true);
    
    // First, fetch enriched metrics from Creative Center API
    let enrichedProduct = { ...product };
    try {
      const creativeResults = await getTikTokCreativeCenterProducts({
        keyword: product.title || product.item_title,
        country: appliedCountry,
        limit: 1
      });
      
      const creativeProduct = creativeResults?.products?.[0];
      if (creativeProduct && creativeProduct.metrics) {
        enrichedProduct = {
          ...enrichedProduct,
          metrics: creativeProduct.metrics
        };
      }
    } catch (error) {
      console.error("Failed to fetch creative metrics:", error);
    }

    setSelectedProductForDiscovery(enrichedProduct);

    try {
      const response = await aliBabaProductMatcher({
        asin: "tiktok-product",
        title: product.item_title || product.title,
        country: country || "US",
        limit: 25,
        min_rating: 4.3
      });

      const suppliers = response.data?.data?.suppliers || response.data?.suppliers || [];
      setDiscoverySuppliers(suppliers);
      setView("discovery");
    } catch (error) {
      console.error("Discovery error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (showProfitCalc && selectedProductForDiscovery && selectedSupplier) {
    return (
      <SourceLinkProfitCalculator
        product={selectedProductForDiscovery}
        supplier={selectedSupplier}
        sourceType="tiktok"
        onBack={() => setShowProfitCalc(false)}
      />
    );
  }

  if (view === "discovery" && selectedProductForDiscovery) {
    return (
      <SupplierSourceLink
        product={selectedProductForDiscovery}
        suppliers={discoverySuppliers}
        sourceType="tiktok"
        onBack={() => setView("list")}
        onCalculateProfit={(supplier) => {
          setSelectedSupplier(supplier);
          setShowProfitCalc(true);
        }}
      />
    );
  }

  return (
    <TrendsPageTemplate
      bannerImage={tiktokBanner}
      title="TikTok Trends"
      subtitle="Discover viral products and trending hashtags"
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        setSearchQuery("");
        setCurrentSearch("");
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
          label: activeTab === "hashtag" ? "Hashtag Trend Searches" : "TikTok Trend Searches",
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
      metricsAction={
        selectedProductForDiscovery && discoverySuppliers.length > 0 ? (
          <button
            onClick={() => setView('discovery')}
            className="bg-white/5 figma-pill-border rounded-full px-5 py-2 flex items-center gap-2 text-[12px] font-semibold text-white hover:bg-white/10"
          >
            Next <ChevronRight size={14} />
          </button>
        ) : undefined
      }
      searchPlaceholder={{
        product: "Search for trending products...",
        hashtag: "Search for trending hashtags...",
      }}
      searchBtnText={{
        product: "Discover Trending Products",
        hashtag: "Discover Trending Hashtags",
      }}
      detailsDrawer={(isOpen, onClose, product) => (
        <TrendsProductDetailsDrawer
          isOpen={isOpen}
          onClose={onClose}
          product={product}
          country={country}
          onDiscoverSupplier={() => handleDiscoverSupplier(product)}
        />
      )}
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
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onApply={() => {
            handleApplyFilters();
            onClose();
          }}
          onClear={() => {
            handleClearFilters();
            onClose();
          }}
        />
      )}
      renderContent={(tab, searched, openDetails, setProduct) => {
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
                      impressions: product.views_count ? formatNumber(product.views_count) : "0",
                      post_count: product.post_count || 0,
                      like_count: product.likes_count || product.like_count || 0,
                      share_count: product.shares_count || product.share_count || 0,
                      comment_count: product.comments_count || product.comment_count || 0,
                      category: product.first_ecom_category?.value || "Trending",
                      subcategory1: product.second_ecom_category?.value || "N/A",
                      subcategory2: product.third_ecom_category?.value || "N/A",
                      e_com_type: product.ecom_type ? product.ecom_type.toUpperCase() : "N/A"
                    }}
                    price={product.price || product.current_price || "N/A"}
                    onDetailsClick={() => {
                      const normalizedProduct = {
                        id: product.product_id || product.id || String(index),
                        title: product.title || product.name,
                        image: product.image_url || product.cover_url || product.image,
                        category: product.category || product.first_ecom_category?.value || "Trending",
                        price: product.price || product.current_price || "N/A",
                        metrics: {
                          ctr: product.ctr || "0.00",
                          cvr: product.cvr || "0.00",
                          cpa: product.cpa || "$0.00",
                          impressions: product.views_count ? formatNumber(product.views_count) : "0",
                          post_count: product.post_count || 0,
                          like_count: product.likes_count || product.like_count || 0,
                          share_count: product.shares_count || product.share_count || 0,
                          comment_count: product.comments_count || product.comment_count || 0,
                          category: product.first_ecom_category?.value || "Trending",
                          subcategory1: product.second_ecom_category?.value || "N/A",
                          subcategory2: product.third_ecom_category?.value || "N/A",
                          e_com_type: product.ecom_type ? product.ecom_type.toUpperCase() : "N/A"
                        },
                        post_count: product.post_count || 0,
                        review_count: product.review_count || product.reviews_count || 0,
                        comment_count: product.comments_count || 0,
                        like_count: product.likes_count || 0,
                        share_count: product.shares_count || 0,
                        view_count: product.views_count || 0
                      };
                      setProduct(normalizedProduct);
                      openDetails();
                    }}
                    onDiscoverSupplier={() => {
                      handleDiscoverSupplier({
                        id: product.product_id || product.id || String(index),
                        title: product.title || product.name,
                        image: product.image_url || product.cover_url || product.image,
                        category: product.category || product.first_ecom_category?.value || "Trending",
                        price: product.price || product.current_price || "N/A",
                        metrics: {
                          ctr: product.ctr || "0.00",
                          cvr: product.cvr || "0.00",
                          cpa: product.cpa || "$0.00",
                          impressions: product.views_count ? formatNumber(product.views_count) : "0",
                          post_count: product.post_count || 0,
                          like_count: product.likes_count || product.like_count || 0,
                          share_count: product.shares_count || product.share_count || 0,
                          comment_count: product.comments_count || product.comment_count || 0,
                          category: product.first_ecom_category?.value || "Trending",
                          subcategory1: product.second_ecom_category?.value || "N/A",
                          subcategory2: product.third_ecom_category?.value || "N/A",
                          e_com_type: product.ecom_type ? product.ecom_type.toUpperCase() : "N/A"
                        }
                      });
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
      analyzingScreen={
        isAnalyzing && (
          <AnalyzingScreen
            onCancel={() => setIsAnalyzing(false)}
            isDetailed={false}
          />
        )
      }
    />
  );
};

export default TikTokTrends;
