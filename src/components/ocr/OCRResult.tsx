"use client";

import { useRef, useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cleanOCRText, getWordCount, getCharacterCount } from "@/lib/ocr-cleaner";
import { useLanguage } from "@/contexts/LanguageContext";
import { OCRStatus } from "@/types/ocr";

interface OCRResultProps {
  text: string;
  onTextChange: (text: string) => void;
  onCopy: () => void;
  onDownloadText: () => void;
  onDownloadWord: () => void;
  onClear: () => void;
  onRetry: () => void;
  onChooseAnother?: () => void;
  status?: OCRStatus;
  onCancel?: () => void;
  errorMessage?: string | null;
}

export function OCRResult({
  text,
  onTextChange,
  onCopy,
  onDownloadText,
  onDownloadWord,
  onClear,
  onRetry,
  onChooseAnother,
  status = "ready",
  onCancel,
  errorMessage,
}: OCRResultProps) {
  const { language } = useLanguage();
  const isKm = language === "km";
  const textEditor = useRef<HTMLTextAreaElement>(null);
  const userHasScrolledUpRef = useRef<boolean>(false);
  const [copied, setCopied] = useState(false);

  const isBusy =
    status === "uploading" ||
    status === "processing" ||
    status === "streaming";
  const isStreaming = status === "streaming";
  const isCompleted = status === "completed" || status === "success";
  const isCancelled = status === "cancelled";
  const isError = status === "error";

  // Auto-scroll when new streaming lines arrive, but ONLY if user hasn't scrolled up
  useEffect(() => {
    if (isBusy && !userHasScrolledUpRef.current && textEditor.current) {
      textEditor.current.scrollTop = textEditor.current.scrollHeight;
    }
  }, [text, isBusy]);

  // Reset scroll lock when completed or cleared
  useEffect(() => {
    if (isCompleted || isCancelled) {
      userHasScrolledUpRef.current = false;
    }
  }, [isCompleted, isCancelled]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    // User is considered at the bottom if within 40px of bottom
    const isAtBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight <= 40;
    userHasScrolledUpRef.current = !isAtBottom;
  };

  const handleCopy = () => {
    if (!text || isBusy) return;
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCleanText = () => {
    if (!text || isBusy) return;
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
              {isBusy
                ? isStreaming
                  ? isKm
                    ? "កំពុងទទួលអត្ថបទបន្តផ្ទាល់..."
                    : "Streaming recognized lines..."
                  : isKm
                    ? "កំពុងដំណើរការស្រង់អត្ថបទ..."
                    : "Processing document..."
                : isCompleted
                  ? isKm
                    ? "លទ្ធផលដែលអាចកែសម្រួលបាន"
                    : "Editable result"
                  : isCancelled
                    ? isKm
                      ? "បានបោះបង់ការស្រង់"
                      : "Extraction cancelled"
                    : isKm
                      ? "លទ្ធផល OCR"
                      : "OCR Result"}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Status Badge */}
          {status === "uploading" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 rounded-full text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{isKm ? "កំពុងផ្ទុកឡើង..." : "Uploading..."}</span>
            </span>
          )}

          {status === "processing" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 rounded-full text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{isKm ? "កំពុងវិភាគ..." : "Processing..."}</span>
            </span>
          )}

          {status === "streaming" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 rounded-full text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isKm ? "កំពុងបញ្ជូនអត្ថបទ..." : "Streaming lines..."}</span>
            </span>
          )}

          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60 rounded-full text-xs font-semibold shadow-xs">
              <Icon name="check" size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>{isKm ? "ស្រង់បានរួចរាល់" : "Completed"}</span>
            </span>
          )}

          {isCancelled && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold shadow-xs">
              <Icon name="close" size={12} className="text-slate-500" />
              <span>{isKm ? "បានបោះបង់" : "Cancelled"}</span>
            </span>
          )}

          {isError && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-950/70 text-red-700 dark:text-red-300 border border-red-200/80 dark:border-red-800/60 rounded-full text-xs font-semibold shadow-xs">
              <Icon name="alert" size={13} className="text-red-600 dark:text-red-400" />
              <span>{isKm ? "កំហុស" : "Error"}</span>
            </span>
          )}

          {/* Cancel Button during active processing/streaming */}
          {isBusy && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/70 transition-colors shadow-xs active:scale-95 cursor-pointer"
              title={isKm ? "បោះបង់ដំណើរការស្រង់អត្ថបទ" : "Cancel text extraction"}
            >
              <Icon name="close" size={13} />
              <span>{isKm ? "បោះបង់" : "Cancel"}</span>
            </button>
          )}

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text || isBusy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 shadow-xs cursor-pointer ${
              !text || isBusy
                ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60"
                : copied
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 font-bold active:scale-95"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 active:scale-95"
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
          {/* Toolbar */}
          <div className="h-12 px-4 sm:px-6 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCleanText}
                disabled={!isCompleted}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
                  isCompleted
                    ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/90 dark:border-blue-800/60 cursor-pointer active:scale-95"
                    : "text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60"
                }`}
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
                disabled={!isCompleted}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors shadow-xs ${
                  isCompleted
                    ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-95"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60"
                }`}
                title={isKm ? "ទាញយកជាឯកសារអត្ថបទ (.txt)" : "Download as plain text (.txt)"}
              >
                <Icon name="download" size={13} className={isCompleted ? "text-slate-500 dark:text-slate-400" : "text-slate-400"} />
                <span>TXT</span>
              </button>
              <button
                type="button"
                onClick={onDownloadWord}
                disabled={!isCompleted}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors shadow-xs ${
                  isCompleted
                    ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer active:scale-95"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-60"
                }`}
                title={isKm ? "ទាញយកជាឯកសារ Microsoft Word (.doc)" : "Download as Microsoft Word document (.doc)"}
              >
                <Icon name="file" size={13} className={isCompleted ? "text-blue-600 dark:text-blue-400" : "text-slate-400"} />
                <span>Word</span>
              </button>
            </div>
          </div>

          {/* Streaming banner if busy */}
          {isBusy && (
            <div className="px-5 py-2 bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs text-blue-700 dark:text-blue-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
                <span>
                  {isStreaming
                    ? isKm
                      ? "កំពុងទទួលអត្ថបទតាមបន្ទាត់នីមួយៗពីម៉ាស៊ីនបម្រើ..."
                      : "Streaming recognized lines progressively..."
                    : isKm
                      ? "កំពុងដំណើរការអានឯកសារ..."
                      : "Processing document..."}
                </span>
              </span>
              <span className="text-[11px] text-blue-500 dark:text-blue-400 font-medium hidden sm:inline">
                {isKm ? "ការកែសម្រួលនឹងបើកដំណើរការពេលរួចរាល់" : "Editing will enable upon completion"}
              </span>
            </div>
          )}

          {/* Text Editor Canvas */}
          <div className="flex-1 min-h-0 flex flex-col p-4 sm:p-5 bg-white dark:bg-slate-900">
            <textarea
              ref={textEditor}
              onScroll={handleScroll}
              aria-label="Extracted text"
              readOnly={!isCompleted}
              spellCheck={false}
              className={`w-full h-full flex-1 p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200/90 dark:border-slate-800 rounded-xl resize-none transition-all font-sans shadow-inner selection:bg-blue-100 dark:selection:bg-blue-900/50 ${
                isCompleted
                  ? "focus:outline-hidden focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-500"
                  : "cursor-text opacity-90 select-text"
              }`}
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              style={{ fontFamily: "'Kantumruy Pro', 'Inter', system-ui, sans-serif" }}
              placeholder={
                isKm
                  ? "អត្ថបទដែលបានស្រង់នឹងបង្ហាញនៅទីនេះ..."
                  : "Extracted text will appear here..."
              }
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
              disabled={isBusy}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                isBusy
                  ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  : "text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
              }`}
              title={isKm ? "លុបអត្ថបទទាំងអស់ចេញពីប្រអប់" : "Clear all text"}
            >
              <Icon name="trash" size={13} />
              <span>{isKm ? "លុបអត្ថបទ" : "Clear text"}</span>
            </button>
          </div>
        </>
      ) : isBusy ? (
        /* Progress Indicator View while waiting for the first events */
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50/30 dark:bg-slate-950/20">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <span className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
            <Icon name="scan" size={28} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {status === "uploading"
              ? isKm
                ? "កំពុងផ្ទុកឯកសារឡើង..."
                : "Uploading document..."
              : isKm
                ? "កំពុងអានឯកសាររបស់អ្នក..."
                : "Reading your document..."}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
            {isKm
              ? "កំពុងភ្ជាប់ទៅកាន់ OCR streaming API ដើម្បីស្វែងរក និងស្រង់អត្ថបទតាមបន្ទាត់..."
              : "Connecting to the OCR streaming engine and detecting text lines in real-time..."}
          </p>
          <div className="relative w-full max-w-xs mx-auto h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" />
          </div>
          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              className="border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer text-xs py-2 px-4"
            >
              <Icon name="close" size={14} />
              <span>{isKm ? "បោះបង់ដំណើរការ" : "Cancel extraction"}</span>
            </Button>
          )}
        </div>
      ) : isCancelled ? (
        /* Cancelled View */
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50/30 dark:bg-slate-950/20">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl mb-5 shadow-xs">
            <Icon name="alert" size={28} />
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {isKm ? "ដំណើរការត្រូវបានបោះបង់" : "Extraction Cancelled"}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
            {isKm
              ? "ដំណើរការស្រង់អត្ថបទត្រូវបានបោះបង់តាមការស្នើសុំ។ អ្នកអាចចុចប៊ូតុងខាងក្រោមដើម្បីព្យាយាមម្តងទៀត។"
              : "Text extraction was cancelled. You can retry extracting text whenever you are ready."}
          </p>
          <Button onClick={onRetry} className="cursor-pointer">
            <Icon name="scan" size={16} />
            <span>{isKm ? "ព្យាយាមម្តងទៀត" : "Retry extraction"}</span>
          </Button>
        </div>
      ) : isError ? (
        /* Error View */
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50/30 dark:bg-slate-950/20">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-2xl mb-5 shadow-xs">
            <Icon name="alert" size={28} />
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {isKm ? "បរាជ័យក្នុងការស្រង់អត្ថបទ" : "Extraction Failed"}
          </h3>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 max-w-sm">
            {errorMessage ||
              (isKm
                ? "បានជួបប្រទះបញ្ហាក្នុងការដំណើរការ OCR។ សូមពិនិត្យឯកសារ ឬបណ្តាញ ហើយព្យាយាមម្តងទៀត។"
                : "An error occurred during OCR processing. Please check your document or connection and retry.")}
          </p>

          {/* Additional explanatory message for PDF page limit */}
          {errorMessage && (errorMessage.includes("limit is 50") || errorMessage.includes("pages")) && (
            <div className="mb-6 p-4 bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-left max-w-md shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold text-xs uppercase tracking-wider">
                <Icon name="alert" size={14} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                <span>{isKm ? "ព័ត៌មានអំពីដែនកំណត់ទំព័រ PDF" : "PDF Page Limit Policy"}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {isKm
                  ? "ប្រព័ន្ធអនុញ្ញាតឱ្យស្រង់អត្ថបទពីឯកសារ PDF ត្រឹមអតិបរមា ៥០ ទំព័រប៉ុណ្ណោះក្នុងមួយឯកសារ។ សូមបំបែកឯកសារជាផ្នែកតូចៗ ឬជ្រើសរើសឯកសារថ្មីដើម្បីបន្តដំណើរការ។"
                  : "The system only supports PDF documents with a maximum of 50 pages per file. Please split your document into smaller parts or select another file to proceed."}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={onRetry} className="cursor-pointer">
              <Icon name="scan" size={16} />
              <span>{isKm ? "ព្យាយាមម្តងទៀត" : "Retry extraction"}</span>
            </Button>
            {onChooseAnother && (
              <Button
                variant="secondary"
                onClick={onChooseAnother}
                className="cursor-pointer"
              >
                <Icon name="upload" size={15} />
                <span>{isKm ? "ផ្ទុកឯកសារថ្មី" : "Choose another file"}</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Default Empty View */
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
          <Button onClick={onRetry} className="cursor-pointer">
            {isKm ? "ព្យាយាមស្រង់ម្តងទៀត" : "Retry extraction"}
          </Button>
        </div>
      )}
    </section>
  );
}