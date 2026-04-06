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
          <div className="bg-[#04132B] rounded-[23px] overflow-hidden">
            {/* Header / Close */}
            <div className="flex justify-end p-4 pb-0">
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 pb-8 flex flex-col items-center text-center">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 
                ${type === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'}`}>
                {type === 'danger' ? <Trash2 size={32} /> : <AlertTriangle size={32} />}
              </div>

              <h2 className="text-[22px] font-bold text-white mb-2 tracking-tight">
                {title}
              </h2>
              
              <p className="text-[14px] text-slate-400 leading-relaxed mb-8">
                {message}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-full border border-slate-700 text-white text-[14px] font-bold hover:bg-white/5 transition-all active:scale-95"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`flex-1 px-6 py-3 rounded-full text-white text-[14px] font-bold transition-all active:scale-95 shadow-lg
                    ${type === 'danger' 
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 shadow-red-500/20' 
                      : 'bg-brand-gradient shadow-orange-500/20'} 
                    disabled:opacity-50 disabled:pointer-events-none`}
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
