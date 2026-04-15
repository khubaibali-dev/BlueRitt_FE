import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CollectionDetails from "./components/CollectionDetails";
import { getCategory, deleteCategory, createCategory, getSavedProducts, getSavedCategoriesDetail } from "../../api/savedProducts";
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";
import CreateCollectionModal from "./components/CreateCollectionModal";
import { useToast } from "../../components/common/Toast/ToastContext";

import CategoryCard from "../../components/common/cards/CategoryCard";
import { useCategorySync } from "../../hooks/useCategorySync";

const ProductVault: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { success, error: toastError } = useToast();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, id: string, name: string }>({ isOpen: false, id: "", name: "" });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // UseQuery for Categories with Product Counts
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

  // UseQuery for All Products (to get total count and preview images)
  const { data: productsResponse, isLoading: isProductsLoading } = useQuery({
    queryKey: ["vault-all-products"],
    queryFn: getSavedProducts
  });

  const allProducts = productsResponse?.data || [];

  // ✅ Merge and add All Products at the start
  const allCategoriesMerged = useMemo(() => {
    // FIXED_CATEGORIES are now synced to backend, so we only show what's in the DB (+ All Products)
    // Filter out duplicates by name just in case backend has them
    const uniqueCategories = Array.from(
      new Map(categories.map((c: any) => [c.name.trim().toLowerCase(), c])).values()
    );

    const list = [...uniqueCategories];

    // sum counts from all fetched categories
    const totalCountFromCategories = categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0);

    const allProductsInfo = {
      id: "all-products",
      name: "All Products",
      product_count: totalCountFromCategories,
      created_at: new Date().toISOString(),
      isAllProducts: true,
      previewImages: allProducts.slice(0, 3).map((p: any) => p.image || p.ProductImage)
    };

    return [allProductsInfo, ...list];
  }, [categories, allProducts]);

  // Derive selected collection from URL (Single Source of Truth)
  const collectionIdParam = searchParams.get("collectionId");
  const selectedCollection = useMemo(() => {
    if (!collectionIdParam) return null;
    if (collectionIdParam === "all-products") {
      return { id: "all-products", name: "All Products" };
    }
    if (categories.length === 0) return null;
    const col = categories.find((c: any) => c.id.toString() === collectionIdParam);
    return col ? { id: col.id.toString(), name: col.name } : null;
  }, [collectionIdParam, categories]);

  // Update URL when selection changes
  const handleSetSelectedCollection = (id: string | null) => {
    if (id) {
      setSearchParams({ collectionId: id });
    } else {
      setSearchParams({});
    }
  };

  // UseMutation for Deletion
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory({ saveID: id }),
    onSuccess: () => {
      success("Collection deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["vault-categories"] });
      setDeleteModal({ isOpen: false, id: "", name: "" });
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      toastError("Failed to delete collection");
    }
  });

  const handleDeleteCategory = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  // UseMutation for Creating
  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory({ name }),
    onSuccess: () => {
      success("Collection created successfully");
      queryClient.invalidateQueries({ queryKey: ["vault-categories"] });
      setIsCreateModalOpen(false);
    },
    onError: (error: any) => {
      console.error("Create error:", error);
      toastError("Failed to create collection");
    }
  });

  const isLoadingTotal = isCategoriesLoading || isProductsLoading;

  return (
    <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative  min-h-screen">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={() => deleteMutation.mutate(deleteModal.id)}
        isLoading={deleteMutation.isPending}
        title="Delete Collection?"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone and all product records inside will be permanently removed.`}
        confirmText="Yes, Delete"
        type="danger"
      />

      {/* Create Modal */}
      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={(name) => createMutation.mutate(name)}
        isLoading={createMutation.isPending}
      />

      <div className="relative z-10 px-4 py-8 sm:px-4 sm:py-10">
        {selectedCollection ? (
          <div className="animate-in fade-in duration-500">
            <CollectionDetails
              collectionId={selectedCollection.id}
              collectionName={selectedCollection.name}
              onBack={() => handleSetSelectedCollection(null)}
              onProductClick={() => { }} // No longer needed as we navigate via URL
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10">
              <h1 className="banner-heading-text !text-left !mb-1 text-brand-textPrimary dark:text-white !text-[24px]">Product Vault</h1>
              <p className="page-header-subtitle !text-left ml-4 text-brand-textSecondary dark:text-brand-textSecondary ">Analyze and manage your saved product research</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoadingTotal ? (
                // Loading Skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="vault-card h-[280px] animate-pulse bg-brand-hover dark:bg-white/5 rounded-2xl" />
                ))
              ) : (
                allCategoriesMerged.map((col: any, idx: number) => (
                  <CategoryCard
                    key={idx}
                    id={col.id}
                    name={col.name}
                    image={col.image}
                    productCount={col.product_count}
                    previewImages={col.previewImages}
                    isAllProducts={col.isAllProducts}
                    createdAt={col.created_at}
                    onClick={() => handleSetSelectedCollection(col.id.toString())}
                    onDelete={handleDeleteCategory}
                  />
                ))
              )}

              {/* Add New Collection Card */}
              <div
                onClick={() => setIsCreateModalOpen(true)}
                className="group vault-card flex flex-col items-center justify-center gap-3 !min-h-[240px] cursor-pointer bg-brand-card dark:bg-[#04132B] !border-brand-inputBorder shadow-xl shadow-black/5 dark:shadow-none"
              >
                <div className="p-4 rounded-full bg-slate-200 dark:bg-white/5 text-brand-primary dark:text-white transition-all group-hover:scale-110 mb-4">
                  <Plus size={34} />
                </div>
                <span className="text-brand-textPrimary dark:text-white font-bold text-[15px] tracking-tight transition-colors">Add New Collection</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVault;
