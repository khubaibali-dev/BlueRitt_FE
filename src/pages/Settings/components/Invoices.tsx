// src/pages/Settings/components/Invoices.tsx
import React, { useState } from "react";
import { Receipt, Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";

const Invoices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for UI demonstration
  const invoices = [
    { id: 1, card: "Visa **** 4242", date: "16 Jan 2026", amount: "$39.00", description: "Advance Plan - Monthly", status: "Paid" },
    // more mock data could go here
  ];

  return (
    <CollapsibleCard
      title="Invoices"
      subtitle="Track your billing history and payments"
      defaultOpen={false}
      icon={<Receipt size={24} className="text-white" />}
    >
      <div className="flex flex-col gap-6">
        {/* Next Payment Info */}
        <div className="flex flex-col gap-1">
          <span className="text-[13px] text-slate-400 font-medium">Your next payment will be on</span>
          <h4 className="text-[20px] font-bold text-white uppercase tracking-wider">N/A</h4>
        </div>

        {/* Search Bar */}
        <div className="max-w-[300px] relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#081421] border border-[#082656] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-sans"
          />
        </div>

        {/* Invoices Table */}
        <div className="mt-4 overflow-x-auto rounded-xl border border-[#082656] bg-[#030F23]/40">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#081421] border-b border-[#082656]">
                <th className="px-6 py-4 text-[13px] font-semibold text-slate-300 tracking-wide uppercase">
                  <div className="flex items-center gap-2">Card <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-slate-300 tracking-wide uppercase">
                  <div className="flex items-center gap-2">Invoice Date <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-slate-300 tracking-wide uppercase">
                  <div className="flex items-center gap-2">Amount <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-slate-300 tracking-wide uppercase">
                  <div className="flex items-center gap-2">Description <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-slate-300 tracking-wide uppercase">
                  <div className="flex items-center gap-2">Status <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="px-6 py-4 text-[13px] font-semibold text-slate-300 tracking-wide uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#082656]">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                    No invoices found
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-[14px] text-white font-medium">{invoice.card}</td>
                    <td className="px-6 py-4 text-[14px] text-slate-300">{invoice.date}</td>
                    <td className="px-6 py-4 text-[14px] text-white font-semibold">{invoice.amount}</td>
                    <td className="px-6 py-4 text-[14px] text-slate-300">{invoice.description}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[12px] font-bold uppercase tracking-wider border border-green-500/20">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 text-[14px] font-semibold transition-colors">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <span className="text-[13px] text-slate-500">1 of 0 pages</span>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-[#081421] border border-[#082656] text-slate-400 rounded-lg text-[13px] font-medium hover:bg-white/5 transition-colors flex items-center gap-1 opacity-50 cursor-not-allowed">
              <ChevronLeft size={16} /> Prev
            </button>
            <button className="w-10 h-10 bg-[#081421] border border-blue-500/50 text-white rounded-lg text-[13px] font-bold">
              1
            </button>
            <button className="px-4 py-2 bg-[#081421] border border-[#082656] text-slate-300 rounded-lg text-[13px] font-medium hover:bg-white/5 transition-colors flex items-center gap-1 overflow-hidden">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default Invoices;
