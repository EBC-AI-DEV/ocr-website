"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Main Footer Section */}
      <footer className="border-t border-slate-200 bg-slate-50 py-10 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

            {/* Column 1: Brand, Social Links & Language Switcher */}
            <div className="flex flex-col items-center sm:items-start">
              {/* Logo */}
              <div className="mb-6">
                <a
                  href={language === "km" ? "https://ebc.edu.kh/" : "https://ebc.edu.kh/en/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform hover:opacity-90"
                  aria-label="EBC Educational Broadcasting Cambodia"
                >
                  <Image
                    src="/ebc_logo_light.png"
                    alt="EBC Educational Broadcasting Cambodia"
                    className="h-12 w-auto object-contain sm:h-14 dark:hidden"
                    width={180}
                    height={70}
                  />
                  <Image
                    src="/ebc_logo_dark.png"
                    alt="EBC Educational Broadcasting Cambodia"
                    className="hidden h-12 w-auto object-contain sm:h-14 dark:block"
                    width={180}
                    height={70}
                  />
                </a>
              </div>

              {/* Social & Platform Links (Row 1) */}
              <div className="mb-3 flex items-center gap-3">
                {/* Digital Content */}
                <div className="group relative inline-flex">
                  <a
                    href="https://ebc.edu.kh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A75BB] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#155a94] focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155a94]"
                    aria-label={t("footer.digitalContent")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.digitalContent")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>

                {/* eLearning */}
                <div className="group relative inline-flex">
                  <a
                    href={`https://elearning.ebc.edu.kh/?lang=${language}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A75BB] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#155a94] focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155a94]"
                    aria-label={t("footer.elearning")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                      <path d="M22 10v6" />
                      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.elearning")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>

                {/* eLibrary */}
                <div className="group relative inline-flex">
                  <a
                    href="https://elibrary.ebc.edu.kh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A75BB] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#155a94] focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155a94]"
                    aria-label={t("footer.elibrary")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.elibrary")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>

                {/* IPTV */}
                <div className="group relative inline-flex">
                  <a
                    href="https://iptv.ebc.edu.kh/iptv/channel/1.m3u8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A75BB] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#155a94] focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155a94]"
                    aria-label={t("footer.iptv")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="3" rx="2" />
                      <line x1="8" x2="16" y1="21" y2="21" />
                      <line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.iptv")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>
              </div>

              {/* Social Links (Row 2) */}
              <div className="flex items-center gap-3">
                {/* 3D Museum */}
                <div className="group relative inline-flex">
                  <a
                    href="https://3d.ebc.edu.kh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A75BB] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#155a94] focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155a94]"
                    aria-label={t("footer.museum3d")}
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718" />
                      <path d="M12 22v-10" />
                      <path d="M12 12l8.73 -5.04" />
                      <path d="M3.27 6.96l8.73 5.04" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.museum3d")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>

                {/* Facebook */}
                <div className="group relative inline-flex">
                  <a
                    href="https://www.facebook.com/EducationalBroadcastingCambodia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A75BB] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#155a94] focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155a94]"
                    aria-label={t("footer.facebook")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.facebook")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>

                {/* YouTube */}
                <div className="group relative inline-flex">
                  <a
                    href="https://www.youtube.com/@EBC_Cambodia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EE4035] !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-[#c0302a] focus:outline-none focus:ring-2 focus:ring-[#EE4035] focus:ring-offset-2 dark:bg-[#EE4035] dark:hover:bg-[#c0302a]"
                    aria-label={t("footer.youtube")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.youtube")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>

                {/* TikTok */}
                <div className="group relative inline-flex">
                  <a
                    href="https://www.tiktok.com/@ebcambodia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black !text-white shadow-sm transition-all duration-150 hover:scale-105 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:border dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                    aria-label={t("footer.tiktok")}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                  <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    {t("footer.tiktok")}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links (តំណភ្ជាប់រហ័ស) */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="mb-4 text-xl font-bold text-[#EE4035] sm:mb-6 sm:text-2xl dark:text-[#ff6b6b]">
                {t("footer.quickLinks")}
              </h3>
              <div className="flex gap-8 sm:gap-10">
                {/* Sub-column 1 */}
                <ul className="space-y-2.5 text-center text-sm sm:text-left sm:text-[15px]">
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/steering-committees/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.steeringCommittees")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/about-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.aboutUsEbc")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/what-we-do/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.whatWeDo")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/service-facilities/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.servicesFacilities")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/platformecosystem/#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.platformEcosystem")}
                    </a>
                  </li>
                </ul>

                {/* Sub-column 2 */}
                <ul className="space-y-2.5 text-center text-sm sm:text-left sm:text-[15px]">
                  <li>
                    <a
                      href="https://ebc.edu.kh/videos/?type=latest-event"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.events")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/all-scholarships/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.scholarships")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/news/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.news")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ebc.edu.kh/en/get-all-programs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                    >
                      {t("footer.programs")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3: Help Center (មជ្ឈមណ្ឌលជំនួយ) */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="mb-4 text-xl font-bold text-[#EE4035] sm:mb-6 sm:text-2xl dark:text-[#ff6b6b]">
                {t("footer.helpCenter")}
              </h3>
              <ul className="space-y-2.5 text-center text-sm sm:text-left sm:text-[15px]">
                <li>
                  <a
                    href="https://t.me/ebc_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {t("footer.support")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeLiSQZZc9fNJLml9skiBBy-6WDXpsNwnDbfVfX4PBtJ09NOw/viewform?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {t("footer.ticketSupport")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/playlist?list=PLxcO_MFWQBDfJRhsDTNPA5lwesdCMKF4d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {t("footer.teacherTutorials")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/playlist?list=PLxcO_MFWQBDcWDGNpPoSbtMbFSKsc3il9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {t("footer.adminTutorials")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us (ទាក់ទង​យើងខ្ញុំ) */}
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="mb-4 text-xl font-bold text-[#EE4035] sm:mb-6 sm:text-2xl dark:text-[#ff6b6b]">
                {t("footer.contactUs")}
              </h3>
              <ul className="w-full space-y-3 text-sm sm:text-[15px]">
                {/* Email */}
                <li className="flex items-start justify-center gap-2.5 sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[#1A75BB] dark:text-[#38bdf8]"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <a
                    href="mailto:info@ebc.edu.kh"
                    className="break-all text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    info@ebc.edu.kh
                  </a>
                </li>

                {/* General Phone */}
                <li className="flex items-start justify-center gap-2.5 sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[#1A75BB] dark:text-[#38bdf8]"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <a
                    href="tel:+85512299600"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {language === "km" ? "+855 12 299 600 ព័ត៌មានទូទៅ" : "+855 12 299 600 (General Inquiries)"}
                  </a>
                </li>

                {/* Technical Phone */}
                <li className="flex items-start justify-center gap-2.5 sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[#1A75BB] dark:text-[#38bdf8]"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <a
                    href="tel:+85510299600"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {language === "km" ? "+855 10 299 600 ព័ត៌មានបច្ចេកទេស" : "+855 10 299 600 (Technical Support)"}
                  </a>
                </li>

                {/* Address */}
                <li className="flex items-start justify-center gap-2.5 sm:justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mt-0.5 shrink-0 text-[#1A75BB] dark:text-[#38bdf8]"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <a
                    href="https://www.google.com/maps/place/EBC+Educational+Broadcasting+Cambodia/@11.537949,104.9068256,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-700 transition-colors hover:text-[#EE4035] dark:text-slate-300 dark:hover:text-[#ff6b6b]"
                  >
                    {t("footer.address")}
                  </a>
                </li>
              </ul>

              {/* Contact Button */}
              <div className="mt-6">
                <a
                  href="mailto:info@ebc.edu.kh?subject=Contact%20from%20Smart%20Khmer%20Keyboard"
                  className="inline-flex items-center gap-2 rounded-md bg-[#1A75BB] px-6 py-2.5 text-sm font-semibold !text-white shadow-sm transition-all duration-150 hover:bg-[#155a94] hover:shadow focus:outline-none focus:ring-2 focus:ring-[#1A75BB] focus:ring-offset-2 dark:bg-[#1A75BB] dark:hover:bg-[#155e96]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {t("footer.contactBtn")}
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-slate-200 bg-slate-100/90 py-4 text-slate-600 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-xs sm:text-sm md:flex-row md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <p className="m-0 font-normal text-slate-700 dark:text-slate-300">
                {t("footer.copyright")}
              </p>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <a
                  href="https://ebc.edu.kh/en/privacy-policies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 underline-offset-2 transition-colors hover:text-slate-950 hover:underline dark:text-slate-300 dark:hover:text-white"
                >
                  {t("footer.privacy")}
                </a>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <a
                  href="https://ebc.edu.kh/en/term-and-conditions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-700 underline-offset-2 transition-colors hover:text-slate-950 hover:underline dark:text-slate-300 dark:hover:text-white"
                >
                  {t("footer.terms")}
                </a>
              </div>
            </div>

            <a
              href="https://mptc.gov.kh/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-800 underline-offset-2 transition-colors hover:text-[#1A75BB] hover:underline dark:text-slate-200 dark:hover:text-[#38bdf8]"
            >
              {t("footer.mptc")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
