import React from "react";
import { Search, LucideIcon } from "lucide-react";

interface TrendsEmptyStateProps {
  title: string;
  description: string;
  Icon?: LucideIcon;
}

const TrendsEmptyState: React.FC<TrendsEmptyStateProps> = ({
  title,
  description,
  Icon = Search
}) => {
  return (
    <div className="w-full min-h-[440px] bg-brand-card border border-brand-border rounded-[24px] flex flex-col items-center justify-center p-12 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none" />

      {/* Icon with Gradient Circle */}
      <div className="relative mb-8">
        <div className="!w-[72px] !h-[72px] rounded-full quick-action-icon-circle p-[1.5px] flex items-center justify-center">
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <Icon className=" group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center text-center gap-2 max-w-[480px]">
        <h2 className="trends-empty-title flex items-center gap-2">
          {title}
        </h2>
        <p className="trends-empty-desc">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TrendsEmptyState;
