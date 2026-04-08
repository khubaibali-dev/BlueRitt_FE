import { Search, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../../api/savedProducts";
import { Link } from "react-router-dom";

const RecentSearches = () => {
  const { data: savedCategoryData, isLoading } = useQuery({
    queryKey: ["getCategory"],
    queryFn: async () => {
      const response = await getCategory();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="dashboard-card">
        <div className="space-y-4 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-2 opacity-50">
              <div className="w-12 h-12 bg-white/10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-3 bg-white/10 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const categories = Array.isArray(savedCategoryData) ? savedCategoryData : [];

  if (categories.length === 0) {
    return (
      <div className="dashboard-card flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 bg-brand-hover dark:bg-white/5 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
          <Search size={24} className="text-brand-textSecondary dark:text-slate-400" />
        </div>
        <p className="text-brand-textPrimary dark:text-white font-semibold">No recent searches yet</p>
        <p className="text-brand-textSecondary dark:text-slate-400 text-sm mt-1">Your saved searches will appear here</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="space-y-4">
        {categories.slice(0, 6).map((category: any) => (
          <div key={category.id} className="search-result-item group">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="product-img-wrapper shrink-0 flex items-center justify-center bg-brand-hover dark:bg-white overflow-hidden">
                {category.image ? (
                  <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
                ) : (
                  <Search size={22} className="text-brand-primary/60" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="product-title-text truncate">
                  {category.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-dim font-semibold uppercase tracking-wider">
                    {category.created_at ? new Date(category.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                  <span className="category-tag !text-dim uppercase tracking-widest !text-[9px]">Saved Search</span>
                </div>
              </div>
            </div>
            <Link
              to={`/products?search=${encodeURIComponent(category.name)}`}
              className="group/btn flex items-center gap-1 text-[11px] font-bold text-brand-primary hover:underline transition-all pr-1"
            >
              View <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
