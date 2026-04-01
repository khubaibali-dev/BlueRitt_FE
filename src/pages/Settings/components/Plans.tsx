import React, { useState } from "react";
import { Box, Check, X, ChevronDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";

const Plans: React.FC = () => {
  const [subscriptionType, setSubscriptionType] = useState<"recurring" | "onetime">("recurring");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annually">("monthly");

  const isOneTime = subscriptionType === "onetime";

  const FeatureRow = ({ label, basic, advance, premium, isHeader = false, noBg = false }: {
    label: string, basic: React.ReactNode, advance: React.ReactNode, premium: React.ReactNode, isHeader?: boolean, noBg?: boolean
  }) => (
    <div className={`grid ${isOneTime ? "grid-cols-[minmax(120px,1.5fr),1fr,1fr]" : "grid-cols-[minmax(120px,1.5fr),1fr,1fr,1fr]"} px-3 sm:px-6 py-3 sm:py-4 border-b border-[#1E293B]/40 items-center ${!isOneTime ? "min-w-[520px]" : "min-w-[400px]"} ${isHeader ? "bg-[#041024]" : noBg ? "" : "bg-[#041024]"}`}>
      <span className={`text-[11px] sm:text-[13px] pr-2 ${isHeader ? "text-blue-500 font-bold tracking-wider" : "text-slate-400"}`}>{label}</span>
      <div className="flex justify-center text-[11px] sm:text-[13px] text-white font-medium text-center">{basic}</div>
      <div className="flex justify-center text-[11px] sm:text-[13px] text-white font-medium text-center">{advance}</div>
      {!isOneTime && <div className="flex justify-center text-[11px] sm:text-[13px] text-white font-medium text-center">{premium}</div>}
    </div>
  );

  const SubHeaderRow = ({ label }: { label: string }) => (
    <div className={`bg-[#04132B] px-3 sm:px-6 py-2.5 border-b border-[#1E293B]/40 ${!isOneTime ? "min-w-[520px]" : "min-w-[400px]"}`}>
      <span className="text-[11px] sm:text-[13px] text-slate-400 font-semibold">{label}</span>
    </div>
  );

  return (
    <CollapsibleCard
      title="Plans"
      subtitle="Choose Your Plan"
      defaultOpen={false}
      icon={<Box size={24} className="text-white" />}
      headerRight={
        <div className="relative w-full sm:w-auto">
          <select
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value as "recurring" | "onetime")}
            className="appearance-none bg-[#041024] border border-[#082656] text-white text-[13px] font-semibold px-5 pr-10 py-2 rounded-full cursor-pointer focus:outline-none focus:border-[#3B82F6]/50 transition-colors w-full"
          >
            <option value="recurring">Recurring Subscription</option>
            <option value="onetime">One Time Prepaid</option>
          </select>
          <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {/* Billing Cycle Switcher */}
        {!isOneTime && (
          <div className="flex justify-center mb-6">
            <div className="figma-pill-border bg-[#041024] p-1 rounded-full flex items-center gap-1">
              {(["monthly", "quarterly", "annually"] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] font-semibold transition-all duration-300 capitalize z-10
                    ${billingCycle === cycle ? "bg-brand-gradient text-white shadow-lg" : "text-white"}`}
                >
                  {cycle}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table — scrollable on mobile */}
        <div className="border border-[#082656] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            {/* Comparison Header */}
            <div className={`grid ${isOneTime ? "grid-cols-[minmax(120px,1.5fr),1fr,1fr]" : "grid-cols-[minmax(120px,1.5fr),1fr,1fr,1fr]"} pb-6 pt-5 px-3 sm:px-6 border-b border-[#1E293B]/40 bg-[#041024] ${!isOneTime ? "min-w-[520px]" : "min-w-[400px]"}`}>
              <div className="flex flex-col justify-end">
                <h4 className="text-[12px] sm:text-[14px] font-bold text-white tracking-widest">Check Our Plans</h4>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-[13px] sm:text-[15px] font-bold text-white">Basic</span>
                <button className="figma-pill-border px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap">
                  Update Plan
                </button>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="text-[13px] sm:text-[15px] font-bold text-white">Advance</span>
                <span className="bg-white/5 text-slate-400 border border-slate-700/50 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium whitespace-nowrap">
                  Current Plan
                </span>
              </div>
              {!isOneTime && (
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[13px] sm:text-[15px] font-bold text-white">Premium</span>
                  <button className="figma-pill-border px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap">
                    Update Plan
                  </button>
                </div>
              )}
            </div>

            {/* Pricing Row */}
            <FeatureRow 
              label="Pricing" 
              basic={
                isOneTime ? "$25/one time" : 
                billingCycle === "monthly" ? "$19/month" : 
                billingCycle === "quarterly" ? "$55/quarter" : "$190/year"
              } 
              advance={
                isOneTime ? "$50/one time" : 
                billingCycle === "monthly" ? "$39/month" : 
                billingCycle === "quarterly" ? "$115/quarter" : "$390/year"
              } 
              premium={
                billingCycle === "monthly" ? "$79/month" : 
                billingCycle === "quarterly" ? "$225/quarter" : "$790/year"
              } 
              noBg 
            />

            {/* Global Section */}
            <FeatureRow label="Global" basic="" advance="" premium="" isHeader />
            <FeatureRow 
              label="7 Day Free Trial" 
              basic={<Check size={16} className="text-green-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />
            <FeatureRow 
              label="Marketplace Access" 
              basic="All Amazon Marketplaces" 
              advance="All Amazon Marketplaces" 
              premium="All Amazon Marketplaces" 
            />

            {/* BlueRitt Explorer Section */}
            <FeatureRow label="BlueRitt Explorer (Complete Flow)" basic="" advance="" premium="" isHeader />
            <FeatureRow 
              label="Product Search Limit" 
              basic="50 Searches" 
              advance="100 Searches" 
              premium="250 Searches" 
            />
            <FeatureRow 
              label="Product Details" 
              basic={<Check size={16} className="text-green-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />
            <FeatureRow 
              label="Customer Reviews" 
              basic="5 Top Reviews" 
              advance="20 Top Reviews" 
              premium="50 Top Reviews" 
            />
            <FeatureRow 
              label="Product Offers" 
              basic={isOneTime ? "All Available Offers" : <X size={16} className="text-red-500" />} 
              advance="All Available Offers" 
              premium="All Available Offers" 
            />
            <FeatureRow 
              label="Discover Suppliers (X Times)" 
              basic="100 Discoveries" 
              advance="250 Discoveries" 
              premium="600 Discoveries" 
            />
            <FeatureRow 
              label="Max Supplier Matches" 
              basic="All Matched Suppliers" 
              advance="All Matched Suppliers" 
              premium="All Matched Suppliers" 
            />
            <FeatureRow 
              label="Gross Profit Calculation" 
              basic={<Check size={16} className="text-green-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />
            <FeatureRow 
              label="Net Profit Calculation" 
              basic={isOneTime ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />
            <FeatureRow 
              label="Product Vault (Save Search)" 
              basic={<Check size={16} className="text-green-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />

            {/* BlueRitt MarginMax Calculator Section */}
            <FeatureRow label="BlueRitt MarginMax Calculator" basic="" advance="" premium="" isHeader />
            <FeatureRow 
              label="Gross Profit Calculation" 
              basic="25 ASINs" 
              advance="75 ASINs" 
              premium="200 ASINs" 
            />
            <FeatureRow 
              label="Net Profit Calculation" 
              basic={<X size={16} className="text-red-500" />} 
              advance="50 ASINs" 
              premium="150 ASINs" 
            />

            {/* BlueRitt SocialPulse Section */}
            <FeatureRow label="BlueRitt SocialPulse" basic="" advance="" premium="" isHeader />
            <SubHeaderRow label="TikTok Trends" />
            <FeatureRow 
              label="TikTok Trending Product Searches" 
              basic="50 Searches" 
              advance="100 Searches" 
              premium="250 Searches" 
            />
            <FeatureRow 
              label="Discover Suppliers (X Times) - Shared Limit" 
              basic="100 Discoveries" 
              advance="250 Discoveries" 
              premium="600 Discoveries" 
            />
            <FeatureRow 
              label="Fetch Trending Hashtags" 
              basic="50 Fetches" 
              advance="100 Fetches" 
              premium="250 Fetches" 
            />
            <FeatureRow 
              label="Product Shop Analysis" 
              basic={<Check size={16} className="text-green-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />

            <SubHeaderRow label="Amazon Trends" />
            <FeatureRow 
              label="Amazon Trending Product Searches" 
              basic="50 Searches" 
              advance="100 Searches" 
              premium="250 Searches" 
            />
            <FeatureRow 
              label="Discover Suppliers (X Times)- Shared Limit" 
              basic="100 Discoveries" 
              advance="250 Discoveries" 
              premium="600 Discoveries" 
            />
            <FeatureRow 
              label="Amazon Trending Product Description" 
              basic={<Check size={16} className="text-green-500" />} 
              advance={<Check size={16} className="text-green-500" />} 
              premium={<Check size={16} className="text-green-500" />} 
            />

            <SubHeaderRow label="Influencer link" />
            <FeatureRow 
              label="Influencers Included" 
              basic="25" 
              advance="50" 
              premium="100" 
            />
            <FeatureRow 
              label="Influencer Posted Products" 
              basic="All Posted Products" 
              advance="All Posted Products" 
              premium="All Posted Products" 
            />
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default Plans;
