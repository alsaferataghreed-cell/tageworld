"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, ShieldCheck, Sparkles, X, Globe } from "lucide-react";

interface HeaderProps {
  memberId: string;
  setMemberId: (id: string) => void;
  onToast: (msg: string) => void;
}

export default function Header({ memberId, setMemberId, onToast }: HeaderProps) {
  const [inputValue, setInputValue] = useState(memberId);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setInputValue(memberId);
  }, [memberId]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputValue.trim();
    setMemberId(clean);
    if (typeof window !== "undefined") {
      if (clean) {
        localStorage.setItem("tag_member_id", clean);
        onToast(`تم حفظ رقم العضوية (${clean}) بنجاح وتحديث كافة الروابط المخصصة`);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
      } else {
        localStorage.removeItem("tag_member_id");
        onToast("تم مسح رقم العضوية والرجوع للأرقام الافتراضية");
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
    setMemberId("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("tag_member_id");
      onToast("تم مسح رقم العضوية والرجوع للأرقام الافتراضية");
    }
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#0F2557] flex items-center justify-center text-white shadow-md shadow-[#0A192F]/10 flex-shrink-0">
              <Globe className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0A192F]">
                  TAG eWorld
                </h1>
                <span className="text-slate-300 font-light">|</span>
                <span className="text-sm sm:text-base font-semibold text-slate-700">
                  دليل الروابط السريعة
                </span>
                <span className="hidden sm:inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-navy-50 text-[#0F2557] border border-navy-100">
                  الإصدار المباشر
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 line-clamp-1">
                دليلك المباشر والموثوق لكافة روابط وخدمات ومنتجات DXN و eWorld الرسمية
              </p>
            </div>
          </div>

          {/* Smart Membership ID Bar */}
          <div className="w-full lg:w-auto">
            <form
              id="member-form"
              onSubmit={handleSave}
              className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-full border border-slate-200/90 shadow-sm focus-within:border-[#0F2557] focus-within:ring-2 focus-within:ring-[#0F2557]/10 transition-all duration-300"
            >
              <div className="flex items-center gap-2 pr-3 pl-1 text-slate-500">
                <UserCheck className="w-4 h-4 text-[#0F2557]" />
                <label htmlFor="member-id-input" className="text-xs font-medium text-slate-700 whitespace-nowrap hidden sm:inline cursor-pointer">
                  رقم العضوية:
                </label>
              </div>

              <div className="relative flex-1 min-w-[140px] sm:min-w-[180px]">
                <input
                  id="member-id-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="أدخل رقم عضويتك..."
                  className="w-full bg-transparent text-xs sm:text-sm text-[#0A192F] font-mono placeholder:text-slate-400 placeholder:font-sans focus:outline-none px-1"
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200/60 transition-colors"
                    title="مسح"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 flex-shrink-0 ${
                  isSaved
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-[#0F2557] hover:bg-[#0A192F] text-white shadow-sm hover:shadow"
                }`}
              >
                {isSaved ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>تم الحفظ</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تخصيص الروابط</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </header>
  );
}
