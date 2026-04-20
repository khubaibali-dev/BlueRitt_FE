import React from "react";

const ResearchRowSkeleton: React.FC = () => {
  return (
    <div className="vault-research-entry animate-pulse !cursor-default !bg-brand-card dark:!bg-white/5 border border-brand-border dark:border-white/10 rounded-3xl p-8 mb-8">
      {/* Row Header with Stats Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 px-2">
        <div className="h-8 w-32 bg-slate-200 dark:bg-white/10 rounded-full"></div>
        <div className="h-8 w-24 bg-slate-200 dark:bg-white/10 rounded-full"></div>
      </div>

      {/* Side-by-Side Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-4">
        {/* Amazon Card Skeleton */}
        <div className="flex flex-col gap-4 bg-slate-100 dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/5 h-[400px]">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-slate-200 dark:bg-white/10 rounded-xl shrink-0"></div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
              <div className="h-5 w-1/2 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
              <div className="h-8 w-24 bg-slate-200 dark:bg-white/10 rounded-lg mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-200 dark:bg-white/10 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Alibaba Card Skeleton */}
        <div className="flex flex-col gap-4 bg-slate-100 dark:bg-white/5 rounded-2xl p-6 border border-brand-border dark:border-white/5 h-[400px]">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-slate-200 dark:bg-white/10 rounded-xl shrink-0"></div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="h-5 w-full bg-slate-200 dark:bg-white/10 rounded-lg"></div>
              <div className="h-4 w-1/2 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
              <div className="h-6 w-32 bg-slate-200 dark:bg-white/10 rounded-lg mt-2"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-8">
             <div className="h-12 w-full bg-slate-200 dark:bg-white/10 rounded-xl"></div>
             <div className="h-12 w-full bg-slate-200 dark:bg-white/10 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Action Footer Skeleton */}
      <div className="flex items-center justify-end gap-10 mt-10 pt-8 border-t border-brand-border dark:border-white/5 mr-4">
        <div className="h-5 w-24 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
        <div className="h-5 w-24 bg-slate-200 dark:bg-white/10 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ResearchRowSkeleton;
