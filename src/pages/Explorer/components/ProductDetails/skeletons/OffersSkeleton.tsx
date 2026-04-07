
const OffersSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-40 bg-black/5 dark:bg-white/5 rounded-[20px]" />
    {[1, 2].map(i => (
      <div key={i} className="h-56 bg-black/5 dark:bg-white/5 rounded-[12px]" />
    ))}
  </div>
);

export default OffersSkeleton;
