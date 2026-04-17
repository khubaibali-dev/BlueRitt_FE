import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, List, LayoutGrid, ChevronRight, Sparkles, Settings2, ShoppingBag, ShoppingCart } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import DiscoveryProductCard from "./DiscoveryProductCard";
import bgAnalysis from "../../../../assets/images/explorer.png";
import bgAnalysisLight from "../../../../assets/images/Explorer-light.png";
import ProductDetailsDrawer from "../ProductDetails/ProductDetailsDrawer";
import SupplierSourceLink from "../SourceLink/SupplierSourceLink";
import MetricCard from "../Common/MetricCard";
import CountrySelect, { countries } from "../../../../components/common/select/CountrySelect";
import SelectField from "../../../../components/common/select/SelectField";
import SourceLinkProfitCalculator from "../SourceLink/SourceLinkProfitCalculator";
import TopStatCard from "../Common/TopStatCard";
import { PRODUCT_FILTER_OPTIONS } from "../../../../utils/SearchOptions";

import FilterDrawer, { FilterState } from "../FilterDrawer/FilterDrawer";
import { searchAmazonExplorerProducts, getAmazonExplorerProductsByCategory, getAmazonExplorerProductDetails } from "../../../../api/amazonExplorer";
import { getAmazonSearchInsights, getAmazonCategoriesandSubcategories, aliBabaProductMatcher } from "../../../../api/product";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "../../../../components/common/Toast/ToastContext";
import { useUserDetails } from "../../../../hooks/useUserDetails";

interface DiscoveryResultsProps {
   onBack: () => void;
   initialQuery?: string;
   initialCountry?: string;
   initialSearchType?: string;
   appliedFilters?: FilterState;
   onLoadingChange?: (isLoading: boolean, isDetailed?: boolean) => void;
}

const DiscoveryResults: React.FC<DiscoveryResultsProps> = (props) => {
   const toast = useToast();
   const {
      initialQuery = "",
      initialCountry = "US",
      initialSearchType = "product",
      appliedFilters,
      onLoadingChange
   } = props;

   const location = useLocation();
   const navigate = useNavigate();
   const { data: userDetails, refetch: refetchUserDetails } = useUserDetails();
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

   // Mapping initial country code to name for CountrySelect component
   const initialCountryObj = countries.find(c => c.code.toUpperCase() === initialCountry?.toUpperCase()) || countries.find(c => c.code.toUpperCase() === "US") || countries[0];
   const [countryName, setCountryName] = useState(initialCountryObj.name);
   const [activeCountryCode, setActiveCountryCode] = useState(initialCountryObj.code.toUpperCase());

   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<any>(null);
   const [showSourceLink, setShowSourceLink] = useState(false);
   const [sourceProduct, setSourceProduct] = useState<any>(null);
   const [showProfitCalc, setShowProfitCalc] = useState(false);
   const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
   const [discoveredSuppliers, setDiscoveredSuppliers] = useState<any[]>([]);
   const [isManualLoading, setIsManualLoading] = useState(false);
   const [hasViewedSourceLink, setHasViewedSourceLink] = useState(false);

   const [searchQuery, setSearchQuery] = useState(initialSearchType === "category" ? "" : initialQuery);
   const [activeSearchQuery, setActiveSearchQuery] = useState(initialSearchType === "category" ? "" : initialQuery);
   const [filters, setFilters] = useState<FilterState>(appliedFilters || location.state?.appliedFilters || {} as FilterState);

   const [searchType, setSearchType] = useState(initialSearchType || PRODUCT_FILTER_OPTIONS[0].value);
   const [activeSearchType, setActiveSearchType] = useState(initialSearchType || PRODUCT_FILTER_OPTIONS[0].value);
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
   const [subcategoriesList, setSubcategoriesList] = useState<any[]>([]);
   const [activeCategoryId, setActiveCategoryId] = useState<string>(initialSearchType === "category" ? initialQuery : "");
   const [sortBy, setSortBy] = useState<string>("default");

   // Real Data Fetching using React Query
   const { data: searchResponse, isLoading, error, refetch } = useQuery({
      queryKey: ["amazon-search", activeSearchQuery, activeCountryCode, filters, activeSearchType, activeCategoryId],
      queryFn: async () => {
         if (activeSearchType === "category") {
            return getAmazonExplorerProductsByCategory({
               category_id: activeCategoryId || "",
               country: activeCountryCode || "US",
               min_star_rating: filters.min_star_rating,
               max_star_rating: filters.max_star_rating,
               min_reviews: filters.min_reviews,
               max_reviews: filters.max_reviews,
               min_price: filters.min_price,
               max_price: filters.max_price,
            });
         }

         if (activeSearchType === "asin" && activeSearchQuery) {
            const res = await getAmazonExplorerProductDetails({
               asin: activeSearchQuery,
               country: activeCountryCode || "US"
            });
            if (res?.data) {
               return {
                  data: {
                     products: [{
                        ...res.data,
                        product_photo: res.data.product_photos?.[0] || "",
                        // Ensure flags are mapped correctly from detail API names if they differ
                        is_amazon_choice: res.data.is_amazon_choice,
                        is_best_seller: res.data.is_best_seller,
                        is_prime: res.data.is_prime,
                     }],
                     total: 1
                  },
                  status: res.status
               };
            }
         }

         return searchAmazonExplorerProducts({
            query: activeSearchQuery || "",
            country: activeCountryCode || "US",
            min_price: filters.min_price,
            max_price: filters.max_price,
            min_star_rating: filters.min_star_rating,
            max_star_rating: filters.max_star_rating,
            min_reviews: filters.min_reviews,
            max_reviews: filters.max_reviews,
         });
      },
      enabled: activeSearchType === "category" ? !!activeCategoryId : !!activeSearchQuery,
   });

   const products = searchResponse?.data?.products || [];
   const totalResults = searchResponse?.data?.total || 0;

   const SORT_OPTIONS = [
      { label: "Default", value: "default" },
      { label: "Sales Volume: Low to High", value: "sales_low" },
      { label: "Sales Volume: High to Low", value: "sales_high" },
      { label: "Price: Low to High", value: "price_low" },
      { label: "Price: High to Low", value: "price_high" },
      { label: "Rating: Low to High", value: "rating_low" },
      { label: "Rating: High to Low", value: "rating_high" },
      { label: "Number of Ratings: Low to High", value: "reviews_low" },
      { label: "Number of Ratings: High to Low", value: "reviews_high" },
   ];

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

   const sortedProducts = useMemo(() => {
      let sorted = [...products];
      switch (sortBy) {
         case "sales_low":
            return sorted.sort((a, b) => parseSalesVolume(a.sales_volume || "") - parseSalesVolume(b.sales_volume || ""));
         case "sales_high":
            return sorted.sort((a, b) => parseSalesVolume(b.sales_volume || "") - parseSalesVolume(a.sales_volume || ""));
         case "price_low":
            return sorted.sort((a, b) => {
               const priceA = parseFloat(a.product_price?.replace(/[$,]/g, "") || "0");
               const priceB = parseFloat(b.product_price?.replace(/[$,]/g, "") || "0");
               return priceA - priceB;
            });
         case "price_high":
            return sorted.sort((a, b) => {
               const priceA = parseFloat(a.product_price?.replace(/[$,]/g, "") || "0");
               const priceB = parseFloat(b.product_price?.replace(/[$,]/g, "") || "0");
               return priceB - priceA;
            });
         case "rating_low":
            return sorted.sort((a, b) => parseFloat(a.product_star_rating || "0") - parseFloat(b.product_star_rating || "0"));
         case "rating_high":
            return sorted.sort((a, b) => parseFloat(b.product_star_rating || "0") - parseFloat(a.product_star_rating || "0"));
         case "reviews_low":
            return sorted.sort((a, b) => (a.product_num_ratings || 0) - (b.product_num_ratings || 0));
         case "reviews_high":
            return sorted.sort((a, b) => (b.product_num_ratings || 0) - (a.product_num_ratings || 0));
         default:
            return sorted;
      }
   }, [products, sortBy]);


   useEffect(() => {
      if (error) {
         toast.error("An error occurred while fetching products. Please try again.");
      }
   }, [error, toast]);

   const { data: insightsResponse } = useQuery({
      queryKey: ["amazon-product-insights", activeSearchQuery, activeCountryCode, filters, activeSearchType, activeCategoryId],
      queryFn: () => getAmazonSearchInsights({
         searchString: activeSearchQuery || "",
         country: activeCountryCode,
         minPrice: filters.min_price,
         maxPrice: filters.max_price,
         minStarRating: filters.min_star_rating,
         maxStarRating: filters.max_star_rating,
         minNumOfRating: filters.min_reviews,
         maxNumOfRating: filters.max_reviews,
         categoryId: activeSearchType === "category" ? (activeCategoryId || undefined) : undefined,
         isAmazonChoice: filters.is_amazon_choice,
      }),
      enabled: activeSearchType === "category" ? !!activeCategoryId : !!activeSearchQuery,
   });

   const { data: categoriesAndSubcategoriesData } = useQuery({
      queryKey: ["amazon-categories-subcategories", activeCountryCode],
      queryFn: () => getAmazonCategoriesandSubcategories(activeCountryCode || "US"),
      staleTime: 1000 * 60 * 60 * 24,
   });

   // ✅ Refetch user quotas after search or discovery
   useEffect(() => {
      if (searchResponse?.data) {
         refetchUserDetails();
      }
   }, [searchResponse?.data, refetchUserDetails]);

   useEffect(() => {
      if (showSourceLink) {
         refetchUserDetails();
      }
   }, [showSourceLink, refetchUserDetails]);

   const categoriesList = useMemo(() => {
      if (!categoriesAndSubcategoriesData?.data?.res) return [];
      return categoriesAndSubcategoriesData.data.res.map((cat: any) => ({
         label: cat.category,
         value: cat.category,
      }));
   }, [categoriesAndSubcategoriesData]);

   useEffect(() => {
      if (selectedCategory && categoriesAndSubcategoriesData?.data?.res) {
         const categoryData = categoriesAndSubcategoriesData.data.res.find(
            (cat: any) => cat.category === selectedCategory
         );
         if (categoryData && categoryData.subcategories) {
            const subcategories = categoryData.subcategories.map((subcat: any) => ({
               label: subcat.subcategory_name,
               value: subcat.ids.subcategory_id,
            }));
            setSubcategoriesList(subcategories);
            // Auto-select removed as requested
         } else {
            setSubcategoriesList([]);
            setSelectedSubcategory("");
         }
      }
   }, [selectedCategory, categoriesAndSubcategoriesData]);

   // Sync initial search query and category from props
   useEffect(() => {
      if (initialSearchType === "category" && initialQuery && categoriesAndSubcategoriesData?.data?.res) {
         // Find which category has this subcategory ID
         for (const cat of categoriesAndSubcategoriesData.data.res) {
            const sub = cat.subcategories?.find((s: any) => s.ids.subcategory_id === initialQuery);
            if (sub) {
               setSelectedCategory(cat.category);
               setSelectedSubcategory(initialQuery);
               break;
            }
         }
      }
   }, [initialSearchType, initialQuery, categoriesAndSubcategoriesData]);

   // Notify parent about loading state - Automatically hide AnalyzingScreen when data arrives
   useEffect(() => {
      if (onLoadingChange && !isLoading && !isManualLoading) {
         onLoadingChange(false);
      }
   }, [isLoading, onLoadingChange, isManualLoading]);

   useEffect(() => {
      if (location.state?.autoSourceLink && location.state?.product) {
         if (location.state.isTikTokSource) {
            handleOpenSourceLink({ ...location.state.product, isTikTokSource: true });
         } else {
            setSourceProduct(location.state.product);
            setShowSourceLink(true);
         }
      }
   }, [location.state]);

   const handleSearch = () => {
      // Map current country name to its code
      const currentCountryObj = countries.find((c: any) => c.name === countryName);
      const currentCountryCode = currentCountryObj?.code || "US";
      setActiveCountryCode(currentCountryCode);
      setActiveSearchType(searchType);
      setHasViewedSourceLink(false); // Reset when new search starts

      if (searchType === "category") {
         if (!selectedSubcategory) {
            toast.error("Please select a subcategory", { title: "Subcategory Required" });
            return;
         }
         setActiveCategoryId(selectedSubcategory);
         setActiveSearchQuery("");
         return;
      }

      setActiveCategoryId("");

      if (!searchQuery.trim()) {
         toast.error("Please enter a search query", { title: "Input Required" });
         return;
      }

      setActiveSearchQuery(searchQuery);

      if (searchQuery === activeSearchQuery && currentCountryCode === activeCountryCode) {
         refetch();
      }
   };

   const handleApplyFilters = (newFilters: FilterState) => {
      setFilters(newFilters);
      setIsFilterDrawerOpen(false);
   };

   const handleOpenSourceLink = async (product: any) => {
      if (!product) return;

      try {
         // 1. Activate Analyzing Screen
         setIsManualLoading(true);
         if (onLoadingChange) onLoadingChange(true, true);

         // 2. Map current country name to its code for the API
         const currentCountryObj = countries.find(c => c.name === countryName);
         const currentCountryCode = currentCountryObj?.code || "US";

         // 2.5 Fetch full product details to get dimensions/weight
         let enrichedProduct = { ...product };
         try {
            const detailsRes = await getAmazonExplorerProductDetails({
               asin: product.asin,
               country: currentCountryCode
            });
            if (detailsRes?.data) {
               enrichedProduct = { ...product, ...detailsRes.data };
            }
         } catch (detailsError) {
            console.warn("Could not fetch full product details for discovery:", detailsError);
         }

         // 3. Call Alibaba API using enriched title if available
         const isTikTok = product?.isTikTokSource || location.state?.isTikTokSource;

         const response = await aliBabaProductMatcher({
            asin: isTikTok ? "tiktok-product" : (enrichedProduct.asin || product.asin),
            title: enrichedProduct.product_title || enrichedProduct.title || product.title,
            country: currentCountryCode,
            min_rating: isTikTok ? 4.3 : undefined,
            limit: isTikTok ? 25 : undefined
         });

         // 4. Store Results
         if (response.data?.data?.suppliers || response.data?.suppliers) {
            setDiscoveredSuppliers(response.data.data?.suppliers || response.data.suppliers);
         } else if (response.data?.products) {
            // Handle raw alibaba search response if needed
            setDiscoveredSuppliers(response.data.products);
         } else {
            // Fallback for empty results
            setDiscoveredSuppliers([]);
         }

         setSourceProduct(enrichedProduct);
         setShowSourceLink(true);
         setIsDrawerOpen(false);
      } catch (error) {
         console.error("Discovery error:", error);
         toast.error("Failed to discover suppliers. Please try again.", { title: "Discovery Failed" });
      } finally {
         // 5. Deactivate Analyzing Screen
         setIsManualLoading(false);
         if (onLoadingChange) onLoadingChange(false);
      }
   };

   const handleOpenDetails = (product: any) => {
      const tags = [
         ...(product.is_best_seller ? ["Best Seller"] : []),
         ...(product.is_amazon_choice ? ["Amazon Choice"] : []),
         ...(product.is_prime ? ["Prime"] : []),
         ...(product.climate_pledge_friendly ? ["Climate Friendly"] : [])
      ];
      setSelectedProduct({ ...product, tags });
      setIsDrawerOpen(true);
   };

   const handleOpenProfitCalc = (supplier: any) => {
      setSelectedSupplier(supplier);
      setShowProfitCalc(true);
   };

   const { currentUser } = useAuth();

   // Use real-time quota data from useUserDetails if available
   const currentQuota = userDetails?.search_quota || currentUser?.searchQuota;
   // const currentFeatures = userDetails?.features || currentUser?.features;

   // Real Insights from API - now pre-formatted from backend
   const insights = insightsResponse?.data?.metrics;

   const metrics = [
      { label: "Competing Products", value: insights?.competing_products || "0", icon: "Box" },
      { label: "Avg. Price", value: insights?.avg_price || "$0.00", icon: "DollarSign" },
      { label: "Avg. Rating", value: (insights?.avg_star_rating || 0).toFixed(1), icon: "Percent" },
      { label: "Avg. Reviews", value: insights?.avg_num_reviews || "0", icon: "MessageSquare" },
      { label: "Avg. Monthly Revenue", value: insights?.avg_revenue || "$0.00", icon: "TrendingUp" },
      { label: "Total Annual Revenue", value: insights?.total_revenue || "$0.00", icon: "BarChart3" },
   ];

   if (showProfitCalc) {
      return (
         <SourceLinkProfitCalculator
            product={sourceProduct}
            supplier={selectedSupplier}
            countryCode={activeCountryCode}
            onBack={() => setShowProfitCalc(false)}
         />
      );
   }

   if (showSourceLink) {
      return (
         <SupplierSourceLink
            product={sourceProduct}
            suppliers={discoveredSuppliers}
            onBack={() => {
               setHasViewedSourceLink(true);
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

   const stats = [
      { icon: Search, label: "Product Searches", value: (currentQuota?.amazon_search || 0).toLocaleString() },
      { icon: ShoppingBag, label: "Supplier Discoveries", value: (currentQuota?.supplier_discovery || 0).toLocaleString() },
      {
         icon: ShoppingCart,
         label: "Add-ons",
         action: {
            label: "Purchase Add Ons",
            onClick: () => navigate("/addons"),
         },
      },
   ];

   return (
      <div className="discovery-results px-4 sm:px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full overflow-hidden relative bg-brand-card-alt rounded-[24px] isolate">

         <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-brand-textPrimary text-[24px]">Insights Usage</h2>
            {hasViewedSourceLink && (
               <button
                  onClick={() => setShowSourceLink(true)}
                  className="figma-pill-border text-brand-textPrimary px-5 h-[40px] rounded-full font-bold text-[13px] flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
               >
                  Next <ChevronRight size={16} />
               </button>
            )}
         </div>
         {/* Background Image Layer with Bottom Fade - Perfectly Blended like Product Analysis */}
         <div className="absolute -inset-x-6 sm:-inset-x-10 -top-6 sm:-top-10 h-[750px] z-[-1] pointer-events-none overflow-hidden rounded-t-[32px]">
            <img src={bgAnalysis} alt="" className="w-full h-full object-cover object-top opacity-100 mix-blend-screen hidden dark:block" />
            <img src={bgAnalysisLight} alt="" className="w-full h-full object-cover object-top block dark:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-brand-card-alt via-brand-card-alt/30 to-transparent" />
         </div>

         {/* Top Header Row */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {stats.map((stat, i) => (
               <TopStatCard key={i} {...stat} />
            ))}
         </div>

         {/* Main Filter Bar */}
         <div className="flex flex-col lg:flex-row gap-3 mb-10 items-center px-1">
            <div className="flex gap-2 shrink-0">
               <div className="w-[160px]">
                  <CountrySelect
                     value={countryName}
                     onChange={(c) => {
                        setCountryName(c.name);
                        setActiveCountryCode(c.code.toUpperCase());
                     }}
                  />
               </div>
               <div className="w-[130px]">
                  <SelectField
                     id="search-type"
                     value={searchType}
                     onChange={(v) => {
                        setSearchType(v);
                        if (v === "category") {
                           setSearchQuery("");
                        }
                     }}
                     options={PRODUCT_FILTER_OPTIONS}
                  />
               </div>
            </div>

            {searchType === "category" ? (
               <div className="flex-1 flex flex-col md:flex-row gap-3 w-full animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="w-full md:w-[220px]">
                     <SelectField
                        id="category-select"
                        value={selectedCategory}
                        onChange={(v) => {
                           setSelectedCategory(v);
                           setSelectedSubcategory("");
                        }}
                        options={categoriesList}
                        placeholder="Select Category"
                     />
                  </div>
                  <div className="w-full md:w-[220px]">
                     <SelectField
                        id="subcategory-select"
                        value={selectedSubcategory}
                        onChange={(v) => setSelectedSubcategory(v)}
                        options={subcategoriesList}
                        placeholder={subcategoriesList.length === 0 ? "No Subcategories" : "Select Subcategory"}
                     />
                  </div>
                  <button
                     onClick={handleSearch}
                     className="w-full md:w-auto bg-brand-gradient text-white px-6 h-[48px] rounded-xl font-semibold hover:opacity-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                     <Search size={16} /> Search Category
                  </button>
               </div>
            ) : (
               <div className="flex-1 flex flex-col md:flex-row gap-3 w-full animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex-1 relative w-full figma-card-border overflow-hidden">
                     <div className="relative rounded-xl flex items-center h-[48px] px-4 ">
                        <Search className="text-brand-textPrimary mr-2" size={18} />
                        <input
                           type="text"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                           placeholder={searchType === "asin" ? "Enter ASIN (e.g. B08N5KWB9H)" : "Search by keyword, product..."}
                           className="bg-transparent border-none w-full text-brand-textPrimary placeholder:text-brand-textSecondary focus:outline-none text-[15px] font-medium"
                        />
                     </div>
                  </div>
                  <button
                     onClick={handleSearch}
                     className="bg-brand-gradient text-white px-5 h-[48px] rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-all w-full md:w-[180px]"
                  >
                     <Sparkles size={16} fill="white" className="text-white" /> Search with AI
                  </button>
               </div>
            )}

            <div className="flex gap-2 shrink-0 self-start lg:self-center">
               <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="bg-brand-inputBg border border-brand-inputBorder h-[48px] px-4 rounded-xl flex items-center justify-center gap-2 text-brand-textPrimary hover:bg-brand-hover transition-all"
               >
                  <span className="text-[14px] font-semibold">Filters</span>
                  <Settings2 size={16} className="text-brand-textPrimary" />
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
            <button className="bg-white/5 figma-pill-border rounded-full px-5 py-2 flex items-center gap-2 text-[12px] font-semibold text-brand-textPrimary hover:bg-white/10 transition-all group">
               Search Volume <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         {/* Results Controls */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-0 mb-8 px-2">
            <div className="flex flex-col">
               <div className="flex items-center gap-3">
                  <h2 className="text-[24px] sm:text-[20px] text-brand-textPrimary tracking-tight leading-tight mb-1">Discovery Results</h2>
               </div>
               <p className="text-[14px] sm:text-[15px] text-brand-textSecondary dark:text-white">{totalResults > 0 ? totalResults : products.length} products match your query</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-[200px] h-fit">
                  <SelectField
                     id="sort-by"
                     value={sortBy}
                     onChange={(v) => setSortBy(v)}
                     options={SORT_OPTIONS}
                     placeholder="Sort by"
                  />
               </div>
               <div className="bg-brand border border-brand-inputBorder rounded-xl flex p-1 h-[48px] items-center">
                  <button
                     onClick={() => setViewMode('grid')}
                     className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-inputBg border border-brand-inputBorder text-brand-textPrimary shadow-md' : 'text-brand-textSecondary hover:text-brand-textPrimary'}`}
                  >
                     <LayoutGrid size={18} />
                  </button>
                  <button
                     onClick={() => setViewMode('list')}
                     className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-brand-inputBg border border-brand-inputBorder text-brand-textPrimary shadow-md' : 'text-brand-textSecondary hover:text-brand-textPrimary'}`}
                  >
                     <List size={18} />
                  </button>
               </div>
            </div>
         </div>

         {/* Product Grid / List Container */}
         <div className={
            viewMode === 'grid'
               ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
               : "flex flex-col gap-6 mb-12"
         }>
            {sortedProducts.map((p: any, i) => (
               <DiscoveryProductCard
                  key={i}
                  title={p.product_title || "Unknown Product"}
                  image={p.product_photo || "https://via.placeholder.com/300x300?text=No+Image"}
                  price={p.product_price?.replace("$", "") || "0.00"}
                  oldPrice={p.product_original_price?.replace("$", "") || (p.product_price?.replace("$", "") || "0.00")}
                  ratings={p.product_num_ratings?.toString() || "0"}
                  asin={p.asin || "N/A"}
                  offers={p.product_num_offers?.toString() || "1"}
                  salesVol={p.sales_volume || "N/A"}
                  tags={[
                     ...(p.is_best_seller ? ["Best Seller"] : []),
                     ...(p.is_amazon_choice ? ["Amazon Choice"] : []),
                     ...(p.is_prime ? ["Prime"] : []),
                     ...(p.climate_pledge_friendly ? ["Climate Friendly"] : [])
                  ]}
                  rating={p.product_star_rating ? parseFloat(p.product_star_rating) : 0}
                  viewMode={viewMode}
                  onDetailsClick={() => handleOpenDetails(p)}
                  onDiscoverSuppliers={() => handleOpenSourceLink(p)}
               />
            ))}
            {products.length === 0 && !isLoading && (
               <div className="col-span-full py-20 text-center">
                  <p className="text-white/50 text-lg">No products found. Try a different search query or country.</p>
               </div>
            )}
            {isLoading && (
               <div className="col-span-full py-20 text-center">
                  <p className="text-white/50 text-lg">Searching for products...</p>
               </div>
            )}
         </div>

         {/* Product Details Side Drawer */}
         <ProductDetailsDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onDiscoverSuppliers={() => handleOpenSourceLink(selectedProduct)}
            product={selectedProduct}
         />

         {/* Filters Side Drawer */}
         <FilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            onApply={handleApplyFilters}
            initialFilters={filters}
         />

         <style>{`
         .discovery-top-card-premium {
            @apply bg-brand-inputBg border border-brand-border rounded-[20px] p-6 shadow-md;
         }
         .discovery-filter-select-premium {
            @apply bg-brand-inputBg border border-brand-border rounded-xl px-4 py-3 flex items-center gap-4 hover:border-brand-primary/30 transition-all shadow-inner;
         }
      `}</style>
      </div>
   );
};

export default DiscoveryResults;
