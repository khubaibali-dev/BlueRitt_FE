import React, { useState } from "react";
import { History, Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery } from "@tanstack/react-query";
import { getBalanceHistory, getWalletBalance } from "../../../api/pricing";

const AddonsBalanceHistory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: walletBalance, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: getWalletBalance,
    enabled: isOpen,
  });

  const { data: transactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: getBalanceHistory,
    enabled: isOpen,
  });

  const filteredTransactions = (transactions || []).filter((tx: any) => 
    tx.payment_method?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.created_at?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CollapsibleCard
      title="Addons Balance History"
      subtitle="Track your addon purchases and balance history"
      isOpen={isOpen}
      onToggle={setIsOpen}
      icon={<History size={24} className="text-white" />}
    >
      <div className="flex flex-col gap-6">
        {/* Remaining Balance Info */}
        <div className="flex flex-col gap-1">
          <span className="invoice-next-payment-label">Remaining balance</span>
          <h4 className="invoice-next-payment-date">
            {isBalanceLoading ? "..." : `$${walletBalance?.fund ? Number(walletBalance.fund).toFixed(2) : "0.00"}`}
          </h4>
        </div>

        {/* Search Bar */}
        <div className="invoice-search-container">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search balance history"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="invoice-search-input"
          />
        </div>

        {/* Balance History Table */}
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Transaction Type <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Amount <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Description <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Status <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Transaction Date <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#082656]">
              {isTransactionsLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                    Loading history...
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                    No history found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="invoice-table-td text-white font-medium">
                      {tx.type || tx.payment_method || "Purchase"}
                    </td>
                    <td className="invoice-table-td text-white font-semibold">
                      ${tx.amount}
                    </td>
                    <td className="invoice-table-td text-slate-300">{tx.description}</td>
                    <td className="invoice-table-td">
                      <span className="invoice-status-badge-paid">
                        {tx.status}
                      </span>
                    </td>
                    <td className="invoice-table-td text-slate-300">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <span className="text-[13px] text-slate-500">1 of 1 pages</span>
          <div className="flex items-center gap-2">
            <button className="invoice-pagination-btn opacity-50 cursor-not-allowed">
              <ChevronLeft size={16} /> Prev
            </button>
            <button className="invoice-pagination-btn-active">
              1
            </button>
            <button className="invoice-pagination-btn opacity-50 cursor-not-allowed">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </CollapsibleCard>
  );
};

export default AddonsBalanceHistory;
