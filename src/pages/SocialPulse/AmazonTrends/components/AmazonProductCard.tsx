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
    <div className="trend-product-card group bg-[#04132B] border border-[#1E293B] rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:translate-y-[-4px]">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-black/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Navigation Arrows (Decorative as per screenshot) */}
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
          <h3 className="text-white font-bold text-[15px] leading-tight line-clamp-2 flex-1">
            {title}
          </h3>
          <div className="product-img-badge !rounded-full shrink-0 !static">
            {category}
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[22px] font-black text-white leading-none">
              {price}
            </span>
            {oldPrice && (
              <span className="text-[12px] text-slate-500 line-through mt-1 font-medium">
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
              <span className="text-[10px] text-slate-500 font-medium">
                {views}
              </span>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1">
          <button
            onClick={onDetailsClick}
            className="w-full sm:flex-1 figma-pill-border !rounded-full text-white text-[11px] sm:text-[12px] font-bold h-[40px] sm:h-[42px] flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
          >
            Product Details <ExternalLink size={14} />
          </button>
          <button
            onClick={handleDiscoverSupplier}
            className="w-full sm:flex-1 bg-brand-gradient !rounded-full text-white text-[11px] sm:text-[12px] font-bold h-[40px] sm:h-[42px] flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-orange-500/10 active:scale-95 transition-all whitespace-nowrap"
          >
            Discover Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmazonProductCard;
