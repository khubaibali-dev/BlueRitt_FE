import React from "react";
import { CreditCard, Loader2 } from "lucide-react";
import ModalShell from "../Modals/ModalShell";

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
    return (
        <ModalShell
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Subscription"
            maxWidth="480px"
        >
            <div className="p-6 sm:p-4 pt-0">
                {/* Content Section */}
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-inputBorder">
                        <div className="w-12 h-12 rounded-full quick-action-icon-circle flex items-center justify-center shrink-0">
                            <CreditCard size={24} className="text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[15px] text-brand-textPrimary dark:text-white font-semibold leading-relaxed">
                                Are you sure you want to subscribe to the <span className="text-brand-primary">{planName}</span> plan ({billingCycle}) for {price}?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        className="px-8 py-2.5 rounded-full font-semibold text-[14px] text-brand-textSecondary dark:text-white figma-pill-border transition-all"
                        onClick={onClose}
                        disabled={isUpdating}
                    >
                        Cancel
                    </button>
                    <button
                        className={`
                            px-10 py-2.5 rounded-full font-semibold text-[14px] transition-all flex items-center gap-2 shadow-lg
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
            </div>
        </ModalShell>
    );
};

export default ConfirmPlanModal;
