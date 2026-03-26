import React from "react";
import { Package, Hash, Zap } from "lucide-react";

interface SocialPulseTabsProps {
  activeTab: "product" | "hashtag";
  onTabChange: (tab: "product" | "hashtag") => void;
}

const SocialPulseTabs: React.FC<SocialPulseTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-nowrap">
      <button
        onClick={() => onTabChange("product")}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-all whitespace-nowrap flex-shrink-0
          ${activeTab === "product"
            ? "trend-tab-active shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/10"}`}
      >
        <Package size={16} />
        Product Trends
      </button>

      <button
        onClick={() => onTabChange("hashtag")}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-all relative whitespace-nowrap flex-shrink-0
          ${activeTab === "hashtag"
            ? "trend-tab-active shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/10"}`}
      >
        <Hash size={16} />
        Hashtag Trends
        <div className="upgrade-badge ml-1  origin-left">
          <Zap size={10} fill="white" />
          Upgrade
        </div>
      </button>
    </div>
  );
};

export default SocialPulseTabs;
