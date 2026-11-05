"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatFileSize, getFileTypeLabel, debounce } from "@/lib/utils";
import { ZOOM_CONFIG, CANVAS_CONFIG, ANIMATION_CONFIG } from "@/constants";
import { useLanguage } from "@/contexts/LanguageContext";

type ScannerMode = "standard" | "scanner" | "line-detection";

interface FilePreviewProps {
  fileName: string;
  previewUrl: string;
  fileType: string;
  fileSize: number;
}

export function FilePreview({
  fileName,
  previewUrl,
  fileType,
  fileSize,
}: FilePreviewProps) {
  const { language } = useLanguage();
  const isKm = language === "km";
  const [zoom, setZoom] = useState<number>(ZOOM_CONFIG.DEFAULT);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);
  const [scannerMode] = useState<ScannerMode>("standard");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isPDF = fileType === "application/pdf";
  const isImage = fileType.startsWith("image/");

  const MIN_ZOOM = ZOOM_CONFIG.MIN;
  const MAX_ZOOM = ZOOM_CONFIG.MAX;
  const ZOOM_STEP = ZOOM_CONFIG.STEP;

  // Reset state when file changes - legitimate use of setState in effect for prop-driven reset
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoom(ZOOM_CONFIG.DEFAULT);
    setCurrentPage(1);
    setImageLoaded(false);
  }, [previewUrl]);

  // Cleanup canvas on unmount
  useEffect(() => {
    const canvas = canvasRef.current;
    return () => {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, []);

  // Draw line detection overlay on canvas with proper coordinate mapping
  const drawLineDetection = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !imageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    if (!ctx) return;

    // Get the actual rendered dimensions of the image
    const renderedWidth = img.clientWidth;
    const renderedHeight = img.clientHeight;

    // Calculate the actual displayed image dimensions considering object-fit: contain
    const imageAspectRatio = img.naturalWidth / img.naturalHeight;
    const containerAspectRatio = renderedWidth / renderedHeight;

    let displayedWidth = renderedWidth;
    let displayedHeight = renderedHeight;
    let offsetX = 0;
    let offsetY = 0;

    // object-fit: contain centers the image and may add letterboxing
    if (imageAspectRatio > containerAspectRatio) {
      // Image is wider - letterbox top/bottom
      displayedWidth = renderedWidth;
      displayedHeight = renderedWidth / imageAspectRatio;
      offsetY = (renderedHeight - displayedHeight) / 2;
    } else {
      // Image is taller - letterbox left/right
      displayedHeight = renderedHeight;
      displayedWidth = renderedHeight * imageAspectRatio;
      offsetX = (renderedWidth - displayedWidth) / 2;
    }

    // Set canvas size to match container (not just image)
    canvas.width = renderedWidth;
    canvas.height = renderedHeight;

    // Calculate scale factors based on displayed dimensions
    const scaleX = displayedWidth / img.naturalWidth;
    const scaleY = displayedHeight / img.naturalHeight;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Simulated text line detection boxes (normalized coordinates 0-1)
    const simulatedLines = [
      { x: 0.1, y: 0.15, width: 0.8, height: 0.08 },
      { x: 0.1, y: 0.28, width: 0.75, height: 0.08 },
      { x: 0.1, y: 0.41, width: 0.85, height: 0.08 },
      { x: 0.1, y: 0.54, width: 0.7, height: 0.08 },
      { x: 0.1, y: 0.67, width: 0.82, height: 0.08 },
    ];

    // Draw bounding boxes with proper coordinate mapping and offset
    ctx.strokeStyle = CANVAS_CONFIG.STROKE_COLOR;
    ctx.lineWidth = CANVAS_CONFIG.STROKE_WIDTH;
    ctx.fillStyle = CANVAS_CONFIG.FILL_COLOR;

    simulatedLines.forEach((line) => {
      const naturalX = line.x * img.naturalWidth;
      const naturalY = line.y * img.naturalHeight;
      const naturalW = line.width * img.naturalWidth;
      const naturalH = line.height * img.naturalHeight;

      const x = naturalX * scaleX + offsetX;
      const y = naturalY * scaleY + offsetY;
      const w = naturalW * scaleX;
      const h = naturalH * scaleY;

      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    });
  }, [imageLoaded]);

  // Redraw on mode change, zoom change, or image load
  useEffect(() => {
    if (scannerMode === "line-detection" && isImage && imageLoaded) {
      requestAnimationFrame(drawLineDetection);
    }
  }, [scannerMode, isImage, imageLoaded, zoom, drawLineDetection]);

  // Handle window resize to redraw boxes with debouncing
  useEffect(() => {
    if (scannerMode === "line-detection" && isImage) {
      const handleResize = debounce(() => {
        requestAnimationFrame(drawLineDetection);
      }, ANIMATION_CONFIG.RESIZE_DEBOUNCE);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [scannerMode, isImage, imageLoaded, drawLineDetection]);

  const handleImageLoad = () => {
    setImageLoaded(true);

    if (imageRef.current) {
      setCanvasSize({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      });
    }

    if (scannerMode === "line-detection") {
      setTimeout(() => {
        requestAnimationFrame(drawLineDetection);
      }, ANIMATION_CONFIG.IMAGE_LOAD_DELAY);
    }
  };

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      setCanvasSize({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      });
    }
  }, [imageLoaded, zoom]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  };

  const handleResetZoom = () => {
    setZoom(ZOOM_CONFIG.DEFAULT);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section
      className="flex flex-col h-full min-h-[660px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      aria-label="Original document preview"
    >
      {/* Header */}
      <div className="h-18 flex-shrink-0 flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-100 dark:border-blue-900/60 shadow-xs">
            <Icon name={isPDF ? "file" : "image"} size={19} />
          </span>
          <div className="min-w-0">
            <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate block">
              {fileName}
            </strong>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>{getFileTypeLabel(fileType, language)}</span>
              <span>•</span>
              <span>{formatFileSize(fileSize)}</span>
            </span>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold shadow-xs flex-shrink-0">
          {isKm ? `ទំព័រ ${currentPage} នៃ ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
        </span>
      </div>

      {/* Document Viewer Stage */}
      <div
        ref={containerRef}
        className={`flex-1 min-h-0 relative flex items-center justify-center overflow-auto p-4 sm:p-6 transition-colors duration-300 ${
          scannerMode === "scanner"
            ? "bg-slate-100 dark:bg-slate-900"
            : "bg-slate-100/70 dark:bg-slate-950/40"
        }`}
      >
        {isImage ? (
          <div className="relative inline-block max-w-full max-h-full">
            <img
              ref={imageRef}
              onLoad={handleImageLoad}
              className={`max-w-full max-h-full object-contain rounded-xl shadow-md border border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
                scannerMode === "scanner"
                  ? "bg-white dark:bg-slate-800 border-4 border-blue-500 dark:border-blue-600 contrast-110 brightness-105"
                  : "bg-white dark:bg-slate-800"
              }`}
              src={previewUrl}
              alt={fileName}
              style={{
                transform: `scale(${zoom / 100})`,
                transition: "transform 0.2s ease, filter 0.3s ease",
                cursor: zoom > 100 ? "grab" : "default",
                filter: scannerMode === "scanner" ? "saturate(1.1) sharpen(1)" : "none",
              }}
              draggable={false}
            />

            {/* Line Detection Overlay */}
            {scannerMode === "line-detection" && imageLoaded && (
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 pointer-events-none rounded-xl"
                style={{
                  width: canvasSize.width || 0,
                  height: canvasSize.height || 0,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "center center",
                }}
              />
            )}

            {/* Scanner Effect Overlay */}
            {scannerMode === "scanner" && (
              <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-blue-500/10 animate-pulse" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 shadow-lg shadow-blue-500/50 animate-scan" />
              </div>
            )}
          </div>
        ) : isPDF ? (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={`${previewUrl}#page=${currentPage}&view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
              title={`Preview of ${fileName}`}
              className="w-full h-full rounded-xl shadow-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
              style={{
                minHeight: "560px",
                maxWidth: "100%",
                transform: `scale(${zoom / 100})`,
                transformOrigin: "center center",
                transition: "transform 0.2s ease",
              }}
            />
          </div>
        ) : (
          <div
            className="document-paper shadow-xl dark:shadow-slate-950/50"
            style={{
              transform: `scale(${zoom / 100})`,
              transition: "transform 0.2s ease",
            }}
          >
            <div className="paper-brand">
              <span className="paper-logo">
                <Icon name="scan" size={13} />
              </span>{" "}
              EBC DOCUMENT
            </div>
            <div className="paper-rule" />
            <p className="khmer paper-title">សូមស្វាគមន៍មកកាន់ EBC OCR</p>
            <p className="khmer paper-copy">
              បច្ចេកវិទ្យា OCR របស់យើងជួយបម្លែងរូបភាព និងឯកសារ PDF
              ទៅជាអត្ថបទដែលអាចកែសម្រួលបានយ៉ាងរហ័ស និងត្រឹមត្រូវ។
            </p>
            <p className="paper-title">Welcome to EBC OCR</p>
            <p className="paper-copy">
              Our OCR technology helps you convert images and PDF documents into
              editable text quickly and accurately.
            </p>
            <div className="paper-table">
              <span>DOCUMENT ID</span>
              <b>EBC-2025-0614</b>
              <span>LANGUAGE</span>
              <b>Khmer + English</b>
            </div>
            <div className="paper-signature">EBC Digital Services</div>
          </div>
        )}
      </div>

      {/* Bottom Control Bar */}
      <div className="h-12 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 px-4 sm:px-5 flex items-center justify-between flex-shrink-0 text-xs">
        {/* Left: Zoom Display / Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetZoom}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isKm ? "កំណត់ទំហំដើម (100%)" : "Reset zoom to 100%"}
          >
            <span>{zoom}%</span>
            {zoom !== 100 && (
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                ({isKm ? "កំណត់ឡើងវិញ" : "Reset"})
              </span>
            )}
          </button>
        </div>

        {/* Right: Controls (PDF navigation + Zoom in/out) */}
        <div className="flex items-center gap-2">
          {/* Page Navigation for PDF */}
          {isPDF && totalPages > 1 && (
            <div className="flex items-center gap-1 mr-2 pr-2 border-r border-slate-200 dark:border-slate-700">
              <button
                type="button"
                aria-label={isKm ? "ទំព័រមុន" : "Previous page"}
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <div className="rotate-90">
                  <Icon name="chevron" size={13} />
                </div>
              </button>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 px-1.5">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                aria-label={isKm ? "ទំព័របន្ទាប់" : "Next page"}
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <div className="-rotate-90">
                  <Icon name="chevron" size={13} />
                </div>
              </button>
            </div>
          )}

          {/* Zoom Buttons Pill */}
          <div className="inline-flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-xs">
            <button
              type="button"
              aria-label={isKm ? "បង្រួម" : "Zoom out"}
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors text-base font-bold"
            >
              −
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
            <button
              type="button"
              aria-label={isKm ? "ពង្រីក" : "Zoom in"}
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="w-7 h-7 flex items-center justify-center rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors text-base font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
