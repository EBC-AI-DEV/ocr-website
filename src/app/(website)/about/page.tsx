"use client";

import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div id="about" className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {t("about.title")}
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {t("about.description")}
          </p>

          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t("about.missionTitle")}
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {t("about.missionText")}
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t("about.featuresTitle")}
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                <Icon name="check" size={16} className="text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("about.feature1")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                <Icon name="check" size={16} className="text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("about.feature2")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                <Icon name="check" size={16} className="text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("about.feature3")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                <Icon name="check" size={16} className="text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("about.feature4")}</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                <Icon name="check" size={16} className="text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                <span>{t("about.feature5")}</span>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t("about.privacyTitle")}
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {t("about.privacyText")}
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {t("about.contactTitle")}
            </h2>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {t("about.contactText")}{" "}
              <a href="mailto:hello@ebcocr.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                hello@ebcocr.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
