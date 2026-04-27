import React, { useState } from "react";
import ModalShell from "../../../components/common/Modals/ModalShell";

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isCancelling?: boolean;
}

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelling = false
}) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason || "No reason provided");
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Subscription"
      maxWidth="600px"
    >
      <div className="p-2 pt-0">
        <div className="p-2 space-y-6">
          <div className="space-y-3">
            <p className="text-[14px] font-medium text-slate-600 dark:text-[#FFFFFFB0]">
              Please tell us why you are canceling your subscription:
            </p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Your feedback helps us improve our service..."
              className="w-full h-32 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-[14px] placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none"
            />
            <div className="flex justify-between items-center px-1">
              <p className={`text-[12px] font-medium transition-colors ${reason.trim().length < 10 ? "text-red-600" : "text-green-500"}`}>
                {reason.trim().length < 10
                  ? `Please enter at least ${10 - reason.trim().length} more characters`
                  : "Thank you for your feedback!"}
              </p>
              <span className="text-[11px] text-slate-400">
                {reason.length} characters
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="px-10 py-2.5 
            figma-pill-border  rounded-full text-brand-textSecondary dark:text-[#FFFFFFB0] text-[14px] font-semibold hover:text-slate-700 dark:hover:text-white transition-all active:scale-95"
            disabled={isCancelling}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isCancelling || reason.trim().length < 10}
            className={`
              px-8 py-2.5 rounded-full text-white text-[14px] font-semibold transition-all active:scale-95 bg-brand-gradient
              ${(isCancelling || reason.trim().length < 10)
                ? 'opacity-50 cursor-not-allowed shadow-none'
                : 'hover:brightness-110 shadow-orange-500/20'}
            `}
          >
            {isCancelling ? "Processing..." : "Confirm Cancellation"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

export default CancelSubscriptionModal;
