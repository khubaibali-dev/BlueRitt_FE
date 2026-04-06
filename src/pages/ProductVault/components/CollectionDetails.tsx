import React, { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ShoppingBag, ExternalLink, Trash2
} from "lucide-react";
import { getSavedCategoriesDetail, deleteSavedProducts } from "../../../api/savedProducts";
import ConfirmationModal from "../../../components/common/Modals/ConfirmationModal";
import { useToast } from "../../../components/common/Toast/ToastContext";
import AmazonProductCard from "../../Explorer/components/Common/Cards/AmazonProductCard";
import TrendProductCard from "../../SocialPulse/TiktokTrends/components/TrendProductCard";
import ResearchRowSkeleton from "../../../components/common/Skeletons/ResearchRowSkeleton";
import VaultAlibabaCard from "./VaultAlibabaCard";


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

  const isTikTok = useMemo(() => {
    const amazonProduct = product.amazon_product;
    const source = amazonProduct?.source;
    return source === 'tiktok_trends' || (amazonProduct && (
      amazonProduct.cpa !== undefined ||
      amazonProduct.ctr !== undefined ||
      amazonProduct.cvr !== undefined ||
      amazonProduct.impression !== undefined ||
      amazonProduct.data?.cpa !== undefined
    ));
  }, [product]);

  const normalizedAmazon = useMemo(() => {
    if (!amazonData || isTikTok) return null;
    const tags: string[] = [];
    if (amazonData.is_best_seller) tags.push("Best Seller");
    if (amazonData.is_amazon_choice) tags.push("Amazon Choice");
    if (amazonData.is_prime) tags.push("Prime");

    // Price logic: prioritize amazonData.product_price over product.selling_price if it's 0.00
    const amazonPrice = amazonData.product_price?.toString().replace("$", "") || "";
    const finalPrice = product.selling_price && product.selling_price !== "0.00"
      ? product.selling_price
      : (amazonPrice || "0.00");

    return {
      title: amazonData.product_title || amazonData.title || product.name || "Product",
      image: amazonData.product_photo || amazonData.image || "",
      price: finalPrice,
      oldPrice: amazonData.product_original_price?.toString().replace("$", "") || finalPrice,
      asin: amazonData.asin || "N/A",
      salesVol: amazonData.sales_volume || "N/A",
      offers: amazonData.product_num_offers?.toString() || "1",
      seller: amazonData.product_seller_name || "Amazon.com",
      shipsFrom: amazonData.ships_from || "Amazon",
      country: amazonData.seller_country || "US",
      rating: parseFloat(amazonData.product_star_rating || "4.5"),
      numRatings: amazonData.product_num_ratings || "0",
      dimensions: amazonData.product_information?.["Product Dimensions"] || "N/A",
      weight: amazonData.product_information?.["Item Weight"] || "N/A",
      tags: tags.length > 0 ? tags : (amazonData.tags || [])
    };
  }, [amazonData, product, isTikTok]);

  const normalizedTikTok = useMemo(() => {
    if (!isTikTok || !amazonData) return null;

    // In many API responses, data is nested in the 'data' field or is top-level
    const data = amazonData.data || amazonData;

    return {
      title: data.shop_product_title || data.url_title || product.name || "TikTok Product",
      image: data.cover_url || data.product_photo || "",
      category: data.third_ecom_category?.value || data.first_ecom_category?.value || data.category || "Trending",
      price: (data.shop_price || data.cost || product.selling_price || "0.00").toLocaleString(),
      metrics: {
        ctr: data.ctr ? (String(data.ctr).includes('%') ? data.ctr : data.ctr + "%") : "0%",
        cvr: data.cvr ? (String(data.cvr).includes('%') ? data.cvr : data.cvr + "%") : "0%",
        cpa: data.cpa ? (typeof data.cpa === "number" ? `$${data.cpa.toFixed(2)}` : data.cpa) : "$0.00",
        impressions: (data.impression || data.impressions || 0).toLocaleString(),
        post_count: data.post || 0,
        like_count: data.like || 0,
        share_count: data.share || 0,
        comment_count: data.comment || 0,
        total_ad_spent: data.cost ? `$${data.cost.toLocaleString()}` : "$0",
        subcategory1: data.second_ecom_category?.value || "",
        subcategory2: data.third_ecom_category?.value || "",
        post_change: data.post_change ? `${data.post_change}%` : "",
        play_rate_6s: data.play_six_rate ? `${data.play_six_rate}%` : "",
        e_com_type: data.ecom_type || "L3",
        category: data.first_ecom_category?.value || "Trending"
      }
    };
  }, [amazonData, isTikTok, product.selling_price, product.name]);

  const normalizedAlibaba = useMemo(() => {
    // Priority: supplier_info (if available), then TikTok supplier sub-object, then nested alibaba_product.item, then alibaba_product root
    const data = supplierInfo || alibabaData?.supplier || alibabaData?.item || alibabaData;
    if (!data) return null;

    // Company/Store details
    const storeAgeValue = data.years_in_business || data.seller_store?.storeAge || data.storeAge || data.age || "N/A";
    const storeNameValue = data.supplier_name || data.company?.companyName || data.storeName || data.name || "N/A";
    const contactName = data.company?.companyContact?.name || data.contact || "Verified Supplier";

    // Pricing and MOQ logic
    const skuModule = data.sku?.def;
    const priceValue = data.price_per_unit || data.estimated_price ||
      skuModule?.priceModule?.priceFormatted ||
      skuModule?.priceModule?.priceList?.[0]?.priceFormatted ||
      data.price || data.cost || "0.00";

    const moqValue = data.min_order_quantity ||
      skuModule?.quantityModule?.minOrder?.quantityFormatted ||
      skuModule?.quantityModule?.minOrder?.quantity ||
      data.moq || data.minOrder || "N/A";

    const ratingValue = data.rating || data.seller_store?.storeEvaluates?.[0]?.score || "4.5";
    const countryValue = data.location || data.company_details?.companyAddress?.country || data.country || "China";

    // Badges/Status
    const status = data.company_details?.status || data;

    // Explicitly determine verified and gold status with safe fallbacks
    const isVerifiedValue = (status.verified ?? status.isVerified ?? status.verified_supplier) ?? true;
    const isGoldValue = (status.gold ?? status.isGoldMember) ?? (status.verification_badge ? status.verification_badge === "Gold Supplier" : true);
    const tradeAssuranceValue = (status.tradeAssurance === "1" || status.TradeAssurance === true || status.trade_assurance === "1");

    // Image logic: prioritize supplier_product_image (TikTok) and ensure https prefix
    let imageSrc = data.supplier_product_image || (data.images && data.images[0]) || data.image || "";
    if (typeof imageSrc === 'string' && imageSrc.startsWith('//')) {
      imageSrc = `https:${imageSrc}`;
    }

    return {
      id: data.itemId || data.id || "N/A",
      name: data.title || data.name || "Alibaba Sourcing Partner",
      image: imageSrc,
      rating: ratingValue,
      storeAge: storeAgeValue,
      storeName: storeNameValue,
      contact: contactName,
      price: priceValue.toString().replace("$", ""),
      minOrder: moqValue,
      country: countryValue,
      isVerified: isVerifiedValue,
      TradeAssurance: tradeAssuranceValue,
      isGoldMember: isGoldValue
    };
  }, [supplierInfo, alibabaData]);

  return (
    <div
      className="vault-research-entry !cursor-default !hover:translate-y-0 !hover:shadow-none !hover:bg-[#FFFFFF03] animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      {/* Row Header with Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">

        <div className="flex items-center gap-6">

          {product.source && (
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              {product.source}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-2">
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
        <div className="flex flex-col gap-3">
          <VaultAlibabaCard
            supplier={normalizedAlibaba}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-6 mt-8 pt-6 border-t border-white/5">
        <button
          onClick={handleAnalyzeClick}
          className="flex items-center gap-2 text-[13px] font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors group/link"
        >
          <ExternalLink size={14} className="no-underline group-hover/link:translate-x-0.5 transition-transform" />
          View Details
        </button>
        <button
          onClick={() => onDelete(product.id)}
          disabled={isDeleting}
          className="flex items-center gap-2 text-[13px] font-bold text-red-500 hover:text-red-400 underline underline-offset-4 transition-colors disabled:opacity-50 disabled:no-underline"
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
    queryFn: () => getSavedCategoriesDetail({ id: collectionId }),
    enabled: !!collectionId
  });

  const products = collectionResponse?.data?.products || [];

  // Deletion Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSavedProducts({ saveID: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-details", collectionId] });
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
      const source = amazonProduct?.source;

      const isTikTok = source === 'tiktok_trends' || (amazonProduct && (
        amazonProduct.cpa !== undefined ||
        amazonProduct.ctr !== undefined ||
        amazonProduct.cvr !== undefined ||
        amazonProduct.impression !== undefined ||
        amazonProduct.data?.cpa !== undefined
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
          <h2 className="text-[20px] font-bold text-white tracking-tight">{title}</h2>
          <p className="text-[14px] text-slate-400 mt-1 max-w-[800px] leading-relaxed">
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
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-10">
        <div className="flex flex-col gap-1">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-blue-300 text-[14px] font-bold mb-2 transition-colors w-fit group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Vault
          </button>
          <h1 className="banner-heading-text !mb-1 !text-left">{collectionName}</h1>
          <p className="auth-subtitle !text-left ml-4">Analyze {products.length} research entries in this collection</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
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
          <div className="col-span-full py-20 flex flex-col items-center gap-4 bg-white/5 border border-dashed border-white/10 rounded-3xl">
            <div className="standard-icon-circle w-16 h-16 bg-white/5 text-slate-500">
              <ShoppingBag size={24} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">Collection is empty</h3>
              <p className="text-slate-500">No products found in this category.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;
