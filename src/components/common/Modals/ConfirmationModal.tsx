import { Trash2, AlertTriangle } from "lucide-react";
import ModalShell from "./ModalShell";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger",
  isLoading = false,
}) => {
  const icon = (
    <div className={`p-2.5 rounded-xl ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
      {type === 'danger' ? <Trash2 size={22} /> : <AlertTriangle size={22} />}
    </div>
  );

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={icon}
    >
      <div className="p-4 flex flex-col items-start text-left">
        {/* Message Box with separate border */}
        <div className="w-full p-4 rounded-[16px] border border-brand-inputBorder dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02] mb-8">
          <p className="text-[14px] font-medium dark:text-slate-400 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-full figma-pill-border text-[#04132B] dark:text-white text-[14px] font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-6 py-3 rounded-full text-white text-[14px] font-bold transition-all active:scale-95 shadow-xl
              ${type === 'danger'
                ? 'bg-brand-gradient'
                : 'bg-brand-gradient'} 
              disabled:opacity-50 disabled:pointer-events-none hover:brightness-110`}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

export default ConfirmationModal;
