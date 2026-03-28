import { Zap, BarChart3, Share2, FolderOpen } from "lucide-react";

const QuickActions = () => (
  <section className="mb-12">
    <div className="mb-6">
      <h3 className="dashboard-section-title">Quick Actions</h3>
      <p className="dashboard-section-subtitle">Essential tools and features</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_0.92fr_0.92fr_0.92fr] gap-3">
      {[
        { icon: Zap, label: "IntelliScan", desc: "Explore popular products", color: "text-[#3B82F6]" },
        { icon: BarChart3, label: "MarginMax", desc: "Calculate profits", color: "text-[#F05A2B]" },
        { icon: Share2, label: "SocialPulse", desc: "Track hashtags", color: "text-[#EF4444]" },
        { icon: FolderOpen, label: "ProductVault", desc: "Saved products", color: "text-[#9333EA]" },
      ].map((action, i) => (
        <div key={i} className="quick-action-card group">
          <div className="quick-action-icon-circle w-[40px] h-[40px] shrink-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            <action.icon size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[16px] font-semibold text-[#FFFFFF] mb-0.5 truncate">{action.label}</p>
            <p className="dashboard-section-subtitle whitespace-nowrap">{action.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default QuickActions;
