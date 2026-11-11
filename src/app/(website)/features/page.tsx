"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {t("features.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <article className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-[box-shadow,transform,border-color] duration-300 ease-out">
            <span className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 dark:bg-indigo-950 rounded-xl mb-5">
              <Icon name="spark" size={23} className="text-indigo-600 dark:text-indigo-400" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {t("features.feature1Title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {t("features.feature1Desc")}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Bilingual by default <Icon name="arrow" size={14} />
            </span>
          </article>

          <article className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-[box-shadow,transform,border-color] duration-300 ease-out">
            <span className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 dark:bg-emerald-950 rounded-xl mb-5">
              <Icon name="check" size={23} className="text-emerald-600 dark:text-emerald-400" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {t("features.feature3Title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {t("features.feature3Desc")}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {t("features.feature4Desc")} <Icon name="arrow" size={14} />
            </span>
          </article>

          <article className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-[box-shadow,transform,border-color] duration-300 ease-out">
            <span className="inline-flex items-center justify-center w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
              <Icon name="file" size={23} className="text-slate-600 dark:text-slate-400" />
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {t("features.feature5Title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {t("features.feature5Desc")}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              Export to TXT or Word <Icon name="arrow" size={14} />
            </span>
          </article>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-px active:translate-y-0 active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-200 ease-out"
          >
            <Icon name="upload" size={17} /> Try It Now
          </Link>
        </div>
      </div>
    </section>
  );
}
