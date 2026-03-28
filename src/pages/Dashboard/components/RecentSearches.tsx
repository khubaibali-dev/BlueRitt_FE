import { Star } from "lucide-react";

const RecentSearches = () => (
  <div className="dashboard-card">
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="search-result-item group">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="product-img-wrapper shrink-0">
              <img src={`https://picsum.photos/seed/${i + 100}/100/100`} alt="prod" className="w-full h-full object-contain rounded-md" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="product-title-text">
                Wireless blender Smoothie maker - USB-C charger - 300ML capacity
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <div className="flex items-center gap-0.5 text-[#FBBF24] shrink-0">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <span className="text-[10px] text-[#94A3B8] font-semibold">4.8</span>
                <span className="category-tag">Electronics</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0 pl-2">
            <p className="price-text">$24.99</p>
            <p className="old-price-text">$34.99</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentSearches;