"use client";

import { useState } from "react";
import { Icon, IconName } from "@/components/ui/Icon";
import { Toast } from "@/components/ui/Toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteConfig } from "@/config/site";
import UploadPage from "./upload/page";

export default function Home() {
  const { t } = useLanguage();
  const [toast, setToast] = useState("");

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero py-8 sm:py-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>{t("hero.title")}</h1>
            <p>{t("hero.subtitle")}</p>

            <div className="trust-row">
              <span>
                <Icon name="check" size={15} /> {t("hero.noAccount")}
              </span>
              <span>
                <Icon name="check" size={15} /> {t("hero.filesPrivate")}
              </span>
              <span>
                <Icon name="check" size={15} /> {t("hero.khmerEnglish")}
              </span>
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Document to text illustration"
          >
            <div className="visual-glow" />
            <div className="visual-document">
              <div className="visual-doc-top">
                <span>
                  <Icon name="file" size={15} /> {t("hero.sourceDocument")}
                </span>
                <small>KH + EN</small>
              </div>
              <div className="visual-lines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <p className="khmer">អត្ថបទខ្មែរ និង English</p>
            </div>
            <span className="visual-scan">
              <Icon name="scan" size={22} />
            </span>
            <div className="visual-output">
              <span>
                <Icon name="check" size={14} /> {t("hero.textRecognized")}
              </span>
              <strong>98.6%</strong>
              <p>{t("hero.readyToEdit")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* OCR Upload Section */}
      <UploadPage />

      {/* How It Works Section */}
      <section className="how-section bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="how-it-works">
        <div className="section-heading centered">
          <div>
            <h2>{t("howItWorks.title")}</h2>
            <p>{t("howItWorks.subtitle")}</p>
          </div>
        </div>
        <div className="steps">
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
            <article className="step-card" key={step.n}>
              <span className="step-number">{step.n}</span>
              <span className="step-icon">
                <Icon name={step.icon} size={24} />
              </span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section py-16 sm:py-20 bg-white dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300" id="about">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              {t("about.eyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              {t("about.title")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              {t("about.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
              <span className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Icon name="spark" size={22} />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("about.missionTitle")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("about.missionText")}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
              <span className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Icon name="check" size={22} />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("about.featuresTitle")}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>{t("about.feature1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>{t("about.feature2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <span>{t("about.feature4")}</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
              <span className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Icon name="file" size={22} />
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {t("about.privacyTitle")}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("about.privacyText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section bg-slate-50 dark:bg-slate-950 transition-colors duration-300" id="faq">
        <div className="faq-intro">
          <h2>{t("faq.title")}</h2>
          <p>
            {t("faq.subtitle")}
          </p>
          <a href={`mailto:${siteConfig.email}`}>
            {t("faq.contact")} <Icon name="arrow" size={14} />
          </a>
        </div>
        <div className="faq-list">
          <details open>
            <summary>
              {t("faq.q1")}
              <Icon name="chevron" size={18} />
            </summary>
            <p>{t("faq.a1")}</p>
          </details>
          <details>
            <summary>
              {t("faq.q2")}
              <Icon name="chevron" size={18} />
            </summary>
            <p>{t("faq.a2")}</p>
          </details>
          <details>
            <summary>
              {t("faq.q3")}
              <Icon name="chevron" size={18} />
            </summary>
            <p>{t("faq.a3")}</p>
          </details>
          <details>
            <summary>
              {t("faq.q5")}
              <Icon name="chevron" size={18} />
            </summary>
            <p>{t("faq.a5")}</p>
          </details>
        </div>
      </section>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </>
  );
}
