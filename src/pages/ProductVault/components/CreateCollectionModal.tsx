import React, { useState } from "react";
import { Plus } from "lucide-react";
import InputField from "../../../components/common/input/InputField";
import ModalShell from "../../../components/common/Modals/ModalShell";

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  isLoading: boolean;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading
}) => {
  const [collectionName, setCollectionName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (collectionName.trim() && !isLoading) {
      onConfirm(collectionName.trim());
    }
  };

  const icon = (
    <div className="!w-8 !h-8 rounded-full bg-slate-100 dark:bg-white/5 standard-icon-circle flex items-center justify-center text-[#04132B] dark:text-white">
      <Plus size={22} />
    </div>
  );

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Collection"
      icon={icon}
    >
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Form Container with Gradient Border */}
          <div className="relative p-[1px] rounded-[16px] bg-gradient-to-r from-[#155DFC] to-[#FF5900] mb-8 shadow-lg shadow-blue-500/5">
            <div className="bg-white dark:bg-[#04132B] rounded-[15px] p-5 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-bold text-[#04132B] dark:text-white">Collection Information</span>
              </div>

              <InputField
                id="collectionName"
                label="Collection Name"
                type="text"
                value={collectionName}
                onChange={(e) => {
                  setCollectionName(e.target.value);
                }}
                placeholder="e.g., Summer Products 2025"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-full figma-pill-border text-[14px] font-semibold text-[#04132B] dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !collectionName.trim()}
              className={`flex-1 py-3 px-6 rounded-full text-[14px] font-semibold text-white transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2
                bg-brand-gradient shadow-orange-500/20 
                ${isLoading || !collectionName.trim() ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"}`}
            >
              {isLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {isLoading ? "Creating..." : "Create Collection"}
            </button>
          </div>
        </form>
      </div>
    </ModalShell>
  );
};

export default CreateCollectionModal;
