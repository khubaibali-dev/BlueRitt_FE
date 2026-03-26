import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Star, ChevronDown, ChevronUp } from "lucide-react";

interface AmazonProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    title: string;
    image: string;
    category: string;
    price: string;
    oldPrice?: string;
    rating?: string;
    views?: string;
  };
}

const AmazonProductDetailsDrawer: React.FC<AmazonProductDetailsDrawerProps> = ({ isOpen, onClose, product }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Key Features"]);
  const navigate = useNavigate();

  if (!product) return null;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleDiscoverSupplier = () => {
    navigate("/explorer", {
      state: {
        product: {
          title: product.title,
          image: product.image,
          category: product.category,
          price: product.price,
        },
        autoSourceLink: true
      }
    });
  };

  const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections.includes(title);
    return (
      <div className="border border-[#082656] rounded-[20px] bg-[#04132B] overflow-hidden">
        <button
          onClick={() => toggleSection(title)}
          className="w-full flex items-center justify-between p-6 text-white hover:bg-white/5 transition-all text-left"
        >
          <span className="text-[15px] font-semibold tracking-tight">{title}</span>
          {isExpanded ? <ChevronUp size={20} className="text-white/70" /> : <ChevronDown size={20} className="text-white/70" />}
        </button>
        {isExpanded && (
          <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="border-t border-[#1C263C] pt-6">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-[8px] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full z-[110] flex flex-col transition-transform duration-300 ease-in-out w-full sm:!w-[650px] bg-[#051125] border-l border-white/5 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-[22px] font-bold text-white tracking-tight">Product Details</h2>
              <p className="text-[14px] text-slate-400 font-medium tracking-tight">Your Selected Product</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-all text-white/70"
            >
              <X size={24} />
            </button>
          </div>
          <div className="mt-6 border-b border-[#1C263C]" />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8 pt-0 space-y-6">

          {/* Top Product Snippet Card */}
          <div className="flex gap-5 p-1">
            <div className="w-24 h-24 rounded-[20px] overflow-hidden shrink-0 border border-white/10 shadow-2xl">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <h4 className="text-[15px] font-bold text-white leading-tight mb-1">{product.title}</h4>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[20px] font-black text-white leading-none">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-[11px] text-slate-500 line-through mt-1 font-medium">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} fill="#FFD700" className="text-[#FFD700]" />
                    ))}
                  </div>
                  <div className="px-2.5 py-1 bg-[#081421] border border-[#082656] rounded-full">
                    <span className="text-[10px] font-bold text-white tracking-wide">{product.views || "0 Views"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <AccordionSection title="Product Description">
              <p className="text-[13.5px] text-slate-400 leading-relaxed">
                Discover the ultimate audio experience with the Wireless Bluetooth Headphones Pro Max. Engineered for precision and comfort, these headphones deliver studio-quality sound directly to your ears with advanced ANC technology.
              </p>
            </AccordionSection>

            <AccordionSection title="Key Features">
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-[13.5px] font-bold text-white">Hypertension Notifications: Apple Watch</span>
                  </div>
                  <p className="text-[13.5px] text-slate-500 ml-3.5 leading-relaxed">
                    Series 11 can spot signs of chronic high blood pressure and notify you of possible hypertension.
                  </p>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <span className="text-[13.5px] font-bold text-white">Hypertension Notifications: Apple Watch</span>
                  </div>
                  <p className="text-[13.5px] text-slate-500 ml-3.5 leading-relaxed">
                    Series 11 can spot signs of chronic high blood pressure and notify you of possible hypertension.
                  </p>
                </li>
              </ul>
            </AccordionSection>

            <AccordionSection title="Product Information">
              <p className="text-[13.5px] text-slate-400 leading-relaxed">
                Additional technical specifications and seller information would appear here, providing deep insights into the product's performance and market standing.
              </p>
            </AccordionSection>
          </div>

          {/* Footer inside scroll area */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 pb-2 border-t border-white/5">
            <button
              className="w-full sm:w-auto px-10 h-[48px] figma-pill-border !rounded-full text-white text-[13px] font-bold hover:bg-white/5 transition-all flex items-center justify-center"
            >
              View on Amazon
            </button>
            <button
              onClick={handleDiscoverSupplier}
              className="w-full sm:w-auto px-10 h-[48px] bg-brand-gradient !rounded-full text-white text-[13px] font-bold shadow-lg shadow-orange-500/10 active:scale-95 transition-all flex items-center justify-center"
            >
              Discover Supplier
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmazonProductDetailsDrawer;
