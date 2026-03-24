import React from "react";
import { Wallet, X } from "lucide-react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  addon: {
    title: string;
    amount: string;
    price: string;
    icon: React.ElementType;
  } | null;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, addon }) => {
  if (!isOpen || !addon) return null;

  const numAmount = parseInt(addon.amount);
  const numPrice = parseFloat(addon.price.replace("$", ""));
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
              <addon.icon size={24} />
            </div>
            <div>
              <div className="purchase-summary-title">{addon.title}</div>
              <div className="purchase-summary-amount">{addon.amount} Credits</div>
            </div>
          </div>

          <div className="purchase-data-list">
            <div className="purchase-data-row">
              <span className="purchase-data-label">Credits</span>
              <span className="purchase-data-value">{addon.amount}</span>
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
            <span className="purchase-total-value">{addon.price}</span>
          </div>
        </div>

        <div className="purchase-info-box">
          <div className="purchase-info-icon-container">
            <Wallet size={28} />
          </div>
          <div>
            <div className="purchase-info-title">Payment from Balance</div>
            <div className="purchase-info-desc">
              {addon.price} will be deducted from your account balance
              <br />
              ($90.00 available)
            </div>
          </div>
        </div>

        <label className="purchase-checkbox-label">
          <input type="checkbox" className="mt-1 accent-[#3B82F6]" defaultChecked />
          <span>I agree to the purchase of {addon.amount} credits for {addon.price} and confirm that all sales are final.</span>
        </label>

        <div className="purchase-action-row">
          <button className="purchase-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="purchase-submit-btn" onClick={() => {
            alert("Purchase complete!");
            onClose();
          }}>
            Complete Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
