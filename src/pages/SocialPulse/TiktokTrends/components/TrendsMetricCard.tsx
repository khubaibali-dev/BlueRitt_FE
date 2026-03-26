import React from "react";
import * as LucideIcons from "lucide-react";
import { Info, ShoppingCart } from "lucide-react";

interface TrendsMetricCardProps {
  label: string;
  value?: string;
  icon: string;
  progress?: number;
  subtitle?: string;
  isAddon?: boolean;
}

const TrendsMetricCard: React.FC<TrendsMetricCardProps> = ({
  label,
  value,
  icon,
  progress,
  subtitle,
  isAddon
}) => {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.HelpCircle;

  if (isAddon) {
    return (
      <div className="flex-1 min-w-[280px] rounded-[12px] p-4 flex flex-col items-center justify-center text-center gap-3 transition-all hover:border-blue-500/20 group 
bg-[linear-gradient(135deg,#082553_0%,#04132B_100%)] 
shadow-[0px_4px_6px_-4px_#00C9500D,0px_10px_15px_-3px_#00C9500D]">
        <div className=" flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
          <ShoppingCart size={26} className="text-white" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[17px] font-bold text-white tracking-tight">{label}</h4>
          <p className="text-[12px] text-slate-500 font-medium">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-[280px] trend-card-glow group">
      {/* Icon and Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="quick-action-icon-circle !w-11 !h-11">
          <Icon size={20} className="text-white" />
        </div>

      </div>

      {/* Label and Value */}
      <div className="flex flex-col  mb-0">
        <span className="text-[13px] font-bold text-white tracking-tight group-hover:text-slate-300 transition-colors">
          {label}
          <button className="text-white text-[12px] font-medium hover:text-slate-400 transition-colors ml-2 mt-[-2px]">
            <Info size={18} />
          </button>
        </span>
        <h3 className="text-[32px] font-bold text-white leading-tight tracking-tight">
          {value || "0"}
        </h3>
      </div>

      {/* Progress Section */}
      {progress !== undefined && (
        <div className="flex flex-col gap-0.5">
          <div className="trend-progress-container">
            <div className="trend-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-end">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
              {progress}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsMetricCard;
