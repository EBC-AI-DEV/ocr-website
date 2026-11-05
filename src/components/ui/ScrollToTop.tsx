"use client";

import { useEffect, useState, useCallback } from "react";
import { Icon } from "./Icon";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScrollToTopProps {
  threshold?: number;
  showProgress?: boolean;
}

export function ScrollToTop({
  threshold = 300,
  showProgress = true,
}: ScrollToTopProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const calculateScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setIsVisible(scrollTop > threshold);

    if (scrollHeight > 0) {
      const currentProgress = Math.min(
        100,
        Math.max(0, (scrollTop / scrollHeight) * 100)
      );
      setProgress(currentProgress);
    }
  }, [threshold]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const rafId = window.requestAnimationFrame(calculateScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, [calculateScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG progress ring calculation
  const size = 48;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const label = t("common.scrollToTop") || "Scroll to top";

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={label}
        title={label}
        className="relative group w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-lg hover:shadow-xl shadow-slate-900/10 dark:shadow-black/50 hover:border-blue-500/60 dark:hover:border-blue-500/60 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {/* Circular Progress Ring */}
        {showProgress && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
          >
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="stroke-slate-200/70 dark:stroke-slate-800/80 fill-none"
              strokeWidth={strokeWidth}
            />
            {/* Active progress stroke */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="stroke-blue-600 dark:stroke-blue-400 fill-none transition-[stroke-dashoffset] duration-150 ease-out"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
        )}

        {/* Arrow Icon with subtle hover lift */}
        <span className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5">
          <Icon name="arrow-up" size={19} />
        </span>
      </button>
    </div>
  );
}
