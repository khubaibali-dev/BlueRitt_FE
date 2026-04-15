import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, Search, Crown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import explorerBg from "../../../../assets/images/explorer.png";
import explorerBgLight from "../../../../assets/images/Explorer-light.png";
import starImg from "../../../../assets/images/star.png";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import PremiumSearchBar from "../../../../components/common/search/PremiumSearchBar";
import FilterDropdown from "../../../../components/common/select/FilterDropdown";
import SelectField from "../../../../components/common/select/SelectField";
import { COUNTRY_OPTIONS } from "../../../../utils/Country";
import { PRODUCT_FILTER_OPTIONS } from "../../../../utils/SearchOptions";
import { getAmazonCategoriesandSubcategories } from "../../../../api/product";
import { useToast } from "../../../../components/common/Toast/ToastContext";
import Tooltip from "../../../../components/common/Tooltip/Tooltip";

interface ExplorerBannerProps {
  onSearch: (query: string, country: string, searchType: string) => void;
}

const ExplorerBanner: React.FC<ExplorerBannerProps> = ({ onSearch }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState(PRODUCT_FILTER_OPTIONS[0]);
  const defaultCountry = COUNTRY_OPTIONS.find(opt => opt.value === "US") || COUNTRY_OPTIONS[0];
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [filters, setFilters] = useState<any>({});

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [subcategoriesList, setSubcategoriesList] = useState<any[]>([]);

  const { data: categoriesAndSubcategoriesData } = useQuery({
    queryKey: ["amazon-categories-subcategories", selectedCountry.value],
    queryFn: () => getAmazonCategoriesandSubcategories(selectedCountry.value),
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

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
        if (subcategories.length > 0) {
          setSelectedSubcategory(subcategories[0].value);
        }
      } else {
        setSubcategoriesList([]);
        setSelectedSubcategory("");
      }
    }
  }, [selectedCategory, categoriesAndSubcategoriesData]);

  const handleSearchWithAI = (query: string) => {
    if (!query || !query.trim()) {
      toast.error("Please enter keyword", { title: "Search Failed" });
      return;
    }
    onSearch(query, selectedCountry.value, filterType.value);
  };

  const handleCategorySearch = () => {
    if (!selectedSubcategory) {
      toast.error("Please select a subcategory", { title: "Search Failed" });
      return;
    }
    onSearch(selectedSubcategory, selectedCountry.value, "category");
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setFilterOpen(false);
  };

  // Map country options to include code for flags
  const countryOptions = COUNTRY_OPTIONS.map((opt) => ({
    ...opt,
    code: opt.value, // ISO code for flagcdn
  }));

  return (
    <section className="explorer-banner-wrapper relative overflow-visible !px-6">
      {/* Background Image Layer with Bottom Fade */}
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[20px] sm:rounded-t-[32px]">
        <img src={explorerBg} alt="" className="explorer-banner-image hidden dark:block" />
        <img src={explorerBgLight} alt="" className="explorer-banner-image block dark:hidden" />
        {/* Bottom Fade Overlay - Merges image into #030F23 background */}
        <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/40 to-transparent pointer-events-none hidden dark:block" />
      </div>

      {/* Top Badge */}
      <div className="explorer-badge-wrapper">
        <div className="explorer-badge-pill">
          <img src={starImg} alt="" className="explorer-badge-icon" />
          <span className="explorer-badge-text">Blueritt Explorer</span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-[900px] px-3 sm:px-4">

        <h1 className="banner-heading-text !mb-10">
          <span className="inline-flex items-center justify-center gap-2">
            Explore with IntelliScan
            <Tooltip 
              content="BlueRitt Explorer is your AI-driven flow: discover Amazon products (IntelliScan), match verified Alibaba suppliers with AI Scores (SourceLink), analyze profit (MarginMax), and save your work (ProductVault)."
              width="320px"
            >
              <div className="flex items-center justify-center shrink-0 rounded-full w-[32px] h-[32px] bg-brand-inputBg backdrop-blur-[10px] cursor-pointer hover:bg-brand-hover transition-all z-10 info-icon-border">
                <span className="font-serif italic text-brand-textPrimary dark:text-white text-[20px] font-bold leading-none pr-[2px] select-none">i</span>
              </div>
            </Tooltip>
          </span>
        </h1>

        {/* Filter Row */}
        <div className="dashboard-filter-row">
          <div className="dashboard-filter-group">
            <FilterDropdown
              value={filterType.value}
              options={PRODUCT_FILTER_OPTIONS}
              onChange={(opt) => setFilterType(opt)}
              width="w-[140px]"
              dropdownWidth="w-[140px]"
            />
            <FilterDropdown
              value={selectedCountry.value}
              options={countryOptions}
              onChange={(opt) => setSelectedCountry(opt)}
              width="w-[190px]"
              dropdownWidth="w-[200px]"
            />
          </div>
          <button
            className="dashboard-filter-btn"
            onClick={() => setFilterOpen(true)}
          >
            Filters <SlidersHorizontal size={18} className="dark:text-white text-black" />
          </button>
        </div>

        {/* Search bar */}
        {filterType.value === "category" ? (
          <div className="w-full max-w-[840px] flex flex-col md:flex-row items-center gap-3 bg-white/5 backdrop-blur-[40px] p-3 rounded-full border border-brand-inputBorder shadow-xl">
            <div className="flex-1 w-full">
              <SelectField
                id="banner-category"
                value={selectedCategory}
                onChange={(v) => setSelectedCategory(v)}
                options={categoriesList}
                placeholder="Select Category"
                className="rounded-full"
              />
            </div>
            <div className="flex-1 w-full">
              <SelectField
                id="banner-subcategory"
                value={selectedSubcategory}
                onChange={(v) => setSelectedSubcategory(v)}
                options={subcategoriesList}
                placeholder={subcategoriesList.length === 0 ? "No Subcategories" : "Select Subcategory"}
                className="rounded-full"
              />
            </div>
            <button
              onClick={handleCategorySearch}
              className="w-full md:w-auto bg-brand-gradient text-white px-8 h-[48px] rounded-full font-semibold hover:opacity-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-blue-500/20"
            >
              <Search size={18} />
              <span>Search Category</span>
            </button>
          </div>
        ) : (
          <PremiumSearchBar
            onSearch={handleSearchWithAI}
            className="max-w-[840px]"
            placeholder={filterType.value === "asin" ? "Enter ASIN (e.g. B08N5KWB9H)" : "Search by keyword, product (e.g. Apple Watch)"}
          />
        )}

      </div>
      {/* Usage Insights Bottom Row */}
      <div className="w-full flex items-center justify-between mt-[135px] mb-[-80px] !px-0">
        <h2 className="dashboard-section-title !mb-0 px-4">Usage Insights</h2>
        <button
          className="upgrade-plan-btn !py-2 !px-4 !text-[12px] mr-6"
          onClick={() => navigate("/settings?tab=plan")}
        >
          <Crown size={18} className="text-white" />
          Upgrade Your Plan
        </button>
      </div>


      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
    </section>
  );
};

export default ExplorerBanner;
