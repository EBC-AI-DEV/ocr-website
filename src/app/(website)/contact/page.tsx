import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Contact Us
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg mb-4">
            <Icon name="globe" size={22} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Email Us
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-3">
            For support, feedback, or partnership inquiries, reach out to us at:
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-5">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            Common Questions
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Before reaching out, check our{" "}
            <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              FAQ section
            </Link>{" "}
            for answers to common questions about file formats, accuracy, and privacy.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2">
            Response Time
          </h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We typically respond within 24-48 hours during business days.
            For urgent matters, please mention &quot;urgent&quot; in your subject line.
          </p>
        </div>
      </div>
    </div>
  );
}
