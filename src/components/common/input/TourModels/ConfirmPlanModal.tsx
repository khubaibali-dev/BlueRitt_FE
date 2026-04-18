import React from "react";
import { X, CreditCard } from "lucide-react";

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
    if (!isOpen) return null;

    return (
        <div className="purchase-modal-overlay">
            <div className="purchase-modal-card !max-w-[480px]">
                {/* Header */}
                <div className="purchase-modal-header">
                    <h2 className="purchase-modal-title">Confirm Subscription</h2>
                    <button className="purchase-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex items-start gap-4 p-5 !rounded-2xl bg-brand-primary/5  figma-pill-border">
                        <div className="quick-action-icon-circle">
                            <CreditCard size={24} className="" />
                        </div>
                        <div className="flex flex-col gap-1">

                            <p className="text-[14px] text-brand-textPrimary dark:text-white font-semibold leading-tight">
                                Are you sure you want to subscribe to the <span className="text-brand-primary">{planName}</span> plan ({billingCycle}) for {price}?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-end gap-3 pt-6 mt-2">
                    <button
                        className="px-6 py-2.5 rounded-full font-bold text-[14px] text-brand-textSecondary 
                        border border-brand-inputBorder dark:text-white hover:bg-brand-hover dark:hover:bg-white/5 transition-all"
                        onClick={onClose}
                        disabled={isUpdating}
                    >
                        Cancel
                    </button>
                    <button
                        className={`
              px-8 py-2.5 rounded-full font-bold text-[14px] transition-all flex items-center gap-2
              ${isUpdating
                                ? 'bg-brand-gradient cursor-not-allowed text-white/70'
                                : 'bg-brand-gradient hover:bg-brand-primary-hover text-white shadow-lg shadow-brand-primary/20 active:scale-95'}
            `}
                        onClick={onConfirm}
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Processing...' : 'Confirm Subscription'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPlanModal;
