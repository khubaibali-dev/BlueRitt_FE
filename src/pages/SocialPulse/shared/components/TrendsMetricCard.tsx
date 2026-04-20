import React from "react";
import * as LucideIcons from "lucide-react";
import { Info, ShoppingCart } from "lucide-react";
import Tooltip from "../../../../components/common/Tooltip/Tooltip";

interface TrendsMetricCardProps {
  label: string;
  value?: string;
  icon: string;
  progress?: number;
  subtitle?: string;
  isAddon?: boolean;
  onClick?: () => void;
  tooltipContent?: string;
}

const TrendsMetricCard: React.FC<TrendsMetricCardProps> = ({
  label,
  value,
  icon,
  progress,
  subtitle,
  isAddon,
  onClick,
  tooltipContent
}) => {
  const Icon = (LucideIcons as any)[icon] || LucideIcons.HelpCircle;

  if (isAddon) {
    return (
      <div
        onClick={onClick}
        className={`flex-1 w-full rounded-[12px] p-4 flex flex-col items-center justify-center text-center gap-3 transition-all bg-white dark:bg-brand-card border border-brand-inputBorder group dark:border-none
${onClick ? 'cursor-pointer' : ''}
shadow-[0px_4px_6px_-4px_#00C9500D,0px_10px_15px_-3px_#00C9500D]`}
      >
        <div className="flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
          <ShoppingCart size={26} className="text-brand-textPrimary dark:text-brand-textPrimary" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[17px] font-bold text-brand-textPrimary dark:text-brand-textPrimary tracking-tight">{label}</h4>
          <p className="text-[12px] text-dim font-medium">{subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full trend-card-glow group">
      {/* Icon and Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="quick-action-icon-circle !w-11 !h-11 group-hover:bg-white/10 transition-colors">
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {/* Label and Value */}
      <div className="flex flex-col mb-0">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-white tracking-tight group-hover:text-slate-300 transition-colors">
            {label}
          </span>
          {tooltipContent ? (
            <Tooltip content={tooltipContent} width="320px">
              <button className="text-white hover:text-slate-400 transition-colors flex items-center justify-center mt-[1px]">
                <Info size={16} />
              </button>
            </Tooltip>
          ) : (
            <button className="text-white hover:text-slate-400 transition-colors flex items-center justify-center mt-[1px]">
              <Info size={16} />
            </button>
          )}
        </div>
        <h3 className="text-[28px] sm:text-[28px] font-bold text-white leading-tight tracking-tight">
          {value || "0"}
        </h3>
      </div>

      {/* Progress Section */}
      {progress !== undefined && (
        <div className="flex flex-col gap-0.5">
          <div className="trend-progress-container h-[4px]">
            <div className="trend-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-end">
            <span className="text-[11px] font-black text-dim uppercase tracking-widest">
              {progress}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendsMetricCard;
