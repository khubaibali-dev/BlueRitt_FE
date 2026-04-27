import React from "react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto p-0.5">
      {options.map((option) => {
        const Icon = option.icon ? (LucideIcons as any)[option.icon] : null;
        const CrownIcon = (LucideIcons as any).Crown;
        const isActive = activeTab === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onTabChange(option.value)}
            className={`flex items-center justify-center sm:justify-start gap-2.5 px-5 py-2.5 rounded-[12px] text-[14px] transition-all whitespace-nowrap flex-shrink-0 w-full sm:w-auto relative group/tab overflow-hidden border-none outline-none
              ${!isActive ? "text-brand-textPrimary dark:text-white/60 hover:text-brand-textPrimary dark:hover:text-white" : ""}`}
          >
            {isActive && (
              <motion.div
                layoutId="active-trend-tab"
                className="absolute inset-0 rounded-[12px] shadow-lg z-0 
                           bg-white dark:bg-gradient-to-r dark:from-[#101B2B] dark:to-[#4871c7]
                           border border-brand-inputBorder dark:border-transparent
                           shadow-blue-500/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <span className={`relative z-10 flex items-center gap-2.5 ${isActive ? 'text-brand-textPrimary dark:text-white font-bold' : ''}`}>
              {Icon && <Icon size={16} />}
              {option.label}

              {option.showUpgradeBadge && (
                <span className="ml-1.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-lg shadow-red-500/20 group-hover/tab:scale-110 transition-transform"
                  style={{
                    background: "linear-gradient(94.64deg, #155DFC -20.02%, #91086E 69.88%, #FF5900 121.08%)",
                  }}>
                  {CrownIcon && <CrownIcon size={10} />}
                  Upgrade
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TrendsTabs;
