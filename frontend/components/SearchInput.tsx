"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Find your shoes...",
  disabled = false,
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-xl mx-auto group">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full glass-strong rounded-2xl pl-5 pr-12 py-4 text-teal-900 placeholder:text-teal-600/60 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400/60 transition-all duration-300 disabled:opacity-60 border border-white/60"
        aria-label="Search items"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-teal-600/80 group-focus-within:text-teal-700 transition-colors">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
}
