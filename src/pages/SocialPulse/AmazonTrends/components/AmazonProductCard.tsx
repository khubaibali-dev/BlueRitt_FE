import React from "react";
import {
  Star,
  ExternalLink
} from "lucide-react";

interface AmazonProductCardProps {
  title: string;
  image: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating?: string;
  views?: string;
  onDetailsClick: () => void;
  onDiscoverSupplier: () => void;
}

const AmazonProductCard: React.FC<AmazonProductCardProps> = ({
  title,
  image,
  price,
  oldPrice,
  rating,
  views,
  onDetailsClick,
  onDiscoverSupplier,
}) => {

  const handleDiscoverSupplier = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDiscoverSupplier();
  };

  return (
    <div className="trend-product-card group relative">
      {/* Image Area */}
      <div className="relative aspect-[1/1.1] overflow-hidden bg-white p-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-7 flex flex-col gap-5">
        {/* Title and Category */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="product-card-title flex-1 !text-[18px]">
            {title}
          </h3>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="product-price-primary text-[20px]">
              {price}
            </span>
            {oldPrice && (
              <span className="text-[12px] text-brand-textSecondary dark:text-dim line-through mt-0.5 font-medium">
                {oldPrice}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="px-2.5 py-1 bg-brand-card-alt border border-brand-border rounded-full flex items-center gap-1.5 shadow-sm">
              <Star size={12} fill="#FFD700" className="text-[#FFD700]" />
              <span className="text-[11px] font-bold text-brand-textPrimary dark:text-white">{rating || "0.0"}</span>
            </div>
            {views && (
              <span className="text-[10px] text-brand-textSecondary dark:text-dim font-medium">
                {views}
              </span>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1">
          <button
            onClick={onDetailsClick}
            className="btn-product-details w-full sm:flex-1 !rounded-full !font-normal !px-2.5 !py-2.5"
          >
            Product Details <ExternalLink size={14} />
          </button>
          <button
            onClick={handleDiscoverSupplier}
            className="btn-discover-supplier w-full sm:flex-1 !font-normal !rounded-full !px-2.5 !py-2.5"
          >
            Discover Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmazonProductCard;
