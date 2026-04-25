import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, Plus } from "lucide-react";
import InputField from "../../../components/common/input/InputField";
import { motion } from "framer-motion";

interface CreateCollectionModalProps {
  onClose: () => void;
  onConfirm: (name: string) => void;
  isLoading: boolean;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  onClose,
  onConfirm,
  isLoading
}) => {
  const [collectionName, setCollectionName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCollectionName("");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (collectionName.trim() && !isLoading) {
      onConfirm(collectionName.trim());
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-[440px] bg-white dark:bg-[#04132B] rounded-[16px] border border-brand-border dark:border-white/10 shadow-2xl relative overflow-hidden flex flex-col p-6"
      >

        {/* Glow effects matching standard modal design */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[#04132B] dark:text-white tracking-tight">Create New Collection</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Container with Gradient Border */}
          <div className="relative p-[1px] rounded-[16px] bg-gradient-to-r from-[#155DFC] to-[#FF5900] mb-8 shadow-lg shadow-blue-500/5">
            <div className="bg-white dark:bg-[#04132B] rounded-[15px] p-5 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="!w-8 !h-8 rounded-full bg-slate-100 dark:bg-white/5 standard-icon-circle flex items-center justify-center text-[#04132B] dark:text-white">
                  <Plus size={22} />
                </div>
                <span className="text-[15px] font-bold text-[#04132B] dark:text-white">Collection Information</span>
              </div>

              <InputField
                id="collectionName"
                label="Collection Name"
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="e.g., Summer Products 2025"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-full border border-slate-200 dark:border-white/10 text-[14px] font-bold text-[#04132B] dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !collectionName.trim()}
              className={`flex-1 py-3 px-6 rounded-full text-[14px] font-bold text-white transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2
                bg-brand-gradient shadow-orange-500/20 
                ${isLoading || !collectionName.trim() ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"}`}
            >
              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {isLoading ? "Creating..." : "Create Collection"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default CreateCollectionModal;
