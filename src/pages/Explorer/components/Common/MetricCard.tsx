import React from "react";
import * as Icons from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon }) => {
  // Dynamically get the icon from lucide-react
  const LucideIcon = (Icons as any)[icon] || Icons.HelpCircle;

  return (
    <div className="bg-brand-inputBg border border-brand-border rounded-[12px] p-3 flex flex-col gap-2 shadow-lg hover:border-brand-primary transition-all group min-w-0">
      <div className="text-[12px] text-brand-textSecondary tracking-[0.05em] truncate">
        {label}
      </div>
      <div className="flex items-center gap-3">
        <div className="quick-action-icon-circle !w-8 !h-8 shrink-0">
          <LucideIcon size={14} className="text-brand-primary dark:text-white" strokeWidth={2.5} />
        </div>
        <div className="text-[18px] font-semibold text-brand-textPrimary tracking-tight truncate">
          {value}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
