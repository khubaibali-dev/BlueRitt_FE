import React, { useState } from "react";
import { Crown, RefreshCw } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";

const Subscription: React.FC = () => {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <CollapsibleCard
      title="Subscription"
      subtitle="Manage your subscription and billing"
      defaultOpen={true}
      icon={
        <div className="relative flex items-center justify-center">
          <Crown size={24} className="text-white relative z-10" />
        </div>
      }
    >
      <div className="flex flex-col gap-6 w-full pb-2">
        {/* Top Action Row */}
        {/* Top Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
          <button className="flex items-center gap-2 text-[13px] font-semibold text-white hover:text-slate-300 transition-colors self-start">
            <RefreshCw size={14} className="opacity-80" />
            Refresh Data
          </button>
          
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto bg-[#030B1C]/30 sm:bg-transparent p-3 sm:p-0 rounded-[12px]">
            <div className="flex flex-col sm:items-end">
              <span className="text-[12px] sm:text-[14px] text-slate-400">Your balance:</span>
              <span className="font-bold text-white text-[16px] sm:text-[18px]">$85.00</span>
            </div>
            <button className="px-5 py-2.5 rounded-full bg-brand-gradient hover:brightness-110 active:scale-95 text-white text-[13px] font-semibold transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap">
              Fill Balance
            </button>
          </div>
        </div>

        {/* Details Block */}
        <div className="bg-[#030B1C]/50 rounded-[12px] p-4 sm:p-6 pb-8 flex flex-col">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-[#1E293B]/40 mb-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] text-slate-400 uppercase tracking-wider font-semibold opacity-70">Current Plan</span>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[16px]">Advance</span>
                <button className="text-[#F05A2B] text-[13px] font-bold hover:underline text-left mt-0.5">Update Your Plan</button>
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-1.5 items-baseline sm:items-end">
              <span className="text-[14px] text-slate-400">Due on <span className="font-bold text-white">16 Apr 2026</span></span>
              <div className="px-2 py-0.5 bg-[#F05A2B]/10 rounded border border-[#F05A2B]/20">
                <span className="text-[11px] font-bold text-[#F05A2B] uppercase tracking-tighter">Monthly</span>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-[#1E293B]/40 mb-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] text-slate-400 uppercase tracking-wider font-semibold opacity-70">Last Filled Amount</span>
              <div className="flex flex-col">
                <span className="font-bold text-white text-[16px]">$39.00</span>
                <button className="text-[#F05A2B] text-[13px] font-bold hover:underline text-left mt-0.5">Balance History</button>
              </div>
            </div>
            <div className="flex items-center sm:items-end">
              <span className="text-[13px] text-slate-300">16 Feb 2026</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-[#1E293B]/40 mb-6 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] text-slate-400 uppercase tracking-wider font-semibold opacity-70">Last Payment Cleared At</span>
              <div className="flex flex-col">
                <button className="text-[#F05A2B] text-[13px] font-bold hover:underline text-left">Payment History</button>
              </div>
            </div>
            <div className="flex items-center sm:items-end">
              <span className="text-[13px] text-slate-300 font-medium">16 Feb 2026</span>
            </div>
          </div>

          {/* Row 4 and Bottom text */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-white">Renew Automatically</span>
                <span className="text-[13px] text-slate-400 leading-tight">Your subscription will renew automatically every billing cycle.</span>
              </div>
              <div className="flex items-center self-start sm:self-center">
                <button
                  onClick={() => setAutoRenew(!autoRenew)}
                  className={`
                    relative w-[52px] h-[28px] rounded-full transition-all duration-300 outline-none
                    ${autoRenew ? "bg-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-slate-700"}
                  `}
                >
                  <div
                    className={`
                      absolute top-[3px] left-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
                      ${autoRenew ? "translate-x-[24px]" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>
            </div>

            <p className="text-[13px] text-slate-300 leading-relaxed pr-2 sm:pr-8 border-l-2 border-[#F05A2B]/40 pl-4 py-1 bg-white/5 rounded-r-lg">
              Your subscription remains active and is scheduled for cancellation at the end of the current billing period. You will retain full access until 16 Apr 2026.
            </p>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default Subscription;
