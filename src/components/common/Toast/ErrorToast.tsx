import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AlertTriangle, X } from "lucide-react";

interface ErrorToastProps {
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

/**
 * Premium Error Toast component matching the user-provided screenshot.
 * Features:
 * - Solid red border with high-fidelity shadows.
 * - Pulse-in/out animations for smooth entry and exit.
 * - Large, clear typography for "Something Went Wrong" messages.
 */
const ErrorToast: React.FC<ErrorToastProps> = ({ 
  title = "Something Went Wrong", 
  message, 
  onClose, 
  duration = 4000 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 500); 
  };

  const toastContent = (
    <div className={`fixed top-6 right-6 z-[10001] w-[calc(100%-48px)] max-w-[340px] pointer-events-auto
      ${isExiting ? "animate-out slide-out-to-right duration-500 fill-mode-forwards" : "animate-in slide-in-from-right duration-500"}`}>
      
      {/* Red Border Glow Container */}
      <div className="relative p-[1px] rounded-[16px] bg-red-500/80 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
        <div className="bg-white dark:bg-[#051124] rounded-[15px] p-4 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 flex-1">
            {/* High-Fidelity Alert Icon */}
            <div className="flex items-center justify-center shrink-0 text-red-500">
              <AlertTriangle size={24} strokeWidth={1.5} />
            </div>

            {/* Content Wrapper */}
            <div className="flex flex-col min-w-0">
              <h4 className="text-[15px] font-bold text-slate-800 dark:text-white tracking-tight leading-tight mb-0.5">
                {title}
              </h4>
              <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                {message}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="p-1 -mr-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-white transition-all active:scale-90"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(toastContent, document.body);
};

export default ErrorToast;
