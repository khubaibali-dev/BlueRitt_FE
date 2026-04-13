import React from 'react';
import SpkbgCard, { SpkbgCardData } from '../../../../../components/common/SpkCards/SpkbgCard';

interface AmazonProductCardProps {
  product: any;
  variant?: 'grid' | 'list' | 'selected';
  onDetailsClick?: () => void;
  onDiscoverSuppliers?: () => void;
  onCopyLink?: () => void;
  onOpenProduct?: () => void;
  isCopied?: boolean;
  isCalculator?: boolean;
}

const AmazonProductCard: React.FC<AmazonProductCardProps> = ({
  product,
  variant = 'grid',
  onDetailsClick,
  onDiscoverSuppliers,
  onCopyLink,
  onOpenProduct,
  isCopied = false,
  isCalculator = false
}) => {
  // Common normalization logic
  const normalized: SpkbgCardData | null = React.useMemo(() => {
    if (!product) return null;

    // Check if product is already normalized (e.g. has 'image' instead of 'product_photo')
    const tags: string[] = product.tags || [];
    if (tags.length === 0) {
      if (product.is_best_seller) tags.push("Best Seller");
      if (product.is_amazon_choice) tags.push("Amazon Choice");
      if (product.is_prime) tags.push("Prime");
      if (product.climate_pledge_friendly) tags.push("Climate Pledge");
    }

    return {
      title: product.product_title || product.title || "Selected Product",
      image: product.product_photo || product.image || "",
      price: product.product_price?.toString().replace("$", "") || product.price?.toString().replace("$", "") || "0.00",
      oldPrice: product.product_original_price?.toString().replace("$", "") || product.oldPrice?.toString().replace("$", "") || product.product_price?.toString().replace("$", "") || "0.00",
      asin: product.asin || "N/A",
      salesVol: product.sales_volume || product.salesVol || "N/A",
      offers: product.product_num_offers?.toString() || product.offers?.toString() || "1",
      seller: product.product_seller_name || product.seller || product.product_offers?.[0]?.seller || "Amazon.com",
      shipsFrom: product.ships_from || product.shipsFrom || product.product_offers?.[0]?.ships_from || product.delivery || "Amazon",
      country: product.seller_country || product.country || "US",
      rating: parseFloat(product.product_star_rating || product.rating || "4.5"),
      numRatings: product.product_num_ratings || product.ratings || product.numRatings || "0",
      product_url: product.product_url || "",
      dimensions: product.product_information?.["Product Dimensions"] || product.product_details?.["Product Dimensions"] || product.product_information?.["Package Dimensions"] || product.dimensions || "N/A",
      weight: product.product_information?.["Item Weight"] || product.product_details?.["Item Weight"] || product.weight || "N/A",
      growth: product.growth || "",
      tags: tags
    };
  }, [product]);

  if (!normalized) return null;

  return (
    <SpkbgCard
      data={normalized}
      variant={variant}
      onDetailsClick={onDetailsClick}
      onDiscoverSuppliers={onDiscoverSuppliers}
      onCopyLink={onCopyLink}
      onOpenProduct={onOpenProduct}
      isCopied={isCopied}
      isCalculator={isCalculator}
    />
  );
};

export default AmazonProductCard;
