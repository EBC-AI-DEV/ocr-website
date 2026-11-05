"use client";

import { ocrConfig } from "@/config/site";
import { OCRLanguage } from "@/types/ocr";

interface LanguageSelectorProps {
  selected: OCRLanguage;
  onChange: (language: OCRLanguage) => void;
}

export function LanguageSelector({
  selected,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div className="language-section">
      <div className="section-label">
        <span>Document language</span>
        <small>For the most accurate result</small>
      </div>
      <div className="language-options">
        {ocrConfig.languages.map((item) => (
          <button
            key={item.value}
            className={selected === item.value ? "selected" : ""}
            onClick={() => onChange(item.value)}
          >
            <span className="radio-dot">{selected === item.value && <i />}</span>
            <span>
              <strong className={item.value !== "en" ? "khmer" : ""}>
                {item.label}
              </strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
