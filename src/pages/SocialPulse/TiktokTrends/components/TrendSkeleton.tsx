import React from "react";

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="trend-product-card overflow-hidden skeleton-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-[1/1.1] bg-white/5" />

      {/* Content Skeleton */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="h-6 bg-white/10 rounded-md w-3/4" />
          <div className="h-6 bg-white/10 rounded-full w-20 shrink-0" />
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-white/5 rounded w-12" />
              <div className="h-5 bg-white/10 rounded w-16" />
            </div>
          ))}
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <div className="h-10 bg-white/10 rounded-full flex-1 w-full" />
          <div className="h-10 bg-white/10 rounded-full flex-1 w-full" />
        </div>
      </div>
    </div>
  );
};

export const HashtagSkeleton: React.FC = () => {
  return (
    <div className="bg-[#04132B] border border-[#082656] rounded-xl p-3 skeleton-pulse">
      <div className="h-6 bg-white/10 rounded-md w-1/2 mb-3" />
      <div className="flex items-center gap-2">
        <div className="h-3 bg-white/5 rounded w-10" />
        <div className="h-3 bg-white/10 rounded w-8" />
      </div>
    </div>
  );
};

const TrendSkeleton: React.FC<{ type: "product" | "hashtag"; count?: number }> = ({ type, count = 6 }) => {
  return (
    <div className={type === "product" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
      {Array.from({ length: count }).map((_, i) => (
        type === "product" ? <ProductSkeleton key={i} /> : <HashtagSkeleton key={i} />
      ))}
    </div>
  );
};

export default TrendSkeleton;
