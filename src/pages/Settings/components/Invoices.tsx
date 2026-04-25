import React, { useState } from "react";
import { Receipt, Search, ArrowUpDown, Download, Mail, Eye, Loader2 } from "lucide-react";
import CollapsibleCard from "../../../components/common/cards/CollapsibleCard";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionInvoices, fetchAccountSummary, emailInvoice } from "../../../api/pricing";
import { useToast } from "../../../components/common/Toast/ToastContext";

interface InvoicesProps {
  defaultOpen?: boolean;
  scrollIntoViewOnOpen?: boolean;
}

const Invoices: React.FC<InvoicesProps> = ({ defaultOpen = false, scrollIntoViewOnOpen = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [sortField, setSortField] = useState<string | null>("invoiceDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [emailingInvoiceIds, setEmailingInvoiceIds] = useState<string[]>([]);
  const toast = useToast();

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

  const filteredInvoices = (invoices || []).filter((invoice: any) => {
    const searchLower = searchQuery.toLowerCase();
    const cardStr = invoice.card?.toLowerCase() || "";
    const dateStr = invoice.invoiceDate?.toLowerCase() || "";
    const amountStr = invoice.amount?.toLowerCase() || "";
    const descStr = invoice.description?.toLowerCase() || "";
    const statusStr = invoice.status?.toLowerCase() || "";

    return (
      cardStr.includes(searchLower) ||
      dateStr.includes(searchLower) ||
      amountStr.includes(searchLower) ||
      descStr.includes(searchLower) ||
      statusStr.includes(searchLower)
    );
  });

  const sortedInvoices = [...filteredInvoices].sort((a: any, b: any) => {
    if (!sortField) return 0;

    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle date sorting
    if (sortField === "invoiceDate") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    // Handle numeric strings (amount)
    if (sortField === "amount") {
      aValue = parseFloat(aValue.replace(/[^0-9.-]+/g, ""));
      bValue = parseFloat(bValue.replace(/[^0-9.-]+/g, ""));
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

  const handleEmailInvoice = async (invoiceId: string) => {
    try {
      setEmailingInvoiceIds((prev: any) => [...prev, invoiceId]);
      await emailInvoice(invoiceId);
      toast.success("Invoice sent to your email!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send email");
    } finally {
      setEmailingInvoiceIds((prev: any) => prev.filter((id: string) => id !== invoiceId));
    }
  };

  // Sorting and list logic

  return (
    <CollapsibleCard
      title="Invoices"
      subtitle="Track your billing history and payments"
      isOpen={isOpen}
      onToggle={setIsOpen}
      scrollIntoViewOnOpen={scrollIntoViewOnOpen}
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
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("card")}>
                  <div className="flex items-center gap-2">Card {getSortIcon("card")}</div>
                </th>
                <th className="invoice-table-th cursor-pointer group" onClick={() => handleSort("invoiceDate")}>
                  <div className="flex items-center gap-2">Invoice Date {getSortIcon("invoiceDate")}</div>
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
              ) : sortedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                    No invoices found
                  </td>
                </tr>
              ) : (
                sortedInvoices.map((invoice: any) => (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                    <td className="invoice-table-td text-white font-medium">{invoice.card}</td>
                    <td className="invoice-table-td text-slate-300">
                      {new Date(invoice.invoiceDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="invoice-table-td text-white font-semibold">{invoice.amount}</td>
                    <td className="invoice-table-td text-slate-300">{invoice.description}</td>
                    <td className="invoice-table-td">
                      <span className="invoice-status-badge-paid">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="invoice-table-td text-right">
                      <div className="flex items-center justify-end gap-2 text-slate-400">
                        <a
                          href={invoice.viewInvoicePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-white/10  rounded-lg transition-all"
                          title="View PDF"
                        >
                          <Eye size={16} />
                        </a>
                        <a
                          href={invoice.downloadInvoicePdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-white/10  rounded-lg transition-all"
                          title="Download PDF"
                        >
                          <Download size={16} />
                        </a>
                        <button
                          onClick={() => handleEmailInvoice(invoice.id)}
                          disabled={emailingInvoiceIds.includes(invoice.id)}
                          className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-all disabled:opacity-50"
                          title="Email Invoice"
                        >
                          {emailingInvoiceIds.includes(invoice.id) ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Mail size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


      </div>
    </CollapsibleCard >
  );
};

export default Invoices;
