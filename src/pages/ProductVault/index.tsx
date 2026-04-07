import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MoreVertical, Trash2, Eye, Calendar, Folder } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CollectionDetails from "./components/CollectionDetails";
import { getCategory, deleteCategory } from "../../api/savedProducts";
import ConfirmationModal from "../../components/common/Modals/ConfirmationModal";
import { useToast } from "../../components/common/Toast/ToastContext";

interface CategoryCardProps {
  id: string;
  name: string;
  image?: string;
  createdAt: string;
  onClick: () => void;
  onDelete: (id: string, name: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, createdAt, onClick, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div
      onClick={onClick}
      className="group relative vault-card cursor-pointer !h-auto flex flex-col"
    >
      {/* Image Section */}
      <div className="vault-image-box !h-[180px]">
        <img
          src={image || ""}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 right-3" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-1.5 rounded-full text-white dark:text-white transition-all glass-action-circle-dark ${isMenuOpen ? "opacity-100 scale-110" : "opacity-100"}`}
          >
            <MoreVertical size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-[160px] bg-white dark:bg-[#04132B] border border-brand-border dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onClick();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-brand-textPrimary dark:text-slate-200 hover:bg-brand-hover dark:hover:bg-white/5 transition-colors text-left"
              >
                <Eye size={14} className="text-[#6291DE]" />
                View Details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  onDelete(id, name);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:bg-red-400/5 transition-colors text-left"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Folder size={18} />
          </div>
          <h3 className="product-card-title text-[16px] mb-0 text-brand-textPrimary dark:text-white group-hover:text-brand-primary dark:group-hover:text-blue-400 transition-colors uppercase tracking-wider font-bold">
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-brand-textSecondary dark:text-slate-500">
          <Calendar size={14} />
          <span className="text-[12px] font-medium">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

const ProductVault: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { success, error: toastError } = useToast();
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, id: string, name: string }>({ isOpen: false, id: "", name: "" });

  // UseQuery for Categories
  const { data: categoriesResponse, isLoading } = useQuery({
    queryKey: ["vault-categories"],
    queryFn: getCategory
  });

  const categories = categoriesResponse?.data || [];

  // Derive selected collection from URL (Single Source of Truth)
  const collectionIdParam = searchParams.get("collectionId");
  const selectedCollection = useMemo(() => {
    if (!collectionIdParam || categories.length === 0) return null;
    const col = categories.find((c: any) => c.id.toString() === collectionIdParam);
    return col ? { id: col.id.toString(), name: col.name } : null;
  }, [collectionIdParam, categories]);

  // Update URL when selection changes
  const handleSetSelectedCollection = (id: string | null) => {
    if (id) {
      setSearchParams({ collectionId: id });
    } else {
      setSearchParams({});
    }
  };

  // UseMutation for Deletion
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory({ saveID: id }),
    onSuccess: () => {
      success("Collection deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["vault-categories"] });
      setDeleteModal({ isOpen: false, id: "", name: "" });
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      toastError("Failed to delete collection");
    }
  });

  const handleDeleteCategory = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  return (
    <div className="bg-brand-card-alt rounded-[32px] overflow-hidden relative  min-h-screen">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={() => deleteMutation.mutate(deleteModal.id)}
        isLoading={deleteMutation.isPending}
        title="Delete Collection?"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone and all product records inside will be permanently removed.`}
        confirmText="Yes, Delete"
        type="danger"
      />

      <div className="relative z-10 p-6 sm:p-10">
        {selectedCollection ? (
          <div className="animate-in fade-in duration-500">
            <CollectionDetails
              collectionId={selectedCollection.id}
              collectionName={selectedCollection.name}
              onBack={() => handleSetSelectedCollection(null)}
              onProductClick={() => { }} // No longer needed as we navigate via URL
            />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10">
              <h1 className="banner-heading-text !text-left !mb-1 text-brand-textPrimary dark:text-white">Product Vault</h1>
              <p className="page-header-subtitle !text-left ml-4 text-brand-textSecondary dark:text-brand-textSecondary">Analyze and manage your saved product research</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="vault-card h-[280px] animate-pulse bg-brand-hover dark:bg-white/5 rounded-2xl" />
                ))
              ) : (
                categories.map((col: any, idx: number) => (
                  <CategoryCard
                    key={idx}
                    id={col.id}
                    name={col.name}
                    image={col.image}
                    createdAt={col.created_at}
                    onClick={() => handleSetSelectedCollection(col.id.toString())}
                    onDelete={handleDeleteCategory}
                  />
                ))
              )}

              {/* Add New Collection Card */}
              {/* <div className="group vault-add-card flex-col !bg-[#04132B] !min-h-[280px] cursor-pointer">
                <div className="p-4 rounded-full bg-white/5 text-white group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all group-hover:scale-110 mb-4">
                  <Plus size={34} />
                </div>
                <span className="text-white font-bold text-[15px] tracking-tight group-hover:text-blue-400 transition-colors">Add New Collection</span>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVault;
