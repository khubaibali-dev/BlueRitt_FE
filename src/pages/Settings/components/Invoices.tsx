import React, { useState } from "react";
import { Receipt, Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionInvoices, fetchAccountSummary } from "../../../api/pricing";

interface InvoicesProps {
  defaultOpen?: boolean;
}

const Invoices: React.FC<InvoicesProps> = ({ defaultOpen = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { data: summary, isLoading: isSummaryLoading } = useQuery({
    queryKey: ['subscription', 'account_summary'],
    queryFn: async () => {
      const response = await fetchAccountSummary();
      return response.data;
    },
    enabled: isOpen,
  });

  const { data: invoices = [], isLoading: isInvoicesLoading } = useQuery({
    queryKey: ['subscription', 'invoices'],
    queryFn: getSubscriptionInvoices,
    enabled: isOpen,
  });

  const filteredInvoices = invoices.filter((invoice: any) => 
    invoice.card.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.invoiceDate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CollapsibleCard
      title="Invoices"
      subtitle="Track your billing history and payments"
      isOpen={isOpen}
      onToggle={setIsOpen}
      icon={<Receipt size={24} className="text-white" />}
    >
      <div className="flex flex-col gap-6">
        {/* Next Payment Info */}
        <div className="flex flex-col gap-1">
          <span className="invoice-next-payment-label">Your next payment will be on</span>
          <h4 className="invoice-next-payment-date">
            {isSummaryLoading ? "..." : (summary?.dueDate || "N/A")}
          </h4>
        </div>

        {/* Search Bar */}
        <div className="invoice-search-container">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="invoice-search-input"
          />
        </div>

        {/* Invoices Table */}
        <div className="invoice-table-wrapper">
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Card <ArrowUpDown size={14} className="text-slate-500" /></div>
                </th>
                <th className="invoice-table-th">
                  <div className="flex items-center gap-2">Invoice Date <ArrowUpDown size={14} className="text-slate-500" /></div>
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
                <th className="invoice-table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {isInvoicesLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                    Loading invoices...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                    No invoices found
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                    <td className="invoice-table-td text-white font-medium">{invoice.card}</td>
                    <td className="invoice-table-td text-slate-300">{invoice.invoiceDate}</td>
                    <td className="invoice-table-td text-white font-semibold">{invoice.amount}</td>
                    <td className="invoice-table-td text-slate-300">{invoice.description}</td>
                    <td className="invoice-table-td">
                      <span className="invoice-status-badge-paid">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="invoice-table-td text-right">
                      <a 
                        href={invoice.viewInvoicePdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="invoice-action-link"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

export default Invoices;
