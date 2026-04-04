import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import AlertToast from "./AlertToast";
import ErrorToast from "./ErrorToast";

type ToastType = "success" | "error";

interface ToastOptions {
  title?: string;
  duration?: number;
}

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Global Toast Provider.
 * Allows triggering premium Success and Error toasts from any component
 * via the useToast hook without local state management.
 */
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeToast, setActiveToast] = useState<{
    type: ToastType;
    message: string;
    title?: string;
    duration?: number;
  } | null>(null);

  const showToast = useCallback((type: ToastType, message: string, options?: ToastOptions) => {
    // Reset toast first if one exists to trigger re-animation if needed
    setActiveToast(null);
    setTimeout(() => {
      setActiveToast({ type, message, ...options });
    }, 10);
  }, []);

  const success = useCallback((message: string, options?: ToastOptions) => {
    showToast("success", message, options);
  }, [showToast]);

  const error = useCallback((message: string, options?: ToastOptions) => {
    showToast("error", message, options);
  }, [showToast]);

  const handleClose = useCallback(() => {
    setActiveToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ success, error }}>
      {children}
      
      {activeToast && activeToast.type === "success" && (
        <AlertToast
          type="success"
          title={activeToast.title || "Success"}
          message={activeToast.message}
          onClose={handleClose}
          duration={activeToast.duration}
        />
      )}
      
      {activeToast && activeToast.type === "error" && (
        <ErrorToast
          title={activeToast.title}
          message={activeToast.message}
          onClose={handleClose}
          duration={activeToast.duration}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
