"use client";

import React from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CATEGORIES, CategoryTab } from "@/data/links";

interface CategoryFilterProps {
  activeCategory: CategoryTab["id"];
  setActiveCategory: (cat: CategoryTab["id"]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalFiltered: number;
}

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  totalFiltered,
}: CategoryFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 select-none ${
                  isActive
                    ? "bg-[#0A192F] text-white shadow-sm ring-2 ring-[#0A192F]/20"
                    : "bg-white text-slate-600 hover:text-[#0A192F] hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو الرابط أو التصنيف..."
            className="w-full bg-white pr-10 pl-9 py-2.5 rounded-full border border-slate-200/90 text-xs sm:text-sm text-[#0A192F] placeholder:text-slate-400 shadow-2xs focus:outline-none focus:border-[#0F2557] focus:ring-2 focus:ring-[#0F2557]/10 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
              title="مسح البحث"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Results status when searching */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            نتائج البحث عن: <strong className="text-slate-800 font-semibold">{searchQuery}</strong>
          </span>
          <span className="font-mono">
            {totalFiltered} {totalFiltered === 1 ? "رابط متوفر" : "روابط متوفرة"}
          </span>
        </div>
      )}
    </div>
  );
}
