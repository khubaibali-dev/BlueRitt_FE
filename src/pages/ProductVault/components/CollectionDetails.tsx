import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ShoppingBag, ExternalLink, Trash2
} from "lucide-react";
import { getSavedCategoriesDetail, deleteSavedProducts, getSavedProducts } from "../../../api/savedProducts";
import ConfirmationModal from "../../../components/common/Modals/ConfirmationModal";
import { useToast } from "../../../components/common/Toast/ToastContext";
import AmazonProductCard from "../../Explorer/components/Common/Cards/AmazonProductCard";
import TrendProductCard from "../../SocialPulse/TiktokTrends/components/TrendProductCard";
import ResearchRowSkeleton from "../../../components/common/Skeletons/ResearchRowSkeleton";
import SpkbgSupplierCard from "../../../components/common/SpkCards/SpkbgSupplierCard";
import { checkIsTikTokProduct, normalizeAmazonProduct, normalizeTikTokProduct, normalizeAlibabaSupplier } from "../../../utils/cardDataNormalizers";



interface CollectionDetailsProps {
  collectionId: string;
  collectionName: string;
  onBack: () => void;
  onProductClick: (product: any) => void;
}

const ResearchRow = React.memo<{
  product: any;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}>(({ product, onDelete, isDeleting }) => {
  const navigate = useNavigate();
  const amazonData = product.amazon_product?.data;
  const supplierInfo = product.supplier_info;
  const alibabaData = product.alibaba_product;

  const handleAnalyzeClick = () => {
    navigate(`/calculator/product/${product.id}/`);
  };

  const isTikTok = useMemo(() => checkIsTikTokProduct(product), [product]);
  const normalizedAmazon = useMemo(() => normalizeAmazonProduct(amazonData, product, isTikTok), [amazonData, product, isTikTok]);
  const normalizedTikTok = useMemo(() => normalizeTikTokProduct(amazonData, product, isTikTok), [amazonData, product, isTikTok]);
  const normalizedAlibaba = useMemo(() => normalizeAlibabaSupplier(supplierInfo, alibabaData), [supplierInfo, alibabaData]);

  return (
    <div
      className="vault-research-entry !cursor-default !hover:translate-y-0 !hover:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      {/* Row Header with Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">

        <div className="flex items-center gap-6">

          {product.source && (
            <div className="px-3 py-1.5 rounded-full bg-brand-hover dark:bg-white/5 border border-brand-border dark:border-white/10 text-[10px] font-black text-brand-textSecondary dark:text-slate-400 uppercase tracking-widest leading-none">
              {product.source}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2">
        <div className="flex flex-col gap-3">
          {isTikTok && normalizedTikTok ? (
            <TrendProductCard
              title={normalizedTikTok.title}
              image={normalizedTikTok.image}
              category={normalizedTikTok.category}
              price={`$${normalizedTikTok.price}`}
              metrics={normalizedTikTok.metrics}
              variant="selected"
              isCalculator={true}
            />
          ) : (
            <AmazonProductCard
              product={normalizedAmazon}
              variant="selected"
              isCalculator={true}
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          {normalizedAlibaba && (
            <SpkbgSupplierCard
              data={normalizedAlibaba}
              variant="selected"
            />
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-6 mt-8 pt-6 border-t border-white/5">
        <button
          onClick={handleAnalyzeClick}
          className="flex items-center gap-2 text-[13px] font-bold text-[#6291DE] hover:opacity-80 underline underline-offset-4 transition-colors group/link"
        >
          <ExternalLink size={14} className="no-underline group-hover/link:translate-x-0.5 transition-transform" />
          View Details
        </button>
        <button
          onClick={() => onDelete(product.id)}
          disabled={isDeleting}
          className="flex items-center gap-2 text-[13px] font-bold text-brand-primary dark:text-red-500 hover:opacity-80 underline underline-offset-4 transition-colors disabled:opacity-50 disabled:no-underline"
        >
          <Trash2 size={14} className="no-underline" />
          {isDeleting ? "Deleting..." : "Delete Record"}
        </button>
      </div>
    </div>
  );
});

const CollectionDetails: React.FC<CollectionDetailsProps> = ({ collectionId, collectionName, onBack }) => {
  const queryClient = useQueryClient();
  const { success, error: toastError } = useToast();
  const [deleteModal, setDeleteModal] = React.useState<{ isOpen: boolean, id: string, name: string }>({ isOpen: false, id: "", name: "" });

  // UseQuery for Collection Details (products)
  const { data: collectionResponse, isLoading } = useQuery({
    queryKey: ["collection-details", collectionId],
    queryFn: () => {
      if (collectionId === "all-products") {
        return getSavedProducts();
      }
      return getSavedCategoriesDetail({ id: collectionId });
    },
    enabled: !!collectionId
  });

  const products = collectionId === "all-products"
    ? (Array.isArray(collectionResponse?.data) ? collectionResponse.data : [])
    : (collectionResponse?.data?.products || []);

  // Deletion Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSavedProducts({ saveID: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-details", collectionId] });
      queryClient.invalidateQueries({ queryKey: ["vault-all-products"] }); // Refresh counts in vault
      success("Record deleted successfully");
      setDeleteModal({ isOpen: false, id: "", name: "" });
    },
    onError: () => {
      toastError("Failed to delete record");
    }
  });

  // Grouping logic based on source/metrics
  const groupedProducts = useMemo(() => {
    const grouped: {
      explorer: any[];
      tiktok: any[];
      amazonTrends: any[];
    } = {
      explorer: [],
      tiktok: [],
      amazonTrends: []
    };

    products.forEach((product: any) => {
      const amazonProduct = product.amazon_product;
      const source = product.source || amazonProduct?.source;

      const isTikTok = source === 'tiktok_trends' || source === 'tiktok' || (amazonProduct && (
        amazonProduct.data?.metrics?.cpa !== undefined ||
        amazonProduct.data?.metrics?.ctr !== undefined ||
        amazonProduct.cpa !== undefined ||
        amazonProduct.ctr !== undefined
      ));

      if (isTikTok) {
        grouped.tiktok.push(product);
      } else if (source === 'amazon_trends' || source === 'amazon_explorer') {
        grouped.amazonTrends.push(product);
      } else {
        grouped.explorer.push(product);
      }
    });

    return grouped;
  }, [products]);

  const renderGroup = (title: string, description: string, groupProducts: any[]) => {
    if (groupProducts.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="mb-6 pl-1">
          <h2 className="text-[20px] font-bold text-brand-textPrimary dark:text-white tracking-tight">{title}</h2>
          <p className="text-[14px] text-brand-t
          extSecondary dark:text-slate-400 mt-1 max-w-[800px] leading-relaxed">
            {description}
          </p>
        </div>
        <div className="space-y-8">
          {groupProducts.map((product: any, idx: number) => (
            <ResearchRow
              key={product.id || idx}
              product={product}
              onDelete={(id) => {
                const amazonData = product.amazon_product?.data || product.amazon_product;
                const name = amazonData?.product_title || amazonData?.title || product.name || "this record";
                setDeleteModal({ isOpen: true, id, name });
              }}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === product.id}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={() => deleteMutation.mutate(deleteModal.id)}
        isLoading={deleteMutation.isPending}
        title="Delete Record?"
        message={`Are you sure you want to delete "${deleteModal.name}" from your vault? This action cannot be undone.`}
        confirmText="Yes, Delete"
        type="danger"
      />
      {/* Detail Header */}
      <div className="flex items-start justify-between gap-4 mb-8 !mt-0 px-4 pt-4">
        <div className="flex flex-col gap-1">
          <h1 className="!text-[20px] !text-left text-brand-textPrimary font-black dark:text-white mb-0 tracking-tight">
            Search Results for “{collectionName}”
          </h1>
          <p className="auth-subtitle !mb-0 !text-left text-brand-textSecondary dark:text-brand-textSecondary">
            Analyze {products.length} research entries in this collection
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-textPrimary dark:text-white 
          figma-pill-border !py-2.5 !px-5 text-[14px] font-bold transition-colors w-fit group shrink-0 mt-1"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </div>

      <div className="flex flex-col gap-8 px-4">
        {isLoading ? (
          <div className="animate-in fade-in duration-500">
            {Array.from({ length: 3 }).map((_, i) => (
              <ResearchRowSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="animate-in fade-in duration-700">
            {renderGroup(
              "BlueRitt Explorer",
              "Products discovered through BlueRitt Explorer - Providing detailed Amazon and Alibaba analysis with real-time metrics and supplier data.",
              groupedProducts.explorer
            )}

            {renderGroup(
              "BlueRitt SocialPulse (TikTok Trends)",
              "Trending products and high-engagement opportunities identified via BlueRitt TikTok Trends - Featuring specialized ad performance metrics, viral potential, and performance data.",
              groupedProducts.tiktok
            )}

            {renderGroup(
              "BlueRitt SocialPulse (Amazon Trends)",
              "Direct category and sales trends discovered through BlueRitt Amazon Trends - Focusing on market performance and niche growth opportunities.",
              groupedProducts.amazonTrends
            )}
          </div>
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center gap-4 bg-brand-hover dark:bg-white/5 border border-dashed border-brand-inputBorder dark:border-white/10 rounded-3xl">
            <div className="standard-icon-circle w-16 h-16 bg-brand-card dark:bg-white/5 text-brand-textSecondary dark:text-slate-500 shadow-sm dark:shadow-none">
              <ShoppingBag size={24} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-brand-textPrimary dark:text-white mb-1">Collection is empty</h3>
              <p className="text-brand-textSecondary dark:text-slate-500">No products found in this category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;
