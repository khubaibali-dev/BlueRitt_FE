import React from "react";
import { Wallet, Calculator, Search, Users, TrendingUp, Zap, HelpCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPurchaseAddon, Addon } from "../../../api/addons";
import { useToast } from "../../../components/common/Toast/ToastContext";
import ModalShell from "./ModalShell";


interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
  currentBalance: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  no_of_gross_profit_calculations: Calculator,
  no_of_net_profit_calculations: Calculator,
  alibaba_match_per_product: Users,
  tiktok_searches: TrendingUp,
  tiktok_hashtag_search: TrendingUp,
  amazon_search: Search,
  amazon_trends_search: Zap,
};

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, addon, currentBalance }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const purchaseMutation = useMutation({
    mutationFn: (id: string) => postPurchaseAddon({ id }),
    onSuccess: () => {
      toast.success("Purchase complete!");
      // Refresh balance and addon data
      queryClient.invalidateQueries({ queryKey: ["active-addons"] });
      queryClient.invalidateQueries({ queryKey: ["subscription", "account_summary"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });

      onClose();
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Purchase failed. Please try again."
      );
    }
  });

  const Icon = addon ? (ICON_MAP[addon.type] || HelpCircle) : HelpCircle;
  const numAmount = addon?.num_searches || 0;
  const numPrice = parseFloat(addon?.cost || "0");
  const pricePerCredit = numAmount > 0 ? (numPrice / numAmount).toFixed(2) : "0.00";

  return (
    <ModalShell
      isOpen={isOpen && !!addon}
      onClose={onClose}
      title="Confirm Purchase"
    >
      <div className="p-6">
        <div className="purchase-summary-panel">
          <div className="purchase-summary-header">
            <div className="purchase-summary-icon">
              <Icon size={24} />
            </div>
            <div>
              <div className="purchase-summary-title">{addon?.type_display}</div>
              <div className="purchase-summary-amount">{numAmount} Credits</div>
            </div>
          </div>

          <div className="purchase-data-list">
            <div className="purchase-data-row">
              <span className="purchase-data-label">Credits</span>
              <span className="purchase-data-value">{numAmount}</span>
            </div>
            <div className="purchase-data-row">
              <span className="purchase-data-label">Price per credit</span>
              <span className="purchase-data-value">${pricePerCredit}</span>
            </div>
            <div className="purchase-data-row">
              <span className="purchase-data-label">Payment method</span>
              <span className="purchase-data-value">Account Balance</span>
            </div>
          </div>

          <div className="purchase-total-row">
            <span className="purchase-total-label">Total Amount</span>
            <span className="purchase-total-value">${addon?.cost}</span>
          </div>
        </div>

        <div className="purchase-info-box !border !border-brand-inputBorder">
          <div className="purchase-info-icon-container">
            <Wallet size={28} />
          </div>
          <div>
            <div className="purchase-info-title">Payment from Balance</div>
            <div className="purchase-info-desc">
              ${addon?.cost} will be deducted from your account balance
              <br />
              ({currentBalance} available)
            </div>
          </div>
        </div>

        <label className="purchase-checkbox-label">
          <input type="checkbox" className="mt-1 accent-brand-primary h-[24px] w-[24px]" defaultChecked />
          <span className="text-[13px] ml-[2px]">I agree to the purchase of {numAmount} credits for ${addon?.cost} and confirm that all sales are final.</span>
        </label>

        <div className="flex flex-row gap-2 sm:gap-3 items-center w-full mt-2">
          <button
            className="purchase-cancel-btn !py-2.5 !w-auto flex-1 min-w-0 whitespace-nowrap !px-2 sm:!px-6"
            onClick={onClose}
            disabled={purchaseMutation.isPending}
          >
            Cancel
          </button>
          <button
            className={`purchase-submit-btn !py-2 !w-auto flex-[1.8] min-w-0 !h-[40px] text-[12px] sm:!text-[13px] whitespace-nowrap !px-2 sm:!px-6 flex items-center justify-center gap-1 sm:gap-2 ${purchaseMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => addon && purchaseMutation.mutate(addon.id)}
            disabled={purchaseMutation.isPending}
          >
            {purchaseMutation.isPending ? "Processing..." : "Confirm Purchase"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

export default PurchaseModal;
