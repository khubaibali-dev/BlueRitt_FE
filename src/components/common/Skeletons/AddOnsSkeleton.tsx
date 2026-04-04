import React from "react";

/**
 * Skeleton Loader for the Add-ons page.
 * Mirrors the structure of AddOns/index.tsx:
 * - Header (Title and Subtitle)
 * - Balance Grid (2 cards)
 * - Info Banner (Icon, Title, Description)
 * - Multiple Sections (each with a header and a card grid)
 */
const AddOnsSkeleton: React.FC = () => {
  return (
    <div className="addons-page-container animate-pulse">
      {/* Page Header Section */}
      <div className="addons-header-section space-y-3">
        <div className="h-10 w-64 bg-white/10 rounded-lg"></div>
        <div className="h-5 w-80 bg-white/10 rounded-lg opacity-70"></div>
      </div>

      {/* Balance Statistics Grid */}
      <div className="addons-balance-grid mt-10">
        <div className="addon-balance-card p-6 h-[120px] bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-center gap-3">
          <div className="h-6 w-32 bg-white/10 rounded-lg opacity-80"></div>
          <div className="h-8 w-24 bg-white/10 rounded-lg"></div>
        </div>
        <div className="addon-balance-card p-6 h-[120px] bg-white/5 rounded-3xl border border-white/5 flex flex-col justify-center gap-3">
          <div className="h-6 w-32 bg-white/10 rounded-lg opacity-80"></div>
          <div className="h-8 w-24 bg-white/10 rounded-lg"></div>
        </div>
      </div>

      {/* Structured Info Banner */}
      <div className="addon-info-banner mt-8 p-8 bg-white/5 rounded-3xl border border-white/5 flex gap-6 items-center">
        <div className="w-14 h-14 bg-white/10 rounded-2xl shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-6 w-48 bg-white/10 rounded-lg"></div>
          <div className="h-4 w-full bg-white/10 rounded-lg opacity-60"></div>
        </div>
      </div>

      {/* Addon Content Sections (Simulating 3 major sections) */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="addon-section mt-12 space-y-8">
          {/* Section Heading Metadata */}
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white/10 rounded-xl shrink-0"></div>
            <div className="space-y-2">
              <div className="h-6 w-56 bg-white/10 rounded-lg"></div>
              <div className="h-4 w-32 bg-white/10 rounded-lg opacity-60"></div>
            </div>
          </div>
          
          <hr className="addon-section-divider opacity-5" />

          {/* Cards Layout for this Section */}
          <div className="addon-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="addon-card h-[280px] bg-white/5 rounded-3xl border border-white/5 p-6 flex flex-col items-center justify-center gap-4">
                {/* Amount/Value Placeholder */}
                <div className="h-12 w-20 bg-white/10 rounded-lg"></div>
                {/* Label Placeholder */}
                <div className="h-4 w-28 bg-white/10 rounded-full opacity-60"></div>
                {/* Price Placeholder */}
                <div className="h-6 w-16 bg-white/10 rounded-lg"></div>
                {/* Purchase Button Placeholder */}
                <div className="h-11 w-full bg-white/10 rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddOnsSkeleton;
