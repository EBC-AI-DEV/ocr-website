"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function OCRPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="min-h-[60vh] py-16 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
              <Icon name="scan" size={15} /> OCR TOOL
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              OCR Workspace
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              The OCR tool is available on the homepage. Click below to get
              started.
            </p>
            <Link href="/#ocr-tool">
              <Button>
                <Icon name="arrow" size={16} /> Go to OCR tool
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
