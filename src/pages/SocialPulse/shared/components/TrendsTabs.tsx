import React from "react";
import * as LucideIcons from "lucide-react";

export interface TabOption {
  label: string;
  value: string;
  icon?: string;
  showUpgradeBadge?: boolean;
}

interface TrendsTabsProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TrendsTabs: React.FC<TrendsTabsProps> = ({ options, activeTab, onTabChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
      {options.map((option) => {
        const Icon = option.icon ? (LucideIcons as any)[option.icon] : null;
        const CrownIcon = (LucideIcons as any).Crown;

        return (
          <button
            key={option.value}
            onClick={() => onTabChange(option.value)}
            className={`flex items-center justify-center sm:justify-start gap-2.5 px-5 py-2.5 rounded-[12px] text-[14px] transition-all whitespace-nowrap flex-shrink-0 w-full sm:w-auto relative group/tab
              ${activeTab === option.value
                ? "trend-tab-active"
                : "text-brand-textPrimary dark:text-white hover:bg-black/5 dark:hover:bg-white/10"}`}
          >
            {Icon && <Icon size={16} />}
            {option.label}

            {option.showUpgradeBadge && (
              <span className="ml-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full  text-[10px] font-bold text-white shadow-lg shadow-red-500/20 group-hover/tab:scale-110 transition-transform"
                style={{
                  background: "linear-gradient(94.64deg, #155DFC -20.02%, #91086E 69.88%, #FF5900 121.08%)",
                }}>
                {CrownIcon && <CrownIcon size={10} />}
                Upgrade
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TrendsTabs;
