"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ocrConfig } from "@/config/site";
import { formatFileSize, getFileTypeLabel } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile?: {
    name: string;
    type: string;
    size: number;
  } | null;
  onRemove: () => void;
  error?: string | null;
  onClearError: () => void;
}

export function FileUploader({
  onFileSelect,
  selectedFile,
  onRemove,
  error,
  onClearError,
}: FileUploaderProps) {
  const { t, language } = useLanguage();
  const isKm = language === "km";
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <>
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
          dragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            : "border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInput}
          type="file"
          accept={Object.values(ocrConfig.acceptedFormats).flat().join(",")}
          onChange={handleFile}
          className="hidden"
        />
        <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-950 rounded-2xl mb-5">
          <Icon name="upload" size={27} className="text-blue-600 dark:text-blue-400" />
        </span>
        <div className="mb-6">
          <strong className="block text-lg font-bold text-slate-900 dark:text-white mb-2">
            {dragging ? t("ocr.dragDrop") : t("ocr.dragDropDocument")}
          </strong>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("ocr.browseFromDevice")}
          </p>
        </div>
        <Button onClick={() => fileInput.current?.click()} className="mb-6">
          <Icon name="upload" size={17} /> {t("ocr.browseFiles")}
        </Button>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          {ocrConfig.formatLabels.map((format) => (
            <span
              key={format}
              className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
            >
              {format}
            </span>
          ))}
          <small className="text-slate-500 dark:text-slate-400 font-semibold">
            {t("ocr.maximumSize")}
          </small>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <small className="text-slate-500 dark:text-slate-400 font-semibold">
            {isKm ? `PDF អតិបរមា ${ocrConfig.maxPdfPages} ទំព័រ` : `PDF max ${ocrConfig.maxPdfPages} pages`}
          </small>
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
          <span
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg ${
              selectedFile.type === "application/pdf"
                ? "bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/60"
                : "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400"
            }`}
          >
            <Icon
              name={selectedFile.type === "application/pdf" ? "pdf" : "image"}
              size={18}
            />
          </span>
          <div className="flex-1 min-w-0">
            <strong className="block text-sm font-bold text-slate-900 dark:text-white truncate">
              {selectedFile.name}
            </strong>
            <small className="text-xs text-slate-600 dark:text-slate-400">
              {getFileTypeLabel(selectedFile.type, language)} ·{" "}
              {formatFileSize(selectedFile.size)} · {isKm ? "រួចរាល់ដើម្បីស្រង់អត្ថបទ" : "Ready to extract"}
            </small>
          </div>
          <button
            onClick={onRemove}
            aria-label={isKm ? "លុបឯកសារដែលបានជ្រើសរើស" : "Remove selected file"}
            className="flex-shrink-0 p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl" role="alert">
          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-full font-bold text-sm">
            !
          </span>
          <div className="flex-1 min-w-0">
            <strong className="block text-sm font-bold text-red-900 dark:text-red-200 mb-1">
              {t("ocr.uploadError")}
            </strong>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
          <button
            onClick={onClearError}
            aria-label={isKm ? "បិទការជូនដំណឹងកំហុស" : "Dismiss error"}
            className="flex-shrink-0 p-2 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 rounded-lg transition-colors cursor-pointer"
          >
            <Icon name="close" size={17} />
          </button>
        </div>
      )}
    </>
  );
}
