"use client";

import { Icon, IconName } from "@/components/ui/Icon";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function HowItWorksPage() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-10 sm:py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: "upload" as IconName,
              n: "01",
              title: t("howItWorks.step1Title"),
              copy: t("howItWorks.step1Desc"),
            },
            {
              icon: "scan" as IconName,
              n: "02",
              title: t("howItWorks.step2Title"),
              copy: t("howItWorks.step2Desc"),
            },
            {
              icon: "clipboard" as IconName,
              n: "03",
              title: t("howItWorks.step3Title"),
              copy: t("howItWorks.step3Desc"),
            },
          ].map((step) => (
            <article key={step.n} className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-[box-shadow,transform,border-color] duration-300 ease-out">
              <span className="absolute -top-4 -left-4 flex items-center justify-center w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg">
                {step.n}
              </span>
              <span className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-950 rounded-xl mb-5 mt-2">
                <Icon name={step.icon} size={24} className="text-blue-600 dark:text-blue-400" />
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.copy}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-px active:translate-y-0 active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-200 ease-out"
          >
            <Icon name="upload" size={17} /> Start Converting Now
          </Link>
        </div>
      </div>
    </section>
  );
}
