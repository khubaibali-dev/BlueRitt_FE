import React, { useState, useEffect } from "react";
import { Crown, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAccountSummary, toggleAutoRenew, cancelSubscription } from "../../../api/pricing";
import { useToast } from "../../../components/common/Toast/ToastContext";
import AddBalanceModal from "../../../components/common/Modals/AddBalanceModal";
import CancelSubscriptionModal from "./CancelSubscriptionModal";

interface SubscriptionProps {
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

const Subscription: React.FC<SubscriptionProps> = ({ defaultOpen = false, scrollIntoViewOnOpen = false }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Sync state with prop for URL-based navigation
  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isTogglingAutoRenew, setIsTogglingAutoRenew] = useState(false);
  const toast = useToast();

  const { data: summary, isLoading, isFetching } = useQuery({
    queryKey: ['subscription', 'account_summary'],
    queryFn: async () => {
      const response = await fetchAccountSummary();
      return response.data;
    },
    enabled: isOpen,
  });

  const today = new Date();
  const dueDateStr = summary?.dueDate || "";
  const currentPlanName = summary?.plan?.toLowerCase() || "";
  const isOneTimePlan = currentPlanName.includes("one time") ||
    currentPlanName.includes("prepaid") ||
    currentPlanName.includes("one-time");

  // Handle "16 Apr 2026" or similar formats
  const dueDate = dueDateStr ? new Date(dueDateStr) : today;
  const isExpired = dueDate < today;
  const isTrial = summary?.plan === "Trial";
  const isSubscribed = summary?.activeSubscription === true;

  // Condition cases from reference
  const isTrialCancel = isTrial && !isSubscribed && !isExpired;
  const isTrialCancelExpired = isTrial && !isSubscribed && isExpired;
  const isTrialActiveSubscribed = isTrial && isSubscribed;
  const isTrialExpiredUnsubscribed = isTrial && isExpired && isSubscribed;

  const navigateToPlans = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/settings?tab=plan");
  };

  const getStatusMessage = () => {
    if (isTrialCancel) {
      return (
        <>
          Trial active and ending on {dueDateStr}.{" "}
          <button onClick={navigateToPlans} className="subscription-link-orange !text-[13px] underline">
            Resubscribe Now
          </button>{" "}
          to maintain full access.
        </>
      );
    }

    if (isTrialActiveSubscribed) {
      return (
        <>
          Trial in progress.{" "}
          <button onClick={navigateToPlans} className="subscription-link-orange !text-[13px] underline">
            Subscribe Now
          </button>{" "}
          to unlock full access to your selected plan
        </>
      );
    }

    if (isTrialCancelExpired || isTrialExpiredUnsubscribed) {
      return (
        <>
          Trial expired.{" "}
          <button onClick={navigateToPlans} className="subscription-link-orange !text-[13px] underline">
            Update Your Plan
          </button>
        </>
      );
    }

    if (isSubscribed && !isTrial) {
      return null;
    }

    if (!isSubscribed && !isExpired && summary?.plan !== "N/A" && summary?.plan !== "Basic") {
      return (
        <span className="flex flex-col gap-1">
          <span>Your subscription remains active and is scheduled for cancellation at the end of the current billing period.</span>
          <span className="font-semibold">{`You will retain full access until ${dueDateStr}.`}</span>
        </span>
      );
    }

    return "Your subscription is currently inactive or cancelled.";
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['subscription', 'account_summary'] });
  };

  const onToggleAutoRenew = async () => {
    setIsTogglingAutoRenew(true);
    try {
      await toggleAutoRenew();
      await queryClient.invalidateQueries({ queryKey: ['subscription', 'account_summary'] });
      toast.success(`Auto-renew ${summary?.autoRenew ? 'disabled' : 'enabled'} successfully!`);
    } catch {
      toast.error("Failed to toggle auto-renew. Please try again.");
    } finally {
      setIsTogglingAutoRenew(false);
    }
  };

  const handleCancelSubscription = () => {
    setIsCancelModalOpen(true);
  };

  const confirmCancelSubscription = async () => {
    setIsCancelling(true);
    try {
      await cancelSubscription("User requested cancellation via settings");
      queryClient.invalidateQueries({ queryKey: ['subscription', 'account_summary'] });
      toast.success("Subscription cancellation scheduled successfully.");
      setIsCancelModalOpen(false);
    } catch {
      toast.error("Failed to cancel subscription. Please contact support.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <CollapsibleCard
        title="Subscription"
        subtitle="Manage your subscription and billing"
        isOpen={isOpen}
        onToggle={setIsOpen}
        scrollIntoViewOnOpen={scrollIntoViewOnOpen}
        icon={
          <div className="relative flex items-center justify-center">
            <Crown size={24} className="text-brand-primary dark:text-white relative z-10" />
          </div>
        }
      >
        <div className="flex flex-col gap-6 w-full pb-2">
          {/* Top Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
            <button
              onClick={handleRefresh}
              disabled={isFetching}
              className={`subscription-refresh-btn ${isFetching ? 'opacity-50 cursor-wait' : ''}`}
            >
              <RefreshCw size={14} className={`opacity-80 ${isFetching ? 'animate-spin' : ''}`} />
              {isFetching ? 'Refreshing...' : 'Refresh Data'}
            </button>

            <div className="subscription-balance-display">
              <div className="flex items-center gap-2">
                <span className="subscription-balance-text">Your balance:</span>
                <span className="subscription-balance-value">
                  {isLoading ? "..." : (summary?.remainingBalance || "$0.00")}
                </span>
              </div>
              <button
                onClick={() => {
                  if (isExpired || isTrial) {
                    toast.error(
                      "A valid subscription is required to use Fill Balance for Add-ons. Please subscribe now to enable this feature."
                    );
                    return;
                  }
                  setIsBalanceModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-brand-gradient hover:brightness-110 active:scale-95 text-white text-[13px] font-bold transition-all shadow-lg shadow-orange-500/10 dark:shadow-orange-500/20 whitespace-nowrap"
              >
                Fill Balance
              </button>
            </div>
          </div>

          {/* Details Block */}
          <div className="subscription-details-card">
            {/* Row 1: Plan and Due Date */}
            <div className="subscription-info-row">
              <div className="subscription-info-label-group">
                <div className="subscription-info-label">
                  Current Plan: <span className="subscription-info-value">{isLoading ? "Loading..." : (summary?.plan || "N/A")}</span>
                </div>
                <button
                  className="subscription-link-orange"
                  onClick={() => navigate("/settings?tab=plan")}
                >
                  Update Your Plan
                </button>
              </div>
              <div className="subscription-info-value-group">
                <div className="subscription-info-label">
                  Due on <span className="subscription-info-value">{isLoading ? "..." : (summary?.dueDate || "N/A")}</span>
                </div>
                {summary?.billingCycle && (
                  <span className="text-[12px] text-brand-textSecondary dark:text-slate-400 font-medium">{summary.billingCycle}</span>
                )}
              </div>
            </div>

            {/* Row 2: Last Filled */}
            <div className="subscription-info-row">
              <div className="subscription-info-label-group">
                <div className="subscription-info-label">Last Filled Amount</div>
                <button
                  className="subscription-link-orange"
                  onClick={() => navigate("/settings?tab=billing")}
                >
                  Balance History
                </button>
              </div>
              <div className="subscription-info-value-group">
                <span className="subscription-info-value">${summary?.lastFilledAmount || "0.00"}</span>
                <span className="text-[13px] text-brand-textSecondary dark:text-slate-300 font-medium">{summary?.lastPaymentDate || "N/A"}</span>
              </div>
            </div>

            {/* Row 3: Last Payment */}
            <div className="subscription-info-row-last">
              <div className="subscription-info-label-group">
                <div className="subscription-info-label">Last Payment Cleared At</div>
                <button
                  className="subscription-link-orange"
                  onClick={() => navigate("/settings?tab=billing")}
                >
                  Payment History
                </button>
              </div>
              <div className="subscription-info-value-group">
                <span className="text-[13px] text-brand-textSecondary dark:text-slate-300 font-semibold">{summary?.lastPaymentDate || "N/A"}</span>
              </div>
            </div>

            {/* Row 4: Auto Renew */}
            <div className="flex flex-col gap-4">
              <div className="subscription-auto-renew-row">
                <div className="subscription-auto-renew-info">
                  <span className="subscription-auto-renew-title">Renew Automatically</span>
                  <span className="subscription-auto-renew-desc">Your subscription will renew automatically</span>
                </div>
                <div className="flex items-center self-start sm:self-center">
                   <button
                    onClick={onToggleAutoRenew}
                    disabled={isOneTimePlan || isTogglingAutoRenew}
                    className={`
                      relative w-[52px] h-[28px] rounded-full transition-all duration-300 outline-none
                      ${isOneTimePlan ? "opacity-40 cursor-not-allowed bg-slate-200 dark:bg-slate-800" : (summary?.autoRenew ? "bg-brand-accent shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-brand-bg dark:bg-slate-700 border border-brand-border dark:border-transparent")}
                      ${isTogglingAutoRenew ? "opacity-70 cursor-wait" : ""}
                    `}
                    title={isOneTimePlan ? "Auto-renewal is not available for one-time plans" : ""}
                  >
                    <div
                      className={`
                          absolute top-[3px] left-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
                          flex items-center justify-center
                          ${summary?.autoRenew ? "translate-x-[24px]" : "translate-x-0"}
                        `}
                    >
                      {isTogglingAutoRenew && (
                        <RefreshCw size={12} className="text-brand-accent animate-spin" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="subscription-status-note !text-[13px] leading-relaxed">
                  {isLoading ? "Fetching subscription status..." : getStatusMessage()}
                </p>
                {summary?.activeSubscription && (
                  <button
                    onClick={handleCancelSubscription}
                    className="text-brand-textSecondary dark:text-slate-400 hover:text-brand-primary dark:hover:text-white/80 underline text-[13px] w-fit font-bold transition-colors mt-1"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CollapsibleCard>

      <AddBalanceModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        currentBalance={summary?.remainingBalance || "$0.00"}
      />

      <CancelSubscriptionModal
        isOpen={isCancelModalOpen}
        onConfirm={confirmCancelSubscription}
        onClose={() => setIsCancelModalOpen(false)}
        isCancelling={isCancelling}
      />
    </>
  );
};

export default Subscription;
