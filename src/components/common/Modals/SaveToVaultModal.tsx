import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderOpen, Plus } from "lucide-react";
import AlertToast from "../../../components/common/Toast/AlertToast";
import InputField from "../../../components/common/input/InputField";
import { motion, AnimatePresence } from "framer-motion";
import ModalShell from "../../../components/common/Modals/ModalShell";

import { getCategory, saveProducts, createCategory, getSavedCategoriesDetail } from "../../../api/savedProducts";

interface SaveToVaultModalProps {
  productTitle: string;
  calculatorData: any;
  onClose: () => void;
}

const SaveToVaultModal: React.FC<SaveToVaultModalProps> = ({ productTitle, calculatorData, onClose }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);


  const allCategories = [...(categories || [])];

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const categoryRes = await getCategory();
      const categoriesWithCount = await Promise.all(
        categoryRes.data.map(async (cat: any) => {
          const res = await getSavedCategoriesDetail({ id: cat.id });
          return {
            ...cat,
            productCount: res?.data?.products?.length || 0,
          };
        })
      );
      setCategories(categoriesWithCount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreateCollection = async () => {
    if (!collectionName.trim()) {
      setToast({ type: "error", title: "Error", message: "Please enter a collection name." });
      return;
    }

    try {
      setIsSaving(true);
      const resp = await createCategory({ name: collectionName });
      const newCategoryId = resp.data.id;

      // Refresh categories list
      await fetchCategories();

      // Select the new category and go back to list view
      setSelectedId(newCategoryId);
      setIsAddingCollection(false);
      setCollectionName("");

      setToast({
        type: "success",
        title: "Success!",
        message: `Collection "${collectionName}" created. You can now save your product to it.`,
      });
    } catch (error) {
      console.error("Create collection error:", error);
      setToast({ type: "error", title: "Failed", message: "Could not create collection. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveToVault = async () => {
    if (!selectedId) {
      setToast({ type: "error", title: "Error", message: "Please select a collection." });
      return;
    }

    try {
      setIsSaving(true);
      const finalPayload = {
        ...calculatorData,
        category: selectedId,
      };

      await saveProducts(finalPayload);

      setToast({
        type: "success",
        title: "Success!",
        message: "Product saved to ProductVault successfully.",
      });

      setTimeout(() => {
        onClose();
        navigate("/products");
      }, 2000);
    } catch (error) {
      console.error("Save error:", error);
      setToast({ type: "error", title: "Save Failed", message: "Something went wrong. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalShell
      isOpen={true}
      onClose={onClose}
      title="Save to ProductVault"
      subtitle={productTitle}
      maxWidth="440px"
    >
      <div className="p-6 pt-0">
        <div className="h-px bg-brand-inputBorder mb-4 opacity-50" />

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {!isAddingCollection ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Collection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                {isLoading ? (
                  // 🔥 SKELETON UI
                  <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="p-4 rounded-[14px] border bg-white dark:bg-brand-bg animate-pulse flex flex-col items-center justify-center gap-3 text-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                    ))}
                  </>
                ) : categories.length > 0 ? (
                  allCategories.map((col) => (
                    <div
                      key={col.id}
                      onClick={() => setSelectedId(col.id)}
                      className={`p-4 rounded-[14px] border transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-center group
                          ${selectedId === col.id
                          ? "bg-[#F8FAFC] dark:bg-brand-bg border-gray-600 dark:border-white shadow-sm"
                          : "bg-white dark:bg-brand-bg border-brand-inputBorder hover:border-brand-inputBorder hover:bg-brand-hover"}`}
                    >
                      <div className={`quick-action-icon-circle !w-8 !h-8 transition-all duration-300
                          ${selectedId === col.id
                          ? "shadow-lg shadow-blue-500/20 scale-110"
                          : "text-brand-textSecondary group-hover:text-brand-primary"}`}
                      >
                        <FolderOpen size={18} className="text-white" />
                      </div>
                      <div>
                        <h4 className={`text-[13px] font-bold mb-0.5 transition-all duration-300 tracking-tight 
                            ${selectedId === col.id
                            ? "text-[#04132B] dark:text-white"
                            : "dark:text-white text-brand-textSecondary"}`}
                        >
                          {col.name}
                        </h4>
                        <p className="text-[12px] dark:text-[#9F9F9F] text-brand-textSecondary font-medium">
                          {col.productCount || 0} items
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-10 text-center text-slate-400 text-[12px]">
                    No collections found. Create one to get started.
                  </div>
                )}
              </div>

              {/* Add New Collection */}
              <button
                onClick={() => setIsAddingCollection(true)}
                className="flex items-center justify-start gap-2 text-[13px] font-bold dark:text-white text-brand-textPrimary mb-6 hover:text-brand-textPrimary transition-all py-1.5 rounded-xl hover:bg-brand-hover w-fit ml-0 px-2 group"
              >
                <div className="quick-action-icon-circle !w-8 !h-8 bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-hover transition-all ">
                  <Plus size={14} className="text-brand-textPrimary" />
                </div>
                Add New Collection
              </button>
            </motion.div>
          ) : (
            /* Expanded Add New Collection Form */
            <motion.div
              key="add-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="relative p-[1px] rounded-[16px] bg-gradient-to-r from-[#155DFC] to-[#FF5900] mb-6"
            >
              <div className="bg-white dark:bg-brand-bg rounded-[15px] p-4 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="quick-action-icon-circle !w-8 !h-8 bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#04132B] dark:text-brand-textPrimary">
                    <Plus size={16} />
                  </div>
                  <span className="text-[14px] font-bold text-[#04132B] dark:text-brand-textPrimary">Add New Collection</span>
                </div>
                <div className="mt-2">
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
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-px bg-brand-inputBorder mb-4 opacity-50" />

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={isAddingCollection ? () => setIsAddingCollection(false) : onClose}
            className="flex-1 py-2.5 px-6 rounded-full figma-pill-border text-[13px] font-bold text-[#04132B] dark:text-brand-textPrimary hover:bg-brand-hover transition-all shadow-lg text-center flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            disabled={isSaving}
            onClick={isAddingCollection ? handleCreateCollection : handleSaveToVault}
            className={`flex-1 py-2.5 px-6 rounded-full text-[13px] font-bold text-white transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2
              ${isAddingCollection
                ? "bg-brand-gradient shadow-red-900/20"
                : "bg-brand-gradient shadow-orange-500/20"} ${isSaving ? "opacity-70 cursor-not-allowed" : "hover:brightness-110"}`}
          >
            {isSaving && <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {isAddingCollection ? (isSaving ? "Creating..." : "Create Collection") : (isSaving ? "Saving..." : "Save to Collection")}
          </button>
        </div>

        {toast && (
          <AlertToast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </ModalShell>
  );
};

export default SaveToVaultModal;
