import React from 'react';
import { Star, TrendingUp, Box, DollarSign, BarChart3, ExternalLink, Truck } from "lucide-react";

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
  const normalized = React.useMemo(() => {
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

  if (variant === 'list') {
    return (
      <div className="discovery-card-list group">
        <div className="product-img-wrapper-list">
          <img src={normalized.image} alt={normalized.title} className="w-full h-full object-contain transition-transform duration-700" />
        </div>
        <div className="flex-1 flex flex-col h-full py-1">
          <div className="flex flex-col gap-1.5 mb-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h3 className="product-card-title sm:line-clamp-1">{normalized.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {normalized.tags.filter(tag => tag && tag.trim().length > 0).map((tag, i) => (
                  <span key={i} className={`brand-tag ${tag.toLowerCase().includes("amazon choice") || tag.toLowerCase().includes("best seller") ? "brand-tag-amazon" :
                    tag.toLowerCase().includes("prime") ? "brand-tag-prime" :
                      tag.toLowerCase().includes("climate") ? "brand-tag-climate" :
                        "brand-tag-default"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-brand-inputBg px-2 py-1 rounded-full shrink-0 border border-brand-border">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill={i < Math.floor(normalized.rating) ? "#FFC107" : "transparent"} className={i < Math.floor(normalized.rating) ? "text-[#FFC107]" : "text-brand-textSecondary"} />
                ))}
                <span className="text-[12px] font-bold text-brand-textPrimary">{normalized.rating}</span>
              </div>
            </div>
          </div>
          <div className="product-metrics-row-list">
            <div className="flex items-center gap-2.5">
              <div className="quick-action-icon-circle !w-8 !h-8 shrink-0"><Box size={14} className="text-brand-primary dark:text-white" /></div>
              <div className="flex flex-col">
                <span className="metric-label leading-none mb-1">ASIN</span>
                <span className="metric-value leading-none">{normalized.asin}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="quick-action-icon-circle !w-8 !h-8 shrink-0"><DollarSign size={14} className="text-brand-primary dark:text-white" /></div>
              <div className="flex flex-col">
                <span className="metric-label leading-none mb-1">OFFERS</span>
                <span className="metric-value leading-none">{normalized.offers} sellers</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="quick-action-icon-circle !w-8 !h-8 shrink-0"><BarChart3 size={14} className="text-brand-primary dark:text-white" /></div>
              <div className="flex flex-col">
                <span className="metric-label leading-none mb-1">MONTHLY SALES VOL</span>
                <span className="metric-value leading-none">{normalized.salesVol}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-price-section-list">
          <div className="flex flex-col items-end mb-2">
            <div className="flex items-baseline gap-2">
              <span className="product-old-price-primary text-[20px]">${normalized.oldPrice}</span>
              <span className="product-price-primary text-[28px]">${normalized.price}</span>
            </div>
            <div className="flex items-center gap-3">
              {normalized.growth && <div className="trending-badge-standard"><TrendingUp size={12} /> {normalized.growth}</div>}
              <span className="rating-text-standard">{normalized.numRatings} ratings</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-2 w-full">
            <button className="btn-product-details flex-1" onClick={onDetailsClick}>Product Details <ExternalLink size={14} /></button>
            <button className="btn-discover-supplier flex-1" onClick={onDiscoverSuppliers}>Discover Supplier</button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="discovery-card-grid group">
        <div className="product-img-wrapper-grid">
          <img src={normalized.image} alt={normalized.title} className="w-full h-full object-contain transition-transform duration-700" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="product-card-title mb-3">{normalized.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {normalized.tags.filter(tag => tag && tag.trim().length > 0).map((tag, i) => (
              <span key={i} className={`brand-tag ${tag.toLowerCase().includes("amazon choice") || tag.toLowerCase().includes("best seller") ? "brand-tag-amazon" :
                tag.toLowerCase().includes("prime") ? "brand-tag-prime" :
                  tag.toLowerCase().includes("climate") ? "brand-tag-climate" :
                    "brand-tag-default"}`}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="product-price-primary text-[20px]">${normalized.price}</span>
                <span className="product-old-price-primary text-[14px]">${normalized.oldPrice}</span>
              </div>
              {normalized.growth && <div className="trending-badge-standard"><TrendingUp size={12} /> {normalized.growth}</div>}
            </div>
            <div className="flex items-center gap-2 bg-brand-inputBg px-2 py-1 rounded-full shrink-0 border border-brand-border">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill={i < Math.floor(normalized.rating) ? "#FFC107" : "transparent"} className={i < Math.floor(normalized.rating) ? "text-[#FFC107]" : "text-brand-textSecondary"} />
                ))}
              </div>
              <span className="text-[12px] font-bold text-brand-textPrimary leading-none">{normalized.rating}</span>
            </div>
          </div>
          <div className="product-metrics-row-grid grid grid-cols-3 py-4 border-t border-brand-border mt-auto">
            <div className="flex flex-col items-center text-center">
              <div className="quick-action-icon-circle !w-8 !h-8 mb-2 shrink-0"><Box size={14} className="text-brand-primary dark:text-white" /></div>
              <span className="metric-label mb-0.5">ASIN</span>
              <span className="metric-value">{normalized.asin}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="quick-action-icon-circle !w-8 !h-8 mb-2 shrink-0"><DollarSign size={14} className="text-brand-primary dark:text-white" /></div>
              <span className="metric-label mb-0.5">OFFERS</span>
              <span className="metric-value">{normalized.offers} sellers</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="quick-action-icon-circle !w-8 !h-8 mb-2 shrink-0"><BarChart3 size={14} className="text-brand-primary dark:text-white" /></div>
              <span className="metric-label mb-0.5">Monthly Sales Volume</span>
              <span className="metric-value">{normalized.salesVol}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button className="flex-1 btn-product-details" onClick={onDetailsClick}>Details <ExternalLink size={14} /></button>
            <button className="flex-1 btn-discover-supplier" onClick={onDiscoverSuppliers}>Discover</button>
          </div>
        </div>
      </div>
    );
  }

  // Variant: SELECTED (Used in SourceLink panels and Profit Calculator)
  return (
    <div className="discovery-card-list flex-col !p-0 isolate">
      <div className="px-5 py-4 border-b border-brand-border flex items-center gap-2 w-full">
        <Box size={14} className="text-[#FF5900]" />
        <span className="text-[11px] text-[#FF5900] font-black tracking-widest uppercase">Selected Product</span>
      </div>
      <div className="p-4 sm:p-2 w-full text-brand-textPrimary">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <div className="product-img-wrapper-list !w-[100px] !h-[100px] shadow-2xl mx-auto lg:mx-0 shrink-0 bg-brand-bg">
            <img src={normalized.image} alt={normalized.title} className="w-full h-full object-cover" />
          </div>
          <div className={`flex-1 w-full flex flex-col ${isCalculator ? 'gap-3' : 'gap-4'}`}>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-2 mt-1">
              <h3 className="product-card-title text-[15px] sm:text-[16px] lg:max-w-[600px] text-center lg:text-left">{normalized.title}</h3>
              <div className="flex items-baseline gap-2 shrink-0 self-center lg:self-auto">
                <span className="product-old-price-primary text-[14px]">${normalized.oldPrice}</span>
                <span className="product-price-primary text-[22px]">${normalized.price}</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
              <div className="product-metrics-row-list !mt-0 !gap-x-4 !gap-y-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0"><Box size={15} className="text-brand-primary dark:text-white" /></div>
                  <div className="flex flex-col"><span className="metric-label leading-none mb-1">ASIN</span><span className="metric-value leading-none">{normalized.asin}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0 text-brand-primary dark:text-white"><TrendingUp size={15} /></div>
                  <div className="flex flex-col"><span className="metric-label leading-none mb-1">Monthly Sales Volume</span><span className="metric-value leading-none">{normalized.salesVol}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0"><span className="text-brand-primary dark:text-white font-bold text-[14px] leading-none">%</span></div>
                  <div className="flex flex-col"><span className="metric-label leading-none mb-1">OFFERS</span><span className="metric-value leading-none">{normalized.offers}</span></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="!w-8 !h-8 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0"><Truck size={15} className="text-brand-primary dark:text-white" /></div>
                  <div className="flex flex-col"><span className="metric-label leading-none mb-1">DELIVERY</span><span className="metric-value leading-none">Free</span></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {normalized.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className={`brand-tag ${tag.toLowerCase().includes("amazon choice") || tag.toLowerCase().includes("best seller") ? "brand-tag-amazon" :
                        tag.toLowerCase().includes("prime") ? "brand-tag-prime" :
                          tag.toLowerCase().includes("climate") ? "brand-tag-climate" :
                            "brand-tag-default"} px-2.5 py-0.5 text-[10px] whitespace-nowrap uppercase tracking-wider font-bold`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(normalized.rating) ? "#FFC107" : "transparent"} className={i < Math.floor(normalized.rating) ? "text-[#FFC107]" : "text-brand-textSecondary"} />
                      ))}
                    </div>
                    <span className="text-[12px] font-bold text-[#FFC107] leading-none">{normalized.rating}</span>
                    <span className="text-[10px] text-brand-textSecondary font-bold">({normalized.numRatings})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`grid mt-4 gap-y-4 gap-x-8 px-2 pt-6 border-t border-brand-border ${isCalculator ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:flex md:flex-row items-stretch gap-2'}`}>
          {[
            { label: "Seller Name", value: normalized.seller, flex: "flex-[1.6]" },
            { label: "Ships From", value: normalized.shipsFrom, flex: "flex-[1.6]" },
            { label: "Country", value: normalized.country, flex: "flex-[1.2]" },
            { label: "Rating", value: normalized.rating, flex: "flex-[1.2]" },
            { label: "Dimensions", value: normalized.dimensions, flex: "flex-[1.4]" },
            { label: "Weight", value: normalized.weight, flex: "flex-[1]" }
          ].map((m, i) => (
            isCalculator ? (
              <div key={i} className="flex flex-col gap-1.5">
                <span className="metric-label !text-brand-textSecondary uppercase tracking-wider">{m.label}</span>
                <span className="metric-value text-brand-textPrimary">{m.value}</span>
              </div>
            ) : (
              <div key={i} className={`${m.flex} bg-brand-inputBg py-2.5 px-4 rounded-xl border border-brand-border flex flex-col justify-center min-h-[48px] shadow-inner hover:border-brand-primary/10 transition-colors`}>
                <span className="text-[12px] text-brand-textSecondary tracking-widest mb-1 opacity-60">{m.label}</span>
                <span className="text-[11px] text-brand-textPrimary font-bold leading-tight truncate">{m.value}</span>
              </div>
            )
          ))}
        </div>
        {(onCopyLink || onOpenProduct) && (
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 w-full border-t border-brand-border pt-5">
            {onCopyLink && <button onClick={onCopyLink} className="flex-1 sm:flex-none btn-product-details !px-8 !h-[42px] !font-bold">{isCopied ? "Copied" : "Copy Seller Link"}</button>}
            {onOpenProduct && <button onClick={onOpenProduct} className="flex-1 sm:flex-none btn-discover-supplier !px-10 !h-[42px] !font-bold">Open Product</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmazonProductCard;
