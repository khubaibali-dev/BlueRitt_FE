import React from "react";

const CalculatorSkeleton: React.FC = () => {
  return (
    <div className="discovery-results px-4 sm:px-4 py-6 sm:py-10 animate-pulse w-full relative bg-brand-card border border-brand-border rounded-[24px] isolate min-h-screen overflow-hidden">
      <div className="flex-1 max-w-[1400px] mx-auto w-full px-0 sm:px-2 pt-0 pb-10">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
          <div className="h-10 w-24 bg-slate-200 dark:bg-white/10 rounded-full"></div>
          <div className="h-10 w-40 bg-slate-200 dark:bg-white/10 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-8 md:mb-12 px-1">
          <div className="h-10 w-64 bg-slate-200 dark:bg-white/10 rounded-xl mb-4"></div>
          <div className="h-4 w-96 bg-slate-200 dark:bg-white/5 rounded-lg ml-4"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          <div className="h-[200px] bg-slate-100 dark:bg-white/5 rounded-[24px] border border-brand-border dark:border-white/5"></div>
          <div className="h-[200px] bg-slate-100 dark:bg-white/5 rounded-[24px] border border-brand-border dark:border-white/5"></div>
        </div>

        {/* Toggle Skeleton */}
        <div className="h-12 w-48 bg-slate-200 dark:bg-white/10 rounded-full mb-10"></div>

        {/* Tabs and Results Skeleton */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="h-[400px] bg-slate-100 dark:bg-white/5 rounded-[24px] border border-brand-border dark:border-white/5"></div>
          </div>
          <div className="w-full lg:w-[380px] flex flex-col gap-4">
            <div className="h-[500px] bg-slate-100 dark:bg-white/5 rounded-[24px] border border-brand-border dark:border-white/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSkeleton;
