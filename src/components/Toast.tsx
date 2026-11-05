"use client";

import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  const isWarning = message.startsWith("تنبيه") || message.includes("يرجى") || message.includes("تحذير");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-md w-[90%] sm:w-auto">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl border text-xs sm:text-sm font-medium ${
          isWarning
            ? "bg-[#0A192F] text-amber-200 border-amber-500/40 shadow-amber-950/20"
            : "bg-[#0A192F] text-white border-slate-700/50"
        }`}
      >
        {isWarning ? (
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        )}
        <span className="leading-snug">{message}</span>
      </div>
    </div>
  );
}
