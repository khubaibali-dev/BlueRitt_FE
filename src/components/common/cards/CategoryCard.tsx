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
  previewImages = [],
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
    if (isAllProducts) return null;
    const fixed = FIXED_CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (fixed) return fixed.image;
    if (propImage) return propImage;
    return previewImages[0] || null;
  };

  const image = getDisplayImage();
  const [imgSrc, setImgSrc] = useState<string | null>(image);
  const [isFallbackLoading, setIsFallbackLoading] = useState(false);

  useEffect(() => {
    setImgSrc(image);
  }, [image]);

  const handleImageError = async () => {
    if (isFallbackLoading || !name) return;
    setIsFallbackLoading(true);
    try {
      const { getProductImageWithFallback } = await import("../../../utils/pexelsImageFallback");
      const fallback = await getProductImageWithFallback({ title: name, category: name });
      if (fallback) {
        setImgSrc(fallback);
      }
    } catch (error) {
      console.error("Fallback failed for category:", name, error);
    } finally {
      setIsFallbackLoading(false);
    }
  };

  const showGrid = !isFixed && previewImages.length > 1;

  // Unified Preview Grid Component
  const PreviewGrid = ({ images, count }: { images: string[], count: number }) => {
    const displayImages = [...images];
    while (displayImages.length < 4) {
      displayImages.push(FIXED_CATEGORIES[displayImages.length % FIXED_CATEGORIES.length].image);
    }

    return (
      <div className="grid grid-cols-2 grid-rows-2 flex-1 gap-[2px] bg-brand-bg dark:bg-white/5 p-[2px] h-full">
        <div className="relative bg-slate-100 dark:bg-white overflow-hidden rounded-tl-[14px]">
          <img src={displayImages[0]} alt="" className="w-full h-full object-cover" />
          {isAllProducts && (
            <div className="absolute top-2 left-2 w-11 h-11 bg-white dark:bg-[#FFFFFFE5] rounded-full flex items-center justify-center shadow-md border border-slate-100 dark:border-white/5">
              <span className="text-[12px] font-bold text-[#04132B]">All</span>
            </div>
          )}
        </div>
        <div className="bg-slate-50 dark:bg-white overflow-hidden rounded-tr-[14px]">
          <img src={displayImages[1]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="bg-slate-50 dark:bg-white overflow-hidden">
          <img src={displayImages[2]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-br-[14px]">
          <img src={displayImages[3]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-brand-gradient opacity-90 flex items-center justify-center">
            <span className="text-white text-[22px] font-bold">+{count || 0}</span>
          </div>
        </div>
      </div>
    );
  };

  if (isAllProducts) {
    return (
      <div
        className="group relative vault-card flex flex-col overflow-hidden h-[250px] !border-none transition-all duration-300 shadow-md"
      >
        <div className="grid grid-cols-2 grid-rows-2 flex-1 gap-[2px] bg-brand-bg dark:bg-white/5 p-[2px] h-full">
          {/* Top Left - Image with 'All' Badge */}
          <div className="relative bg-slate-100 dark:bg-white overflow-hidden rounded-tl-[14px]">
            <img src={previewImages[0] || FIXED_CATEGORIES[0].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 w-11 h-11 bg-white/90 dark:bg-[#FFFFFFE5] backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
              <span className="text-[12px] font-bold text-[#04132B]">All</span>
            </div>
          </div>

          {/* Top Right - Image */}
          <div className="bg-slate-50 dark:bg-white overflow-hidden rounded-tr-[14px]">
            <img src={previewImages[1] || FIXED_CATEGORIES[1].image} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Bottom Left - Blurred Black Info Box */}
          <div className="bg-[#1A1A1A]/90 dark:bg-[#030A16]/90 backdrop-blur-md flex flex-col justify-end p-4 rounded-bl-[14px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10 flex flex-col">
              <h3 className="text-white font-bold text-[14px] leading-tight whitespace-nowrap mb-0.5">All Products</h3>
              <p className="text-white text-[10px] font-medium uppercase tracking-wider opacity-80">{productCount || 0} Products</p>
            </div>
          </div>

          {/* Bottom Right - Image with Overlay */}
          <div className="relative overflow-hidden rounded-br-[14px]">
            <img src={previewImages[2] || FIXED_CATEGORIES[2].image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-gradient opacity-90 flex items-center justify-center">
              <span className="text-white text-[22px] font-bold">+{productCount || 0}</span>
            </div>
          </div>
        </div>

        {/* Menu Button */}
        <div className="absolute top-3 right-3 z-20" ref={menuRef}>
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
            </div>
          )}
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (showGrid) {
      return (
        <div className="h-[170px] overflow-hidden">
          <PreviewGrid images={previewImages} count={productCount || 0} />
        </div>
      );
    }

    return (
      <div className={`vault-image-box h-[170px] overflow-hidden ${imgSrc ? 'bg-white dark:bg-white' : 'bg-brand-card dark:bg-[#030F23]'} ${isFixed || !imgSrc ? '!p-0' : 'p-4'}`}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={name}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-110 ${isFixed ? 'object-cover' : 'object-contain'}`}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-card dark:bg-[#030F23] transition-transform duration-500 group-hover:scale-110">
            <div className="standard-icon-circle w-20 h-20 flex items-center justify-center">
              <FolderPlus size={24} className="text-white relative z-10" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className="group relative vault-card h-[250px] flex flex-col border border-brand-inputBorder rounded-[14px] overflow-hidden bg-brand-card dark:bg-[#04132B] cursor-pointer"
    >
      {renderContent()}

      <div className="absolute top-3 right-3 z-20" ref={menuRef}>
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
            {onDelete && (
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

      <div className="p-4 flex-1 flex flex-col justify-center bg-brand-card dark:bg-[#04132B]">
        <h3 className="product-card-title text-[14px] mb-0 text-brand-textPrimary dark:text-white transition-colors tracking-wider font-bold leading-tight line-clamp-1">
          {name}
        </h3>
        <span className="text-[13px] font-medium text-brand-textSecondary dark:text-white/70">{productCount || 0} Products</span>
      </div>
    </div>
  );
};

export default CategoryCard;
