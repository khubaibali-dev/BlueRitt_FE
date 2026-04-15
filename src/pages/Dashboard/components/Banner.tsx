import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import shadowBg from "../../../assets/images/dashboard1.png";
import starImg from "../../../assets/images/star.png";
import PremiumSearchBar from "../../../components/common/search/PremiumSearchBar";
import FilterDropdown from "../../../components/common/select/FilterDropdown";
import SelectField from "../../../components/common/select/SelectField";
import FilterDrawer, { FilterState } from "../../Explorer/components/FilterDrawer/FilterDrawer";
import { COUNTRY_OPTIONS } from "../../../utils/Country";
import { PRODUCT_FILTER_OPTIONS } from "../../../utils/SearchOptions";
import { getAmazonCategoriesandSubcategories } from "../../../api/product";
import { useToast } from "../../../components/common/Toast/ToastContext";
import shadowBgLight from "../../../assets/images/Dashboard-light.png";

const Banner = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState(PRODUCT_FILTER_OPTIONS[0]);
  const defaultCountry = COUNTRY_OPTIONS.find(opt => opt.value === "US") || COUNTRY_OPTIONS[0];
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({} as FilterState);

  // Category Selection States
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

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    navigate("/explorer", {
      state: {
        initialQuery: value,
        initialCountry: selectedCountry.value,
        initialSearchType: filterType.value
      }
    });
  };

  const handleCategorySearch = () => {
    if (!selectedSubcategory) {
      toast.error("Please select a subcategory", { title: "Search Failed" });
      return;
    }
    navigate("/explorer", {
      state: {
        initialQuery: selectedSubcategory,
        initialCountry: selectedCountry.value,
        initialSearchType: "category"
      }
    });
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const countryOptions = COUNTRY_OPTIONS.map((opt) => ({
    ...opt,
    code: opt.value,
  }));

  return (
    <section className="dashboard-banner-container relative isolate rounded-t-[32px]">
      <div className="absolute inset-0 z-[-1] overflow-hidden rounded-t-[32px]">
        <img src={shadowBg} alt="" className="dashboard-banner-image hidden dark:block" />
        <img src={shadowBgLight} alt="" className="dashboard-banner-image block dark:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-[280px] bg-gradient-to-t from-brand-card-alt via-brand-card-alt/40 to-transparent pointer-events-none hidden dark:block" />
      </div>

      <div className="explorer-badge-wrapper">
        <img src={starImg} alt="" className="brand-star-standard" />
      </div>

      <h2 className="banner-heading-text">
        Find Your Next Winning Product
        <br />
        <span className="banner-heading-text mt-2 sm:mt-1">with IntelliScan</span>
      </h2>

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
          onClick={() => setIsFilterOpen(true)}
        >
          Filters <SlidersHorizontal size={18} />
        </button>
      </div>

      {filterType.value === "category" ? (
        <div className="w-full max-w-[840px] flex flex-col md:flex-row items-center gap-3 bg-white/5 backdrop-blur-[40px] p-3 rounded-full border border-brand-inputBorder shadow-xl mx-auto">
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
          onSearch={handleSearch}
          className="max-w-[840px]"
          placeholder={filterType.value === "asin" ? "Enter ASIN (e.g. B08N5KWB9H)" : "Search by keyword, product (e.g. Apple Watch)"}
        />
      )}

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
        country={selectedCountry.value}
      />
    </section>
  );
};

export default Banner;
