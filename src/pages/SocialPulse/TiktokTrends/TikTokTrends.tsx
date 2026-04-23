import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrendsPageTemplate from "../shared/TrendsPageTemplate";
import TrendsEmptyState from "../shared/components/TrendsEmptyState";
import TrendProductCard from "./components/TrendProductCard";
import TrendSkeleton from "./components/TrendSkeleton";
import TrendsProductDetailsDrawer from "./components/TrendsProductDetailsDrawer";
// import TrendsFilterDrawer from "./components/TrendsFilterDrawer";
import { useQuery } from "@tanstack/react-query";
import { getTikTokTrendingProducts, getTikTokCreativeCenterProducts, getTikTokTrendingHashtags, formatNumber } from "../../../api/tiktokTrends";
import { normalizeTikTokProduct } from "../../../utils/cardDataNormalizers";
import { useUserDetails } from "../../../hooks/useUserDetails";
import SupplierSourceLink from "../../Explorer/components/SourceLink/SupplierSourceLink";
import SourceLinkProfitCalculator from "../../Explorer/components/SourceLink/SourceLinkProfitCalculator";
import AnalyzingScreen from "../../Explorer/components/Discovery/AnalyzingScreen";
import { aliBabaProductMatcher } from "../../../api/product";
import { Package, Hash, ChevronRight, TrendingUp, Info, Search, Sparkles } from "lucide-react";
import {
  countrySelectOptions,
  hastagslection,
  periodOption,
  categorySelectOptions,
  periodSelectOptions,
  sortSelectOptions,
  sortOrderSelectOptions
} from "../../../utils/tiktokFilterOptions";
import SelectField from "../../../components/common/select/SelectField";
import tiktokBanner from "../../../assets/images/tiktoktrends.png";
import socialpulseLight from "../../../assets/images/SocialPulse-light.png";
import { checkForBlockedKeywords, getBlockedContentMessage } from "../../../utils/keywordFilter";
import { useToast } from "../../../components/common/Toast/ToastContext";


import Pagination from "../../../components/common/Pagination/Pagination";

const TikTokTrends: React.FC = () => {
  const navigate = useNavigate();
  const { data: userDetails, refetch: refetchUserDetails } = useUserDetails();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentProductSearch, setCurrentProductSearch] = useState("");
  const [currentHashtagSearch, setCurrentHashtagSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasSearchedHashtags, setHasSearchedHashtags] = useState(false);

  // Filter States
  const [country, setCountry] = useState("US");
  const [period, setPeriod] = useState("7");
  const [hashtagPeriod, setHashtagPeriod] = useState("120");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("post");

  // Applied Filter States
  const [appliedCountry, setAppliedCountry] = useState("US");
  const [appliedPeriod, setAppliedPeriod] = useState("7");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [appliedSortBy, setAppliedSortBy] = useState("post");
  const [sortOrder, setSortOrder] = useState("desc");
  const [appliedSortOrder, setAppliedSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [productFetchTrigger, setProductFetchTrigger] = useState(0);
  const [hashtagFetchTrigger, setHashtagFetchTrigger] = useState(0);

  // Hashtag Independent States
  const [appliedHashtagCountry, setAppliedHashtagCountry] = useState("US");
  const [appliedHashtagPeriod, setAppliedHashtagPeriod] = useState("120");
  const [appliedHashtagCategory, setAppliedHashtagCategory] = useState("");
  const [hashtagPage, setHashtagPage] = useState(1);

  // Discovery View States
  const [view, setView] = useState<"list" | "discovery">("list");
  const [selectedProductForDiscovery, setSelectedProductForDiscovery] = useState<any>(null);
  const [discoverySuppliers, setDiscoverySuppliers] = useState<any[]>([]);
  const [showProfitCalc, setShowProfitCalc] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDetailedLoading, setIsDetailedLoading] = useState(false);

  const validateSearch = (query: string) => {
    console.log("🔍 Validating search query:", query);
    if (!query.trim()) return true;
    const check = checkForBlockedKeywords(query);
    console.log("🛡️ Filter check result:", check);
    if (check.isBlocked) {
      toast.error(`Keyword blocked: ${getBlockedContentMessage(check.category)}`);
      return false;
    }
    return true;
  };


  // Product Trends Query
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError
  } = useQuery({
    queryKey: ["tiktokTrendingProducts", appliedCountry, appliedPeriod, appliedCategory, appliedSortBy, currentProductSearch, productFetchTrigger, page],
    queryFn: async () => {

      // Step 1: Database Fetch
      const databaseResponse = await getTikTokTrendingProducts({
        keyword: currentProductSearch,
        country: appliedCountry,
        last: appliedPeriod,
        category: appliedCategory,
        order_by: appliedSortBy,
        order_type: appliedSortOrder,
        limit: 20,
        page: page
      });


      const fetchCCPage = async (pageNum: number) => {
        try {
          const ccResponse = await getTikTokCreativeCenterProducts({
            keyword: currentProductSearch,
            country: appliedCountry,
            last: appliedPeriod,
            category: appliedCategory,
            order_by: appliedSortBy,
            order_type: appliedSortOrder,
            limit: 20,
            page: pageNum
          });
          return ccResponse?.products || [];
        } catch (error) {
          console.error(`⚠️ CC Page ${pageNum} failed:`, error);
          return [];
        }
      };

      // Step 2: Sequential Creative Center Fetch (3 pages)
      const page1 = await fetchCCPage(1);
      await new Promise(r => setTimeout(r, 1000));
      const page2 = await fetchCCPage(2);
      await new Promise(r => setTimeout(r, 1000));
      const page3 = await fetchCCPage(3);

      const allCCProducts = [...page1, ...page2, ...page3];
      // console.log('✅ Step 2: CC Data received:', allCCProducts.length);

      // Merge results
      const totalResult = {
        ...databaseResponse,
        data: {
          ...databaseResponse?.data,
          products: databaseResponse?.data?.products || [],
          // list: allCCProducts,
          total: databaseResponse?.data?.total || allCCProducts.length
        }
      };
      console.log("data result", totalResult)

      // Refetch user details to update search quotas
      refetchUserDetails();

      return totalResult;
    },
    enabled: hasSearched,
    staleTime: 0,

  });

  // Hashtag Trends Query
  const {
    data: hashtagData,
    isLoading: isHashtagLoading,
    // isError: isHashtagError
  } = useQuery({
    queryKey: ["tiktokTrendingHashtags", appliedHashtagCountry, appliedHashtagPeriod, appliedHashtagCategory, currentHashtagSearch, hashtagFetchTrigger, hashtagPage],
    queryFn: async () => {
      const response = await getTikTokTrendingHashtags({
        country: appliedHashtagCountry,
        period: appliedHashtagPeriod,
        industry_id: appliedHashtagCategory,
        keyword: currentHashtagSearch,
        limit: 20,
        page: hashtagPage
      });

      // Refetch user details to update search quotas
      refetchUserDetails();

      return response;
    },
    enabled: hasSearchedHashtags
  });

  // Refetch user details when search data changes to update metrics
  React.useEffect(() => {
    if ((productData?.data?.products || hashtagData?.data?.list)) {
      refetchUserDetails();
    }
  }, [productData, hashtagData, refetchUserDetails]);

  const handleSearch = () => {
    if (!validateSearch(searchQuery)) return;
    setCurrentProductSearch(searchQuery);

    setHasSearched(true);
    setAppliedCountry(country);
    setAppliedPeriod(period);
    setAppliedCategory(category);
    setAppliedSortBy(sortBy);
    setAppliedSortOrder(sortOrder);
    setPage(1);
    setProductFetchTrigger(prev => prev + 1);
    setSelectedProductForDiscovery(null);
    setDiscoverySuppliers([]);
  };
  const handleSearchhastag = () => {
    if (!validateSearch(searchQuery)) return;
    setCurrentHashtagSearch(searchQuery);

    setHasSearchedHashtags(true);
    setAppliedHashtagCountry(country);
    setAppliedHashtagPeriod(hashtagPeriod);
    setAppliedHashtagCategory(category);
    setHashtagPage(1);
    setHashtagFetchTrigger(prev => prev + 1);
    setSelectedProductForDiscovery(null);
    setDiscoverySuppliers([]);
  };

  // const handleApplyFilters = () => {
  //   if (!validateSearch(searchQuery)) return;
  //   setAppliedCountry(country);

  //   setAppliedPeriod(period);
  //   setAppliedCategory(category);
  //   setAppliedSortBy(sortBy);
  //   setAppliedSortOrder(sortOrder);
  //   setPage(1);

  //   setCurrentProductSearch(searchQuery);
  //   setCurrentHashtagSearch(searchQuery);
  //   setHasSearched(true);
  //   setHasSearchedHashtags(true);

  //   setProductFetchTrigger(prev => prev + 1);
  //   setHashtagFetchTrigger(prev => prev + 1);
  // };

  // const handleClearFilters = () => {
  //   setCountry("US");
  //   setPeriod("30");
  //   setCategory("");
  //   setSortBy("post");
  //   setSortOrder("desc");
  //   setAppliedCountry("US");
  //   setAppliedPeriod("30");
  //   setAppliedCategory("");
  //   setAppliedSortBy("post");
  //   setAppliedSortOrder("desc");
  //   setPage(1);
  //   setProductFetchTrigger(prev => prev + 1);
  //   setHashtagFetchTrigger(prev => prev + 1);
  // };

  const handleDiscoverSupplier = async (product: any) => {
    setIsAnalyzing(true);
    setIsDetailedLoading(true);

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
      refetchUserDetails();
    } catch (error) {
      console.error("Discovery error:", error);
    } finally {
      setIsAnalyzing(false);
      setIsDetailedLoading(false);
    }
  };


  return (
    <div className={`bg-brand-card-alt rounded-[32px] relative transition-all duration-500 ${isAnalyzing ? 'h-[600px] overflow-hidden' : 'min-h-[600px] overflow-visible'}`}>
      {showProfitCalc && selectedProductForDiscovery && selectedSupplier ? (
        <SourceLinkProfitCalculator
          product={selectedProductForDiscovery}
          supplier={selectedSupplier}
          sourceType="tiktok"
          onBack={() => setShowProfitCalc(false)}
        />
      ) : view === "discovery" && selectedProductForDiscovery ? (
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
      ) : (
        <TrendsPageTemplate
          bannerImage={tiktokBanner}
          lightBannerImage={socialpulseLight}
          title="TikTok Trends"
          subtitle="Discover viral products and trending hashtags"
          showProductTrendsHeader={true}
          activeTab="product"
          onTabChange={() => { }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          hasSearched={hasSearched}
          searchDisabled={false}
          tabs={[
            { label: "Product Trends", value: "product", icon: "Package" },
          ]}
          metrics={[
            {
              label: "TikTok Trend Searches",
              value: userDetails?.search_quota?.tiktok_searches?.toString() || "0",
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
                className="bg-white/5 figma-pill-border rounded-full px-5 py-2 flex items-center gap-2 text-[12px] font-semibold text-white hover:bg-white/10 !text-brand-textPrimary"
              >
                Next <ChevronRight size={14} />
              </button>
            ) : undefined
          }
          showSearchForm={false}
          searchPlaceholder={{
            product: "Search Keyword (Optional)...",
          }}
          searchBtnText={{
            product: "Search",
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
          showFilterButton={false}
          inlineFilters={(
            <div className="bg-brand-card rounded-[12px] p-6 sm:p-4 border border-brand-inputBorder  mt-2 animate-in fade-in slide-in-from-top-4 duration-700">
              {/* Unified Search Input INSIDE the filter box */}
              <div className="flex flex-col lg:flex-row items-center gap-3 mb-6">
                <div className="flex-1 w-full figma-rect-border !rounded-[12px] group overflow-hidden bg-[#E5E3E333] dark:bg-[#04132B]/50 relative transition-all">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-textPrimary dark:group-focus-within:text-white transition-colors">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Keyword (Optional)..."
                    className="w-full bg-transparent py-2.5 pl-14 pr-6 text-brand-textPrimary dark:text-white text-[15px] placeholder-[#08265675] dark:placeholder-slate-500 outline-none transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="upgrade-gradient-btn !px-8 !rounded-[12px] whitespace-nowrap h-[44px] w-full lg:w-auto font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} /> Discover Trending Products
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
                {/* Country Filter */}
                <SelectField
                  id="inline-country"
                  label="Country"
                  value={country}
                  options={countrySelectOptions}
                  onChange={setCountry}
                  className="!h-[44px] !rounded-[12px]"
                />

                {/* Time Range Filter */}
                <SelectField
                  id="inline-period"
                  label="Time Range"
                  value={period}
                  options={periodSelectOptions}
                  onChange={setPeriod}
                  className="!h-[44px] !rounded-[12px]"
                />

                {/* Category Filter */}
                <SelectField
                  id="inline-category"
                  label="Category"
                  value={category}
                  options={categorySelectOptions}
                  onChange={setCategory}
                  className="!h-[44px] !rounded-[12px]"
                />

                {/* Sort By Filter */}
                <SelectField
                  id="inline-sort-by"
                  label="Sort By"
                  value={sortBy}
                  options={sortSelectOptions}
                  onChange={setSortBy}
                  className="!h-[44px] !rounded-[12px]"
                />

                {/* Sort Order Filter */}
                <SelectField
                  id="inline-sort-order"
                  label="Sort Order"
                  value={sortOrder}
                  options={sortOrderSelectOptions}
                  onChange={setSortOrder}
                  className="!h-[44px] !rounded-[12px]"
                />
              </div>
            </div>
          )}
          filterDrawer={undefined}
          rightSidebar={(
            <>
              {/* Hashtag Header Section */}
              <div className="flex  items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="w-10 h-10 rounded-xl 
  bg-gradient-to-b from-black/10 to-[#6b96f3] 
  border border-brand-inpuBorder dark:border-none
  flex items-center justify-center 
  text-brand-primary shadow-2xl shadow-brand-primary/10 
  text-brand-textSecondary dark:text-[#FFFFFFB2]">

                  <Hash size={22} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[16px] font-medium dark:text-white tracking-tight  leading-none mb-1">Hashtag Trends</h3>
                  <p className="text-[12px] dark:text-[#FFFFFF99] font-medium tracking-tight">Discover viral tags</p>
                </div>
              </div>

              {/* Sidebar Metric Card - Modern & Compact */}
              <div className="bg-brand-card border border-brand-inputBorder rounded-2xl p-4 mt-0 relative group overflow-hidden transition-all duration-500 hover:border-brand-primary/30 animate-in fade-in slide-in-from-right-6 duration-700">

                {/* FLEX ROW */}
                <div className="flex items-center gap-2">

                  {/* ICON LEFT */}
                  <div className="quick-action-icon-circle !h-[40px] !w-[40px] flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <TrendingUp size={22} className="text-white" />
                  </div>

                  {/* CONTENT RIGHT */}
                  <div>

                    {/* TITLE + INFO INLINE */}
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-medium text-brand-textPrimary tracking-widest">
                        TikTok Hashtags Searches
                      </p>
                      <Info
                        size={16}
                        className="dark:text-white hover:text-slate-300 cursor-pointer transition-colors"
                      />
                    </div>

                    <h4 className="text-[24px] sm:text-[28px] font-bold dark:text-white leading-tight tracking-tight">
                      {userDetails?.search_quota?.tiktok_hashtag_search?.toString() || "0"}
                    </h4>
                  </div>

                </div>
              </div>

              {/* Sidebar Filter Selectors - Standard Style */}
              <div className="space-y-6 pt-1 animate-in fade-in slide-in-from-right-8 duration-700">
                <SelectField
                  id="side-country"
                  label="Country"
                  value={country}
                  options={countrySelectOptions}
                  onChange={setCountry}
                  className="!rounded-[14px] !h-12 flex items-center"
                />

                <SelectField
                  id="side-period"
                  label="Period"
                  value={hashtagPeriod}
                  options={periodOption}
                  onChange={setHashtagPeriod}
                  className="!rounded-[14px] !h-12 flex items-center"
                />

                <SelectField
                  id="side-category"
                  label="Category (Optional)"
                  value={category}
                  options={hastagslection}
                  onChange={setCategory}
                  className="!rounded-[14px] !h-12 flex items-center"
                />

                <button
                  onClick={handleSearchhastag}
                  // disabled={!category}
                  className={`w-full mt-2 py-4 upgrade-gradient-btn text-white !rounded-[12px] font-black text-[14px] flex !h-[44px] items-center justify-center gap-2 transition-all shadow-xl active:scale-[0.98] tracking-wider cursor-pointer`}
                >
                  <Sparkles size={18} /> Discover Trending Hashtags
                </button>
              </div>

              {/* Hashtag Results Section */}
              {(isHashtagLoading || hasSearchedHashtags) && (
                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-700">
                  {/* Summary Header */}
                  {hasSearchedHashtags && !isHashtagLoading && hashtagData?.data?.list && (
                    <div className="px-1 text-[13px] font-medium text-slate-600 dark:text-white leading-relaxed">
                      <span className="text-brand-primary font-bold">{hashtagData.data.list.length}</span> Hashtags from{" "}
                      <span className="text-black dark:text-white font-semibold">
                        {periodOption.find(p => p.value === appliedPeriod)?.label || "Last 120 Days"}
                      </span>{" "}
                      of{" "}
                      <span className="text-black dark:text-white font-semibold">
                        {countrySelectOptions.find(c => c.value === appliedCountry)?.label || "United States"}
                      </span>
                    </div>
                  )}

                  {/* Results List or Skeleton */}
                  <div className="space-y-3 max-h-[350px] overflow-y-auto custom-scrollbar pr-1">
                    {isHashtagLoading ? (
                      Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="bg-brand-card border border-brand-inputBorder rounded-[16px] p-4 skeleton-pulse">
                          <div className="h-5 bg-brand-primary/10 rounded-md w-3/4 mb-2" />
                          <div className="h-3 bg-brand-primary/5 rounded w-1/2" />
                        </div>
                      ))
                    ) : hashtagData?.data?.list?.length > 0 ? (
                      hashtagData.data.list.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-brand-card border border-brand-inputBorder rounded-[16px] p-4 flex items-center justify-between group transition-all duration-300 hover:border-brand-primary/30"
                        >
                          <h4 className="text-[16px] font-medium dark:text-white transition-colors">
                            #{item.hashtag_name || item.name || "hashtag"}
                          </h4>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-medium text-[#6291DE]">Rank:</span>
                            <span className="text-[13px] font-bold text-[#6291DE]">#{item.rank || idx + 1}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 px-4 bg-brand-card/30 rounded-2xl border border-dashed border-brand-inputBorder animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-12 h-12 rounded-full bg-brand-primary/5 flex items-center justify-center mb-3">
                          <Hash className="text-brand-primary/40" size={24} />
                        </div>
                        <h5 className="text-[15px] font-semibold text-brand-textPrimary mb-1 text-center leading-tight">No Trending Hashtags Found</h5>
                        <p className="text-[12px] text-brand-textSecondary text-center max-w-[200px]">
                          We couldn't find tags for this search. Try another keyword.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Teaser Card */}
              {!hasSearchedHashtags && (
                <div className="mt-1 pb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="w-full min-h-[310px] bg-brand-card border border-brand-inputBorder rounded-[24px] flex flex-col items-center justify-center p-8 py-12 relative overflow-hidden group cursor-pointer hover:border-brand-primary/30 transition-all duration-700">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none" />

                    {/* Icon with Gradient Circle */}
                    <div className="relative mb-6">
                      <div className="!w-[56px] !h-[56px] rounded-full quick-action-icon-circle p-[1px] flex items-center justify-center">
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          <Hash className="text-brand-primary/40" size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col items-center text-center gap-2">
                      <h2 className="trends-empty-title !text-[17px] !mb-0">
                        Discover Trending Hashtags
                      </h2>
                      <p className="trends-empty-desc !text-[13px] !leading-relaxed">
                        Explore viral tags & audience insights effortlessly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          renderContent={(_, searched, openDetails, setProduct) => {
            const isLoading = isProductLoading;
            const isError = isProductError;
            const data = (productData?.data?.list?.length ?? 0) > 0 ? productData?.data?.list : (productData?.data?.products || []);
            // console.log('Final Data Array:', data);

            if (isLoading) {
              return <TrendSkeleton type="product" count={6} />;
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
                  Icon={Package}
                />
              );
            }

            return (
              <>
                {searched ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {data?.map((product: any, index: number) => {
                        const normalized = normalizeTikTokProduct(product, product, true);
                        return (
                          <TrendProductCard
                            key={product.id || index}
                            {...normalized}
                            onDetailsClick={(currentImage) => {
                              const normalizedProduct = {
                                id: product.product_id || product.id || String(index),
                                title: product.name || product.title || product.url_title,
                                image: currentImage || product.image_url || product.cover_url || product.image,
                                category: product.first_ecom_category?.value || product.category || "Trending",
                                price: product.price || product.current_price || "N/A",
                                metrics: {
                                  ctr: product.metrics?.ctr || (product.ctr ? (String(product.ctr).includes('%') ? product.ctr : product.ctr + '%') : "0.00%"),
                                  cvr: product.metrics?.cvr || (product.cvr ? (String(product.cvr).includes('%') ? product.cvr : product.cvr + '%') : "0.00%"),
                                  cpa: product.metrics?.cpa || (product.cpa ? (String(product.cpa).includes('$') ? product.cpa : '$' + product.cpa) : "$0.00"),
                                  impressions: product.metrics?.impressions || formatNumber(product.views_count || product.impression || 0),
                                  post_count: product.metrics?.post_count || product.post_count || product.post || 0,
                                  like_count: product.metrics?.like_count || product.likes_count || product.like || 0,
                                  share_count: product.metrics?.share_count || product.shares_count || product.share || 0,
                                  comment_count: product.metrics?.comment_count || product.comments_count || product.comment || 0,
                                  category: product.first_ecom_category?.value || product.metrics?.category || "Trending",
                                  category_id: product.first_ecom_category?.id || product.category_id || product.metrics?.category_id || "",
                                  subcategory1: product.metrics?.subcategory1 || product.second_ecom_category?.value || "N/A",
                                  subcategory2: product.metrics?.subcategory2 || product.third_ecom_category?.value || "N/A",
                                  e_com_type: product.metrics?.e_com_type || (product.ecom_type ? product.ecom_type.toUpperCase() : "N/A")
                                },
                                post_count: Number(product.post_count || product.post || 0),
                                review_count: Number(product.review_count || product.reviews_count || 0),
                                comment_count: Number(product.comments_count || product.comment || 0),
                                like_count: Number(product.likes_count || product.like || 0),
                                share_count: Number(product.shares_count || product.share || 0),
                                view_count: Number(product.views_count || product.impression || 0)
                              };
                              setProduct(normalizedProduct);
                              openDetails();
                            }}
                            onDiscoverSupplier={(currentImage) => {
                              handleDiscoverSupplier({
                                id: product.product_id || product.id || String(index),
                                title: product.name || product.title || product.url_title,
                                image: currentImage || product.image_url || product.cover_url || product.image,
                                category: product.first_ecom_category?.value || product.category || "Trending",
                                price: product.price || product.current_price || "N/A",
                                metrics: {
                                  ctr: product.metrics?.ctr || (product.ctr ? (String(product.ctr).includes('%') ? product.ctr : product.ctr + '%') : "0.00%"),
                                  cvr: product.metrics?.cvr || (product.cvr ? (String(product.cvr).includes('%') ? product.cvr : product.cvr + '%') : "0.00%"),
                                  cpa: product.metrics?.cpa || (product.cpa ? (String(product.cpa).includes('$') ? product.cpa : '$' + product.cpa) : "$0.00"),
                                  impressions: product.metrics?.impressions || formatNumber(product.views_count || product.impression || 0),
                                  post_count: product.metrics?.post_count || product.post_count || product.post || 0,
                                  like_count: product.metrics?.like_count || product.likes_count || product.like || 0,
                                  share_count: product.metrics?.share_count || product.shares_count || product.share || 0,
                                  comment_count: product.metrics?.comment_count || product.comments_count || product.comment || 0,
                                  category: product.first_ecom_category?.value || product.metrics?.category || "Trending",
                                  category_id: product.first_ecom_category?.id || product.category_id || product.metrics?.category_id || "",
                                  subcategory1: product.metrics?.subcategory1 || product.second_ecom_category?.value || "N/A",
                                  subcategory2: product.metrics?.subcategory2 || product.third_ecom_category?.value || "N/A",
                                  e_com_type: product.metrics?.e_com_type || (product.ecom_type ? product.ecom_type.toUpperCase() : "N/A")
                                }
                              });
                            }}
                          />
                        )
                      })}
                    </div>

                    {/* Pagination Section */}
                    {productData?.data && (
                      <div className="mt-12 flex flex-col items-center gap-6">
                        {(() => {
                          const totalPages = Math.ceil((productData?.data?.total || 0) / 20);
                          if (totalPages <= 1) return null;
                          return (
                            <div className="flex flex-col items-center gap-6">
                              <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setPage(newPage)}
                              />
                              <div className="text-[14px] font-medium text-slate-400">
                                Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span> ({productData?.data?.total || 0} products)
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </>
                ) : (
                  <TrendsEmptyState
                    title="Discover Trending Products"
                    description="Search for products to see real-time TikTok engagement metrics and viral trends"
                    Icon={Package}
                  />
                )}
              </>
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

export default TikTokTrends;
