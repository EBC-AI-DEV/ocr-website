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
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (["home", "how-it-works", "about"].includes(hash)) {
        return hash;
      }
    }
    return "home";
  });
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isManualNavigationRef = useRef<boolean>(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const navItems = [
    { id: "home", href: "/#home", label: t("nav.home") },
    { id: "how-it-works", href: "/#how-it-works", label: t("nav.howItWorks") },
    { id: "about", href: "/#about", label: t("nav.about") },
  ];

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

  // Smooth scroll handler for nav items
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    setMenuOpen(false);

    if (pathname === "/") {
      e.preventDefault();

      // Lock scroll listener to prevent it from overriding active section during smooth scrolling
      isManualNavigationRef.current = true;
      if (manualNavTimeoutRef.current) {
        clearTimeout(manualNavTimeoutRef.current);
      }
      manualNavTimeoutRef.current = setTimeout(() => {
        isManualNavigationRef.current = false;
      }, 1000);

      // Immediately activate clicked section
      setActiveSection(sectionId);
      window.history.pushState(null, "", `/#${sectionId}`);

      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          const navbarHeight = headerRef.current?.offsetHeight || 80;
          const rect = targetElement.getBoundingClientRect();
          const targetPosition = rect.top + window.scrollY - navbarHeight;
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth",
          });
        }
      }
    }
  };

  // Smooth scroll handler for logo
  const handleLogoClick = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      isManualNavigationRef.current = true;
      if (manualNavTimeoutRef.current) {
        clearTimeout(manualNavTimeoutRef.current);
      }
      manualNavTimeoutRef.current = setTimeout(() => {
        isManualNavigationRef.current = false;
      }, 1000);

      setActiveSection("home");
      window.history.pushState(null, "", "/#home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ScrollSpy to highlight active section on the landing page
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      // Do not overwrite active section if user just clicked a menu link
      if (isManualNavigationRef.current) return;

      const navbarHeight = headerRef.current?.offsetHeight || 80;
      const scrollY = window.scrollY;

      // 1. If near the top, always highlight "home"
      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // 2. If scrolled near the bottom of the page, highlight the last section ("about")
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollY >= docHeight - 80) {
        setActiveSection("about");
        return;
      }

      // 3. Generous threshold for section activation (top 40% of viewport)
      const threshold = navbarHeight + windowHeight * 0.4;

      const aboutEl = document.getElementById("about");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > navbarHeight + 40) {
          setActiveSection("about");
          return;
        }
      }

      const howEl = document.getElementById("how-it-works");
      if (howEl) {
        const rect = howEl.getBoundingClientRect();
        if (rect.top <= threshold && rect.bottom > navbarHeight + 40) {
          setActiveSection("how-it-works");
          return;
        }
      }

      setActiveSection("home");
    };

    // If user manually scrolls via wheel or touch, release navigation lock immediately
    const handleUserInteraction = () => {
      if (isManualNavigationRef.current) {
        isManualNavigationRef.current = false;
        if (manualNavTimeoutRef.current) {
          clearTimeout(manualNavTimeoutRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });

    // Initial check if not locked
    if (!isManualNavigationRef.current) {
      handleScroll();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      if (manualNavTimeoutRef.current) {
        clearTimeout(manualNavTimeoutRef.current);
      }
    };
  }, [pathname]);

  // Handle URL hash on initial load or route transition smoothly
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      if (["home", "how-it-works", "about"].includes(targetId)) {
        isManualNavigationRef.current = true;
        if (manualNavTimeoutRef.current) {
          clearTimeout(manualNavTimeoutRef.current);
        }
        manualNavTimeoutRef.current = setTimeout(() => {
          isManualNavigationRef.current = false;
        }, 1200);

        setTimeout(() => {
          setActiveSection(targetId);
          const element = document.getElementById(targetId);
          if (element) {
            const navbarHeight = headerRef.current?.offsetHeight || 80;
            const rect = element.getBoundingClientRect();
            const targetPosition = rect.top + window.scrollY - navbarHeight;
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }
  }, [pathname]);

  const isSectionActive = (sectionId: string) => {
    if (pathname === "/") {
      return activeSection === sectionId;
    }
    if (sectionId === "home") {
      return pathname === "/";
    }
    return pathname === `/${sectionId}` || pathname?.startsWith(`/${sectionId}/`);
  };

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-slate-900/50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section - Left */}
        <div className="flex-shrink-0">
          <Logo onClick={pathname === "/" ? handleLogoClick : undefined} />
        </div>

        {/* Navigation Links - Center/Left (Desktop & Tablet) */}
        <nav
          className="hidden md:flex items-center space-x-2 lg:space-x-3"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const active = isSectionActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3.5 py-2 text-sm transition-colors duration-200 whitespace-nowrap cursor-pointer ${active
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                  }`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                <span>{item.label}</span>
                {active && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
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
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-200 cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown (< md) */}
      {menuOpen && (
        <div
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50/98 dark:bg-slate-950/98 backdrop-blur-xl shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-top-2"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-1">
            {navItems.map((item) => {
              const active = isSectionActive(item.id);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${active
                      ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-bold shadow-xs"
                      : "text-slate-700 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-blue-400 active:scale-[0.98]"
                    }`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                  )}
                </Link>
              );
            })}
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
