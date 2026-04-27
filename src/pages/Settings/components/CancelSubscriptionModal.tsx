import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useState } from "react";


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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[520px] z-10"
          >
            <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
              <div className="bg-white dark:bg-[#04132B] rounded-[23px] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-brand-inputBorder dark:border-white/10">
                  <h2 className="text-[18px] font-bold text-[#04132B] dark:text-white tracking-tight">
                    Cancel Subscription
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all cursor-pointer"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-6">
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
                  </div>

                  {/* <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-red-500/90 leading-relaxed font-medium">
                      You'll still have access to all premium features until the end of the current billing period. No further charges will be made.
                    </p>
                  </div> */}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 p-6 pt-0">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 
                    border border-brand-inputBorder
                    bg-slate-100 dark:bg-white/5 rounded-full text-slate-500 dark:text-[#FFFFFFB0] text-[14px] font-bold hover:text-slate-700 dark:hover:text-white transition-all active:scale-95"
                    disabled={isCancelling}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isCancelling}
                    className={`
                      px-8 py-2.5 rounded-full text-white text-[14px] font-bold transition-all active:scale-95
                      ${isCancelling
                        ? 'bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                        : 'bg-brand-gradient hover:brightness-110 shadow-orange-500/20'}
                    `}
                  >
                    {isCancelling ? "Processing..." : "Confirm Cancellation"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CancelSubscriptionModal;
