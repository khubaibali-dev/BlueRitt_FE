import React from "react";
import { TrendingUp, Briefcase, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useUserDetails } from "../../../../hooks/useUserDetails";

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  progress: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ icon, title, value, progress }) => (
  <div className="insight-card group">
    <div className="quick-action-icon-circle w-[40px] h-[40px] shrink-0 flex items-center justify-center text-brand-primary dark:text-white group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-brand-textSecondary dark:text-white text-[16px] font-semibold tracking-wide mb-1 ">{title}</p>
      <h4 className="text-brand-textPrimary text-[24px] font-bold tracking-tight">{value}</h4>
    </div>

    <div className="w-full flex items-center gap-3">
      <div className="h-1.5 flex-1 bg-brand-border rounded-full overflow-hidden">
        <div
          className="insight-progress-bar"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <span className="text-brand-textSecondary text-[11px] font-medium whitespace-nowrap">{Math.min(100, Math.round(progress))}%</span>
    </div>
  </div>
);

const UsageInsights: React.FC = () => {
  const { currentUser } = useAuth();
  const { data: userDetails } = useUserDetails();

  // Prefer userDetails from hook as it's more likely to be fresh
  const searchQuota = userDetails?.search_quota || currentUser.searchQuota;
  const features = userDetails?.features || currentUser.features;

  const amazonQuota = searchQuota?.amazon_search || 0;
  const amazonLimit = features?.amazon_search || 1;

  const supplierQuota = searchQuota?.supplier_discovery || 0;
  const supplierLimit = features?.supplier_discovery || 1;

  const amazonProgress = (amazonQuota / amazonLimit) * 100;
  const supplierProgress = (supplierQuota / supplierLimit) * 100;

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <InsightCard
          icon={<TrendingUp size={20} strokeWidth={2} />}
          title="Product Searches"
          value={amazonQuota.toLocaleString()}
          progress={amazonProgress}
        />
        <InsightCard
          icon={<Briefcase size={20} strokeWidth={2} />}
          title="Supplier Discoveries"
          value={supplierQuota.toLocaleString()}
          progress={supplierProgress}
        />
        <Link to="/addons" className="insight-card group flex flex-col items-center justify-center text-center !gap-3 cursor-pointer transition-all min-h-[155px] dark:insight-addon-bg bg-white ">
          <div className="mb-2">
            <ShoppingCart size={32} className="text-brand-primary dark:text-white" />
          </div>
          <h4 className="text-brand-textPrimary dark:text-brand-textPrimary text-[18px] font-bold">Add-ons</h4>
          <p className="text-brand-textSecondary dark:text-brand-textSecondary text-[13px]">Purchase Add Ons</p>
        </Link>
      </div>
    </section>
  );
};

export default UsageInsights;
