"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { validateFile } from "@/lib/validations";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function OCRUploadPage() {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    type: string;
    previewUrl: string;
  } | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const extractText = async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const { processOCR } = await import("@/services/ocr.service");
      const text = await processOCR(file, "both");
      setExtractedText(text);
    } catch (err) {
      console.error("OCR error:", err);
      setError(err instanceof Error ? err.message : "Failed to extract text");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateFile(file);

    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setError(null);
    const previewUrl = URL.createObjectURL(file);

    if (uploadedFile?.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }

    setUploadedFile({
      name: file.name,
      type: file.type,
      size: file.size,
      previewUrl,
    });

    setExtractedText("");
    extractText(file);
  }, [uploadedFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const copyText = async () => {
    if (!extractedText) return;
    await navigator.clipboard?.writeText(extractedText);
  };

  const downloadText = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "extracted-text.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearContent = () => {
    if (uploadedFile?.previewUrl) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    setExtractedText("");
    setError(null);
  };

  const wordCount = extractedText ? extractedText.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="ocr-upload" className="py-12 px-4 mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              <Icon name="scan" size={16} />
              OCR WORKSPACE
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Upload & Extract Text
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Drop your document below and let our AI extract text in Khmer and English instantly
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT: Upload Zone */}
              <div className="lg:col-span-5">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer min-h-[400px] flex flex-col items-center justify-center group ${
                    isDragging
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-slate-300 dark:border-slate-600 hover:border-blue-400 bg-slate-50 dark:bg-slate-700/50"
                  }`}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/png, image/jpeg, application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />

                  <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                    <Icon name="upload" size={32} />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    Drag & Drop your file here
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-6">
                    or click to browse
                  </p>

                  <button
                    type="button"
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isProcessing}
                  >
                    <Icon name="upload" size={18} />
                    {isProcessing ? "Processing..." : "Choose File"}
                  </button>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-6">
                    Supports JPG, PNG, PDF (Max 10MB)
                  </p>

                  {error && (
                    <div className="mt-4 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                </div>

                {/* Format Badges */}
                <div className="flex items-center flex-wrap gap-2 mt-4 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Supported formats:</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium border border-blue-100 dark:border-blue-800">
                    <Icon name="image" size={14} /> JPG
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-100 dark:border-emerald-800">
                    <Icon name="image" size={14} /> PNG
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium border border-rose-100 dark:border-rose-800">
                    <Icon name="pdf" size={14} /> PDF
                  </span>
                </div>
              </div>

              {/* RIGHT: Preview & Results */}
              <div className="lg:col-span-7 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-white dark:bg-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Image Preview */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4 min-h-[380px] flex flex-col justify-between">
                    {uploadedFile ? (
                      <>
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm p-2 h-full relative overflow-hidden">
                          {uploadedFile.type.startsWith("image/") ? (
                            <img
                              src={uploadedFile.previewUrl}
                              alt="Preview"
                              className="w-full h-full object-contain rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <div className="mx-auto mb-4 flex justify-center">
                                  <Icon name="pdf" size={48} className="text-rose-500" />
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">PDF Document</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
                          <span className="truncate max-w-[180px]">{uploadedFile.name}</span>
                          <span>({(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-sm p-4 h-full flex items-center justify-center">
                        <div className="text-center text-slate-400 dark:text-slate-500">
                          <div className="mx-auto mb-3 flex justify-center">
                            <Icon name="image" size={48} />
                          </div>
                          <p className="text-sm">No file uploaded</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Extracted Text */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4 min-h-[380px] flex flex-col justify-between">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Extracting text...</p>
                        </div>
                      </div>
                    ) : extractedText ? (
                      <>
                        <div className="space-y-4 overflow-y-auto max-h-[340px] pr-2">
                          <textarea
                            value={extractedText}
                            onChange={(e) => setExtractedText(e.target.value)}
                            readOnly={!isEditing}
                            className={`w-full h-full min-h-[320px] text-sm text-slate-800 dark:text-slate-200 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 ${
                              isEditing ? "bg-white dark:bg-slate-800 p-2 rounded border border-blue-300 dark:border-blue-600" : ""
                            }`}
                            style={{ whiteSpace: "pre-wrap" }}
                          />
                        </div>
                        <div className="border-t border-slate-200 dark:border-slate-600 pt-3 mt-2 text-xs text-slate-600 dark:text-slate-400">
                          <span>
                            Word count: <strong className="text-slate-800 dark:text-slate-200">{wordCount}</strong>
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-slate-400 dark:text-slate-500">
                          <div className="mx-auto mb-3 flex justify-center">
                            <Icon name="pdf" size={48} className="text-rose-500" />
                          </div>
                          <p className="text-sm">No text extracted yet</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between flex-wrap gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyText}
                      disabled={!extractedText}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="clipboard" size={16} />
                      Copy
                    </button>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      disabled={!extractedText}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="spark" size={16} />
                      {isEditing ? "Done" : "Edit"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={downloadText}
                      disabled={!extractedText}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="download" size={16} />
                      Download TXT
                    </button>
                    <button
                      onClick={clearContent}
                      disabled={!uploadedFile}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="trash" size={16} />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
                <Icon name="arrow" size={16} />
              </span>
              Back to homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
