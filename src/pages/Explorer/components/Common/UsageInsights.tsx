import React from "react";
import { TrendingUp, Briefcase, ShoppingCart, Crown } from "lucide-react";

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
        <p className="text-white text-[15px] font-medium tracking-wide mb-1 lowercase">{title}</p>
        <h4 className="text-white text-3xl font-bold tracking-tight">{value}</h4>
      </div>
    </div>

    <div className="w-full">
      <div className="flex justify-end mb-2">
        <span className="text-white/40 text-[11px] font-medium">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="insight-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

const UsageInsights: React.FC = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white text-[20px] font-semibold tracking-[0.05em]">Usage Insights</h3>
        <button className="upgrade-plan-btn">
          <Crown size={18} />
          UPGRADE YOUR PLAN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <InsightCard
          icon={<TrendingUp size={18} className="text-white" />}
          title="Product Searches"
          value="260"
          progress={75}
        />
        <InsightCard
          icon={<Briefcase size={18} className="text-white" />}
          title="Supplier Discoveries"
          value="612"
          progress={75}
        />
        <div className="brand-card-bg rounded-[12px] p-8 flex flex-col items-center justify-center text-center h-[220px] insight-addon-bg">

          <div className="mb-4">
            <ShoppingCart size={42} className="text-white/20" />
          </div>

          <h4 className="text-white text-lg font-semibold mb-1">Add-ons</h4>
          <p className="text-white/40 text-[13px]">Purchase Add Ons</p>
        </div>
      </div>
    </section>
  );
};

export default UsageInsights;
