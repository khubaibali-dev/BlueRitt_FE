import React from "react";

const SelectPlanSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 items-start justify-center animate-pulse">
      {/* Left Panel Skeleton */}
      <div className="w-full max-w-[480px] figma-card-border brand-card-bg rounded-[14px] p-6 lg:p-8 flex flex-col gap-6">
        {/* Tabs Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded w-24" />
          <div className="h-10 bg-white/5 rounded-[12px] w-full" />
        </div>

        {/* Billing Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded w-16" />
          <div className="h-12 bg-white/5 rounded-[12px] w-full" />
        </div>

        {/* Package Options Skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-white/5 rounded w-28" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white/5 rounded-[12px] w-full" />
          ))}
        </div>

        {/* Button Skeleton */}
        <div className="h-12 bg-white/5 rounded-[12px] w-full mt-4" />
      </div>

      {/* Right Panel Skeleton */}
      <div className="w-full max-w-[480px] figma-card-border brand-card-bg rounded-[14px] p-6 lg:p-8 flex flex-col">
        <div className="border-b border-white/5 pb-6 mb-6">
          <div className="h-8 bg-white/5 rounded w-32 mb-4" />
          <div className="h-10 bg-white/5 rounded w-40 mb-4" />
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-3/4 mt-2" />
        </div>

        <div className="space-y-6">
          <div className="h-4 bg-white/5 rounded w-40" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="w-5 h-5 bg-white/5 rounded-full" />
                <div className="h-4 bg-white/5 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlanSkeleton;
