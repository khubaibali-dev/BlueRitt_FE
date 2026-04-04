import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Check, AlertCircle, X } from "lucide-react";

interface AlertToastProps {
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

const AlertToast: React.FC<AlertToastProps> = ({ 
  type, 
  title, 
  message, 
  onClose, 
  duration = 3000 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 500); // Match duration-500 of animate-out
  };

  const toastContent = (
    <div className={`fixed top-6 right-6 z-[10001] w-[calc(100%-48px)] max-w-[340px] pointer-events-auto
      ${isExiting ? "animate-out slide-out-to-right duration-500 fill-mode-forwards" : "animate-in slide-in-from-right duration-500"}`}>
      
      <div className="relative p-[1px] rounded-[14px] bg-gradient-to-r from-[#155DFC] to-[#FF5900] shadow-2xl shadow-blue-500/10">
        <div className="bg-[#04132B] rounded-[13px] p-3 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3 flex-1">
            {/* Icon Circle */}
            <div className={`quick-action-icon-circle !w-8 !h-8 shrink-0
              ${type === 'success' ? 'text-white' : 'text-red-500'}`}>
              {type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            </div>

            {/* Text Content */}
            <div className="flex flex-col min-w-0">
              <h4 className="text-[15px] font-bold text-white tracking-tight leading-tight mb-0.5">
                {title}
              </h4>
              <p className="text-[13px] text-slate-400 font-medium line-clamp-1 leading-tight">
                {message}
              </p>
            </div>
          </div>

          {/* Manual Close */}
          <button 
            onClick={handleClose}
            className="p-1 -mr-1 rounded-full hover:bg-white/5 text-slate-600 hover:text-white transition-all transition-transform active:scale-90"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(toastContent, document.body);
};

export default AlertToast;
