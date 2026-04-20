import React from "react";

const AnalysisSkeleton: React.FC = () => {
  return (
    <div className="relative z-10 p-6 sm:p-10 flex flex-col animate-pulse max-w-[1400px] mx-auto">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 sm:mb-10">
        <div className="flex flex-col gap-3 w-full md:w-64">
          <div className="h-10 bg-slate-200 dark:bg-white/10 rounded-xl w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-lg w-3/4"></div>
        </div>
        <div className="h-11 bg-slate-200 dark:bg-white/10 rounded-full w-32"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 sm:mb-10">
        <div className="h-[500px] bg-slate-100 dark:bg-white/5 rounded-[24px] border border-brand-border dark:border-white/5"></div>
        <div className="h-[500px] bg-slate-100 dark:bg-white/5 rounded-[24px] border border-brand-border dark:border-white/5"></div>
      </div>

      {/* Gauges Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-slate-100 dark:bg-white/5 rounded-3xl border border-brand-border dark:border-white/5"></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-slate-100 dark:bg-white/5 rounded-3xl border border-brand-border dark:border-white/5 overflow-hidden">
        <div className="p-6 border-b border-brand-border dark:border-white/5 h-16 bg-slate-100 dark:bg-white/5"></div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="h-10 bg-slate-200 dark:bg-white/5 rounded-lg flex-1"></div>
              <div className="h-10 bg-slate-200 dark:bg-white/5 rounded-lg flex-1"></div>
              <div className="h-10 bg-slate-200 dark:bg-white/5 rounded-lg flex-1"></div>
              <div className="h-10 bg-slate-200 dark:bg-white/5 rounded-lg flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSkeleton;
