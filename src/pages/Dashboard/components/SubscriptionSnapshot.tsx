import { ShieldCheck } from "lucide-react";

const SubscriptionSnapshot = () => (
  <div className="snapshot-card">
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="snapshot-plan-label">Current Plan</p>
        <h4 className="snapshot-plan-name">Advance</h4>
        <p className="snapshot-price">$39 <span className="text-sm font-normal opacity-60">/ Monthly</span></p>
      </div>
      <span className="snapshot-status-badge">
        <ShieldCheck size={14} /> Active
      </span>
    </div>

    <div className="snapshot-grid">
      {[
        { label: "Next Payment", date: "16 Mar 2026" },
        { label: "Add-on Balance", date: "$85.00" },
        { label: "Start Date", date: "16 Feb 2026" },
        { label: "End Date", date: "16 Mar 2026" },
      ].map((item, i) => (
        <div key={i} className="snapshot-item">
          <p className="text-[14px] text-white/50 mb-1 font-medium">{item.label}</p>
          <p className="text-sm font-semibold text-white">{item.date}</p>
        </div>
      ))}
    </div>
  </div>
);

export default SubscriptionSnapshot;
