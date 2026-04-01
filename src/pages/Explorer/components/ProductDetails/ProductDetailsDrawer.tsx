import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Star, Box, BarChart3, Truck, DollarSign, ChevronDown, ChevronUp, AlertTriangle, Zap, Check, Loader2, Store } from "lucide-react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getAmazonExplorerProductDetails, getAmazonExplorerProductReviews, ProductReview } from "../../../../api/amazonExplorer";

interface ProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    image: string;
    price: string;
    oldPrice: string;
    asin: string;
    growth?: string;
    ratings: string;
    rating: number;
    offers: string;
    salesVol: string;
    brand?: string;
    category_path?: string | Array<{ id: string; name: string; link: string }>;
    availability?: string;
    is_best_seller?: boolean;
    is_amazon_choice?: boolean;
    is_prime?: boolean;
    climate_pledge_friendly?: boolean;
    tags?: string[];
    seller?: string;
    ships_from?: string;
    seller_country?: string;
    seller_rating?: string;
  } | null;
  onDiscoverSuppliers?: () => void;
}

const DetailsSkeleton = () => (
  <div className="animate-pulse space-y-8">
    <div className="flex gap-4">
      <div className="w-28 h-28 bg-white/5 rounded-[22px]" />
      <div className="flex-1 space-y-4">
        <div className="h-6 bg-white/5 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-1/4" />
        <div className="h-8 bg-white/5 rounded w-1/2" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-white/5 rounded-xl" />)}
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl" />)}
    </div>
  </div>
);

const ReviewsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-40 bg-white/5 rounded-[12px]" />
    {[1, 2].map(i => (
      <div key={i} className="h-48 bg-white/5 rounded-[12px]" />
    ))}
  </div>
);

const OffersSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-40 bg-white/5 rounded-[20px]" />
    {[1, 2].map(i => (
      <div key={i} className="h-56 bg-white/5 rounded-[12px]" />
    ))}
  </div>
);

const ReviewCard: React.FC<{ rev: ProductReview }> = ({ rev }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongComment = rev.review_comment.length > 300;
  const displayedComment = isLongComment && !isExpanded
    ? `${rev.review_comment.substring(0, 300)}...`
    : rev.review_comment;

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
            {rev.review_author_avatar ? (
              <img src={rev.review_author_avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-[14px] font-bold text-[#6291DE]">{rev.review_author?.[0]}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-[14px]">{rev.review_author}</span>
              {rev.is_verified_purchase && (
                <span className="text-[10px] bg-[#6291DE22] text-[#6291DE] px-1.5 py-0.5 rounded flex items-center gap-1 border border-[#6291DE33]">
                  <Check size={8} /> Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill={i < Math.floor(parseFloat(rev.review_star_rating || "0")) ? "#FFC107" : "transparent"} className={i < Math.floor(parseFloat(rev.review_star_rating || "0")) ? "text-[#FFC107]" : "text-white/10"} />
                ))}
              </div>
              <span className="text-[#FFFFFFB2] text-[11px]">{rev.review_date}</span>
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-white font-bold text-[15px] mb-2">{rev.review_title}</h4>
      <p className="text-[#FFFFFFCC] text-[14px] leading-relaxed">
        {displayedComment}
      </p>
      {isLongComment && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#6291DE] text-[12px] font-bold hover:underline flex items-center gap-1"
          >
            {isExpanded ? "Read Less" : "Read More"}
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      )}
    </div>
  );
};

const ProductDetailsDrawer: React.FC<ProductDetailsDrawerProps> = ({ isOpen, onClose, onDiscoverSuppliers, product }) => {
  const [activeTab, setActiveTab] = useState<'Details' | 'Reviews' | 'Offers'>('Details');
  const [expandedSection, setExpandedSection] = useState<string | null>('About Product');
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [displayProduct, setDisplayProduct] = useState(product);

  useEffect(() => {
    if (product) {
      setDisplayProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('Details');
    }
  }, [isOpen]);

  const { data: detailsData, isLoading: isDetailsLoading } = useQuery({
    queryKey: ["amazon-product-details", displayProduct?.asin],
    queryFn: () => getAmazonExplorerProductDetails({ asin: displayProduct?.asin || "" }),
    enabled: isOpen && !!displayProduct?.asin,
  });

  const {
    data: reviewsInfiniteData,
    isLoading: isReviewsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["amazon-product-reviews", displayProduct?.asin],
    queryFn: ({ pageParam = 1 }) => getAmazonExplorerProductReviews({
      asin: displayProduct?.asin || "",
      page: pageParam as number
    }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.has_more_reviews ? (lastPage.page || 1) + 1 : undefined,
    enabled: isOpen && !!displayProduct?.asin && activeTab === 'Reviews',
  });

  const reviews = reviewsInfiniteData?.pages.flatMap(page => page.reviews) || [];
  const currentPage = reviewsInfiniteData?.pages.length || 1;
  const details = detailsData?.data;
  const offers = details?.product_offers || [];

  const isSoldByAmazon = offers.some(offer =>
    offer.seller && offer.seller.toLowerCase().includes("amazon")
  );

  if (!displayProduct) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const tagsToDisplay = displayProduct?.tags || [];

  return createPortal(
    <>
      <div
        className={`product-details-drawer-backdrop ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div className={`product-details-drawer-panel ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Product Details</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-white transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
            {(['Details', 'Reviews', 'Offers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "Details" | "Reviews" | "Offers")}
                className={`flex items-center gap-2 px-4 py-2 rounded-[14px] text-[16px] transition-all ${activeTab === tab ? 'text-[#FFFFFF] shadow-lg font-bold' : 'text-[#FFFFFF] hover:bg-white/5'}`}
                style={activeTab === tab ? { background: 'linear-gradient(96.06deg, #155DFC -33.01%, #CD5150 124.28%)' } : {}}
              >
                {tab === 'Details' && <Box size={14} />}
                {tab === 'Reviews' && <Star size={14} />}
                {tab === 'Offers' && <DollarSign size={14} />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 border-b border-[#1C263C] mx-6" />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6">
          {isSoldByAmazon && (
            <div className="mb-6 py-3 px-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <p className="text-red-400 text-[14px] font-medium flex items-center justify-center gap-2">
                <AlertTriangle size={16} />
                This product is sold by Amazon and we do not recommend purchasing it
              </p>
            </div>
          )}

          {activeTab === 'Details' && (
            isDetailsLoading ? <DetailsSkeleton /> : (
              <>
                <div className="flex gap-4 mb-6">
                  <div className="w-28 h-28 rounded-[22px] overflow-hidden shrink-0 border border-white/10">
                    <img src={details?.product_photos?.[0] || displayProduct.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="product-card-title text-[18px] leading-tight line-clamp-2">{details?.product_title || displayProduct.title}</h3>
                      {details?.category_path && (
                        <span className="text-[#6291DE] text-[12px] font-bold uppercase tracking-wider">
                          {typeof details.category_path === 'string'
                            ? details.category_path.split('>').pop()?.trim()
                            : Array.isArray(details.category_path)
                              ? details.category_path[details.category_path.length - 1]?.name
                              : "Product"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="product-price-primary text-[22px]">
                          {details?.product_price || `$${displayProduct.price}`}
                        </div>
                        {details?.product_original_price && (
                          <div className="product-old-price-primary text-[14px] mt-1 line-through">{details.product_original_price}</div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="bg-white/5 rounded-full px-3 py-1 flex items-center gap-1 border border-white/5">
                          <span className="text-white text-[13px] font-bold">{details?.product_star_rating || displayProduct.rating}</span>
                          <Star size={12} fill="#FFC107" className="text-[#FFC107]" />
                        </div>
                        <div className="flex flex-col items-end gap-1.5 justify-start">
                          {tagsToDisplay.map((tag, index) => (
                            <span
                              key={index}
                              className={`brand-tag ${tag.toLowerCase().includes("amazon choice") || tag.toLowerCase().includes("best seller") ? "brand-tag-amazon" :
                                tag.toLowerCase().includes("climate friendly") ? "brand-tag-climate" :
                                  tag.toLowerCase().includes("prime") ? "brand-tag-prime" :
                                    "brand-tag-default"
                                } uppercase tracking-wider`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Row */}
                <div className="flex items-center gap-4 mb-9">
                  <span className="rating-text-standard text-[13px]">{details?.product_num_ratings || displayProduct.ratings} ratings</span>
                </div>

                <div className="border-b border-[#1C263C] mb-10" />

                <div className="grid grid-cols-4 gap-2 mb-8">
                  {[
                    { label: "ASIN", value: details?.asin, icon: Box },
                    {
                      label: "SALES VOL", value: details?.sales_volume
                      , icon: BarChart3
                    },
                    { label: "OFFERS", value: details?.product_num_offers ? `${details.product_num_offers}` : displayProduct.offers, icon: Zap },
                    {
                      label: "DELIVERY",
                      value: details?.delivery?.toLowerCase().includes("free") ? "Free" : (details?.delivery || "Free"),
                      icon: Truck
                    }
                  ].map((m, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="!w-10 !h-10 rounded-full quick-action-icon-circle flex items-center justify-center mb-1 text-white shadow-xl">
                        <m.icon size={22} className="text-white" />
                      </div>
                      <span className="metric-label mb-1">{m.label}</span>
                      <span className="metric-value">{m.value}</span>
                    </div>
                  ))}
                </div>
                {/* Seller / Shipping Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                    <span className="metric-label">Seller Name</span>
                    <span className="metric-value truncate">{details?.seller || details?.product_offers?.[0]?.seller || "Amazon"}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                    <span className="metric-label">Ships From</span>
                    <span className="metric-value truncate">{details?.ships_from || details?.product_offers?.[0]?.ships_from || "Amazon"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                      <span className="metric-label">Seller Country</span>
                      <span className="text-[12px] text-[#FFFFFF] font-medium uppercase">{details?.seller_country || "US"}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                      <span className="metric-label">Seller Rating</span>
                      <div className="flex items-center gap-2">
                        <div className="!w-6 !h-6 rounded-full flex items-center justify-center quick-action-icon-circle">
                          <Star size={11} className="text-white" />
                        </div>
                        <span className="metric-value">{details?.product_offers?.[0]?.seller_star_rating || "4.0"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                      <span className="metric-label">Item Dimensions</span>
                      <span className="metric-value truncate text-[11px]">
                        {details?.product_information?.["Product Dimensions"] ||
                          details?.product_details?.["Product Dimensions"] ||
                          details?.product_information?.["Package Dimensions"] || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-3.5 rounded-[12px] bg-[#04132B] border border-brand-inputBorder shadow-xl">
                      <span className="metric-label">Item Weight</span>
                      <span className="metric-value truncate">
                        {details?.product_information?.["Item Weight"] ||
                          details?.product_details?.["Item Weight"] || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-10">
                  {['About Product', 'Product Information', 'Product Details'].map((section) => (
                    <div key={section} className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
                      <button
                        onClick={() => toggleSection(section)}
                        className="w-full flex items-center justify-between p-4 text-[14px] font-bold text-white hover:bg-white/5 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {section === 'About Product' && <Box size={16} className="text-[#6291DE]" />}
                          {section === 'Product Information' && <Box size={16} className="text-[#6291DE]" />}
                          {section === 'Product Details' && <Box size={16} className="text-[#6291DE]" />}
                          {section}
                        </span>
                        {expandedSection === section ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedSection === section && (
                        <div className="p-4 pt-0 border-t border-white/5">
                          <div className="text-[13px] text-[#FFFFFFCC] leading-relaxed mt-4">
                            {section === 'About Product' && (
                              <ul className="space-y-3">
                                {(isAboutExpanded ? details?.about_product : details?.about_product?.slice(0, 4))?.map((item, i) => (
                                  <li key={i} className="flex gap-2 text-[#FFFFFFCC]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#6291DE] mt-1.5 shrink-0" />
                                    <p>{item}</p>
                                  </li>
                                ))}
                                {!details?.about_product && <p className="italic text-center py-2">No information available</p>}
                                {details?.about_product && details.about_product.length > 4 && (
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                                      className="text-[#6291DE] text-[13px] font-bold mt-2 hover:underline flex items-center gap-1 transition-all"
                                    >
                                      {isAboutExpanded ? "Read Less" : "Read More"}
                                      {isAboutExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                  </div>
                                )}
                              </ul>
                            )}
                            {section === 'Product Information' && details?.product_information && (
                              <div className="grid grid-cols-1 gap-2">
                                {Object.entries(details.product_information).map(([key, val]: [string, any]) => (
                                  <div key={key} className="border-b border-white/5 py-2">
                                    <span className="text-[#FFFFFFB2]">{key}: </span>
                                    <span className="text-white font-medium">{String(val)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {section === 'Product Details' && details?.product_details && (
                              <div className="grid grid-cols-1 gap-2">
                                {Object.entries(details.product_details).map(([key, val]: [string, any]) => (
                                  <div key={key} className="border-b border-white/5 py-2">
                                    <span className="text-[#FFFFFFB2]">{key}: </span>
                                    <span className="text-white font-medium">{String(val)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {!(section === 'About Product' ? details?.about_product : section === 'Product Information' ? details?.product_information : details?.product_details) && (
                              <p className="text-center italic py-4">No additional details available</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )
          )}

          {activeTab === 'Reviews' && (
            isReviewsLoading ? <ReviewsSkeleton /> : (
              <div className="space-y-6">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-white font-bold text-[18px] mb-1">Customer Reviews</h3>
                      <p className="text-[#FFFFFFB2] text-[13px]">Based on {reviews.length} recent reviews</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[32px] font-bold text-white">{details?.product_star_rating || displayProduct.rating}</div>
                      <div className="flex justify-end gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(parseFloat(String(details?.product_star_rating || displayProduct.rating))) ? "#FFC107" : "transparent"}
                            className={i < Math.floor(parseFloat(String(details?.product_star_rating || displayProduct.rating))) ? "text-[#FFC107]" : "text-white/10"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter(r => Math.floor(parseFloat(r.review_star_rating || "0")) === star).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-[#FFFFFFB2] text-[12px] w-10">{star} star</span>
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-[#6291DE] rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-[#FFFFFFB2] text-[12px] w-8 text-right">{Math.round(percentage)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    <>
                      {reviews.map((rev, idx) => (
                        <ReviewCard key={`${rev.review_id}-${idx}`} rev={rev} />
                      ))}

                      {hasNextPage && (
                        <div className="flex flex-col items-center mt-8 pb-4">
                          <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="w-[200px] h-[44px] flex items-center justify-center rounded-full figma-pill-border text-white text-[14px] font-bold hover:bg-white/5 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isFetchingNextPage ? (
                              <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                Loading...
                              </>
                            ) : (
                              'Load More Reviews'
                            )}
                          </button>
                          <div className="mt-2.5">
                            <span className="text-[#FFFFFFB2] text-[13px] font-medium">
                              Page {currentPage}
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                      <Star size={32} className="mx-auto mb-3 text-white/10" />
                      <p className="text-[#FFFFFFB2]">No recent reviews found</p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          {activeTab === 'Offers' && (
            isDetailsLoading ? <OffersSkeleton /> : (
              <div className="space-y-6">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-bold text-[18px] mb-1">Available Offers</h3>
                      <p className="text-[#FFFFFFB2] text-[13px]">Compare prices from different sellers</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#FFFFFFB2] text-[11px] uppercase font-bold tracking-widest block mb-1">Price</span>
                      <span className="text-[#6291DE] text-[24px] font-bold">
                        {offers.length > 0 ? offers[0].product_price : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {offers.length > 0 ? (
                    offers.map((offer, idx) => (
                      <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                          {/* Column 1 */}
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Ships From</span>
                              <span className="metric-value">{offer.ships_from || "Amazon.com"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Minimum Price</span>
                              <span className="metric-value">{offer.product_original_price || "$429.00"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Rating Info</span>
                              <span className="metric-value">{offer.seller_star_rating_info || "3,981 ratings"}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Seller</span>
                              <span className="metric-value">{offer.seller || "Amazon.com"}</span>
                            </div>
                          </div>

                          {/* Column 2 */}
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Price</span>
                              <span className="metric-value">{offer.product_price}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Rating</span>
                              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full w-fit">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={11} fill={i < Math.floor(parseFloat(offer.seller_star_rating || "5")) ? "#FFC107" : "transparent"} className={i < Math.floor(parseFloat(offer.seller_star_rating || "5")) ? "text-[#FFC107]" : "text-white/20"} />
                                  ))}
                                </div>
                                <span className="text-white text-[12px] font-bold leading-none">{Math.floor(parseFloat(offer.seller_star_rating || "5"))}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Product Condition</span>
                              <div className=" w-fit">
                                <span className="text-white text-[12px] font-bold">{offer.product_condition || "New"}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="metric-label">Delivery Price</span>
                              <div className="px-3 py-0.5 bg-white/5 border border-white/5 rounded-full w-fit">
                                <span className="text-[#6291DE] text-[12px] font-bold">{offer.delivery_price || "FREE"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#FFFFFFB2]">
                            <Store size={16} />
                            <span className="text-[13px] font-medium">Sold by {offer.seller || "Amazon.com"}</span>
                          </div>
                          <a
                            href={offer.seller_link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-full figma-pill-border text-white text-[14px] font-bold hover:bg-white/5 transition-all text-center flex items-center justify-center min-w-[140px]"
                          >
                            View Offer
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                      <DollarSign size={32} className="mx-auto mb-3 text-white/10" />
                      <p className="text-[#FFFFFFB2]">No additional offers available</p>
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          <div className="flex justify-end mt-12 pb-6">
            <button
              onClick={onDiscoverSuppliers}
              className="px-8 py-3.5 rounded-[18px] text-white font-bold text-[16px] transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98] btn-discover-supplier"

            >
              Discover Suppliers
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ProductDetailsDrawer;