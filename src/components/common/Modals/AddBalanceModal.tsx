import React, { useState } from "react";
import { X, CreditCard, Loader2 } from "lucide-react";
import InputField from "../../common/input/InputField";
import { chargeCard } from "../../../api/pricing";
import { useToast } from "../Toast/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";

interface AddBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: string;
}

const fillBalanceSchema = Yup.object().shape({
  fillAmount: Yup.number()
    .typeError("Please enter a valid number")
    .positive("Amount must be positive")
    .min(5, "Minimum amount is $5")
    .max(10000, "Maximum amount is $10,000")
    .required("Please enter an amount"),
});

const AddBalanceModal: React.FC<AddBalanceModalProps> = ({ isOpen, onClose, currentBalance }) => {
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const toast = useToast();
  const queryClient = useQueryClient();

  const handleProceed = async () => {
    setError(undefined);

    try {
      // Validate with Yup
      await fillBalanceSchema.validate({ fillAmount: amount });

      setIsSubmitting(true);
      const response = await chargeCard(Number(amount));

      if (response?.data?.url) {
        // Redirect to Stripe/Payment Gateway
        window.location.href = response.data.url;
      } else {
        toast.success(`Successfully added $${Number(amount).toFixed(2)} to your balance!`);

        // Invalidate both wallet and summary queries to update UI everywhere
        queryClient.invalidateQueries({ queryKey: ["wallet", "balance"] });
        queryClient.invalidateQueries({ queryKey: ["subscription", "account_summary"] });

        onClose();
        setAmount("");
      }
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      } else {
        toast.error(err?.response?.data?.message || "Failed to charge card. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#00000066] backdrop-blur-sm z-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="purchase-modal-card relative z-10 !max-w-[440px]"
          >
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
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError(undefined);
                }}
                prefix="$"
                error={error}
              />
              {!error && <p className="text-[12px] text-brand-textSecondary dark:text-[#FFFFFFB0] mt-[-8px]">Write the amount you want to fill ($)</p>}
            </div>

            <div className="flex flex-row gap-2 sm:gap-3 pt-5 mt-4 items-center w-full border-t border-brand-border dark:border-white/5">
              <button
                className="purchase-cancel-btn !py-2.5 !w-auto flex-1 min-w-0 whitespace-nowrap !px-2 sm:!px-6"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className={`purchase-submit-btn !bg-brand-gradient !py-2 text-white !w-auto flex-[1.8] min-w-0 !h-[40px] text-[12px] sm:!text-[15px] whitespace-nowrap !px-2 sm:!px-6 flex items-center justify-center gap-1 sm:gap-2 ${(!amount || isSubmitting) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                disabled={!amount || isSubmitting}
                onClick={handleProceed}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to checkout"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBalanceModal;
