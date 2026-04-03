import React from "react";
import { TrendingUp, Briefcase, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  progress: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ icon, title, value, progress }) => (
  <div className="insight-card">
    <div className="flex flex-col gap-4">
      <div className="insight-icon-circle">
        {icon}
      </div>
      <div>
        <p className="text-white text-[16px] font-semibold tracking-wide mb-1 lowercase">{title}</p>
        <h4 className="text-white text-[24px] font-bold tracking-tight">{value}</h4>
      </div>
    </div>

    <div className="w-full">
      <div className="flex justify-end mb-2">
        <span className="text-white/40 text-[11px] font-medium">{Math.min(100, Math.round(progress))}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="insight-progress-bar"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  </div>
);

const UsageInsights: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Extract quota and limits
  const amazonQuota = currentUser.searchQuota?.amazon_search || 0;
  const amazonLimit = currentUser.features?.amazon_search || 1; // Prevent division by zero
  
  const supplierQuota = currentUser.searchQuota?.supplier_discovery || 0;
  const supplierLimit = currentUser.features?.supplier_discovery || 1;

  // Calculate progress (Assuming quota is remaining and features is the base limit)
  // If quota > limit, it means they have add-ons, so we show 100% or relative to total.
  // For now, let's just show it as a percentage of the base limit.
  const amazonProgress = (amazonQuota / amazonLimit) * 100;
  const supplierProgress = (supplierQuota / supplierLimit) * 100;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsightCard
          icon={<TrendingUp size={18} className="text-white" />}
          title="Product Searches"
          value={amazonQuota.toLocaleString()}
          progress={amazonProgress}
        />
        <InsightCard
          icon={<Briefcase size={18} className="text-white" />}
          title="Supplier Discoveries"
          value={supplierQuota.toLocaleString()}
          progress={supplierProgress}
        />
        <Link to="/addons" className="brand-card-bg rounded-[12px] p-8 flex flex-col items-center justify-center text-center h-[190px] insight-addon-bg cursor-pointer hover:opacity-80 transition-all">
          <div className="mb-4">
            <ShoppingCart size={36} className="text-white" />
          </div>
          <h4 className="text-white text-[16px] font-bold mb-1">Add-ons</h4>
          <p className="text-white/40 text-[13px]">Purchase Add Ons</p>
        </Link>
      </div>
    </section>
  );
};

export default UsageInsights;
