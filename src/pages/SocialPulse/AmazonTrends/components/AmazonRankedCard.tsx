import React from "react";
import { Star } from "lucide-react";

interface AmazonRankedCardProps {
  rank: number;
  title: string;
  price: string;
  oldPrice?: string;
  rating: string;
  ratingCount: string;
  image: string;
  onDetailsClick?: () => void;
  onDiscoverSupplier: () => void;
}

const AmazonRankedCard: React.FC<AmazonRankedCardProps> = ({
  rank,
  title,
  price,
  image,
  onDetailsClick,
  onDiscoverSupplier
}) => {
  return (
    <div className="bg-[#051125] border border-[#082656] rounded-[24px] overflow-hidden flex flex-col group transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5">
      {/* Image Area */}
      <div className="relative aspect-[1/1.1] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051125]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Rank Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <div className="quick-action-icon-circle !w-10 !h-10 border border-white/20 backdrop-blur-md shadow-xl">
            <span className="text-[14px] font-black text-white tracking-tight leading-none">#{rank}</span>
          </div>
        </div>

        {/* Star Rating Badge - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <div className="product-img-badge !px-3 !py-1.5 flex items-center gap-0.5 !rounded-full shadow-lg backdrop-blur-md border border-white/10">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} fill="#FFD700" className="text-[#FFD700]" />
            ))}
          </div>
        </div>

      </div>

      {/* Content Area */}
      <div className="p-7 space-y-3">
        <h3 className="product-card-title min-h-[42px]">
          {title}
        </h3>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="product-price-primary">
              {price}
            </span>
          </div>

          <button
            onClick={onDetailsClick}
            className="flex-1 flex items-center justify-center p-2 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20 transition-all font-bold text-[11px]"
          >
            Product Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDiscoverSupplier();
            }}
            className="flex-1 flex items-center justify-center p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-all font-bold text-[11px]"
          >
            Discover Suppliers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmazonRankedCard;
