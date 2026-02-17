"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationInfo } from "@/lib/api";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function Pagination({ pagination, onPageChange, isLoading = false }: PaginationProps) {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages < 1) return null;

  const getPageNumbers = (): number[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: number[] = [];
    if (page <= 3) {
      for (let i = 1; i <= Math.min(4, totalPages); i++) pages.push(i);
      if (totalPages > 4) pages.push(totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1);
      for (let i = totalPages - 3; i <= totalPages; i++) if (i > 1) pages.push(i);
    } else {
      pages.push(1);
      for (let i = page - 1; i <= page + 1; i++) pages.push(i);
      pages.push(totalPages);
    }
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  return (
    <nav
      className="inline-flex items-center gap-1 glass rounded-xl p-1.5"
      aria-label="Pagination"
    >
      <button
        onClick={() => hasPrevPage && onPageChange(page - 1)}
        disabled={!hasPrevPage || isLoading}
        className="rounded-lg p-2.5 text-teal-800 hover:bg-white/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-0.5">
        {getPageNumbers().map((pageNum) => {
          const isActive = pageNum === page;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={isLoading}
              className={`min-w-[40px] h-10 rounded-lg px-3 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-white/80 text-teal-900 shadow-sm border border-white/80"
                  : "text-teal-700 hover:bg-white/50"
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => hasNextPage && onPageChange(page + 1)}
        disabled={!hasNextPage || isLoading}
        className="rounded-lg p-2.5 text-teal-800 hover:bg-white/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
