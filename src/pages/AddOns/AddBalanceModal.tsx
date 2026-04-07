import React from "react";
import { X, CreditCard } from "lucide-react";
import InputField from "../../components/common/input/InputField";

interface AddBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: string;
}

const AddBalanceModal: React.FC<AddBalanceModalProps> = ({ isOpen, onClose, currentBalance }) => {
  const [amount, setAmount] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal-card !max-w-[440px]">
        <div className="purchase-modal-header">
          <h2 className="purchase-modal-title">Fill Your Balance</h2>
          <button className="purchase-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="purchase-summary-panel !p-6 !mb-8">
          <div className="flex items-center gap-4">
            <div className="quick-action-icon-circle">
              <CreditCard size={22} className="text-brand-primary dark:text-white" />
            </div>
            <div>
              <div className="text-[14px] text-brand-textSecondary dark:text-[#FFFFFFB0] font-medium tracking-tight">Available Balance</div>
              <div className="text-[18px] text-brand-textPrimary dark:text-white font-semibold leading-tight">{currentBalance}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <InputField
            id="amount"
            label="Add to Balance"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            prefix="$"
          />
          <p className="text-[12px] text-brand-textSecondary dark:text-[#FFFFFFB0] mt-[-8px]">Specify the amount you wish to credit to your account</p>
        </div>

        <div className="purchase-action-row pt-6 border-t border-brand-border dark:border-white/5">
          <button
            className="purchase-cancel-btn !py-2 !text-brand-textSecondary dark:text-[#FFFFFFB0] hover:text-brand-textPrimary dark:hover:text-white font-semibold transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`purchase-submit-btn !bg-brand-gradient !py-2 text-white !w-auto min-w-[210px] !h-[40px] !text-[15px] ${!amount ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
            disabled={!amount}
            onClick={() => {
              alert(`Redirecting to checkout for $${amount}`);
              onClose();
            }}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBalanceModal;
