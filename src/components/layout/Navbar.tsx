"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

interface LogoProps {
  onClick?: () => void;
}

function Logo({ onClick }: LogoProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const logoContent = (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 h-9 w-auto">
        <img
          src="/logo/ebc_logo.png"
          alt="EBC Logo"
          className="h-full w-auto object-contain"
          loading="eager"
        />
      </div>
      <div className="hidden sm:flex flex-col justify-center">
        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight whitespace-nowrap">
          បម្លែងរូបភាពទៅជាអត្ថបទ
        </div>
        <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">
          Optical Character Recognition
        </div>
      </div>
    </div>
  );

  const baseClasses = "flex items-center transition-opacity hover:opacity-90 cursor-pointer";

  if (onClick) {
    return (
      <div
        className={baseClasses}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Go to home page"
      >
        {logoContent}
      </div>
    );
  }

  return (
    <Link href="/" className={baseClasses} aria-label="EBC OCR - Home">
      {logoContent}
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard accessibility: Escape to close menus
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLangMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinkClass = (path: string) => {
    const active = isActive(path);
    return `relative px-3 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${active
      ? "text-slate-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-500 after:rounded-full after:shadow-sm after:shadow-blue-500/50"
      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
      }`;
  };

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-slate-900/50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section - Left */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Navigation Links - Center/Left (Desktop only) */}
        <nav
          className="hidden lg:flex items-center space-x-1"
          aria-label="Primary navigation"
        >
          <Link href="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>
            {t("nav.home")}
          </Link>
          <Link href="/how-it-works" className={navLinkClass("/how-it-works")} onClick={() => setMenuOpen(false)}>
            {t("nav.howItWorks")}
          </Link>
          <Link href="/about" className={navLinkClass("/about")} onClick={() => setMenuOpen(false)}>
            {t("nav.about")}
          </Link>
        </nav>

        {/* Action Items - Right */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-200 cursor-pointer"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <Icon name={theme === "light" ? "moon" : "sun"} size={18} />
          </button>

          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              className="h-10 px-3 flex items-center gap-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-200 text-sm font-semibold whitespace-nowrap cursor-pointer"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Switch language"
              title="Switch language"
              aria-expanded={langMenuOpen}
            >
              <img
                src={language === "km" ? "/images/khmer.png" : "/images/english.png"}
                alt={language === "km" ? "Khmer flag" : "English flag"}
                width={20}
                height={14}
                className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
              />
              <span className="hidden sm:inline">{language === "en" ? "EN" : "KH"}</span>
              <Icon name="chevron" size={12} />
            </button>

            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-[180px] bg-white dark:bg-slate-900/95 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-slate-950/50 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button
                  onClick={() => {
                    setLanguage("en");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${language === "en"
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  <img
                    src="/images/english.png"
                    alt="English flag"
                    width={24}
                    height={18}
                    className="w-6 h-[18px] object-cover rounded shadow-sm"
                  />
                  <span className="flex-1 text-left">English</span>
                  {language === "en" && <Icon name="check" size={16} />}
                </button>
                <button
                  onClick={() => {
                    setLanguage("km");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${language === "km"
                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  <img
                    src="/images/khmer.png"
                    alt="Khmer flag"
                    width={24}
                    height={18}
                    className="w-6 h-[18px] object-cover rounded shadow-sm"
                  />
                  <span className="flex-1 text-left">ខ្មែរ</span>
                  {language === "km" && <Icon name="check" size={16} />}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-200 cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown (< lg) */}
      {menuOpen && (
        <div
          role="navigation"
          aria-label="Mobile navigation"
          className="lg:hidden w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50/98 dark:bg-slate-950/98 backdrop-blur-xl shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-1">
            <Link
              href="/"
              className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${isActive("/")
                ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.home")}</span>
              {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
            </Link>
            <Link
              href="/how-it-works"
              className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${isActive("/how-it-works")
                ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.howItWorks")}</span>
              {isActive("/how-it-works") && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
            </Link>
            <Link
              href="/features"
              className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${isActive("/features")
                ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.features")}</span>
              {isActive("/features") && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
            </Link>
            <Link
              href="/faq"
              className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${isActive("/faq")
                ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.faq")}</span>
              {isActive("/faq") && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
            </Link>
            <Link
              href="/about"
              className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${isActive("/about")
                ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                }`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.about")}</span>
              {isActive("/about") && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />}
            </Link>
            <Link
              href="/upload"
              className="mt-2 px-3 py-3 text-sm font-bold rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap text-center flex items-center justify-center gap-2 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="upload" size={16} />
              <span>{t("header.uploadFile")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
