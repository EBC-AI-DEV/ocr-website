"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cleanOCRText, getWordCount, getCharacterCount } from "@/lib/ocr-cleaner";
import { useLanguage } from "@/contexts/LanguageContext";

interface OCRResultProps {
  text: string;
  onTextChange: (text: string) => void;
  onCopy: () => void;
  onDownloadText: () => void;
  onDownloadWord: () => void;
  onClear: () => void;
  onRetry: () => void;
}

export function OCRResult({
  text,
  onTextChange,
  onCopy,
  onDownloadText,
  onDownloadWord,
  onClear,
  onRetry,
}: OCRResultProps) {
  const { language } = useLanguage();
  const isKm = language === "km";
  const textEditor = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCleanText = () => {
    if (!text) return;
    const cleaned = cleanOCRText(text);
    onTextChange(cleaned);
  };

  const charCount = getCharacterCount(text);
  const wordCount = getWordCount(text);

  return (
    <section
      className="flex flex-col h-full min-h-[660px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      aria-label="Extracted text editor"
    >
      {/* Header */}
      <div className="h-18 flex-shrink-0 flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900/60 shadow-xs">
            <Icon name="file" size={19} />
          </span>
          <div className="min-w-0">
            <span className="block text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider leading-tight">
              {isKm ? "អត្ថបទដែលបានស្រង់" : "EXTRACTED TEXT"}
            </span>
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate block">
              {isKm ? "លទ្ធផលដែលអាចកែសម្រួលបាន" : "Editable result"}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 rounded-full text-xs font-semibold shadow-xs">
            <Icon name="check" size={13} className="text-emerald-600 dark:text-emerald-400" />
            <span>{isKm ? "ស្រង់បាន 98%" : "98% Accuracy"}</span>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-xs active:scale-95 cursor-pointer ${
              copied
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-bold"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
            title={isKm ? "ចម្លងអត្ថបទទាំងអស់ទៅក្តារតម្បៀតខ្ទាស់" : "Copy extracted text to clipboard"}
          >
            <Icon
              name={copied ? "check" : "clipboard"}
              size={14}
              className={copied ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}
            />
            <span>
              {copied ? (isKm ? "បានចម្លង!" : "Copied!") : (isKm ? "ចម្លង" : "Copy")}
            </span>
          </button>
        </div>
      </div>

      {text ? (
        <>
          {/* Sleek Single-Line Toolbar */}
          <div className="h-12 px-4 sm:px-6 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCleanText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/90 dark:border-blue-800/60 rounded-lg transition-colors cursor-pointer shadow-xs active:scale-95"
                title={isKm ? "សម្អាតចន្លោះឃ្លា និងតួអក្សរមិនប្រក្រតីដោយស្វ័យប្រវត្តិ" : "Auto-clean detached contractions and spacing artifacts"}
              >
                <Icon name="spark" size={13} />
                <span>{isKm ? "សម្អាតទម្រង់" : "Clean text"}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider hidden sm:inline mr-1">
                {isKm ? "ទាញយក:" : "Export:"}
              </span>
              <button
                type="button"
                onClick={onDownloadText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-xs active:scale-95 cursor-pointer"
                title={isKm ? "ទាញយកជាឯកសារអត្ថបទ (.txt)" : "Download as plain text (.txt)"}
              >
                <Icon name="download" size={13} className="text-slate-500 dark:text-slate-400" />
                <span>TXT</span>
              </button>
              <button
                type="button"
                onClick={onDownloadWord}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-xs active:scale-95 cursor-pointer"
                title={isKm ? "ទាញយកជាឯកសារ Microsoft Word (.docx)" : "Download as Microsoft Word document (.docx)"}
              >
                <Icon name="file" size={13} className="text-blue-600 dark:text-blue-400" />
                <span>Word</span>
              </button>
            </div>
          </div>

          {/* Text Editor Canvas */}
          <div className="flex-1 min-h-0 flex flex-col p-4 sm:p-5 bg-white dark:bg-slate-900">
            <textarea
              ref={textEditor}
              aria-label="Extracted text"
              spellCheck={false}
              className="w-full h-full flex-1 p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/90 dark:border-slate-800 rounded-xl resize-none focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-sans shadow-inner selection:bg-blue-100 dark:selection:bg-blue-900/50"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              style={{ fontFamily: "'Kantumruy Pro', 'Inter', system-ui, sans-serif" }}
              placeholder={isKm ? "អត្ថបទដែលបានស្រង់នឹងបង្ហាញនៅទីនេះ..." : "Extracted text will appear here..."}
            />
          </div>

          {/* Footer Bar */}
          <div className="h-12 flex items-center justify-between px-5 sm:px-6 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex-shrink-0 text-xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
              <span>
                {charCount.toLocaleString()} {isKm ? "តួអក្សរ" : "characters"}
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>
                {wordCount.toLocaleString()} {isKm ? "ពាក្យ" : "words"}
              </span>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
              title={isKm ? "លុបអត្ថបទទាំងអស់ចេញពីប្រអប់" : "Clear all text"}
            >
              <Icon name="trash" size={13} />
              <span>{isKm ? "លុបអត្ថបទ" : "Clear text"}</span>
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50/30 dark:bg-slate-950/20">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-5 shadow-xs">
            <Icon name="file" size={29} className="text-slate-400 dark:text-slate-500" />
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {isKm ? "មិនទាន់មានអត្ថបទដែលបានស្រង់នៅឡើយទេ" : "No extracted text yet"}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
            {isKm
              ? "ព្យាយាមស្រង់អត្ថបទម្តងទៀត ដើម្បីបង្កើតលទ្ធផលដែលអាចកែសម្រួលបានពីឯកសាររបស់អ្នក។"
              : "Retry extraction to generate an editable result from your document."}
          </p>
          <Button onClick={onRetry}>{isKm ? "ព្យាយាមស្រង់ម្តងទៀត" : "Retry extraction"}</Button>
        </div>
      )}
    </section>
  );
}
