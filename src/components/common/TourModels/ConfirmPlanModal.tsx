import React from "react";
import ReactDOM from "react-dom";
import { X, CreditCard, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    planName: string;
    billingCycle: string;
    price: string;
    isUpdating?: boolean;
}

const ConfirmPlanModal: React.FC<ConfirmPlanModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    planName,
    billingCycle,
    price,
    isUpdating = false,
}) => {
    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#00000066] backdrop-blur-sm z-0"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-[480px] bg-white dark:bg-[#04132B] border border-slate-200 dark:border-white/5 rounded-[32px] overflow-hidden shadow-3xl p-6 sm:p-8"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[20px] font-bold text-brand-textPrimary dark:text-white">Confirm Subscription</h2>
                            <button
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-brand-textSecondary dark:text-slate-500 transition-colors"
                                onClick={onClose}
                                disabled={isUpdating}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col gap-6 py-4">
                            <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-inputBorder">
                                <div className="w-12 h-12 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0">
                                    <CreditCard size={24} className="" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[15px] text-brand-textPrimary dark:text-white font-semibold leading-relaxed">
                                        Are you sure you want to subscribe to the <span className="text-brand-primary">{planName}</span> plan ({billingCycle}) for {price}?
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Row */}
                        <div className="flex items-center justify-end gap-3 pt-6">
                            <button
                                className="px-8 py-3 rounded-full font-bold text-[14px] text-brand-textSecondary dark:text-white border border-brand-inputBorder dark:border-white/10 hover:bg-brand-hover dark:hover:bg-white/5 transition-all"
                                onClick={onClose}
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                className={`
                                    px-10 py-3 rounded-full font-bold text-[14px] transition-all flex items-center gap-2 shadow-lg
                                    ${isUpdating
                                        ? 'bg-brand-gradient opacity-70 cursor-not-allowed text-white'
                                        : 'bg-brand-gradient hover:opacity-90 text-white shadow-brand-primary/20 active:scale-95'}
                                `}
                                onClick={onConfirm}
                                disabled={isUpdating}
                            >
                                {isUpdating && <Loader2 size={18} className="animate-spin" />}
                                {isUpdating ? 'Processing...' : 'Confirm Subscription'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmPlanModal;
