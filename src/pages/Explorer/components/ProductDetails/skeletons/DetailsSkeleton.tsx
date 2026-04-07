
const DetailsSkeleton = () => (
  <div className="animate-pulse space-y-8">
    {/* Product Header Section */}
    <div className="flex gap-4 mb-6">
      <div className="w-28 h-28 bg-black/5 dark:bg-white/5 rounded-[22px] shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-6 bg-black/5 dark:bg-white/5 rounded w-3/4" />
        <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-1/4" />
        <div className="flex items-end justify-between mt-4">
          <div className="space-y-2">
            <div className="h-8 bg-black/5 dark:bg-white/5 rounded w-24" />
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-16" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="h-6 bg-black/5 dark:bg-white/5 rounded-full w-16" />
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded-full w-24" />
          </div>
        </div>
      </div>
    </div>

    {/* Brand Row Placeholder */}
    <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-32 mb-9" />

    <div className="border-b border-slate-200 dark:border-[#1C263C] mb-10" />

    {/* Quick Stats Grid (4 Columns) */}
    <div className="grid grid-cols-4 gap-2 mb-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 mb-1" />
          <div className="h-2 bg-black/5 dark:bg-white/5 rounded w-12" />
          <div className="h-3 bg-black/5 dark:bg-white/5 rounded w-16" />
        </div>
      ))}
    </div>

    {/* Seller/Shipping Info Cards */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[1, 2].map(i => (
        <div key={i} className="h-[72px] bg-black/5 dark:bg-white/5 rounded-[12px]" />
      ))}
    </div>

    {/* Seller Performance/Dimensions Cards */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[72px] bg-black/5 dark:bg-white/5 rounded-[12px]" />
        <div className="h-[72px] bg-black/5 dark:bg-white/5 rounded-[12px]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[72px] bg-black/5 dark:bg-white/5 rounded-[12px]" />
        <div className="h-[72px] bg-black/5 dark:bg-white/5 rounded-[12px]" />
      </div>
    </div>

    {/* Accordion Placeholders */}
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-14 bg-black/5 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5" />
      ))}
    </div>
  </div>
);

export default DetailsSkeleton;
