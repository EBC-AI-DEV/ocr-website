"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProcessingState() {
  const { language } = useLanguage();
  const isKm = language === "km";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 text-center">
      <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
        <span className="absolute inset-0 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
        <Icon name="file" size={28} className="text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
        {isKm ? "កំពុងអានឯកសាររបស់អ្នក..." : "Reading your document..."}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
        {isKm
          ? "កំពុងសម្គាល់អត្ថបទជាភាសាខ្មែរ និងអង់គ្លេស។ ដំណើរការនេះចំណាយពេលត្រឹមតែប៉ុន្មានវិនាទីប៉ុណ្ណោះ។"
          : "Detecting Khmer and English text. This usually takes a few seconds."}
      </p>
      <div className="relative w-full max-w-xs mx-auto h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
        <span
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full animate-pulse"
          style={{ width: "70%" }}
        />
      </div>
      <small className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {isKm ? "កំពុងដំណើរការទំព័រ ១ នៃ ១" : "PROCESSING PAGE 1 OF 1"}
      </small>
    </div>
  );
}
