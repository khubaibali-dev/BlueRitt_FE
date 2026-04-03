import React, { useState } from "react";
import { Box, Check, X, ChevronDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery } from "@tanstack/react-query";
import { getPackages, createCheckout } from "../../../api/pricing";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const PlansSkeleton: React.FC<{ isOneTime: boolean }> = ({ isOneTime }) => {
  const cols = isOneTime ? 3 : 4;
  const gridClass = isOneTime ? "pricing-grid-3" : "pricing-grid-4";
  
  return (
    <div className="flex flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className={`pricing-header-row ${gridClass}`}>
        <div className="h-4 bg-slate-800 rounded w-24 mb-2 mt-auto" />
        {[...Array(cols - 1)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="h-5 bg-slate-800 rounded w-16" />
            <div className="h-8 bg-slate-800 rounded-full w-24" />
          </div>
        ))}
      </div>
      {/* Row Skeletons */}
      {[...Array(15)].map((_, i) => (
        <div key={i} className={`pricing-row-standard ${gridClass} ${i % 3 === 0 ? "bg-[#041024]" : ""}`}>
          <div className="h-3 bg-slate-800 rounded w-3/4" />
          {[...Array(cols - 1)].map((_, j) => (
            <div key={j} className="flex justify-center">
              <div className="h-4 bg-slate-800 rounded-full w-4" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Plans: React.FC = () => {
  const { currentUser } = useAuth();
  const [subscriptionType, setSubscriptionType] = useState<"subscription" | "one_time">("subscription");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annually">("monthly");
  const [updatingPlanId, setUpdatingPlanId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: rawPackages, isLoading } = useQuery({
    queryKey: ['subscription', 'packages', subscriptionType],
    queryFn: () => getPackages(subscriptionType),
    enabled: isOpen,
  });

  const packages = (rawPackages as any)?.data || [];

  const isOneTime = subscriptionType === "one_time";

  // Filter to only show the main packages the UI expects
  // subscription: basic, advance, premium
  // one_time: basic-one-time, advance-one-time
  const visiblePackages = Array.isArray(packages) 
    ? packages
        .filter((p: any) => {
          const slug = p.slug.toLowerCase();
          if (isOneTime) {
            return slug.includes('one-time') || slug === 'basic' || slug === 'advance'; 
          }
          return ['basic', 'advance', 'premium'].includes(slug);
        })
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    : [];

  const handleUpdatePlan = async (packageName: string) => {
    try {
      setUpdatingPlanId(packageName);
      // Backend expects subscription_type: "regular" for these checkout sessions
      const response = await createCheckout("regular", packageName, billingCycle);
      
      // Support both "url" and "checkout_url" from backend response
      const checkoutUrl = response.data?.url || response.data?.checkout_url;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("Failed to create checkout session. Please try again.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setUpdatingPlanId(null);
    }
  };

  const gridClass = visiblePackages.length === 2 ? "pricing-grid-3" : "pricing-grid-4";

  const FeatureRow = ({ 
    label, 
    renderValue, 
    isHeader = false, 
    noBg = false,
    fieldKey
  }: {
    label: string, 
    renderValue?: (pkg: any) => React.ReactNode, 
    isHeader?: boolean, 
    noBg?: boolean,
    fieldKey?: string
  }) => {
    return (
      <div className={`${noBg ? "pricing-row-no-bg" : "pricing-row-standard"} ${gridClass}`}>
        <span className={isHeader ? "pricing-label-header" : "pricing-label-standard"}>{label}</span>
        {visiblePackages.map((pkg: any) => (
          <div key={pkg.id} className="pricing-value-cell">
            {isHeader ? "" : renderValue ? renderValue(pkg) : (
              typeof pkg.features?.[fieldKey!] === 'boolean' ? (
                pkg.features[fieldKey!] ? <Check size={16} className="text-green-500" /> : <X size={16} className="text-red-500" />
              ) : (
                pkg.features?.[fieldKey!] === -1 ? "Unlimited" : pkg.features?.[fieldKey!] || "−"
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  const SubHeaderRow = ({ label }: { label: string }) => (
    <div className="pricing-subheader-row">
      <span className="text-[11px] sm:text-[13px] text-slate-400 font-semibold">{label}</span>
    </div>
  );

  const getPriceByCycle = (pkg: any) => {
    const price = pkg.price || "0.00";
    const qPrice = pkg.quarterly_price || "0.00";
    const yPrice = pkg.yearly_price || "0.00";

    if (isOneTime) return "$" + price + "/one time";
    if (billingCycle === "monthly") return "$" + price + "/month";
    if (billingCycle === "quarterly") return "$" + qPrice + "/quarter";
    return "$" + yPrice + "/year";
  };

  return (
    <CollapsibleCard
      title="Plans"
      subtitle="Choose Your Plan"
      isOpen={isOpen}
      onToggle={setIsOpen}
      icon={<Box size={24} className="text-white" />}
      headerRight={
        <div className="relative w-full sm:w-auto">
          <select
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value as "subscription" | "one_time")}
            className="appearance-none bg-[#041024] border border-[#082656] text-white text-[13px] font-semibold px-5 pr-10 py-2 rounded-full cursor-pointer focus:outline-none focus:border-[#3B82F6]/50 transition-colors w-full"
          >
            <option value="subscription">Recurring Subscription</option>
            <option value="one_time">One Time Prepaid</option>
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

        {/* Comparison Table */}
        <div className="border border-[#082656] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <PlansSkeleton isOneTime={isOneTime} />
            ) : (
              <>
                {/* Comparison Header */}
                <div className={`pricing-header-row ${gridClass}`}>
                  <div className="flex flex-col justify-end">
                    <h4 className="text-[12px] sm:text-[14px] font-bold text-white tracking-widest uppercase text-left">Check Our Plans</h4>
                  </div>
                  {visiblePackages.map((pkg: any) => {
                    const isCurrent = pkg.slug.toLowerCase() === currentUser?.subscriptionStatus?.package?.slug?.toLowerCase();
                    
                    return (
                      <div key={pkg.id} className="flex flex-col items-center gap-3">
                        <span className="text-[13px] sm:text-[15px] font-bold text-white capitalize">{pkg.name}</span>
                        {isCurrent ? (
                          <span className="bg-white/5 text-slate-400 border border-slate-700/50 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium whitespace-nowrap">
                            Current Plan
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleUpdatePlan(pkg.slug)}
                            disabled={updatingPlanId === pkg.slug}
                            className="figma-pill-border px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold text-white hover:bg-white/5 transition-all whitespace-nowrap flex items-center"
                          >
                            Update Plan
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Row */}
                <FeatureRow 
                  label="Pricing" 
                  renderValue={(pkg) => getPriceByCycle(pkg)}
                  noBg 
                />

                {/* Global Section */}
                <FeatureRow label="Global" isHeader />
                <FeatureRow 
                  label="Free Trial Access" 
                  renderValue={() => <Check size={16} className="text-green-500" />} 
                />
                <FeatureRow 
                  label="Marketplace Access" 
                  fieldKey="marketplace_access"
                  renderValue={(pkg) => pkg.features?.marketplace_access ? "All Marketplaces" : <X size={16} className="text-red-500" />}
                />

                {/* BlueRitt Explorer Section */}
                <FeatureRow label="BlueRitt Explorer (Complete Flow)" isHeader />
                <FeatureRow 
                  label="Product Search Limit" 
                  fieldKey="amazon_search"
                  renderValue={(pkg) => `${pkg.features?.amazon_search || 0} Searches`}
                />
                <FeatureRow label="Product Details" fieldKey="amazon_detail_access" />
                <FeatureRow 
                  label="Customer Reviews"
                  fieldKey="no_of_customer_review"
                  renderValue={(pkg) => pkg.features?.no_of_customer_review === -1 ? "Unlimited" : `${pkg.features?.no_of_customer_review || 0} Top Reviews`}
                />
                <FeatureRow 
                  label="Product Offers" 
                  fieldKey="product_offer_access"
                />
                <FeatureRow 
                  label="Discover Suppliers (Limit)" 
                  fieldKey="supplier_discovery"
                  renderValue={(pkg) => `${pkg.features?.supplier_discovery || 0} Discoveries`}
                />
                 <FeatureRow 
                  label="Max Supplier Matches" 
                  fieldKey="no_of_supplier_per_ai_match"
                  renderValue={(pkg) => pkg.features?.no_of_supplier_per_ai_match === -1 ? "All Matched" : `${pkg.features?.no_of_supplier_per_ai_match || 0} Matches`}
                />
                <FeatureRow label="Gross Profit Calculation" fieldKey="access_to_gross_profit" />
                <FeatureRow label="Net Profit Calculation" fieldKey="access_to_net_profit" />
                <FeatureRow label="Product Vault" fieldKey="access_to_product_vault" />

                {/* MarginMax Calculator Section */}
                <FeatureRow label="BlueRitt MarginMax Calculator" isHeader />
                <FeatureRow 
                  label="Gross Profit Calculation" 
                  fieldKey="no_of_gross_profit_calculations"
                  renderValue={(pkg) => `${pkg.features?.no_of_gross_profit_calculations || 0} ASINs`}
                />
                <FeatureRow 
                  label="Net Profit Calculation" 
                  fieldKey="no_of_net_profit_calculations"
                  renderValue={(pkg) => pkg.features?.no_of_net_profit_calculations === 0 ? <X size={16} className="text-red-500" /> : `${pkg.features?.no_of_net_profit_calculations || 0} ASINs`}
                />

                {/* BlueRitt SocialPulse Section */}
                <FeatureRow label="BlueRitt SocialPulse" isHeader />
                <SubHeaderRow label="TikTok Trends" />
                <FeatureRow 
                  label="TikTok Product Searches" 
                  fieldKey="tiktok_searches"
                  renderValue={(pkg) => `${pkg.features?.tiktok_searches || 0} Searches`}
                />
                <FeatureRow 
                  label="Fetch Trending Hashtags" 
                  fieldKey="tiktok_hashtag_search"
                  renderValue={(pkg) => `${pkg.features?.tiktok_hashtag_search || 0} Fetches`}
                />

                <SubHeaderRow label="Amazon Trends" />
                <FeatureRow 
                  label="Amazon Product Searches" 
                  fieldKey="amazon_trends_search"
                  renderValue={(pkg) => `${pkg.features?.amazon_trends_search || 0} Searches`}
                />
                <FeatureRow 
                  label="Influencer Link (Included)" 
                  fieldKey="no_of_product_offer"
                  renderValue={(pkg) => pkg.features?.no_of_product_offer === -1 ? "100+" : pkg.features?.no_of_product_offer || 0}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default Plans;
