import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isCancelling?: boolean;
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isCancelling = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal-card !max-w-[480px]">
        {/* Header */}
        <div className="purchase-modal-header">
          <h2 className="purchase-modal-title">Cancel Subscription</h2>
          <button className="purchase-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] text-white font-semibold">Are you sure?</span>
              <span className="text-[13px] text-red-500/80">This action cannot be undone instantly.</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[14px] text-[#FFFFFFCC] leading-relaxed">
              By cancelling your subscription, you will no longer be charged automatically. 
              However, you'll still have access to all your premium features until the end of the current billing period.
            </p>
            <p className="text-[13px] text-[#FFFFFF99] italic">
              "We're sorry to see you go! Is there anything we can do to change your mind?"
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="purchase-action-row pt-6 mt-4 border-t border-white/5">
          <button
            className="purchase-cancel-btn !py-2 !text-[#FFFFFFB0] hover:text-white font-semibold transition-colors"
            onClick={onClose}
            disabled={isCancelling}
          >
            Keep Subscription
          </button>
          <button
            className={`
              px-6 py-2 rounded-full font-bold text-[14px] transition-all
              ${isCancelling 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white active:scale-95 shadow-lg shadow-red-500/20'}
            `}
            onClick={onConfirm}
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;
