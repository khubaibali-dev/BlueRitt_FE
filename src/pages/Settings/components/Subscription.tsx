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
        <div className="flex items-center justify-between pl-2">
          <button className="flex items-center gap-2 text-[13px] font-semibold text-white hover:text-slate-300 transition-colors">
            <RefreshCw size={14} className="opacity-80" />
            Refresh Data
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-slate-400">
              Your balance: <span className="font-bold text-white">$85.00</span>
            </span>
            <button className="px-5 py-2 rounded-full bg-brand-gradient hover:brightness-110 active:scale-95 text-white text-[13px] font-semibold transition-all shadow-lg shadow-orange-500/20">
              Fill Balance
            </button>
          </div>
        </div>

        {/* Details Block */}
        <div className="bg-[#030B1C]/50 rounded-[12px] p-6 pb-8 flex flex-col">
          {/* Row 1 */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]/40 mb-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] text-slate-400">Current Plan: <span className="font-bold text-white">Advance</span></span>
              <button className="text-[#F05A2B] text-[13px] font-bold hover:underline text-left">Update Your Plan</button>
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              <span className="text-[14px] text-slate-400">Due on <span className="font-bold text-white">16 Apr 2026</span></span>
              <span className="text-[13px] text-slate-300">Monthly</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]/40 mb-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] text-slate-400">Last Filled Amount</span>
              <button className="text-[#F05A2B] text-[13px] font-bold hover:underline text-left">Balance History</button>
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              <span className="text-[14px] font-bold text-white">$39.00</span>
              <span className="text-[13px] text-slate-300">16 Feb 2026</span>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]/40 mb-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[14px] text-slate-400">Last Payment Cleared At</span>
              <button className="text-[#F05A2B] text-[13px] font-bold hover:underline text-left">Payment History</button>
            </div>
            <div className="flex flex-col gap-1.5 items-end justify-center">
              <span className="text-[13px] text-slate-300 mt-1">16 Feb 2026</span>
            </div>
          </div>

          {/* Row 4 and Bottom text */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-medium text-white">Renew Automatically</span>
                <span className="text-[13px] text-slate-400">Your subscription will renew automatically</span>
              </div>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`
                  relative w-[48px] h-[26px] rounded-full transition-colors duration-200 outline-none
                  ${autoRenew ? "bg-[#3B82F6]" : "bg-slate-700"}
                `}
              >
                <div
                  className={`
                    absolute top-[3px] left-[3px] w-[20px] h-[20px] bg-white rounded-full shadow-md transform transition-transform duration-200
                    ${autoRenew ? "translate-x-[22px]" : "translate-x-0"}
                  `}
                />
              </button>
            </div>

            <p className="text-[13px] text-slate-300 leading-relaxed pr-8">
              Your subscription remains active and is scheduled for cancellation at the end of the current billing period. You will retain full access until 16 Apr 2026.
            </p>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default Subscription;
