import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategory, getSavedCategoriesDetail } from "../../../api/savedProducts";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../../components/common/cards/CategoryCard";
import { useCategorySync } from "../../../hooks/useCategorySync";

const RecentSearches = () => {
  const navigate = useNavigate();

  // Categories query with Product Counts
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["vault-categories"],
    queryFn: async () => {
      const res = await getCategory();
      const categoriesWithCounts = await Promise.all(
        res.data.map(async (cat: any) => {
          try {
            const detailRes = await getSavedCategoriesDetail({ id: cat.id });
            return {
              ...cat,
              product_count: detailRes?.data?.products?.length || 0
            };
          } catch (err) {
            console.error(`Failed to fetch count for category ${cat.id}:`, err);
            return { ...cat, product_count: 0 };
          }
        })
      );
      return { data: categoriesWithCounts };
    }
  });

  const categories = categoriesResponse?.data || [];

  // ✅ Use Centralized Sync logic
  useCategorySync(categories, isCategoriesLoading, !!categoriesResponse);

  // All Products query for global count
  // const { data: productsResponse, isLoading: isProductsLoading } = useQuery({
  //   queryKey: ["vault-all-products"],
  //   queryFn: getSavedProducts
  // });

  const allCategoriesMerged = useMemo(() => {
    // Filter out duplicates by name
    const uniqueCategories = Array.from(
      new Map(categories.map((c: any) => [c.name.trim().toLowerCase(), c])).values()
    );

    // Sort by created_at descending (newest first) so dynamic ones show up
    return [...uniqueCategories].sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [categories]);

  const isLoading = isCategoriesLoading;

  if (isLoading) {
    return (
      <div className="bg-brand-card py-6 px-4 rounded-[14px] border border-brand-inputBorder">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="vault-card h-[280px] animate-pulse bg-brand-hover dark:bg-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-card py-6 px-4 rounded-[14px] border border-brand-inputBorder">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        {allCategoriesMerged.slice(0, 12).map((col: any, idx: number) => (
          <CategoryCard
            key={idx}
            id={col.id}
            name={col.name}
            image={col.image}
            productCount={col.product_count}
            onClick={() => navigate(`/products?collectionId=${col.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
