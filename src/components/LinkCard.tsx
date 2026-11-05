"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LinkItem, resolveLinkUrl } from "@/data/links";
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  Lock,
  Sparkles,
  Layers,
  HeartPulse,
  Award,
} from "lucide-react";

interface LinkCardProps {
  item: LinkItem;
  memberId: string;
  onToast: (msg: string) => void;
  onFocusMemberInput?: () => void;
}

export default function LinkCard({
  item,
  memberId,
  onToast,
  onFocusMemberInput,
}: LinkCardProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const isConfigured = Boolean(memberId && memberId.trim().length > 0);
  const resolvedUrl = resolveLinkUrl(item, memberId);

  const getCategoryBadgeColor = (cat: LinkItem["category"]) => {
    switch (cat) {
      case "top-products":
        return "bg-amber-50 text-amber-900 border-amber-200/80";
      case "vitality":
        return "bg-emerald-50 text-emerald-900 border-emerald-200/80";
      case "eworld":
        return "bg-navy-50 text-[#0F2557] border-navy-100";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getCategoryIcon = (cat: LinkItem["category"]) => {
    switch (cat) {
      case "top-products":
        return <Award className="w-3 h-3 text-amber-700" />;
      case "vitality":
        return <HeartPulse className="w-3 h-3 text-emerald-700" />;
      case "eworld":
        return <Layers className="w-3 h-3 text-[#0F2557]" />;
      default:
        return null;
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopiedUrl(true);

      if (item.requiresMemberId && !isConfigured) {
        onToast(
          `تنبيه: تم نسخ الرابط بالرمز الافتراضي (${item.defaultMemberId}). يرجى إدخال رقم عضويتك في الأعلى لتخصيص الرابط لك.`
        );
        onFocusMemberInput?.();
      } else if (item.requiresMemberId && isConfigured) {
        onToast(`تم نسخ رابط "${item.title}" برقم عضويتك (${memberId}) بنجاح`);
      } else {
        onToast(`تم نسخ رابط "${item.title}"`);
      }

      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      onToast("تعذر نسخ الرابط إلى الحافظة");
    }
  };

  const handleCopyWithDescription = async () => {
    try {
      const textToCopy = item.subtitle
        ? `${item.title}\n${item.subtitle}\n${resolvedUrl}`
        : `${item.title}\n${resolvedUrl}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedDesc(true);

      if (item.requiresMemberId && !isConfigured) {
        onToast(
          `تنبيه: تم النسخ بالرمز الافتراضي (${item.defaultMemberId}). أدخل رقم عضويتك في الأعلى لتخصيص الرابط.`
        );
        onFocusMemberInput?.();
      } else if (item.requiresMemberId && isConfigured) {
        onToast(`تم نسخ العنوان والرابط المخصص برقم عضويتك (${memberId})`);
      } else {
        onToast(`تم نسخ العنوان والرابط لـ "${item.title}"`);
      }

      setTimeout(() => setCopiedDesc(false), 2000);
    } catch {
      onToast("تعذر نسخ النص إلى الحافظة");
    }
  };

  const handleOpen = () => {
    if (item.requiresMemberId && !isConfigured) {
      onToast(
        `تنبيه: تم فتح الرابط بالرمز الافتراضي (${item.defaultMemberId}). أدخل رقم عضويتك في الأعلى لتخصيصه.`
      );
      onFocusMemberInput?.();
    }
    window.open(resolvedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Browser Window Header Mockup */}
      <div className="bg-slate-100/90 border-b border-slate-200/70 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-red-400 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
        </div>
        <div
          className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200/60 shadow-xs max-w-[210px] truncate"
          dir="ltr"
        >
          <Lock className="w-2.5 h-2.5 text-emerald-600 flex-shrink-0" />
          <span className="truncate">{item.domain}</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">#{item.id}</span>
      </div>

      {/* Website Preview Image Container */}
      <div
        className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden cursor-pointer"
        onClick={handleOpen}
        title="انقر لفتح الموقع مباشرة"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Dynamic ID indicator badge */}
        {item.requiresMemberId && (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#0A192F] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm border border-slate-200/80">
            <Sparkles className="w-3 h-3 text-[#0F2557]" />
            <span>{isConfigured ? "مخصص بعضويتك" : "رابط مخصص"}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        
        <div>
          {/* Category Badge & Meta */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${getCategoryBadgeColor(
                item.category
              )}`}
            >
              {getCategoryIcon(item.category)}
              <span>{item.categoryLabel}</span>
            </div>

            {item.requiresMemberId && (
              <span
                className={`text-[11px] font-mono ${
                  isConfigured ? "text-emerald-700 font-semibold" : "text-slate-500"
                }`}
              >
                {isConfigured ? `عضويتك: ${memberId}` : `افتراضي: ${item.defaultMemberId}`}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-base font-bold text-[#0A192F] group-hover:text-[#0F2557] transition-colors leading-snug mb-1.5">
            {item.title}
          </h2>

          {/* Subtitle / Note */}
          {item.subtitle && (
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {item.subtitle}
            </p>
          )}

          {/* Live URL Snippet */}
          <div
            className={`border rounded-lg px-2.5 py-1.5 text-[11px] font-mono truncate transition-colors ${
              item.requiresMemberId && isConfigured
                ? "bg-emerald-50/60 border-emerald-200/80 text-emerald-900"
                : "bg-[#F8FAFC] border-slate-200/80 text-slate-500"
            }`}
            dir="ltr"
            title={resolvedUrl}
          >
            {resolvedUrl}
          </div>
        </div>

        {/* Action Buttons Bar (Rounded-full) */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          
          {/* Primary Action: Open Website */}
          <button
            type="button"
            onClick={handleOpen}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0F2557] hover:bg-[#0A192F] text-white text-xs font-semibold py-2.5 px-3.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
          >
            <span>افتح الموقع</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Secondary Action: Copy Pure URL */}
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0A192F] text-xs font-medium py-2.5 px-3.5 rounded-full border border-slate-200/90 hover:border-slate-300 shadow-2xs transition-all duration-200"
            title="نسخ الرابط الصافي"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>

          {/* Tertiary Action: Copy with Description */}
          <button
            type="button"
            onClick={handleCopyWithDescription}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#0A192F] border border-slate-200/80 transition-all duration-200 flex-shrink-0"
            title="نسخ العنوان مع الرابط للمشاركة"
            aria-label="نسخ مع الوصف"
          >
            {copiedDesc ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

        </div>

      </div>

    </article>
  );
}
