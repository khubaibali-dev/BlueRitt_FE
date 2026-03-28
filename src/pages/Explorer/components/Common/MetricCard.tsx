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
    <div className="bg-[#04132B] border border-brand-inputBorder rounded-[12px] p-3 flex flex-col gap-2 shadow-lg hover:border-white/10 transition-all group min-w-0">
      <div className="text-[12px] text-[#FFFFFFB0]  tracking-[0.05em] truncate">
        {label}
      </div>
      <div className="flex items-center gap-3">
        <div className="quick-action-icon-circle !w-8 !h-8 shrink-0">
          <LucideIcon size={14} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="text-[18px] font-semibold text-white tracking-tight truncate">
          {value}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
