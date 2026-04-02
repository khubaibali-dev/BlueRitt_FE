import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAmazonTrendsProductDetails } from "../../../../api/amazonTrends";

interface AmazonProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    asin: string;
    title: string;
    image: string;
    category: string;
    price: string;
    oldPrice?: string;
    rating?: string;
    views?: string;
    country?: string;
  };
  onDiscoverSupplier: () => void;
}

const AmazonProductDetailsDrawer: React.FC<AmazonProductDetailsDrawerProps> = ({ isOpen, onClose, product, onDiscoverSupplier }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Key Features", "Product Description"]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isFeaturesExpanded, setIsFeaturesExpanded] = useState(false);
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);

  // Fetch Detailed Product Info (consistent with Explorer standard)
  const { data: detailsResponse, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["amazon-product-details", product?.asin, product?.country],
    queryFn: () => getAmazonTrendsProductDetails({
      asin: product?.asin || "",
      country: product?.country || "US",
      source: "amazon_search"
    }),
    enabled: isOpen && !!product?.asin,
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });

  // Reset expansion states when product changes
  React.useEffect(() => {
    setIsDescriptionExpanded(false);
    setIsFeaturesExpanded(false);
    setIsSpecsExpanded(false);
    setIsReviewsExpanded(false);
  }, [product?.asin]);

  const detailedData = detailsResponse?.data || null;

  if (!product) return null;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleDiscoverSupplier = () => {
    onDiscoverSupplier();
  };

  const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections.includes(title);
    return (
      <div className="border border-[#082656] rounded-[20px] bg-[#04132B] overflow-hidden">
        <button
          onClick={() => toggleSection(title)}
          className="w-full flex items-center justify-between p-6 text-white hover:bg-white/5 transition-all text-left"
        >
          <span className="text-[15px] font-semibold tracking-tight">{title}</span>
          {isExpanded ? <ChevronUp size={20} className="text-white/70" /> : <ChevronDown size={20} className="text-white/70" />}
        </button>
        {isExpanded && (
          <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="border-t border-[#1C263C] pt-6">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-[8px] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full z-[110] flex flex-col transition-transform duration-300 ease-in-out w-full sm:!w-[650px] bg-[#051125] border-l border-white/5 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[22px] font-bold text-white tracking-tight">Product Details</h2>
              <p className="text-[14px] text-[#9F9F9F] font-medium tracking-tight">Your Selected Product</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-6 border-b border-[#1C263C]" />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 pt-0 space-y-6">

          {/* Top Product Snippet Card */}
          <div className="flex gap-5 p-1">
            <div className="w-24 h-24 rounded-[20px] overflow-hidden shrink-0 border border-white/10 shadow-2xl">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <h4 className="product-card-title mb-1">{product.title}</h4>

              {detailedData?.book_author_name && (
                <p className="text-[12px] text-blue-400 font-medium mb-2">
                  by {detailedData.book_author_name}
                </p>
              )}

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="product-price-primary">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[11px] text-[#9F9F9F] line-through mt-0.5 font-medium">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-0.5">

                    <Star size={12} fill="#FFD700" className="text-[#FFD700]" />
                    <span className="text-[13.5px] font-bold text-white">{product.rating || "0.0"}</span>
                  </div>
                  <div className="px-2.5 py-1 bg-[#081421] border border-[#082656] rounded-full">
                    <span className="text-[10px] font-bold text-white tracking-wide">{product.views || "0 Views"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <AccordionSection title="Product Description">
              {isLoadingDetails ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-4 bg-white/5 rounded w-5/6" />
                  <div className="h-4 bg-white/5 rounded w-4/6" />
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[13.5px] text-slate-400 leading-relaxed">
                    {(() => {
                      const description = detailedData?.product_description || "No description available for this product.";
                      if (!isDescriptionExpanded && description.length > 250) {
                        return (
                          <>
                            {description.substring(0, 250)}...
                            <button
                              onClick={() => setIsDescriptionExpanded(true)}
                              className="text-[13px] font-bold text-blue-500 hover:text-blue-400 ml-1.5 transition-colors"
                            >
                              Read More
                            </button>
                          </>
                        );
                      }
                      return (
                        <>
                          {description}
                          {description.length > 250 && (
                            <button
                              onClick={() => setIsDescriptionExpanded(false)}
                              className="text-[13px] font-bold text-blue-500 hover:text-blue-400 ml-1.5 transition-colors"
                            >
                              Read Less
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </p>
                </div>
              )}
            </AccordionSection>

            <AccordionSection title="Key Features">
              {isLoadingDetails ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 mt-1.5" />
                      <div className="h-4 bg-white/5 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : (detailedData?.feature_bullets?.length > 0 || detailedData?.about_product?.length > 0) ? (
                <div className="space-y-4">
                  <ul className="space-y-4">
                    {(detailedData.feature_bullets || detailedData.about_product)
                      .slice(0, isFeaturesExpanded ? undefined : 5)
                      .map((feature: string, idx: number) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                          <span className="text-[13.5px] text-slate-400 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                  </ul>

                  {(detailedData.feature_bullets || detailedData.about_product).length > 5 && (
                    <button
                      onClick={() => setIsFeaturesExpanded(!isFeaturesExpanded)}
                      className="text-[13px] font-bold text-blue-500 hover:text-blue-400 mt-2 transition-colors flex items-center gap-1"
                    >
                      {isFeaturesExpanded ? "Show Less" : `Show All (${(detailedData.feature_bullets || detailedData.about_product).length})`}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-[13.5px] text-slate-500 italic">No key features specified.</p>
              )}
            </AccordionSection>

            <AccordionSection title="Product Information">
              {isLoadingDetails ? (
                <div className="grid grid-cols-2 gap-4 animate-pulse">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 bg-white/5 rounded-xl px-4 py-2" />
                  ))}
                </div>
              ) : (detailedData?.product_information && Object.keys(detailedData.product_information).length > 0) || (detailedData?.product_details && Object.keys(detailedData.product_details).length > 0) ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(detailedData.product_information || detailedData.product_details)
                      .slice(0, isSpecsExpanded ? undefined : 5)
                      .map(([key, value]: [string, any], idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/[0.02] -mx-2 px-2 transition-colors rounded-lg">
                          <span className="text-[13px] text-slate-500 font-medium">{key}</span>
                          <span className="text-[13px] text-white/80 font-semibold text-right max-w-[60%] line-clamp-2">{String(value)}</span>
                        </div>
                      ))}
                  </div>

                  {Object.keys(detailedData.product_information || detailedData.product_details).length > 5 && (
                    <button
                      onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                      className="text-[13px] font-bold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                      {isSpecsExpanded ? "Show Less" : `Read More (${Object.keys(detailedData.product_information || detailedData.product_details).length})`}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-[13.5px] text-slate-500 italic">Technical specifications are unavailable.</p>
              )}
            </AccordionSection>

            {/* {detailedData?.top_reviews && detailedData.top_reviews.length > 0 && (
              <AccordionSection title="Top Customer Reviews">
                <div className="space-y-6">
                  {detailedData.top_reviews
                    .slice(0, isReviewsExpanded ? undefined : 2)
                    .map((review: any, idx: number) => (
                      <div key={idx} className="space-y-3 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  fill={i < Math.floor(parseFloat(review.review_star_rating || "5")) ? "#FFD700" : "transparent"}
                                  className={i < Math.floor(parseFloat(review.review_star_rating || "5")) ? "text-[#FFD700]" : "text-white/20"}
                                />
                              ))}
                            </div>
                            <span className="text-[13.5px] font-bold text-white line-clamp-1">{review.review_title}</span>
                          </div>
                        </div>
                        <p className="text-[13px] text-slate-400 leading-relaxed italic">
                          "{review.review_comment || review.review_text}"
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-slate-500 font-medium">{review.review_author || "Amazon Customer"}</span>
                          <span className="text-[11px] text-slate-600 italic">{review.review_date}</span>
                        </div>
                      </div>
                    ))}

                  {detailedData.top_reviews.length > 2 && (
                    <button
                      onClick={() => setIsReviewsExpanded(!isReviewsExpanded)}
                      className="text-[13px] font-bold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                      {isReviewsExpanded ? "Read Less" : `Read More (${detailedData.top_reviews.length})`}
                    </button>
                  )}
                </div>
              </AccordionSection>
            )} */}
          </div>

          {/* Footer inside scroll area */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 pb-2 border-t border-white/5">
            <a
              href={detailedData?.product_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-product-details flex items-center justify-center w-full sm:w-auto px-10 h-[48px] !rounded-full text-center ${!detailedData?.product_url ? 'opacity-50 pointer-events-none' : ''}`}
            >
              View on Amazon
            </a>
            <button
              onClick={handleDiscoverSupplier}
              className="btn-discover-supplier w-full sm:w-auto px-10 h-[48px] !rounded-full"
            >
              Discover Supplier
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmazonProductDetailsDrawer;
