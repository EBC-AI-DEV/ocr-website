"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { FileUploader } from "@/components/ocr/FileUploader";
import { FilePreview } from "@/components/ocr/FilePreview";
import { OCRResult } from "@/components/ocr/OCRResult";
import { useOCR } from "@/hooks/useOCR";
import { useLanguage } from "@/contexts/LanguageContext";

export default function UploadPage() {
  const { t, language } = useLanguage();
  const isKm = language === "km";
  const {
    status,
    text,
    setText,
    uploadedFile,
    error,
    toast,
    handleFileSelect,
    removeFile,
    extractText,
    cancelExtraction,
    copyText,
    downloadText,
    downloadWord,
    chooseAnotherFile,
    clearError,
    closeToast,
  } = useOCR();

  const isInitialState = status === "ready" || status === "idle";

  return (
    <>
      <section className="w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-8 sm:py-10 px-4 sm:px-6" id="ocr-tool">
        <div className="max-w-6xl mx-auto">
          {isInitialState ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t("ocr.title")}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {t("ocr.selectLanguage")}
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-5">
                <FileUploader
                  onFileSelect={handleFileSelect}
                  selectedFile={uploadedFile}
                  onRemove={removeFile}
                  error={error}
                  onClearError={clearError}
                />
                <Button
                  className="w-full h-14 text-base font-bold flex items-center justify-center gap-3 cursor-pointer"
                  onClick={extractText}
                  disabled={!uploadedFile}
                >
                  <Icon name="scan" size={18} /> {t("ocr.extracting")}
                  <Icon name="arrow" size={17} />
                </Button>
                <div className="flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2">
                    <Icon name="check" size={13} /> {t("ocr.secureProcessing")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="spark" size={13} /> {t("ocr.highAccuracy")}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="trash" size={13} /> {t("ocr.autoDeleted")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6" id="results">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    {t("ocr.workspace")}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {status === "uploading"
                      ? isKm
                        ? "កំពុងផ្ទុកឡើងឯកសារ"
                        : "Uploading document"
                      : status === "processing"
                        ? t("ocr.processing")
                        : status === "streaming"
                          ? isKm
                            ? "កំពុងទទួលអត្ថបទបន្តផ្ទាល់"
                            : "Streaming text from document"
                          : status === "cancelled"
                            ? isKm
                              ? "ការស្រង់អត្ថបទត្រូវបានបោះបង់"
                              : "Text extraction cancelled"
                            : status === "error"
                              ? isKm
                                ? "បរាជ័យក្នុងការស្រង់អត្ថបទ"
                                : "Text extraction failed"
                              : t("ocr.result")}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t("ocr.resultView")}
                  </p>
                </div>
                <Button onClick={chooseAnotherFile} className="flex-shrink-0 cursor-pointer">
                  <Icon name="upload" size={15} /> {t("ocr.tryAnother")}
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                {uploadedFile && (
                  <FilePreview
                    fileName={uploadedFile.name}
                    previewUrl={uploadedFile.previewUrl}
                    fileType={uploadedFile.type}
                    fileSize={uploadedFile.size}
                  />
                )}
                <OCRResult
                  text={text}
                  onTextChange={setText}
                  onCopy={copyText}
                  onDownloadText={downloadText}
                  onDownloadWord={downloadWord}
                  onClear={() => setText("")}
                  onRetry={extractText}
                  status={status}
                  onCancel={cancelExtraction}
                  errorMessage={error}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {toast && (
        <Toast
          message={typeof toast === "string" ? toast : toast.message}
          type={typeof toast === "string" ? "success" : toast.type || "success"}
          title={typeof toast === "string" ? undefined : toast.title}
          position="top-right"
          onClose={closeToast}
        />
      )}
    </>
  );
}
