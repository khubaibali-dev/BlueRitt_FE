import React from "react";

/**
 * Skeleton Loader for the Subscription Snapshot card in the Dashboard.
 * Matches the layout of SubscriptionSnapshot.tsx:
 * - Header: Plan Label, Name, Price.
 * - Side: Status Badge.
 * - Grid: 4 metric items (Label & Value).
 */
const SubscriptionSnapshotSkeleton: React.FC = () => {
  return (
    <div className="snapshot-card animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-3">
          {/* Placeholder for 'Current Plan' label */}
          <div className="h-4 w-24 bg-white/10 rounded-full"></div>
          
          {/* Placeholder for Plan Name (e.g. 'Advance') */}
          <div className="h-8 w-32 bg-white/10 rounded-lg"></div>
          
          {/* Placeholder for Price and Billing Cycle */}
          <div className="h-6 w-20 bg-white/10 rounded-lg opacity-80"></div>
        </div>

        {/* Placeholder for Status Badge (e.g. 'Active') */}
        <div className="h-6 w-20 bg-white/10 rounded-full shrink-0"></div>
      </div>

      <div className="snapshot-grid">
        {/* Placeholders for 4 grid items: Next Payment, Balance, Start Date, End Date */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="snapshot-item space-y-2">
            {/* Metric Label Placeholder */}
            <div className="h-3.5 w-20 bg-white/10 rounded-full opacity-70"></div>
            
            {/* Metric Value Placeholder */}
            <div className="h-5 w-24 bg-white/10 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSnapshotSkeleton;
