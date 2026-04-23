import React, { useState } from "react";
import { History, Search, ArrowUpDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery } from "@tanstack/react-query";
import { getBalanceHistory, fetchAccountSummary } from "../../../api/pricing";

interface AddonsBalanceHistoryProps {
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

const AddonsBalanceHistory: React.FC<AddonsBalanceHistoryProps> = ({ defaultOpen = false, scrollIntoViewOnOpen = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [sortField, setSortField] = useState<string | null>("created_at");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const { data: walletBalance, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: fetchAccountSummary,
    enabled: isOpen,
  });

  const displayBalance = walletBalance?.data?.remainingBalance || "$0.00";

  const { data: transactions = [], isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: getBalanceHistory,
    enabled: isOpen,
  });

  const filteredTransactions = (transactions || []).filter((tx: any) => {
    const searchLower = searchQuery.toLowerCase();
    const dateStr = tx.created_at ? new Date(tx.created_at).toLocaleDateString().toLowerCase() : "";
    const typeStr = (tx.type || tx.payment_method || "Purchase").toLowerCase();
    const amountStr = tx.amount?.toString().toLowerCase() || "";
    const descStr = tx.description?.toLowerCase() || "";
    const statusStr = tx.status?.toLowerCase() || "";

    return (
      typeStr.includes(searchLower) ||
      amountStr.includes(searchLower) ||
      descStr.includes(searchLower) ||
      statusStr.includes(searchLower) ||
      dateStr.includes(searchLower)
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a: any, b: any) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle date sorting
    if (sortField === "created_at") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Handle numeric values
    if (sortField === "amount") {
      aValue = parseFloat(aValue.toString());
      bValue = parseFloat(bValue.toString());
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return sortDirection === "asc" ? (
      <ArrowUpDown size={14} className="text-brand-primary" />
    ) : (
      <ArrowUpDown size={14} className="text-brand-primary rotate-180 transition-transform" />
    );
  };

  // Transaction sorting and list
  // const totalItems = sortedTransactions.length;

  return (
    <CollapsibleCard
      title="Addons Balance History"
      subtitle="Track your addon purchases and balance history"
      isOpen={isOpen}
      onToggle={setIsOpen}
      scrollIntoViewOnOpen={scrollIntoViewOnOpen}
      icon={<History size={24} className="text-white" />}
    >
      <div className="flex flex-col gap-6">
        {/* Remaining Balance Info */}
        <div className="flex flex-col gap-1">
          <span className="invoice-next-payment-label">Remaining balance</span>
          <h4 className="invoice-next-payment-date">
            {isBalanceLoading ? "..." : displayBalance}
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
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("type")}>
                  <div className="flex items-center gap-2">Transaction Type {getSortIcon("type")}</div>
                </th>
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("amount")}>
                  <div className="flex items-center gap-2">Amount {getSortIcon("amount")}</div>
                </th>
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("description")}>
                  <div className="flex items-center gap-2">Description {getSortIcon("description")}</div>
                </th>
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("status")}>
                  <div className="flex items-center gap-2">Status {getSortIcon("status")}</div>
                </th>
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("created_at")}>
                  <div className="flex items-center gap-2">Transaction Date {getSortIcon("created_at")}</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {isTransactionsLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                    Loading history...
                  </td>
                </tr>
              ) : sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                    No history found
                  </td>
                </tr>
              ) : (
                sortedTransactions.map((tx: any) => (
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
                      {new Date(tx.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Item Counter */}

      </div>
    </CollapsibleCard>
  );
};

export default AddonsBalanceHistory;
