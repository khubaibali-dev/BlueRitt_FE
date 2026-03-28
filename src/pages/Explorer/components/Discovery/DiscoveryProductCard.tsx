import { Star, TrendingUp, Box, DollarSign, BarChart3, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface DiscoveryProductCardProps {
  title: string;
  image: string;
  price: string;
  oldPrice: string;
  growth: string;
  ratings: string;
  asin: string;
  offers: string;
  salesVol: string;
  tags: string[];
  rating: number;
  viewMode?: 'grid' | 'list';
  onDetailsClick?: () => void;
  onDiscoverSuppliers?: () => void;
}

const DiscoveryProductCard: React.FC<DiscoveryProductCardProps> = ({
  title,
  image,
  price,
  oldPrice,
  growth,
  ratings,
  asin,
  offers,
  salesVol,
  tags,
  rating,
  viewMode = 'grid',
  onDetailsClick,
  onDiscoverSuppliers
}) => {

  if (viewMode === 'list') {
    return (
      <div className="discovery-card-list group">
        {/* Left: Image Section */}
        <div className="product-img-wrapper-list">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Middle: Info Section */}
        <div className="flex-1 flex flex-col h-full py-1">
          <div className="flex flex-col gap-1.5 mb-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h3 className="product-card-title sm:line-clamp-1">
                {title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => {
                  const isAmazonChoice = tag.toLowerCase().includes("amazon choice");
                  return (
                    <span
                      key={i}
                      className={`brand-tag ${isAmazonChoice ? "brand-tag-amazon" : "brand-tag-default"}`}
                    >
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(rating) ? "#FFC107" : "transparent"}
                  className={i < Math.floor(rating) ? "text-[#FFC107]" : "text-slate-400"}
                />
              ))}
            </div>
          </div>

          {/* Metrics Row */}
          <div className="product-metrics-row-list">
            <div className="flex items-center gap-2.5">
              <div className="quick-action-icon-circle !w-8 !h-8 shrink-0">
                <Box size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="metric-label leading-none mb-1">ASIN</span>
                <span className="metric-value leading-none">{asin}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="quick-action-icon-circle !w-8 !h-8 shrink-0">
                <DollarSign size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="metric-label leading-none mb-1">OFFERS</span>
                <span className="metric-value leading-none">{offers} sellers</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="quick-action-icon-circle !w-8 !h-8 shrink-0">
                <BarChart3 size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="metric-label leading-none mb-1">MONTHLY SALES VOL</span>
                <span className="metric-value leading-none">{salesVol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Price & Actions */}
        <div className="product-price-section-list">
          <div className="flex flex-col items-end mb-2">
            <div className="flex items-baseline gap-2">
              <span className="product-old-price-primary text-[20px]">${oldPrice}</span>
              <span className="product-price-primary text-[28px]">${price}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="trending-badge-standard">
                <TrendingUp size={12} /> {growth}
              </div>
              <span className="rating-text-standard">
                {ratings} ratings
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-4 sm:mt-2 w-full">
            <button
              className="btn-product-details flex-1"
              onClick={onDetailsClick}
            >
              Product Details <ExternalLink size={14} />
            </button>
            <button
              className="btn-discover-supplier flex-1"
              onClick={onDiscoverSuppliers}
            >
              Discover Supplier
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="discovery-card-grid group">
      {/* Image Section */}
      <div className="product-img-wrapper-grid">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60">
            <ChevronLeft size={18} />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Rating Badge - Moved to Meta Row below title */}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="product-card-title mb-3">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => {
            const isAmazonChoice = tag.toLowerCase().includes("amazon choice");
            return (
              <span
                key={i}
                className={`brand-tag ${isAmazonChoice ? "brand-tag-amazon" : "brand-tag-default"}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Unified Meta Row */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="product-price-primary text-[20px]">${price}</span>
              <span className="product-old-price-primary text-[14px]">${oldPrice}</span>
            </div>
            <div className="trending-badge-standard">
              <TrendingUp size={12} /> {growth}
            </div>
          </div>
          <div className="flex items-center gap-1  px-2 py-1 rounded-lg  shrink-0">
            <span className="rating-text-standard">
              {ratings} ratings
            </span>
          </div>
        </div>



        {/* Performance Metrics */}
        <div className="product-metrics-row-grid grid grid-cols-3 py-4 border-t border-white/5 mt-auto">
          <div className="flex flex-col items-center text-center">
            <div className="quick-action-icon-circle !w-8 !h-8 mb-2 shrink-0">
              <Box size={14} className="text-white" />
            </div>
            <span className="metric-label mb-0.5">ASIN</span>
            <span className="metric-value">{asin}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="quick-action-icon-circle !w-8 !h-8 mb-2 shrink-0">
              <DollarSign size={14} className="text-white" />
            </div>
            <span className="metric-label mb-0.5">OFFERS</span>
            <span className="metric-value">{offers} sellers</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="quick-action-icon-circle !w-8 !h-8 mb-2 shrink-0">
              <BarChart3 size={14} className="text-white" />
            </div>
            <span className="metric-label mb-0.5">MONTHLY SALES VOL</span>
            <span className="metric-value">{salesVol}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            className="flex-1 btn-product-details"
            onClick={onDetailsClick}
          >
            Product Details <ExternalLink size={14} />
          </button>
          <button
            className="flex-1 btn-discover-supplier"
            onClick={onDiscoverSuppliers}
          >
            Discover Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryProductCard;
