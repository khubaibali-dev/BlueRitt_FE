import { ShieldCheck } from "lucide-react";

const SubscriptionSnapshot = () => (
  <div className="snapshot-card">
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className="text-[11px] font-semibold text-white/60 tracking-widest mb-1">Current Plan</p>
        <h4 className="text-[22px] font-semibold text-white">Advance</h4>
        <p className="text-[24px] font-semibold text-white mt-1">$39 <span className="text-sm font-normal opacity-60">/ Monthly</span></p>
      </div>
      <span className="bg-[#FFFFFF1A] text-white text-[11px] px-3 py-1 rounded-full font-semibold backdrop-blur-md flex items-center gap-1.5 border border-white/10 text-[#34C759]">
        <ShieldCheck size={14} /> Active
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {[
        { label: "Next Payment", date: "16 Mar 2026", color: "bg-white/5" },
        { label: "Add-on Balance", date: "$85.00", color: "bg-white/5" },
        { label: "Start Date", date: "16 Feb 2026", color: "bg-white/5" },
        { label: "End Date", date: "16 Mar 2026", color: "bg-white/5" },
      ].map((item, i) => (
        <div key={i} className={`${item.color} rounded-2xl p-4 border border-white/5`}>
          <p className="text-[10px] text-white/50 mb-1 font-medium">{item.label}</p>
          <p className="text-sm font-semibold text-white">{item.date}</p>
        </div>
      ))}
    </div>

  </div>
);

export default SubscriptionSnapshot;
