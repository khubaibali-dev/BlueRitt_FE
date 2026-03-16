import { Star } from "lucide-react";

const RecentSearches = () => (
  <div className="bg-[#0E192B] border border-[#082656] rounded-3xl p-8 h-full">
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1E293B] rounded-xl flex items-center justify-center p-2 overflow-hidden shadow-inner border border-white/5">
              <img src={`https://picsum.photos/seed/${i + 100}/100/100`} alt="prod" className="w-full h-full object-contain rounded-md" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white truncate max-w-[200px] lg:max-w-[400px]">
                Wireless blender Smoothie maker - USB-C charger - 300ML capacity
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5 text-[#FBBF24]">
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                  <Star size={12} fill="currentColor" />
                </div>
                <span className="text-[10px] text-[#94A3B8] font-semibold">4.8</span>
                <span className="bg-[#1E293B] text-[#94A3B8] text-[9px] px-2 py-0.5 rounded-md font-semibold uppercase">Electronics</span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-white">$24.99</p>
            <p className="text-[11px] text-[#94A3B8] line-through">$34.99</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentSearches;