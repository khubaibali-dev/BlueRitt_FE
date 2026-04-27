import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Check, X, ChevronDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery } from "@tanstack/react-query";
import { getPackages, createCheckout } from "../../../api/pricing";
import { useAccountSummary } from "../../../hooks/useAccountSummary";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../components/common/Toast/ToastContext";
import ConfirmPlanModal from "../../../components/common/TourModels/ConfirmPlanModal";
import { useSubscriptionStatus } from "../../../hooks/useSubscriptionStatus";


const PlansSkeleton: React.FC<{ isOneTime: boolean }> = ({ isOneTime }) => {
  const cols = isOneTime ? 3 : 4;
  const gridClass = isOneTime ? "pricing-grid-3" : "pricing-grid-4";

  return (
    <div className="flex flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className={`pricing-header-row ${gridClass}`}>
        <div className="h-4 bg-brand-hover dark:bg-slate-800 rounded w-24 mb-2 mt-auto" />
        {[...Array(cols - 1)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="h-5 bg-brand-hover dark:bg-slate-800 rounded w-16" />
            <div className="h-8 bg-brand-hover dark:bg-slate-800 rounded-full w-24" />
          </div>
        ))}
      </div>
      {/* Row Skeletons */}
      {[...Array(15)].map((_, i) => (
        <div key={i} className={`pricing-row-standard ${gridClass}`}>
          <div className="h-3 bg-brand-hover dark:bg-slate-800 rounded w-3/4" />
          {[...Array(cols - 1)].map((_, j) => (
            <div key={j} className="flex justify-center">
              <div className="h-4 bg-brand-hover dark:bg-slate-800 rounded-full w-4" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

interface PlansProps {
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

const Plans: React.FC<PlansProps> = ({ defaultOpen = false, scrollIntoViewOnOpen = false }) => {
  const { userDetails } = useSubscriptionStatus();
  const { data: summary } = useAccountSummary({ enabled: true });
  const userBillingCycle = summary?.billingCycle?.toLowerCase() || "monthly";
  const toast = useToast();
  const userPlanName = userDetails?.subscription_status?.package?.name?.toLowerCase() || "";
  const isPrepaidUser = userPlanName.includes("prepaid basic") || userPlanName.includes("prepaid advance");

  const [subscriptionType, setSubscriptionType] = useState<"subscription" | "one_time">(
    isPrepaidUser ? "one_time" : "subscription"
  );
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annually">("monthly");
  const [updatingPlanId, setUpdatingPlanId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<any>(null);

  // Sync state with prop for URL-based navigation
  useEffect(() => {
    setIsOpen(defaultOpen);
    if (isPrepaidUser) {
      setSubscriptionType("one_time");
    }
  }, [defaultOpen, isPrepaidUser]);

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

  const handleUpdatePlan = (pkg: any) => {
    setPendingPlan(pkg);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (!pendingPlan) return;

    try {
      setUpdatingPlanId(pendingPlan.slug);
      // Backend expects subscription_type: "regular" for these checkout sessions
      const response = await createCheckout("regular", pendingPlan.slug, billingCycle);

      // Support both "url" and "checkout_url" from backend response
      const checkoutUrl = response.data?.url || response.data?.checkout_url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("Failed to create checkout session. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setUpdatingPlanId(null);
      setIsConfirmModalOpen(false);
      setPendingPlan(null);
    }
  };

  const gridClass = visiblePackages.length === 2 ? "pricing-grid-3" : "pricing-grid-4";

  const FeatureRow = ({
    label,
    renderValue,
    isHeader = false,
    noBg = false,
    fieldKey,
    isBold = false
  }: {
    label: string,
    renderValue?: (pkg: any, index: number) => React.ReactNode,
    isHeader?: boolean,
    noBg?: boolean,
    fieldKey?: string,
    isBold?: boolean
  }) => {
    return (
      <div className={`${noBg ? "pricing-row-no-bg" : "pricing-row-standard"} ${gridClass}`}>
        <span className={isHeader ? "pricing-label-header" : `${isBold ? "!font-bold" : "pricing-label-standard"}`}>{label}</span>
        {visiblePackages.map((pkg: any, index: number) => (
          <div key={pkg.id} className={`pricing-value-cell ${isBold ? "!font-bold" : ""}`}>
            {isHeader ? "" : renderValue ? renderValue(pkg, index) : (
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
      <span className="text-[11px] sm:text-[13px] text-brand-textSecondary dark:text-slate-400 font-bold">{label}</span>
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
    <div id="plans-section">
      <CollapsibleCard
        title="Pricing Plans"
        subtitle="Select best plans that fits your needs for your business growth, plans are flexible with the enterprise. Familiarize with the payment plans below"
        isOpen={isOpen}
        onToggle={setIsOpen}
        scrollIntoViewOnOpen={scrollIntoViewOnOpen}
        icon={<Box size={24} className="text-brand-primary dark:text-white" />}
        headerRight={
          <div className="relative w-full sm:w-auto figma-pill-border rounded-full p-[1px]">
            <select
              value={subscriptionType}
              onChange={(e) => setSubscriptionType(e.target.value as "subscription" | "one_time")}
              className="appearance-none bg-brand-inputBg dark:bg-[#041024] text-brand-textPrimary dark:text-white text-[13px] font-bold px-5 pr-10 py-2 rounded-full cursor-pointer focus:outline-none transition-colors w-full border-none shadow-none"
            >
              {!isPrepaidUser && (
                <option value="subscription">Recurring Subscription</option>
              )}
              <option value="one_time">One Time Prepaid</option>
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-textSecondary dark:text-slate-400 pointer-events-none" />
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          {/* Billing Cycle Switcher */}
          {!isOneTime && (
            <div className="flex justify-center mb-6">
              <div className="figma-pill-border bg-brand-inputBg dark:bg-[#041024] p-1 rounded-full flex items-center gap-1 relative overflow-hidden">
                {(["monthly", "quarterly", "annually"] as const).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`relative px-4 sm:px-6 py-2 rounded-full text-[12px] sm:text-[13px] font-bold transition-colors duration-300 capitalize z-10
                    ${billingCycle === cycle ? "text-white" : "text-brand-textSecondary dark:text-white hover:bg-brand-hover dark:hover:bg-white/5"}`}
                  >
                    {billingCycle === cycle && (
                      <motion.div
                        layoutId="activeCycle"
                        className="absolute inset-0 bg-brand-gradient shadow-md rounded-full z-[-1]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {cycle}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Table */}
          <div className="border border-brand-border dark:border-brand-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <PlansSkeleton isOneTime={isOneTime} />
              ) : (
                <>
                  {/* Comparison Header */}
                  <div className={`pricing-header-row ${gridClass} !items-start py-8`}>
                    <div className="flex flex-col justify-start pt-10">
                      <h4 className="text-[12px] sm:text-[14px] font-black text-brand-textPrimary dark:text-white tracking-widest uppercase text-left">Check Our Plans</h4>
                    </div>
                    {visiblePackages.map((pkg: any) => {
                      const slug = pkg.slug.toLowerCase();
                      const isCurrent = slug === userDetails?.subscription_status?.package?.slug?.toLowerCase() && (isOneTime ? true : billingCycle === userBillingCycle);
                      const authDueDate = userDetails?.subscription_status?.due_on;
                      const isExpired = authDueDate ? new Date(authDueDate) < new Date() : false;

                      const planDescriptions: Record<string, string> = {
                        basic: "Start strong with core features to kick off your BlueRitt journey",
                        advance: "Scale smarter with advanced BlueRitt tools for business growth",
                        premium: "Unlock the ultimate BlueRitt experience for scaling businesses",
                        prepaidBasic: "Unlock the ultimate BlueRitt experience for scaling businesses",
                      };

                      const getPlanDesc = () => {
                        if (slug.includes('prepaid') && slug.includes('basic')) return planDescriptions.prepaidBasic;
                        if (slug.includes('premium')) return planDescriptions.premium;
                        if (slug.includes('advance')) return planDescriptions.advance;
                        return planDescriptions.basic;
                      };

                      return (
                        <div key={pkg.id} className="flex flex-col items-center gap-3 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[13px] sm:text-[15px] font-black text-brand-textPrimary dark:text-white capitalize leading-tight">
                              {pkg.name}
                            </span>
                            <p className="text-[10px] sm:text-[11px] text-brand-textSecondary dark:text-slate-400 font-medium leading-relaxed max-w-[120px] sm:max-w-[150px]">
                              {getPlanDesc()}
                            </p>
                          </div>
                          {isCurrent && !isExpired ? (
                            <span className="bg-brand-hover dark:bg-white/5 text-brand-textSecondary dark:text-dim border border-brand-inputBorder px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold whitespace-nowrap">
                              Current Plan
                            </span>
                          ) : (
                            <button
                              onClick={() => handleUpdatePlan(pkg)}
                              disabled={updatingPlanId === pkg.slug}
                              className="figma-pill-border px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-black text-brand-textPrimary dark:text-white hover:bg-brand-hover dark:hover:bg-white/5 transition-all whitespace-nowrap flex items-center"
                            >
                              Update Plan
                            </button>
                          )}

                          {/* Trial Status Message */}
                          {isCurrent && userDetails?.subscription_status?.on_trial && userDetails?.subscription_status?.has_active_subscription && (
                            <p className="text-[10px] sm:text-[11px] font-bold text-brand-primary dark:text-brand-primary mt-1">
                              * {isExpired ? "Trial Expired" : "Active Trial"}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <FeatureRow
                    label="Pricing"
                    renderValue={(pkg) => getPriceByCycle(pkg)}
                    noBg
                    isBold={true}
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
                    renderValue={(pkg) => pkg.features?.marketplace_access ? "All Amazon Marketplaces" : <X size={16} className="text-red-500" />}
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
                    renderValue={(index) => index === 0 ? <X size={16} className="text-red-500" /> : "All Available Offers"}
                  />
                  <FeatureRow
                    label="Discover Suppliers (Limit)"
                    fieldKey="supplier_discovery"
                    renderValue={(pkg) => `${pkg.features?.supplier_discovery || 0} Discoveries`}
                  />
                  <FeatureRow
                    label="Max Supplier Matches"
                    fieldKey="no_of_supplier_per_ai_match"
                    renderValue={(pkg) => pkg.features?.no_of_supplier_per_ai_match === -1 ? "All Matched Suppliers" : `${pkg.features?.no_of_supplier_per_ai_match || 0} Matches`}
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
                    renderValue={(pkg, index) => (index === 0 || pkg.features?.no_of_net_profit_calculations === 0) ? <X size={16} className="text-red-500" /> : `${pkg.features?.no_of_net_profit_calculations || 0} ASINs`}
                  />

                  {/* BlueRitt SocialPulse Section */}
                  <FeatureRow label="BlueRitt SocialPulse" isHeader />
                  <SubHeaderRow label="TikTok Trends" />
                  <FeatureRow
                    label="TikTok Trending Product Searches"
                    fieldKey="tiktok_searches"
                    renderValue={(pkg) => `${pkg.features?.tiktok_searches || 0} Searches`}
                  />
                  <FeatureRow
                    label="Discover Suppliers (X Times) - Shared Limit"
                    fieldKey="supplier_discovery"
                    renderValue={(pkg) => `${pkg.features?.supplier_discovery || 0} Discoveries`}
                  />
                  <FeatureRow
                    label="Fetch Trending Hashtags"
                    fieldKey="tiktok_hashtag_search"
                    renderValue={(pkg) => `${pkg.features?.tiktok_hashtag_search || 0} Fetches`}
                  />
                  <FeatureRow
                    label="Product Shop Analysis"
                    fieldKey="access_to_product_shop_analysis"
                    renderValue={() => <Check size={16} className="text-green-500" />}
                  />

                  <SubHeaderRow label="Amazon Trends" />
                  <FeatureRow
                    label="Amazon Trending Product Searches"
                    fieldKey="amazon_trends_search"
                    renderValue={(pkg) => `${pkg.features?.amazon_trends_search || 0} Searches`}
                  />
                  <FeatureRow
                    label="Discover Suppliers (X Times)- Shared Limit"
                    fieldKey="supplier_discovery"
                    renderValue={(pkg) => `${pkg.features?.supplier_discovery || 0} Discoveries`}
                  />
                  <FeatureRow
                    label="Amazon Trending Product Description"
                    fieldKey="access_to_amazon_trending_description"
                    renderValue={() => <Check size={16} className="text-green-500" />}
                  />

                  <SubHeaderRow label="Influencer link" />
                  <FeatureRow
                    label="Influencers Included"
                    fieldKey="no_of_product_offer"
                    renderValue={(_, index) => index === 0 ? "25" : index === 1 ? "50" : "100"}
                  />
                  <FeatureRow
                    label="Influencer Posted Products"
                    fieldKey="access_to_influencer_posted_products"
                    renderValue={() => "All Posted Products"}
                  />

                </>
              )}
            </div>
          </div>
        </div>

        <ConfirmPlanModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setPendingPlan(null);
          }}
          onConfirm={handleConfirmUpdate}
          planName={pendingPlan?.name || ""}
          billingCycle={isOneTime ? "one time" : billingCycle}
          price={pendingPlan ? getPriceByCycle(pendingPlan) : ""}
          isUpdating={!!updatingPlanId}
        />
      </CollapsibleCard>
    </div>
  );
};

export default Plans;
