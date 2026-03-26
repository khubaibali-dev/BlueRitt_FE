import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, FolderOpen, Plus } from "lucide-react";
import AlertToast from "../../../../components/common/Toast/AlertToast";

interface SaveToVaultModalProps {
  productTitle: string;
  onClose: () => void;
}

const collections = [
  { id: 1, name: "Smart Watches", count: 12 },
  { id: 2, name: "Electronics", count: 12 },
  { id: 3, name: "High Profit Items", count: 12 },
  { id: 4, name: "Q1 2025 Launch", count: 12 },
];

const SaveToVaultModal: React.FC<SaveToVaultModalProps> = ({ productTitle, onClose }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-[440px] bg-[#04132B] rounded-[16px] border border-[#082656] shadow-2xl relative overflow-hidden flex flex-col p-6 animate-in zoom-in-95 duration-300">

        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[18px] font-bold text-white tracking-tight">Save to ProductVault</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-white/5 text-white hover:text-slate-400 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-slate-300 text-[12px] mb-4 line-clamp-1 ">{productTitle}</p>
        <div className="h-px bg-white/5 mb-4" />

        {/* Content Section */}
        {!isAddingCollection ? (
          <>
            {/* Collection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {collections.map((col) => (
                <div
                  key={col.id}
                  onClick={() => setSelectedId(col.id)}
                  className={`p-4 rounded-[14px] border transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-center group
                    ${selectedId === col.id
                      ? "bg-[#04132B] border-brand-inputBorder shadow-xl shadow-blue-500/10"
                      : "bg-[#04132B] border-brand-inputBorder hover:border-brand-inputBorder hover:bg-white/5"}`}
                >
                  <div className={`quick-action-icon-circle !w-8 !h-8 transition-all duration-300
                    ${selectedId === col.id
                      ? "shadow-lg shadow-blue-500/20 scale-110"
                      : "text-slate-400 group-hover:text-blue-400"}`}>
                    <FolderOpen size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-bold mb-0.5 transition-all duration-300 tracking-tight ${selectedId === col.id ? "text-white" : "text-slate-200"}`}>
                      {col.name}
                    </h4>
                    <p className="text-[12px] text-slate-500 font-medium">{col.count} items</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Collection action */}
            <button
              onClick={() => setIsAddingCollection(true)}
              className="flex items-center justify-start gap-2 text-[13px] font-bold text-slate-200 mb-6 hover:text-white transition-all py-1.5 rounded-xl hover:bg-white/5 w-fit ml-0 px-2 group"
            >
              <div className="quick-action-icon-circle !w-8 !h-8 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <Plus size={14} />
              </div>
              Add New Collection
            </button>
          </>
        ) : (
          /* Expanded Add New Collection Form */
          <div className="relative p-[1px] rounded-[16px] bg-gradient-to-r from-[#155DFC] to-[#FF5900] mb-6 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-[#04132B] rounded-[15px] p-4 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="quick-action-icon-circle !w-8 !h-8 bg-white/5 flex items-center justify-center text-white">
                  <Plus size={16} />
                </div>
                <span className="text-[14px] font-bold text-white">Add New Collection</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Collection Name</label>
                <input
                  autoFocus
                  type="text"
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                  placeholder="e.g., Summer Products 2025"
                  className="w-full bg-[#04132B] border border-brand-inputBorder rounded-[10px] p-3.5 text-white text-[13px] placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                />
              </div>
            </div>
          </div>
        )}

        <div className="h-px bg-white/5 mb-4" />

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={isAddingCollection ? () => setIsAddingCollection(false) : onClose}
            className="flex-1 py-2.5 px-6 rounded-full figma-pill-border text-[13px] font-bold text-white hover:bg-white/5 transition-all shadow-lg text-center flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (isAddingCollection) {
                // Logic for Create & Save
                setToast({
                  type: "success",
                  title: "Collection Created!",
                  message: `New collection "${collectionName}" created successfully.`,
                });
                setTimeout(() => setIsAddingCollection(false) , 2000); // Collapse after toast starts
              } else {
                // Logic for Save to Collection
                const selectedCol = collections.find(c => c.id === selectedId)?.name || "selected";
                setToast({
                  type: "success",
                  title: "Product saved to ProductVault!",
                  message: `Successfully saved to "${selectedCol}" collection.`,
                });
                setTimeout(onClose, 2500); // Close modal after toast
              }
            }}
            className={`flex-1 py-2.5 px-6 rounded-full text-[13px] font-bold text-white transition-all shadow-xl active:scale-[0.98] 
              ${isAddingCollection
                ? "bg-gradient-to-r from-[#E93E3E] to-[#E93E9E] shadow-red-900/20"
                : "bg-brand-gradient shadow-orange-500/20"}`}
          >
            {isAddingCollection ? "Create & Save" : "Save to Collection"}
          </button>
        </div>
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
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default SaveToVaultModal;
