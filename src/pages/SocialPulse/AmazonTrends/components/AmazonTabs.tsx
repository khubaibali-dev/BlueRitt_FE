import React from "react";
import { ShoppingBag, Zap, TrendingUp } from "lucide-react";

interface AmazonTabsProps {
  activeTab: "product" | "keyword";
  onTabChange: (tab: "product" | "keyword") => void;
}

const AmazonTabs: React.FC<AmazonTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-nowrap">
      <button
        onClick={() => onTabChange("product")}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-all whitespace-nowrap flex-shrink-0
          ${activeTab === "product"
            ? "trend-tab-active shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/10"}`}
      >
        <ShoppingBag size={16} />
        Product Trends
      </button>

      <button
        onClick={() => onTabChange("keyword")}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-all relative whitespace-nowrap flex-shrink-0
          ${activeTab === "keyword"
            ? "trend-tab-active shadow-lg"
            : "text-white/60 hover:text-white hover:bg-white/10"}`}
      >
        <TrendingUp size={16} />
        Turn Trends Profitable
        <div className="upgrade-badge ml-1 origin-left">
          <Zap size={10} fill="white" />
          Upgrade
        </div>
      </button>
    </div>
  );
};

export default AmazonTabs;
