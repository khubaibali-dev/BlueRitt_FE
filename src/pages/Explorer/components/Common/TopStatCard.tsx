import React from "react";
import { LucideIcon } from "lucide-react";

interface TopStatCardProps {
  icon: LucideIcon;
  label: string;
  value?: string | number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const TopStatCard: React.FC<TopStatCardProps> = ({ icon: Icon, label, value, action }) => {
  return (
    <div className="discovery-top-card-premium !bg-brand-card !border-brand-border h-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="quick-action-icon-circle">
            <Icon size={18} className="text-brand-primary dark:text-white" />
          </div>
          <span className="text-brand-textPrimary text-[14px] font-semibold tracking-tight">{label}</span>
        </div>

        {action ? (
          <button
            onClick={action.onClick}
            className="font-bold text-[15px] hover:opacity-80 transition-opacity whitespace-nowrap"
            style={{ color: '#FF5900' }}
          >
            {action.label}
          </button>
        ) : (
          <span className="text-[20px] font-bold" style={{ color: '#FF5900' }}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
};

export default TopStatCard;
