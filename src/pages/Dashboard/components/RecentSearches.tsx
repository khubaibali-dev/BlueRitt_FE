import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategory, getSavedCategoriesDetail, getSavedProducts } from "../../../api/savedProducts";
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
            const products = detailRes?.data?.products || [];
            return {
              ...cat,
              product_count: products.length,
              previewImages: products.slice(0, 4).map((p: any) => {
                const amazonData = p.amazon_product?.data || p.amazon_product || {};
                const tiktokData = amazonData.data || amazonData;
                return tiktokData.image || tiktokData.image_url || tiktokData.cover_url || p.image || "";
              }).filter((img: string) => img && img !== "")
            };
          } catch (err) {
            console.error(`Failed to fetch count for category ${cat.id}:`, err);
            return { ...cat, product_count: 0, previewImages: [] };
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
  const { data: productsResponse } = useQuery({
    queryKey: ["vault-all-products"],
    queryFn: getSavedProducts
  });

  const allProducts = productsResponse?.data || [];

  const allCategoriesMerged = useMemo(() => {
    // Filter out duplicates by name
    const uniqueCategories = Array.from(
      new Map(categories.map((c: any) => [c.name.trim().toLowerCase(), c])).values()
    );

    // Sort by created_at ascending (newest last) so dynamic ones show up at the end
    const sortedCategories = [...uniqueCategories].sort((a: any, b: any) =>
      new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
    );

    // Calculate total count from all categories
    const totalCountFromCategories = categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0);

    const allProductsInfo = {
      id: "all-products",
      name: "All Products",
      product_count: totalCountFromCategories,
      created_at: new Date().toISOString(),
      isAllProducts: true,
      previewImages: allProducts.slice(0, 4).map((p: any) => {
        const amazonData = p.amazon_product?.data || p.amazon_product || {};
        const tiktokData = amazonData.data || amazonData;
        return tiktokData.image || tiktokData.image_url || tiktokData.cover_url || p.image || "";
      }).filter((img: string) => img && img !== "")
    };

    return [allProductsInfo, ...sortedCategories];
  }, [categories, allProducts]);

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
        {allCategoriesMerged.map((col: any, idx: number) => (
          <CategoryCard
            key={idx}
            id={col.id}
            name={col.name}
            image={col.image}
            productCount={col.product_count}
            previewImages={col.previewImages || []}
            isAllProducts={col.isAllProducts}
            onClick={() => {
              if (col.isAllProducts) {
                navigate("/product-vault");
              } else {
                navigate(`/product-vault?collectionId=${col.id}`);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
