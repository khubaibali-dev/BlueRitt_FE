import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TrendsPageTemplate from "../shared/TrendsPageTemplate";
import TrendsEmptyState from "../shared/components/TrendsEmptyState";
import SpkbgCard from "../../../components/common/SpkCards/SpkbgCard";
import AmazonRankedCard from "./components/AmazonRankedCard";
import AmazonProductDetailsDrawer from "./components/AmazonProductDetailsDrawer";
import amazonBanner from "../../../assets/images/tiktoktrends.png";
import socialpulseLight from "../../../assets/images/SocialPulse-light.png";
import { Package, Hash, ChevronRight, } from "lucide-react";
import {
  amazonCountryOptions,
  amazonTrendTypeOptions,
  amazonSortOptions,
  COUNTRY_OPTIONS
} from "../../../utils/amazonFilterOptions";
import SelectField from "../../../components/common/select/SelectField";
import {
  getTrendingProducts,
  amazonTrendsSearch,
  getAmazonTrendsBestSellers,
  getAmazonTrendsProductsByCategory,
  getAmazonTrendsProductDetails
} from "../../../api/amazonTrends";
import { getAmazonCategoriesandSubcategories, aliBabaProductMatcher } from "../../../api/product";
import { useQuery } from "@tanstack/react-query";
import { useUserDetails } from "../../../hooks/useUserDetails";
import TrendSkeleton from "../TiktokTrends/components/TrendSkeleton";
import SupplierSourceLink from "../../Explorer/components/SourceLink/SupplierSourceLink";
import SourceLinkProfitCalculator from "../../Explorer/components/SourceLink/SourceLinkProfitCalculator";
import AnalyzingScreen from "../../Explorer/components/Discovery/AnalyzingScreen";

const AmazonTrends: React.FC = () => {
  const navigate = useNavigate();
  const { data: userDetails, refetch: refetchUserDetails } = useUserDetails();

  // Filter States
  const [country, setCountry] = useState("US");
  const [marketplace, setMarketplace] = useState("US");
  const [trendType, setTrendType] = useState("trending");
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Search & Content States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("product");
  const [hasSearched, setHasSearched] = useState(false);

  // Active search parameters (only update on Search Click)
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState("US");
  const [activeTrendType, setActiveTrendType] = useState("trending");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("all");

  const [totalResults, setTotalResults] = useState(0);

  // Discovery View States
  const [view, setView] = useState<"list" | "discovery">("list");
  const [selectedProductForDiscovery, setSelectedProductForDiscovery] = useState<any>(null);
  const [discoverySuppliers, setDiscoverySuppliers] = useState<any[]>([]);
  const [showProfitCalc, setShowProfitCalc] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDetailedLoading, setIsDetailedLoading] = useState(false);

  // Main Data Fetching Logic (Explorer Standard)
  const { data: searchResponse, isLoading, isError } = useQuery({
    queryKey: ["amazon-trends", activeTab, activeSearchQuery, activeCountry, activeTrendType, activeCategory, activeSubCategory, sortBy],
    queryFn: async () => {
      const effectiveCategory = activeSubCategory !== 'all' ? activeSubCategory : (activeCategory !== 'all' ? activeCategory : undefined);
      let results;

      // Handle Tab Switching
      if (activeTab === "keyword") {
        // Force Best Sellers API for the second tab
        results = await getAmazonTrendsBestSellers({
          country: activeCountry,
          category: effectiveCategory || 'amazon-devices', // Default to amazon-devices as requested
          type: 'BEST_SELLERS'
        });
      } else if (activeSearchQuery) {
        results = await amazonTrendsSearch({
          query: activeSearchQuery,
          country: activeCountry,
          category: effectiveCategory,
          sort_by: sortBy === 'default' ? 'RELEVANCE' : sortBy,
          product_condition: 'ALL',
          deals_and_discounts: 'NONE',
          min_star_rating: 0,
          max_star_rating: 5,
          min_reviews: 0,
          max_reviews: 99999990,
          is_prime: false
        });
      } else if (effectiveCategory) {
        results = await getAmazonTrendsProductsByCategory({
          category_id: effectiveCategory,
          country: activeCountry,
          sort_by: sortBy === 'default' ? 'RELEVANCE' : sortBy,
          product_condition: 'NEW',
          deals_and_discounts: 'NONE',
          min_star_rating: 0,
          min_reviews: 0,
          max_star_rating: 5,
          max_reviews: 99999990,
        });
      } else {
        if (activeTrendType === "trending") {
          results = await getTrendingProducts({
            country: activeCountry,
            category: effectiveCategory
          });
        } else {
          results = await getAmazonTrendsBestSellers({
            country: activeCountry,
            category: effectiveCategory,
            type: activeTrendType.toUpperCase()
          });
        }
      }

      // Update total results count from the response
      const total = (results as any)?.data?.total || (results as any)?.total || 0;
      setTotalResults(total);

      // Refetch user details to update search quotas
      refetchUserDetails();

      // Return the products array
      const products = (results.data as any)?.products || (results.data as any)?.best_sellers || results.data || [];
      return Array.isArray(products) ? products : [];
    },
    enabled: hasSearched,
  });

  const data = searchResponse || [];

  // Refetch user details when search data changes to update metrics
  React.useEffect(() => {
    if (data.length > 0) {
      refetchUserDetails();
    }
  }, [data, refetchUserDetails]);

  // Fetch Categories from API (Explorer standard)
  const { data: categoriesData } = useQuery({
    queryKey: ["amazon-categories", country],
    queryFn: () => getAmazonCategoriesandSubcategories(country),
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });

  const categoriesList = useMemo(() => {
    const list: any[] = [{ label: "All Categories", value: "all" }];
    if (categoriesData?.data?.res) {
      categoriesData.data.res.forEach((cat: any) => {
        list.push({
          label: cat.category,
          value: cat.category,
        });
      });
    }
    return list;
  }, [categoriesData]);

  const subCategoriesList = useMemo(() => {
    if (category === "all" || !categoriesData?.data?.res) return [{ label: "All Subcategories", value: "all" }];
    const categoryData = categoriesData.data.res.find((cat: any) => cat.category === category);
    if (categoryData && categoryData.subcategories) {
      return [
        { label: "All Subcategories", value: "all" },
        ...categoryData.subcategories.map((sub: any) => ({
          label: sub.subcategory_name,
          value: sub.ids.subcategory_id,
        })),
      ];
    }
    return [{ label: "All Subcategories", value: "all" }];
  }, [category, categoriesData]);

  // Handle Category Change (Resets Subcategory and Search)
  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setSubCategory("all");
    setSearchQuery("");
  };

  const handleSubCategoryChange = (val: string) => {
    setSubCategory(val);
    setSearchQuery("");
  };

  const handleCountryChange = (val: string) => {
    setCountry(val);
    setSearchQuery("");
  };

  const handleTrendTypeChange = (val: string) => {
    setTrendType(val);
    setSearchQuery("");
  };

  const handleMarketplaceChange = (val: string) => {
    setMarketplace(val);
    if (activeTab === "keyword") {
      setActiveCountry(val);
    }
  };

  // Handle Search Trigger
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Synchronize current inputs to active search parameters (triggers useQuery)
    setActiveSearchQuery(searchQuery);
    setActiveCountry(activeTab === "product" ? country : marketplace);
    setActiveTrendType(trendType);
    setActiveCategory(category);
    setActiveSubCategory(subCategory);

    setHasSearched(true);
  };

  const handleDiscoverSupplier = async (product: any) => {
    setIsAnalyzing(true);
    setIsDetailedLoading(false); // Reset first

    let enrichedProduct = { ...product };
    try {
      // Step 1: Fetch details (Set detailed loading for this phase)
      setIsDetailedLoading(true);

      const detailResponse = await getAmazonTrendsProductDetails({
        asin: product.asin,
        country: activeCountry || "US"
      });

      const details = detailResponse?.data;
      if (details) {
        enrichedProduct = {
          ...enrichedProduct,
          product_seller_name: details.product_seller_name || details.seller?.name || enrichedProduct.product_seller_name,
          ships_from: details.ships_from || details.delivery?.ships_from || enrichedProduct.ships_from,
          product_information: details.product_information || details.product_details || {},
          sales_volume: details.sales_volume || enrichedProduct.sales_volume,
          product_star_rating: details.product_star_rating || enrichedProduct.rating,
          product_num_ratings: details.product_num_ratings || enrichedProduct.numRatings,
          product_url: details.product_url || enrichedProduct.product_url
        };
      }
    } catch (error) {
      console.error("Enrichment error:", error);
    }

    setSelectedProductForDiscovery(enrichedProduct);

    try {
      // Step 2: Product Matching (Detailed loading stays true)
      const response = await aliBabaProductMatcher({
        asin: product.asin,
        title: product.title || product.product_title,
        country: activeCountry || "US",
        limit: 25,
        min_rating: 4.3
      });

      const suppliers = response.data?.data?.suppliers || response.data?.suppliers || [];
      setDiscoverySuppliers(suppliers);
      setView("discovery");
      refetchUserDetails();
    } catch (error) {
      console.error("Discovery error:", error);
    } finally {
      setIsAnalyzing(false);
      setIsDetailedLoading(false);
    }
  };

  // Frontend Sorting Logic
  const parseSalesVolume = (vol: string): number => {
    if (!vol || vol === "N/A" || vol === "0") return 0;
    const match = vol.match(/(\d+(?:\.\d+)?)([KMB])?/i);
    if (!match) return 0;
    let val = parseFloat(match[1]);
    const suffix = match[2]?.toUpperCase();
    if (suffix === 'K') val *= 1000;
    if (suffix === 'M') val *= 1000000;
    if (suffix === 'B') val *= 1000000000;
    return val;
  };

  const sortedData = useMemo(() => {
    let sorted = [...data];
    switch (sortBy) {
      case "sales_low":
        return sorted.sort((a, b) => parseSalesVolume(a.sales_volume || "") - parseSalesVolume(b.sales_volume || ""));
      case "sales_high":
        return sorted.sort((a, b) => parseSalesVolume(b.sales_volume || "") - parseSalesVolume(a.sales_volume || ""));
      case "price_low":
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.product_price?.replace(/[$,]/g, "") || a.price?.replace(/[$,]/g, "") || "0");
          const priceB = parseFloat(b.product_price?.replace(/[$,]/g, "") || b.price?.replace(/[$,]/g, "") || "0");
          return priceA - priceB;
        });
      case "price_high":
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.product_price?.replace(/[$,]/g, "") || a.price?.replace(/[$,]/g, "") || "0");
          const priceB = parseFloat(b.product_price?.replace(/[$,]/g, "") || b.price?.replace(/[$,]/g, "") || "0");
          return priceB - priceA;
        });
      case "rating_low":
        return sorted.sort((a, b) => parseFloat(a.product_star_rating || a.rating || "0") - parseFloat(b.product_star_rating || b.rating || "0"));
      case "rating_high":
        return sorted.sort((a, b) => parseFloat(b.product_star_rating || b.rating || "0") - parseFloat(a.product_star_rating || a.rating || "0"));
      case "reviews_low":
        return sorted.sort((a, b) => (a.product_num_ratings || a.ratingCount || 0) - (b.product_num_ratings || b.ratingCount || 0));
      case "reviews_high":
        return sorted.sort((a, b) => (b.product_num_ratings || b.ratingCount || 0) - (a.product_num_ratings || a.ratingCount || 0));
      default:
        return sorted;
    }
  }, [data, sortBy]);

  // Inline Filters Section
  const inlineFilters = (
    <div className="bg-brand-card backdrop-blur-md border border-brand-inputBorder rounded-2xl p-6  animate-in fade-in slide-in-from-top-2 duration-500">
      {activeTab === "product" ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SelectField
              id="amazon-country"
              label="Country"
              value={country}
              options={amazonCountryOptions}
              onChange={handleCountryChange}
            />
            <SelectField
              id="amazon-trend-type"
              label="Trend Type"
              value={trendType}
              options={amazonTrendTypeOptions}
              onChange={handleTrendTypeChange}
            />
            <SelectField
              id="amazon-category"
              label="Category"
              value={category}
              options={categoriesList}
              onChange={handleCategoryChange}
            />
            <div className={category === 'all' ? 'opacity-50 pointer-events-none' : ''}>
              <SelectField
                id="amazon-subcategory"
                label="Sub Category"
                value={subCategory}
                options={subCategoriesList}
                onChange={handleSubCategoryChange}
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSearch}
              disabled={category === "all"}
              className={`bg-brand-gradient px-6 py-2.5 rounded-xl text-white text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${category === "all" ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110 shadow-orange-500/20'}`}
            >
              <Package size={16} />
              Discover Trending Products
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-2xl">
          <SelectField
            id="amazon-marketplace"
            label="Marketplace"
            value={marketplace}
            options={COUNTRY_OPTIONS.map(c => ({ label: `${c.flag} ${c.name}`, value: c.code }))}
            onChange={handleMarketplaceChange}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-brand-card-alt rounded-[32px] relative transition-all duration-500 ${isAnalyzing ? 'h-[600px] overflow-hidden' : 'min-h-[600px] overflow-visible'}`}>
      {showProfitCalc && selectedProductForDiscovery && selectedSupplier ? (
        <SourceLinkProfitCalculator
          product={selectedProductForDiscovery}
          supplier={selectedSupplier}
          sourceType="amazon"
          onBack={() => setShowProfitCalc(false)}
        />
      ) : view === "discovery" && selectedProductForDiscovery ? (
        <SupplierSourceLink
          product={selectedProductForDiscovery}
          suppliers={discoverySuppliers}
          sourceType="amazon"
          onBack={() => setView("list")}
          onCalculateProfit={(supplier) => {
            setSelectedSupplier(supplier);
            setShowProfitCalc(true);
          }}
        />
      ) : (
        <TrendsPageTemplate
          bannerImage={amazonBanner}
          lightBannerImage={socialpulseLight}
          title="Amazon Trends"
          subtitle="Discover viral products and high-volume keywords"
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSearchQuery("");
            if (tab === 'keyword') {
              setActiveCountry(marketplace);
              setHasSearched(true); // Automatically trigger search for the second tab
            } else {
              setHasSearched(false);
            }
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          hasSearched={hasSearched}
          showSearchForm={activeTab === "product"}
          showFilterButton={false}
          searchDisabled={searchQuery.trim().length < 3}
          inlineFilters={inlineFilters}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOptions={amazonSortOptions}
          tabs={[
            { label: "Product Trends", value: "product", icon: "Package" },
            {
              label: "Turn Trends Profitable",
              value: "keyword",
              icon: "Hash",
              showUpgradeBadge: userDetails?.subscription_status?.package?.slug?.toLowerCase() !== "premium"
            },
          ]}
          metrics={[
            {
              label: "Amazon Trend Searches",
              value: userDetails?.search_quota.amazon_trends_search?.toString() || "0",
              icon: "TrendingUp",
              progress: 100,
              tooltipContent: "Smart Search Credit Saver: Repeat the same search within 7 days - no credit used. In other cases, a search credit will apply. 7-day window ensures fresh results from BlueRitt"
            },
            {
              label: "Supplier Discoveries",
              value: userDetails?.search_quota.supplier_discovery?.toString() || "0",
              icon: "Store",
              progress: 100,
              tooltipContent: "Discover Smart - Save Your Credit Search: With Suppliers for the same product again within 7 days no credits deducted. After 7 days, one Discover Supplier credit applies per new search. Matches are refreshed regularly to keep results timely and relevant"
            },
            { isAddon: true, label: "Add-ons", subtitle: "Purchase or Upgrade Plan", icon: "ShoppingCart", onClick: () => navigate("/addons") },
          ]}
          metricsAction={
            selectedProductForDiscovery && discoverySuppliers.length > 0 ? (
              <button
                onClick={() => setView('discovery')}
                className="bg-brand-card-alt figma-pill-border rounded-full px-5 py-2 flex items-center gap-2 text-[12px] font-semibold text-brand-textPrimary hover:bg-brand-card"
              >
                Next <ChevronRight size={14} />
              </button>
            ) : undefined
          }
          searchPlaceholder={{
            product: "Search for trending Amazon products...",
            keyword: "Search for trending Amazon keywords...",
          }}
          searchBtnText={{
            product: "Search",
            keyword: "Search",
          }}
          detailsDrawer={(isOpen, onClose, product) => (
            <AmazonProductDetailsDrawer
              isOpen={isOpen}
              onClose={onClose}
              product={product}
              onDiscoverSupplier={() => {
                onClose();
                handleDiscoverSupplier(product);
              }}
            />
          )}
          renderContent={(tab, searched, openDetails, setSelectedProduct) => {
            if (isLoading) {
              return <TrendSkeleton type="product" count={6} />;
            }

            if (!searched) {
              return (
                <TrendsEmptyState
                  title={tab === "product" ? "Discover Amazon Trends" : "Analyze Amazon Keywords"}
                  description={tab === "product" ? "Explore the most sought-after products on Amazon with real-time sales data and ranking insights." : "Identify high-volume search terms and competitive keywords to dominate the Amazon marketplace."}
                  Icon={tab === "product" ? Package : Hash}
                />
              );
            }

            if (isError) {
              return (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-red-400 font-medium text-lg">Oops! Something went wrong.</p>
                  <p className="text-slate-500">Please try again later or refine your search.</p>
                </div>
              );
            }

            if (searched && (!sortedData || sortedData.length === 0)) {
              return (
                <TrendsEmptyState
                  title="No Results Found"
                  description="We couldn't find any trends matching your criteria. Try adjusting your filters or search terms."
                  Icon={tab === "product" ? Package : Hash}
                />
              );
            }

            return (
              <div className="space-y-6">
                {totalResults > 0 && (
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium text-brand-textPrimary">
                      <span className="text-brand-primary font-bold mr-2">{totalResults}</span>
                      this amazon products found
                    </h2>
                  </div>
                )}

                {searched ? (
                  tab === "product" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedData.map((product: any, index: number) => (
                        <SpkbgCard
                          key={`${product.asin || 'no-asin'}-${index}`}
                          variant="grid"
                          data={{
                            title: product.product_title || product.title,
                            image: product.product_photo || product.image,
                            price: product.product_price || product.price,
                            oldPrice: product.product_original_price || "0.00",
                            asin: product.asin,
                            rating: product.product_star_rating,
                            numRatings: product.product_num_ratings,
                            salesVol: product.sales_volume || "N/A",
                            offers: product.num_offers || "1"
                          }}
                          onDetailsClick={() => {
                            setSelectedProduct({
                              asin: product.asin,
                              title: product.product_title || product.title,
                              image: product.product_photo || product.image,
                              category: product.category || category,
                              price: product.product_price || product.price,
                              oldPrice: product.product_original_price,
                              rating: product.product_star_rating,
                              views: product.product_num_ratings ? `${product.product_num_ratings} Ratings` : "N/A",
                              country: activeCountry
                            });
                            openDetails();
                          }}
                          onDiscoverSuppliers={() => {
                            setSelectedProduct({
                              asin: product.asin,
                              title: product.product_title || product.title,
                              image: product.product_photo || product.image,
                              category: product.category || category,
                              price: product.product_price || product.price,
                              oldPrice: product.product_original_price,
                              rating: product.product_star_rating,
                              views: product.product_num_ratings ? `${product.product_num_ratings} Ratings` : "N/A",
                              country: activeCountry
                            });
                            handleDiscoverSupplier(product);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {sortedData.map((item: any, index: number) => (
                        <AmazonRankedCard
                          key={`${item.asin || 'no-asin'}-${index}`}
                          rank={item.rank || index + 1}
                          title={item.product_title || item.title}
                          price={item.product_price || item.price}
                          image={item.product_photo || item.image}
                          rating={item.product_star_rating}
                          ratingCount={item.product_num_ratings ? `${item.product_num_ratings} ratings` : ""}
                          url={item.product_url || item.url}
                          onDetailsClick={() => {
                            setSelectedProduct({
                              asin: item.asin,
                              title: item.product_title || item.title,
                              image: item.product_photo || item.image,
                              category: category,
                              price: item.product_price || item.price,
                              rating: item.product_star_rating,
                              views: item.product_num_ratings ? `${item.product_num_ratings} Ratings` : "N/A",
                              country: activeCountry
                            });
                            openDetails();
                          }}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <TrendsEmptyState
                    title={tab === "product" ? "Discover Amazon Trends" : "Analyze Amazon Keywords"}
                    description={tab === "product" ? "Explore the most sought-after products on Amazon with real-time sales data and ranking insights." : "Identify high-volume search terms and competitive keywords to dominate the Amazon marketplace."}
                    Icon={tab === "product" ? Package : Hash}
                  />
                )}
              </div>
            );
          }}
        />
      )}

      {isAnalyzing && (
        <AnalyzingScreen
          isDetailed={isDetailedLoading}
        />
      )}
    </div>
  );
};

export default AmazonTrends;
