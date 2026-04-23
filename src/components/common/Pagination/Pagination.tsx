import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ""
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const btnClass = "w-10 h-10 rounded-[12px] bg-brand-card dark:bg-[#04132B] border border-brand-inputBorder dark:border-brand-border flex items-center justify-center text-brand-textSecondary dark:text-white/70 hover:bg-brand-hover dark:hover:bg-[#082656] hover:text-brand-textPrimary dark:hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-sm";

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={btnClass}
        title="First Page"
      >
        <ChevronsLeft size={16} />
      </button>

      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={btnClass}
        title="Previous"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === "..."}
            className={`w-10 h-10 rounded-[12px] flex items-center justify-center text-[14px] font-bold transition-all
              ${page === currentPage
                ? "upgrade-gradient-btn !rounded-[10px] text-white shadow-[0_0_15px_rgba(240,90,43,0.3)]"
                : page === "..."
                  ? "text-brand-textSecondary/40 dark:text-white/40 cursor-default"
                  : "bg-brand-card dark:bg-[#04132B] border border-brand-inputBorder dark:border-brand-border text-brand-textSecondary dark:text-white/70 hover:bg-brand-hover dark:hover:bg-[#082656] hover:text-brand-textPrimary dark:hover:text-white shadow-sm"}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={btnClass}
        title="Next"
      >
        <ChevronRight size={16} />
      </button>

      {/* Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={btnClass}
        title="Last Page"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
