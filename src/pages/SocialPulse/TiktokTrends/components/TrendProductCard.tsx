import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface TrendProductCardProps {
  title: string;
  image: string;
  category: string;
  price?: string;
  metrics: {
    ctr: string;
    cvr: string;
    cpa: string;
    impressions: string;
  };
  onDetailsClick?: () => void;
}

const TrendProductCard: React.FC<TrendProductCardProps> = ({ title, image, category, price = "$10.90", metrics, onDetailsClick }) => {
  const navigate = useNavigate();

  const handleDiscoverSupplier = () => {
    navigate("/explorer", {
      state: {
        product: {
          title,
          image,
          category,
          price,
        },
        autoSourceLink: true
      }
    });
  };

  return (
    <div className="trend-product-card group animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Image Section */}
      <div className="relative aspect-[1/1.1] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Carousel Overlays */}
        <button className="carousel-arrow left-4">
          <ChevronLeft size={20} />
        </button>
        <button className="carousel-arrow right-4">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-3 mb-5">
          <h3 className="text-white font-bold text-[18px] line-clamp-2 group-hover:text-blue-400 transition-colors flex-1">
            {title}
          </h3>
          <div className="product-img-badge !static shrink-0">
            {category}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="product-metric-grid mb-6">
          <div className="product-metric-item">
            <span className="product-metric-label">CTR</span>
            <span className="product-metric-value">{metrics.ctr}</span>
          </div>
          <div className="product-metric-item">
            <span className="product-metric-label">CVR</span>
            <span className="product-metric-value">{metrics.cvr}</span>
          </div>
          <div className="product-metric-item">
            <span className="product-metric-label">CPA</span>
            <span className="product-metric-value">{metrics.cpa}</span>
          </div>
          <div className="product-metric-item">
            <span className="product-metric-label">Impressions</span>
            <span className="product-metric-value">{metrics.impressions}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-1">
          <button 
            onClick={() => onDetailsClick?.()}
            className="w-full sm:flex-1 figma-pill-border !rounded-full !px-2.5 !py-2.5 text-[11px] sm:text-[11.5px] font-bold text-white flex items-center justify-center gap-1.5 hover:bg-white/5 transition-all h-[40px] sm:h-auto"
          >
            Product Details <ExternalLink size={13} className="opacity-60" />
          </button>
          <button 
            onClick={handleDiscoverSupplier}
            className="w-full sm:flex-1 upgrade-gradient-btn !rounded-full !px-2.5 !py-2.5 text-[11px] sm:text-[11.5px] font-bold flex items-center justify-center !shadow-none whitespace-nowrap h-[40px] sm:h-auto"
          >
            Discover Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendProductCard;
