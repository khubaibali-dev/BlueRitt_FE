import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
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
}

const AmazonProductCard: React.FC<AmazonProductCardProps> = ({
  title,
  image,
  category,
  price,
  oldPrice,
  rating,
  views,
  onDetailsClick,
}) => {
  const navigate = useNavigate();

  const handleDiscoverSupplier = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/explorer", {
      state: {
        product: {
          title,
          image,
          category,
          price,
        },
        autoSourceLink: true
      }
    });
  };

  return (
    <div className="trend-product-card group relative">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Carousel Overlays (Decorative) */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/10">
            <ChevronLeft size={20} />
          </div>
          <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/10">
            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col gap-4">
        {/* Title and Category */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="product-card-title flex-1">
            {title}
          </h3>
          <div className="trending-badge-standard shrink-0 !static">
            {category}
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="product-price-primary">
              {price}
            </span>
            {oldPrice && (
              <span className="text-[12px] text-[#9F9F9F] line-through mt-0.5 font-medium">
                {oldPrice}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="px-2.5 py-1 bg-[#081421] border border-[#082656] rounded-full flex items-center gap-1.5">
              <Star size={12} fill="#FFD700" className="text-[#FFD700]" />
              <span className="text-[11px] font-bold text-white">{rating || "0.0"}</span>
            </div>
            {views && (
              <span className="text-[10px] text-[#9F9F9F] font-medium">
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
