import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Trash2, Eye, FolderPlus } from "lucide-react";
import { FIXED_CATEGORIES } from "../../../utils/categoryConstants";

interface CategoryCardProps {
  id: string | number;
  name: string;
  image?: string;
  productCount?: number;
  previewImages?: string[];
  createdAt?: string;
  onClick: () => void;
  onDelete?: (id: string, name: string) => void;
  isAllProducts?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  image: propImage,
  productCount,
  onClick,
  onDelete,
  isAllProducts
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Determine if it's a fixed category to apply special styling
  const isFixed = isAllProducts || FIXED_CATEGORIES.some(c => c.name.toLowerCase() === name.toLowerCase());

  // Helper to map image by name if not provided (or if it's a fixed category)
  const getDisplayImage = () => {
    if (isAllProducts) return null; // Handled separately
    const fixed = FIXED_CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
    return fixed ? fixed.image : propImage;
  };

  const image = getDisplayImage();

  if (isAllProducts) {
    return (
      <div
        className="group relative vault-card flex flex-col overflow-hidden min-h-[230px] !border-none transition-all duration-300 shadow-md"
      >
        <div className="grid grid-cols-2 grid-rows-2 flex-1 gap-[2px] bg-brand-bg dark:bg-white/5 p-[2px]">
          {/* Top Left: ALL Badge + Image 1 */}
          <div className="relative bg-slate-100 dark:bg-white overflow-hidden rounded-tl-[14px]">
            <img src={FIXED_CATEGORIES[0].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 w-11 h-11 bg-white dark:bg-[#FFFFFFE5] rounded-full flex items-center justify-center shadow-md border border-slate-100 dark:border-white/5">
              <span className="text-[12px] font-bold text-[#04132B] dark:text-[#04132B]">All</span>
            </div>
          </div>

          {/* Top Right: Image 2 */}
          <div className="bg-slate-50 dark:bg-white overflow-hidden rounded-tr-[14px]">
            <img src={FIXED_CATEGORIES[1].image} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Bottom Left: Title & Count (Dark) */}
          <div className="bg-[#1A1A1A] dark:bg-[#030A16] flex flex-col justify-end p-4 rounded-bl-[14px] relative transition-colors">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col">
              <h3 className="text-white font-bold text-[14px] leading-tight whitespace-nowrap mb-0.5">All Products</h3>
              <p className="text-white text-[10px] font-medium uppercase tracking-wider opacity-80">{productCount || 0} Products</p>
            </div>
          </div>

          {/* Bottom Right: Image 3 + Gradient Overlay */}
          <div className="relative overflow-hidden rounded-br-[14px]">
            <img src={FIXED_CATEGORIES[2].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-gradient opacity-90 flex items-center justify-center">
              <span className="text-white text-[22px] font-bold">+{productCount || 0}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group relative vault-card cursor-pointer min-h-[230px] flex flex-col border border-brand-inputBorder rounded-[14px] overflow-hidden`}
    >
      {/* Image Section */}
      <div className={`vault-image-box !h-[150px] overflow-hidden ${image ? 'bg-white dark:bg-white p-4' : 'bg-brand-card dark:bg-[#030F23]'} ${isFixed && image ? '!p-0' : ''}`}>
        {image ? (
          <img
            src={image}
            alt={name}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${isFixed ? 'object-cover' : 'object-contain'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-card dark:bg-[#030F23] transition-transform duration-500 group-hover:scale-110">
            <div className="standard-icon-circle w-20 h-20 flex items-center justify-center">
              <FolderPlus size={24} className="text-white relative z-10" />
            </div>
          </div>
        )}

        <div className="absolute top-3 right-3" ref={menuRef}>
          <button
            onClick={(e) => {
              e.preventDefault();
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
              {onDelete && !isFixed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    onDelete(id.toString(), name);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-red-400 hover:bg-red-400/5 transition-colors text-left"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1 bg-brand-card dark:bg-[#04132B]">
        <h3 className="product-card-title text-[14px] mb-0 text-brand-textPrimary dark:text-white transition-colors  tracking-wider font-bold leading-tight line-clamp-1">
          {name}
        </h3>
        <span className="text-[13px] font-medium text-brand-textSecondary dark:text-white/70">{productCount || 0} Products</span>
      </div>
    </div>
  );
};

export default CategoryCard;
