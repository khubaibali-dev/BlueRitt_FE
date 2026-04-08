import { Zap, Calculator, Hash, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: Zap, label: "IntelliScan", desc: "Explore popular products", color: "text-[#3B82F6]", path: "/explorer" },
    { icon: Calculator, label: "Margin Calculator", desc: "Calculate profits", color: "text-[#F05A2B]", path: "/profit-calculator" },
    { icon: Hash, label: "Social Pulse", desc: "Track hashtags", color: "text-[#EF4444]", path: "/tiktok-trends" },
    { icon: Package, label: "Product Vault", desc: "Saved products", color: "text-[#9333EA]", path: "/products" },
  ];

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h3 className="dashboard-section-title">Quick Actions</h3>
        <p className="dashboard-section-subtitle">Essential tools and features</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.92fr_0.92fr_0.92fr] gap-3">
        {actions.map((action, i) => (
          <div
            key={i}
            onClick={() => navigate(action.path)}
            className="quick-action-card group cursor-pointer hover:opacity-90 transition-all"
          >
            <div className="quick-action-icon-circle w-[40px] h-[40px] shrink-0 flex items-center justify-center text-brand-primary dark:text-white group-hover:scale-110 transition-transform duration-300">
              <action.icon size={20} strokeWidth={2} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[16px] font-semibold text-brand-textPrimary mb-0.5 truncate">{action.label}</p>
              <p className="dashboard-section-subtitle whitespace-nowrap">{action.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
