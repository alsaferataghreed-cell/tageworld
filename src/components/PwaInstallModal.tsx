"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  X,
  Download,
  Clock,
  EyeOff,
  Smartphone,
  Share,
  PlusSquare,
  MoreVertical,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface RelatedApplication {
  id?: string;
  platform: string;
  url?: string;
}

type NavigatorWithPWA = Navigator & {
  standalone?: boolean;
  getInstalledRelatedApps?: () => Promise<RelatedApplication[]>;
};

const STORAGE_INSTALLED_KEY = "tag_pwa_installed";
const STORAGE_DISMISS_FOREVER_KEY = "tag_pwa_dismiss_forever";
const SESSION_REMIND_LATER_KEY = "tag_pwa_remind_later";

export interface UsePwaInstallReturn {
  isInstalled: boolean;
  isOpen: boolean;
  isIos: boolean;
  canPromptNatively: boolean;
  showManualInstructions: boolean;
  setShowManualInstructions: (show: boolean) => void;
  handleInstallClick: () => Promise<void>;
  handleFooterInstallClick: () => Promise<void>;
  handleRemindLater: () => void;
  handleDismissForever: () => void;
  handleConfirmManualInstall: () => void;
}

export function usePwaInstall(
  onToast?: (msg: string) => void
): UsePwaInstallReturn {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  const isInstalledRef = useRef(false);
  const onToastRef = useRef(onToast);

  useEffect(() => {
    onToastRef.current = onToast;
  }, [onToast]);

  const markInstalled = useCallback((notify = false) => {
    isInstalledRef.current = true;
    setIsInstalled(true);
    setIsOpen(false);
    setShowManualInstructions(false);
    setDeferredPrompt(null);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_INSTALLED_KEY, "true");
    }
    if (notify) {
      onToastRef.current?.("تم تثبيت تطبيق دليل الروابط السريعة TAG eWorld بنجاح!");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const nav = window.navigator as NavigatorWithPWA;

    // Register Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Ignore registration error in unsupported contexts
      });
    }

    // Detect iOS devices (including iPadOS desktop-mode UA)
    const ua = window.navigator.userAgent;
    const iosDevice =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIos(iosDevice);

    const checkStandalone = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      Boolean(nav.standalone);

    const standalone = checkStandalone();
    const savedInstalled =
      localStorage.getItem(STORAGE_INSTALLED_KEY) === "true";

    if (standalone) {
      markInstalled(false);
    } else if (savedInstalled) {
      isInstalledRef.current = true;
      setIsInstalled(true);
    }

    let cancelled = false;
    let popupTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleAutoPopup = () => {
      if (popupTimer) clearTimeout(popupTimer);
      const dismissedForever =
        localStorage.getItem(STORAGE_DISMISS_FOREVER_KEY) === "true";
      const remindLater =
        sessionStorage.getItem(SESSION_REMIND_LATER_KEY) === "true";

      if (!isInstalledRef.current && !dismissedForever && !remindLater) {
        popupTimer = setTimeout(() => {
          if (!cancelled && !isInstalledRef.current) {
            setShowManualInstructions(false);
            setIsOpen(true);
          }
        }, 800);
      }
    };

    // Check installed related apps on supported browsers (e.g. Android Chrome)
    if (typeof nav.getInstalledRelatedApps === "function") {
      nav
        .getInstalledRelatedApps()
        .then((apps) => {
          if (cancelled) return;
          if (Array.isArray(apps) && apps.length > 0) {
            markInstalled(false);
          } else {
            scheduleAutoPopup();
          }
        })
        .catch(() => {
          if (!cancelled) scheduleAutoPopup();
        });
    } else {
      scheduleAutoPopup();
    }

    // Listen for Chromium beforeinstallprompt (fires only when app is NOT installed)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (!checkStandalone()) {
        // Browser confirmed app is not currently installed
        isInstalledRef.current = false;
        setIsInstalled(false);
        localStorage.removeItem(STORAGE_INSTALLED_KEY);
        scheduleAutoPopup();
      }
    };

    const handleAppInstalled = () => {
      markInstalled(true);
    };

    const standaloneQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        markInstalled(false);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    if (typeof standaloneQuery.addEventListener === "function") {
      standaloneQuery.addEventListener("change", handleDisplayModeChange);
    }

    return () => {
      cancelled = true;
      if (popupTimer) clearTimeout(popupTimer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      if (typeof standaloneQuery.removeEventListener === "function") {
        standaloneQuery.removeEventListener("change", handleDisplayModeChange);
      }
    };
  }, [markInstalled]);

  const handleInstallClick = useCallback(async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        if (outcome === "accepted") {
          markInstalled(true);
        }
      } catch {
        setShowManualInstructions(true);
        setIsOpen(true);
      }
    } else {
      setShowManualInstructions(true);
      setIsOpen(true);
    }
  }, [deferredPrompt, markInstalled]);

  const handleFooterInstallClick = useCallback(async () => {
    if (isInstalledRef.current) return;
    if (deferredPrompt) {
      await handleInstallClick();
    } else {
      setShowManualInstructions(true);
      setIsOpen(true);
    }
  }, [deferredPrompt, handleInstallClick]);

  const handleRemindLater = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_REMIND_LATER_KEY, "true");
    }
    setIsOpen(false);
    setShowManualInstructions(false);
  }, []);

  const handleDismissForever = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_DISMISS_FOREVER_KEY, "true");
    }
    setIsOpen(false);
    setShowManualInstructions(false);
    onToastRef.current?.(
      "لن تظهر هذه النافذة تلقائياً مرة أخرى. يمكنك دائماً تنزيل التطبيق من الزر الموجود في أسفل الموقع."
    );
  }, []);

  const handleConfirmManualInstall = useCallback(() => {
    markInstalled(true);
  }, [markInstalled]);

  return {
    isInstalled,
    isOpen,
    isIos,
    canPromptNatively: Boolean(deferredPrompt),
    showManualInstructions,
    setShowManualInstructions,
    handleInstallClick,
    handleFooterInstallClick,
    handleRemindLater,
    handleDismissForever,
    handleConfirmManualInstall,
  };
}

interface PwaInstallModalProps {
  pwa: UsePwaInstallReturn;
}

export default function PwaInstallModal({ pwa }: PwaInstallModalProps) {
  const {
    isOpen,
    isInstalled,
    isIos,
    showManualInstructions,
    setShowManualInstructions,
    handleInstallClick,
    handleRemindLater,
    handleDismissForever,
    handleConfirmManualInstall,
  } = pwa;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleRemindLater();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleRemindLater]);

  if (!isOpen || isInstalled) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0A192F]/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
      onClick={handleRemindLater}
    >
      <div
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-l from-[#0A192F] via-[#0F2557] to-sky-500" />

        {/* Close (X) Button */}
        <button
          type="button"
          onClick={handleRemindLater}
          aria-label="إغلاق نافذة تثبيت التطبيق"
          title="إغلاق"
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-[#0A192F] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-7">
          {/* App Identity Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#0F2557] p-1 shadow-lg shadow-[#0A192F]/15 flex-shrink-0 flex items-center justify-center overflow-hidden">
              <Image
                src="/icon-192.png"
                alt="شعار دليل الروابط السريعة TAG eWorld"
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-contain"
              />
            </div>

            <div className="space-y-1 pl-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-navy-50 text-[#0F2557] border border-navy-100">
                <Smartphone className="w-3 h-3" />
                <span>تطبيق ويب سريع (PWA)</span>
              </div>
              <h2
                id="pwa-install-title"
                className="text-lg sm:text-xl font-extrabold text-[#0A192F] leading-snug"
              >
                دليل الروابط السريعة TAG eWorld
              </h2>
            </div>
          </div>

          {!showManualInstructions ? (
            <>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                ثبّت تطبيق{" "}
                <span className="font-bold text-[#0A192F]">
                  دليل الروابط السريعة TAG eWorld
                </span>{" "}
                على جهازك للوصول الفوري لجميع روابط DXN و eWorld بضغطة واحدة وكأنه
                تطبيق مستقل بالكامل.
              </p>

              {/* Benefits Pills */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-2.5 text-center">
                  <Zap className="w-4 h-4 text-[#0F2557] mx-auto mb-1" />
                  <span className="block text-[11px] font-semibold text-[#0A192F]">
                    فتح فوري
                  </span>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-2.5 text-center">
                  <Sparkles className="w-4 h-4 text-[#0F2557] mx-auto mb-1" />
                  <span className="block text-[11px] font-semibold text-[#0A192F]">
                    شاشة مستقلة
                  </span>
                </div>
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-2.5 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="block text-[11px] font-semibold text-[#0A192F]">
                    حفظ العضوية
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#0F2557] hover:bg-[#0A192F] text-white text-sm font-bold py-3 px-5 rounded-2xl shadow-md shadow-[#0F2557]/15 hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>تنزيل التطبيق الآن</span>
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleRemindLater}
                    className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>مشاهدة لاحقاً</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDismissForever}
                    className="flex items-center justify-center gap-1.5 bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>عدم الظهور مرة أخرى</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Manual Browser Install Guide (iOS Safari / Desktop fallback) */
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 space-y-3 text-xs sm:text-sm text-slate-700">
                <p className="font-bold text-[#0A192F]">
                  {isIos
                    ? "لتثبيت التطبيق على أجهزة iPhone و iPad:"
                    : "لتثبيت التطبيق من متصفحك:"}
                </p>

                {isIos ? (
                  <ol className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F2557] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span className="flex items-center flex-wrap gap-1">
                        اضغط على أيقونة المشاركة
                        <Share className="w-3.5 h-3.5 text-[#0F2557] inline" />
                        في شريط متصفح Safari.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F2557] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span className="flex items-center flex-wrap gap-1">
                        اختر{" "}
                        <strong className="text-[#0A192F]">
                          «إضافة إلى الشاشة الرئيسية»
                        </strong>
                        <PlusSquare className="w-3.5 h-3.5 text-[#0F2557] inline" />
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F2557] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        اضغط{" "}
                        <strong className="text-[#0A192F]">«إضافة»</strong> ليظهر
                        التطبيق باسم{" "}
                        <strong className="text-[#0A192F]">
                          دليل الروابط السريعة TAG eWorld
                        </strong>
                        .
                      </span>
                    </li>
                  </ol>
                ) : (
                  <ol className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F2557] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <span className="flex items-center flex-wrap gap-1">
                        افتح قائمة المتصفح
                        <MoreVertical className="w-3.5 h-3.5 text-[#0F2557] inline" />
                        أو اضغط أيقونة التثبيت في شريط العنوان.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0F2557] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        اختر{" "}
                        <strong className="text-[#0A192F]">
                          «تثبيت التطبيق»
                        </strong>{" "}
                        أو{" "}
                        <strong className="text-[#0A192F]">
                          «إضافة إلى الشاشة الرئيسية»
                        </strong>
                        .
                      </span>
                    </li>
                  </ol>
                )}
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleConfirmManualInstall}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>لقد قمت بتثبيت التطبيق</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowManualInstructions(false)}
                    className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl transition-colors"
                  >
                    رجوع
                  </button>
                  <button
                    type="button"
                    onClick={handleRemindLater}
                    className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold py-2 px-3 rounded-xl transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
