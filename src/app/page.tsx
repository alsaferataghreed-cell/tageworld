"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import LinkCard from "@/components/LinkCard";
import Toast from "@/components/Toast";
import { LINKS_DATA, CategoryTab } from "@/data/links";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  RefreshCw,
  SearchX,
} from "lucide-react";

export default function HomePage() {
  const [memberId, setMemberId] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryTab["id"]>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved member ID on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tag_member_id");
      if (saved) {
        setMemberId(saved);
      }
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const focusMemberInput = useCallback(() => {
    if (typeof window === "undefined") return;
    const input = document.getElementById("member-id-input");
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      const form = document.getElementById("member-form");
      if (form) {
        form.classList.add("ring-4", "ring-amber-400/50", "border-amber-500", "scale-[1.02]");
        setTimeout(() => {
          form.classList.remove("ring-4", "ring-amber-400/50", "border-amber-500", "scale-[1.02]");
        }, 1800);
      }
    }
  }, []);

  // Filter links by category and search query
  const filteredLinks = useMemo(() => {
    return LINKS_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(q) || false;
        const matchesDomain = item.domain.toLowerCase().includes(q);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
        const matchesUrl = item.url.toLowerCase().includes(q);
        return matchesTitle || matchesSubtitle || matchesDomain || matchesCategory || matchesUrl;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Header with Smart Membership Injector */}
      <Header memberId={memberId} setMemberId={setMemberId} onToast={showToast} />

      {/* Hero Notice Bar */}
      <section className="bg-white border-b border-slate-200/70 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-navy-50 text-[#0F2557] border border-navy-100 mb-2">
                <Zap className="w-3.5 h-3.5 text-[#0F2557]" />
                <span>دليل تفاعلي مباشر</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
                روابط وخدمات eWorld و DXN الرسمية
              </h2>
              <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                تصفح جميع روابط المنتجات والأنظمة مع إمكانية فتح أي رابط مباشرة، أو نسخه صافياً، أو نسخه مع العنوان والوصف للمشاركة السريعة.
              </p>
            </div>

            {/* Smart ID Status Badge */}
            <div
              onClick={focusMemberInput}
              className="bg-[#F8FAFC] border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 flex items-center gap-3.5 flex-shrink-0 shadow-2xs cursor-pointer transition-all duration-200 hover:shadow-subtle"
              title="انقر لتعديل أو إدخال رقم العضوية"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  memberId
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200"
                }`}
              >
                {memberId ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Sparkles className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <div className="text-xs font-semibold text-[#0A192F]">
                  {memberId ? "رقم العضوية مفعّل" : "نظام العضوية الذكي"}
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {memberId ? `المعرف: ${memberId}` : "أدخل رقم عضويتك لتخصيص روابط الرعاية"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Category Filters & Search */}
        <div className="mb-8">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            totalFiltered={filteredLinks.length}
          />
        </div>

        {/* Links Grid */}
        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredLinks.map((item) => (
              <LinkCard
                key={item.id}
                item={item}
                memberId={memberId}
                onToast={showToast}
                onFocusMemberInput={focusMemberInput}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-subtle my-12">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#0A192F] mb-1">
              لم نتمكن من إيجاد أي رابط مطابق
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              تأكد من كتابة الكلمات بشكل صحيح أو حاول البحث بتصنيف آخر أو مسح كلمة البحث الحالية.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="inline-flex items-center gap-2 bg-[#0F2557] hover:bg-[#0A192F] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة تعيين البحث والتصنيفات</span>
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0A192F]">TAG eWorld</span>
              <span>—</span>
              <span>منظومة الروابط والخدمات الرقمية السريعة</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span>{LINKS_DATA.length} رابط رسمي</span>
              <span>•</span>
              <span>تحديث تلقائي لرقم العضوية</span>
              <span>•</span>
              <span>حفظ محلي آمن</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
