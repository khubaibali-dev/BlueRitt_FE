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
  url?: string;
  onDetailsClick?: () => void;
}

const AmazonRankedCard: React.FC<AmazonRankedCardProps> = ({
  rank,
  title,
  price,
  image,
  rating,
  ratingCount,
  url,
  onDetailsClick
}) => {
  // Parse numeric rating for star rendering
  const numericRating = parseFloat(rating) || 0;

  return (
    <div className="bg-[#051125] border border-[#082656] rounded-[24px] overflow-hidden flex flex-col group transition-all duration-300">
      {/* Image Area */}
      <div className="relative aspect-[1/1.1] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700"
        />

        {/* Rank Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <div className="quick-action-icon-circle !w-10 !h-10 border border-white/10 shadow-xl">
            <span className="text-[14px] font-black text-white tracking-tight leading-none">#{rank}</span>
          </div>
        </div>

        {/* Star Rating Badge - Top Right */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-black/60 !px-3 !py-1.5 flex items-center gap-1.5 !rounded-full shadow-lg backdrop-blur-md border border-white/10 text-white font-bold text-[11px]">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  fill={i < Math.floor(numericRating) ? "#FFD700" : "rgba(255,215,0,0.2)"}
                  className={i < Math.floor(numericRating) ? "text-[#FFD700]" : "text-transparent"}
                />
              ))}
            </div>
            <span>{rating}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-[#FFFFFF] font-semibold text-[15px] leading-tight line-clamp-2 min-h-[40px] mb-3">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-6">
          <span className="product-price-primary text-[18px]">
            {price}
          </span>
          <span className="text-white/40 text-[12px] font-medium">
            ({ratingCount.replace(' ratings', '')})
          </span>
        </div>

        <button
          onClick={() => {
            if (url) window.open(url, '_blank');
            else if (onDetailsClick) onDetailsClick();
          }}
          className="w-full py-2.5 rounded-full bg-brand-gradient text-white font-bold text-[13px] shadow-lg shadow-orange-500/20 hover:opacity-90 transition-all active:scale-[0.98] outline-none"
        >
          View on Amazon
        </button>
      </div>
    </div>
  );
};

export default AmazonRankedCard;
