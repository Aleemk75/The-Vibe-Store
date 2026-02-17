"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchItems, type Item, type PaginationInfo } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchInput } from "@/components/SearchInput";
import { ItemCard } from "@/components/ItemCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { Pagination } from "@/components/Pagination";

const DEBOUNCE_MS = 300;
const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, DEBOUNCE_MS);

  const loadItems = useCallback(async (term?: string, page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchItems({
        search: term,
        page,
        limit: ITEMS_PER_PAGE,
      });
      setItems(response.items);
      setPagination(response.pagination);
    } catch {
      setError("Failed to load items. Check that the API is running.");
      setItems([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    loadItems(debouncedSearch || undefined, 1);
  }, [debouncedSearch, loadItems]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    loadItems(debouncedSearch || undefined, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [debouncedSearch, loadItems]);

  return (
    <main className="min-h-screen gradient-mesh relative">
      {/* Outer container – wireframe style with rounded glass panel */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="glass rounded-3xl p-6 sm:p-8 md:p-10 min-h-[70vh] flex flex-col">
          {/* Top: centered search only */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Find your shoes..."
              disabled={loading}
            />
          </div>

          {pagination && !loading && items.length > 0 && (
            <div className="text-center mb-4 text-white/80 text-sm">
              Showing {items.length} of {pagination.totalItems} items
            </div>
          )}

          {/* Middle: product grid (4 cols on lg, 2 on sm, 1 on mobile) */}
          <section className="flex-1 min-h-[320px]">
            {loading && <LoadingSpinner />}
            {!loading && error && (
              <ErrorState
                message={error}
                onRetry={() => loadItems(debouncedSearch || undefined, currentPage)}
              />
            )}
            {!loading && !error && items.length === 0 && (
              <EmptyState message="No items found. Try adjusting your search." />
            )}
            {!loading && !error && items.length > 0 && (
              <>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 animate-fade-in">
                  {items.map((item, i) => (
                    <li
                      key={item.id}
                      style={{ animationDelay: `${i * 40}ms` }}
                      className="animate-scale-in"
                    >
                      <ItemCard item={item} />
                    </li>
                  ))}
                </ul>

                {/* Bottom: pagination aligned right (wireframe) */}
                {pagination && (
                  <div className="mt-10 flex justify-end">
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                      isLoading={loading}
                    />
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
      <footer className="text-center text-white/80 text-sm">
        <p>© 2026 The Shoe Store | Vibe Coded by Aleem</p>
      </footer>
    </main>
  );
}
