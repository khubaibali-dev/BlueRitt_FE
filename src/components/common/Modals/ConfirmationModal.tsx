import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { X, AlertTriangle, Trash2 } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[440px] animate-in zoom-in-95 fade-in duration-300">
        <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
          <div className="bg-white dark:bg-[#04132B] rounded-[23px] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                  {type === 'danger' ? <Trash2 size={22} /> : <AlertTriangle size={22} />}
                </div>
                <h2 className="text-[18px] font-bold text-[#04132B] dark:text-white tracking-tight">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content Body */}
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
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ConfirmationModal;
