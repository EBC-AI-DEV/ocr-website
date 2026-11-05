"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            Everything you need to know before converting your first document.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            Still have questions? Contact us <Icon name="arrow" size={14} />
          </a>
        </div>

        <div className="space-y-4 mb-12">
          <details
            open
            className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {t("faq.q1")}
              <Icon name="chevron" size={18} className="group-open:rotate-180 transition-transform" />
            </summary>
            <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("faq.a1")}
            </p>
          </details>

          <details className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {t("faq.q2")}
              <Icon name="chevron" size={18} className="group-open:rotate-180 transition-transform" />
            </summary>
            <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("faq.a2")}
            </p>
          </details>

          <details className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {t("faq.q3")}
              <Icon name="chevron" size={18} className="group-open:rotate-180 transition-transform" />
            </summary>
            <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("faq.a3")}
            </p>
          </details>

          <details className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {t("faq.q5")}
              <Icon name="chevron" size={18} className="group-open:rotate-180 transition-transform" />
            </summary>
            <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              {t("faq.a5")}
            </p>
          </details>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Icon name="upload" size={17} /> Start Converting
          </Link>
        </div>
      </div>
    </section>
  );
}
