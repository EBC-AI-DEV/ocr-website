"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProcessingStateProps {
  /** Name of the file being processed (real info shown to the user). */
  fileName?: string;
}

/** Show a "this can take longer" hint after this many seconds. */
const SLOW_HINT_AFTER_SECONDS = 10;

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * OCR processing panel.
 *
 * The OCR API is a single request/response call and reports no progress, so
 * this deliberately shows an *indeterminate* indicator plus a real elapsed
 * timer instead of a fabricated percentage. Its size mirrors <OCRResult>
 * so the layout doesn't jump when the extracted text arrives.
 */
export function ProcessingState({ fileName }: ProcessingStateProps) {
  const { language } = useLanguage();
  const isKm = language === "km";
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      className="flex flex-col h-full min-h-[660px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      aria-busy="true"
      aria-label={isKm ? "កំពុងស្រង់អត្ថបទ" : "Extracting text"}
    >
      {/* Header (mirrors OCRResult header) */}
      <div className="h-18 flex-shrink-0 flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900/60">
            <Icon name="file" size={19} />
          </span>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider leading-tight">
              {isKm ? "អត្ថបទដែលបានស្រង់" : "EXTRACTED TEXT"}
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate block">
              {fileName ?? (isKm ? "ឯកសាររបស់អ្នក" : "Your document")}
            </strong>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 rounded-full text-xs font-semibold flex-shrink-0">
          <span
            className="w-3 h-3 rounded-full border-2 border-blue-300 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 animate-spin"
            aria-hidden="true"
          />
          {isKm ? "កំពុងដំណើរការ" : "Processing"}
        </span>
      </div>

      {/* Status */}
      <div className="flex flex-col items-center text-center px-6 pt-10 pb-8">
        <div className="relative inline-flex items-center justify-center w-16 h-16 mb-5" aria-hidden="true">
          <span className="absolute inset-0 border-4 border-blue-100 dark:border-blue-950 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
          <Icon name="scan" size={24} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div role="status" aria-live="polite">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isKm ? "កំពុងអានឯកសាររបស់អ្នក..." : "Reading your document..."}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {isKm
              ? "កំពុងផ្ទុកឡើង និងសម្គាល់អត្ថបទជាភាសាខ្មែរ និងអង់គ្លេស។"
              : "Uploading and detecting Khmer and English text."}
          </p>
          {elapsed >= SLOW_HINT_AFTER_SECONDS && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {isKm
                ? "ឯកសារធំ ឬមានច្រើនទំព័រ អាចចំណាយពេលយូរបន្តិច។"
                : "Large or multi-page documents can take a little longer."}
            </p>
          )}
        </div>

        {/* Indeterminate bar: the API exposes no real progress */}
        <div
          className="progress-indeterminate w-full max-w-xs h-1.5 mt-6 bg-slate-200 dark:bg-slate-800 rounded-full [--progress-color:#1a75bb] dark:[--progress-color:#60a5fa]"
          role="progressbar"
          aria-label={isKm ? "កំពុងស្រង់អត្ថបទ" : "Extracting text"}
          aria-valuetext={isKm ? "កំពុងដំណើរការ" : "In progress"}
        />
        <small className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
          {isKm ? "រយៈពេល" : "Elapsed"} {formatElapsed(elapsed)}
        </small>
      </div>

      {/* Skeleton of the editor that will appear */}
      <div className="flex-1 min-h-0 px-4 sm:px-5 pb-5" aria-hidden="true">
        <div className="h-full rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-4 sm:p-5 space-y-3">
          <div className="skeleton h-3 w-11/12" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-10/12" />
          <div className="skeleton h-3 w-9/12" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-7/12" />
        </div>
      </div>
    </section>
  );
}
