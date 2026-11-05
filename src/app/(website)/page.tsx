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
      <section className="hero py-8 sm:py-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
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
