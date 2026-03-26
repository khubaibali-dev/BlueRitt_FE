import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface AmazonRankedCardProps {
  rank: number;
  title: string;
  price: string;
  oldPrice?: string;
  rating: string;
  ratingCount: string;
  image: string;
}

const AmazonRankedCard: React.FC<AmazonRankedCardProps> = ({
  rank,
  title,
  price,
  oldPrice,
  image
}) => {
  return (
    <div className="bg-[#051125] border border-[#082656] rounded-[24px] overflow-hidden flex flex-col group transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5">
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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

        {/* Decorative Carousel Arrows */}
        <button className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/40 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-black/40 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-3">
        <h3 className="text-[15px] font-bold text-white leading-snug line-clamp-2 max-h-[42px] min-h-[42px]">
          {title}
        </h3>

        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[20px] font-black text-white leading-none">
              {price}
            </span>
            {oldPrice && (
              <span className="text-[12px] text-slate-500 line-through mt-1.5 font-medium">
                {oldPrice}
              </span>
            )}
          </div>

          <div className="text-right">
            <div className="product-img-badge !px-3 !py-1.5 flex items-center gap-0.5 !rounded-full shadow-lg">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} fill="#FFD700" className="text-[#FFD700]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonRankedCard;
