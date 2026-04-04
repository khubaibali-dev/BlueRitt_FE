import React from "react";
import { Wallet, X, Calculator, Search, Users, TrendingUp, Zap, HelpCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPurchaseAddon, Addon } from "../../api/addons";
import { useToast } from "../../components/common/Toast/ToastContext";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  addon: Addon | null;
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

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, addon }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  
  const purchaseMutation = useMutation({
    mutationFn: (id: string) => postPurchaseAddon({ id }),
    onSuccess: () => {
      toast.success("Purchase complete!");
      queryClient.invalidateQueries({ queryKey: ["active-addons"] });
      setTimeout(() => {
        onClose();
      }, 1500);
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Purchase failed. Please try again."
      );
    }
  });

  if (!isOpen || !addon) return null;

  const Icon = ICON_MAP[addon.type] || HelpCircle;
  const numAmount = addon.num_searches;
  const numPrice = parseFloat(addon.cost);
  const pricePerCredit = (numPrice / numAmount).toFixed(2);

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal-card">
        <div className="purchase-modal-header">
          <h2 className="purchase-modal-title">Confirm Purchase</h2>
          <button className="purchase-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="purchase-summary-panel">
          <div className="purchase-summary-header">
            <div className="purchase-summary-icon">
              <Icon size={24} />
            </div>
            <div>
              <div className="purchase-summary-title">{addon.type_display}</div>
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
            <span className="purchase-total-value">${addon.cost}</span>
          </div>
        </div>

        <div className="purchase-info-box">
          <div className="purchase-info-icon-container">
            <Wallet size={28} />
          </div>
          <div>
            <div className="purchase-info-title">Payment from Balance</div>
            <div className="purchase-info-desc">
              ${addon.cost} will be deducted from your account balance
              <br />
              ($90.00 available)
            </div>
          </div>
        </div>

        <label className="purchase-checkbox-label">
          <input type="checkbox" className="mt-1 accent-[#3B82F6]" defaultChecked />
          <span>I agree to the purchase of {numAmount} credits for ${addon.cost} and confirm that all sales are final.</span>
        </label>

        <div className="purchase-action-row">
          <button 
            className="purchase-cancel-btn" 
            onClick={onClose}
            disabled={purchaseMutation.isPending}
          >
            Cancel
          </button>
          <button 
            className="purchase-submit-btn" 
            onClick={() => purchaseMutation.mutate(addon.id)}
            disabled={purchaseMutation.isPending}
          >
            {purchaseMutation.isPending ? "Processing..." : "Complete Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
