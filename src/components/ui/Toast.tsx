"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Icon, IconName } from "./Icon";
import { useLanguage } from "@/contexts/LanguageContext";
import { ANIMATION_CONFIG } from "@/constants";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  title?: string;
  duration?: number;
  position?: "top-center" | "top-right";
  onClose: () => void;
}

export function Toast({
  message,
  type = "success",
  title,
  duration = ANIMATION_CONFIG.TOAST_DURATION,
  position = "top-right",
  onClose,
}: ToastProps) {
  const { t } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hasDismissedRef = useRef(false);
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef(0);

  const handleDismiss = useCallback(() => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  useEffect(() => {
    if (duration <= 0) return;

    let timerId: NodeJS.Timeout | undefined;

    if (!isPaused) {
      startTimeRef.current = Date.now();
      timerId = setTimeout(() => {
        handleDismiss();
      }, remainingTimeRef.current);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      if (!isPaused && startTimeRef.current > 0) {
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
    };
  }, [duration, isPaused, handleDismiss]);

  const defaultTitles: Record<ToastType, string> = {
    success: t("toast.success") || "Success",
    error: t("toast.error") || "Error",
    warning: t("toast.warning") || "Warning",
    info: t("toast.info") || "Notice",
  };

  const displayTitle = title || defaultTitles[type] || "Success";

  const iconNames: Record<ToastType, IconName> = {
    success: "check",
    error: "alert",
    warning: "alert",
    info: "info",
  };

  const styleConfig = {
    success: {
      card: "border-emerald-500/25 dark:border-emerald-500/35 shadow-emerald-500/10",
      badge: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60",
      dot: "bg-emerald-500 shadow-sm shadow-emerald-500/50",
      progress: "bg-emerald-500 dark:bg-emerald-400",
    },
    error: {
      card: "border-rose-500/25 dark:border-rose-500/35 shadow-rose-500/10",
      badge: "bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60",
      dot: "bg-rose-500 shadow-sm shadow-rose-500/50",
      progress: "bg-rose-500 dark:bg-rose-400",
    },
    warning: {
      card: "border-amber-500/25 dark:border-amber-500/35 shadow-amber-500/10",
      badge: "bg-amber-50 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60",
      dot: "bg-amber-500 shadow-sm shadow-amber-500/50",
      progress: "bg-amber-500 dark:bg-amber-400",
    },
    info: {
      card: "border-blue-500/25 dark:border-blue-500/35 shadow-blue-500/10",
      badge: "bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60",
      dot: "bg-blue-500 shadow-sm shadow-blue-500/50",
      progress: "bg-blue-500 dark:bg-blue-400",
    },
  }[type];

  const positionClass =
    position === "top-center"
      ? "fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md sm:w-auto sm:min-w-[360px] sm:max-w-lg"
      : "fixed top-4 right-4 left-4 sm:left-auto sm:top-5 sm:right-6 z-[100] w-auto max-w-md sm:min-w-[340px]";

  return (
    <div
      className={`${positionClass} pointer-events-auto`}
      role={type === "error" ? "alert" : "status"}
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes toastSlideDown {
          0% {
            opacity: 0;
            transform: translateY(-18px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes toastProgress {
          0% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }
      `}</style>
      <div
        className={`relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border ${
          styleConfig.card
        } shadow-2xl dark:shadow-black/60 transition-all duration-200 ${
          isExiting ? "opacity-0 -translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
        }`}
        style={{
          animation: isExiting
            ? undefined
            : "toastSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        <div className="flex items-center gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4">
          {/* Status Icon Badge */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${styleConfig.badge}`}
          >
            <Icon name={iconNames[type]} size={20} />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${styleConfig.dot}`} />
              <strong className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                {displayTitle}
              </strong>
            </div>
            <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 font-normal leading-relaxed mt-0.5 break-words">
              {message}
            </p>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={t("toast.dismiss") || "Dismiss notification"}
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="h-0.5 w-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
            <div
              className={`h-full w-full origin-left ${styleConfig.progress}`}
              style={{
                animation: `toastProgress ${duration}ms linear forwards`,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
