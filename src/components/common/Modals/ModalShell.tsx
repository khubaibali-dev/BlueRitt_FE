import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  className?: string;
}

const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = "440px",
  showCloseButton = true,
  className = "",
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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#00000066] backdrop-blur-sm z-0"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full z-10 ${className}`}
            style={{ maxWidth }}
          >
            <div className="relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
              <div className="bg-white dark:bg-[#04132B] rounded-[23px] overflow-hidden relative">
                
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Header */}
                {(title || icon) && (
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/10 relative z-10">
                    <div className="flex items-center gap-3">
                      {icon && (
                        <div className="flex items-center justify-center">
                          {icon}
                        </div>
                      )}
                      <div>
                        {title && (
                          <h2 className="text-[18px] font-bold text-[#04132B] dark:text-white tracking-tight leading-tight">
                            {title}
                          </h2>
                        )}
                        {subtitle && (
                          <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    {showCloseButton && (
                      <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all cursor-pointer"
                      >
                        <X size={22} />
                      </button>
                    )}
                  </div>
                )}
                
                {/* Fallback Close Button if no Header */}
                {!title && !icon && showCloseButton && (
                   <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                )}

                {/* Content */}
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalShell;
