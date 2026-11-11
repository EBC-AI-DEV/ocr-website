"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "km";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      if (saved === "en" || saved === "km") {
        return saved;
      }
    }
    return "en";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: Record<string, unknown> | string = translations[language];

    for (const k of keys) {
      if (typeof value === "object" && value !== null) {
        value = (value as Record<string, unknown>)[k] as Record<string, unknown> | string;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

const translations = {
  en: {
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      features: "Features",
      faq: "FAQ",
      about: "About",
    },
    header: {
      uploadFile: "Upload File",
    },
    hero: {
      badge: "Khmer-first document intelligence",
      title: "Every document, instantly editable.",
      subtitle: "Convert Khmer and English images or PDFs into accurate, editable text—fast, private, and ready to use.",
      cta: "Get started — it's free",
      learnMore: "Learn more",
      noAccount: "No account needed",
      filesPrivate: "Files stay private",
      khmerEnglish: "Khmer + English",
      sourceDocument: "Source document",
      textRecognized: "Text recognized",
      readyToEdit: "Ready to edit, copy and export",
    },
    howItWorks: {
      eyebrow: "SIMPLE & EFFICIENT",
      title: "From document to text in 3 steps",
      subtitle: "No complex setup. Upload, extract, and use your text anywhere.",
      step1Title: "Upload your file",
      step1Desc: "Choose an image or PDF from your device, or simply drag and drop it.",
      step2Title: "AI processing",
      step2Desc: "Our OCR automatically detects and reads Khmer and English with high accuracy.",
      step3Title: "Edit & export",
      step3Desc: "Review the editable result, then copy it or download a clean TXT file.",
    },
    features: {
      eyebrow: "BUILT FOR REAL DOCUMENTS",
      title: "Everything you need. Nothing you don't.",
      subtitle: "Purpose-built tools for accurate, secure document conversion.",
      feature1Title: "Khmer + English accuracy",
      feature1Desc: "Optimized recognition for Khmer Unicode and English, including mixed-language documents.",
      feature1Link: "Bilingual by default",
      feature2Title: "Fast & Accurate",
      feature2Desc: "Get results in seconds with industry-leading accuracy",
      feature3Title: "Private by design",
      feature3Desc: "Your files are processed securely and automatically removed. We never reuse your content.",
      feature4Title: "No Registration",
      feature4Desc: "No account required",
      feature5Title: "Formatting preserved",
      feature5Desc: "Retain paragraphs, line breaks, and structured content for cleaner, faster editing.",
      feature5Link: "Export to TXT or Word",
      feature6Title: "Free to Use",
      feature6Desc: "No hidden fees or usage limits for standard documents",
    },
    faq: {
      eyebrow: "COMMON QUESTIONS",
      title: "Frequently asked questions",
      subtitle: "Everything you need to know before converting your first document.",
      contact: "Still have questions? Contact us",
      q1: "Which file formats can I upload?",
      a1: "EBC OCR supports PNG, JPG, and PDF documents up to 10 MB. For the best results, use clear images with good lighting and straight text.",
      q2: "How accurate is Khmer OCR?",
      a2: "Accuracy depends on image quality, but clean Khmer documents typically produce highly readable results. You can edit every result before exporting it.",
      q3: "Are my uploaded files stored?",
      a3: "No. Files are processed securely and automatically deleted after conversion. Your content is not used to train models.",
      q4: "Do I need to create an account?",
      a4: "No account is needed. Upload and convert documents instantly without registration.",
      q5: "Can I extract both Khmer and English?",
      a5: "Yes. Select Khmer + English before uploading for documents that contain both languages.",
      q6: "Is there a file size limit?",
      a6: "Yes, the maximum file size is 10MB per upload.",
    },
    ocr: {
      workspace: "OCR WORKSPACE",
      title: "Upload a document",
      selectLanguage: "Choose the language, then drop your file below.",
      dragDrop: "Drag & drop your file here",
      dragDropDocument: "Drag & drop your document",
      browseFromDevice: "or browse a file from your device",
      or: "or",
      browse: "Browse Files",
      browseFiles: "Browse files",
      maxSize: "Max file size: 10MB",
      maximumSize: "Maximum 10 MB",
      formats: "Supported formats",
      processing: "Processing your document",
      ready: "Your document is ready",
      analyzing: "Analyzing content",
      extracting: "Extract text",
      almostDone: "Almost done",
      result: "Extracted Text",
      confidence: "Confidence",
      copy: "Copy Text",
      download: "Download",
      tryAnother: "Upload new file",
      copied: "Copied to clipboard!",
      error: "Failed to process file",
      uploadError: "Failed to upload file",
      resultView: "Original and extracted text, together in one focused view.",
      secureProcessing: "Secure processing",
      highAccuracy: "High-accuracy OCR",
      autoDeleted: "Auto-deleted",
    },
    toast: {
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Notice",
      dismiss: "Dismiss notification",
    },
    common: {
      scrollToTop: "Scroll to top",
    },
    footer: {
      tagline: "Accurate OCR for Khmer and English documents",
      quickLinks: "Quick Links",
      steeringCommittees: "Steering Committees",
      aboutUs: "About Us",
      aboutUsEbc: "About EBC",
      whatWeDo: "What We Do",
      servicesFacilities: "Services & Facilities",
      platformEcosystem: "Platform Ecosystem",
      events: "Events",
      scholarships: "Scholarships",
      news: "News",
      programs: "Programs",
      helpCenter: "Help Center",
      support: "Help & Support",
      ticketSupport: "Ticket Support",
      teacherTutorials: "Teacher LMS Tutorials",
      adminTutorials: "Admin LMS Tutorials",
      contactUs: "Contact Us",
      generalInfo: "+855 12 299 600 General Inquiries",
      techInfo: "+855 10 299 600 Technical Support",
      address: "#242, St. 271, Sangkat Boeung Tumpun, Khan Mean Chey, Phnom Penh, Cambodia",
      contactBtn: "Contact Us",
      copyright: "© 2026 Educational Broadcasting Cambodia. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      mptc: "Provided by Ministry of Post and Telecommunications (MPTC)",
      languageLabel: "Language",
      digitalContent: "Digital Content",
      elearning: "eLearning",
      elibrary: "eLibrary",
      iptv: "IPTV",
      museum3d: "3D Museum",
      facebook: "Facebook",
      youtube: "YouTube",
      tiktok: "TikTok",
      product: "Product",
      home: "Home",
      features: "Features",
      pricing: "Pricing",
      company: "Company",
      about: "About Us",
      contact: "Contact",
      legal: "Legal",
    },
    about: {
      eyebrow: "ABOUT EBC OCR",
      title: "About EBC OCR",
      subtitle: "A simple, privacy-focused tool built to make Khmer and English documents instantly editable.",
      description: "EBC OCR is designed to help you convert images and PDF documents into editable text without requiring an account or storing your data.",
      missionTitle: "Our Mission",
      missionText: "We believe document conversion should be fast, accurate, and respect your privacy. That's why EBC OCR processes your files securely and deletes them immediately after conversion.",
      featuresTitle: "Features",
      feature1: "Khmer and English text recognition",
      feature2: "Support for images (PNG, JPG) and PDF documents",
      feature3: "No account or signup required",
      feature4: "Files are automatically deleted after processing",
      feature5: "Export to TXT or Word format",
      privacyTitle: "Privacy First",
      privacyText: "Your uploads are processed securely and never stored. We don't use your content to train models or share it with third parties.",
      technologyTitle: "Technology",
      technologyText: "Built with modern web technologies including Next.js, React, and Tesseract.js OCR engine. Our application runs efficiently in your browser, ensuring your documents never leave your device during processing.",
      contactTitle: "Contact Us",
      contactText: "Have questions or feedback? We'd love to hear from you at",
    },
  },
  km: {
    nav: {
      home: "ទំព័រដើម",
      howItWorks: "របៀបដំណើរការ",
      features: "មុខងារ",
      faq: "សំណួរញឹកញាប់",
      about: "អំពីយើង",
    },
    header: {
      uploadFile: "ផ្ទុកឯកសារឡើង",
    },
    hero: {
      badge: "បច្ចេកវិទ្យាឯកសារខ្មែរជាមុន",
      title: "គ្រប់ឯកសារ កែសម្រួលបានភ្លាមៗ។",
      subtitle: "បម្លែងរូបភាព និង PDF ជាភាសាខ្មែរ និងអង់គ្លេសទៅជាអត្ថបទដែលអាចកែសម្រួលបាន—រហ័ស ឯកជន និងរួចរាល់ក្នុងការប្រើប្រាស់។",
      cta: "ចាប់ផ្តើម — ឥតគិតថ្លៃ",
      learnMore: "ស្វែងយល់បន្ថែម",
      noAccount: "មិនចាំបាច់មានគណនី",
      filesPrivate: "ឯកសារមានសុវត្ថិភាព",
      khmerEnglish: "ខ្មែរ + អង់គ្លេស",
      sourceDocument: "ឯកសារដើម",
      textRecognized: "បានសម្គាល់អត្ថបទ",
      readyToEdit: "រួចរាល់ក្នុងការកែសម្រួល ចម្លង និងនាំចេញ",
    },
    howItWorks: {
      eyebrow: "សាមញ្ញ និងប្រកបដោយប្រសិទ្ធភាព",
      title: "ពីឯកសារទៅអត្ថបទក្នុង ៣ ជំហាន",
      subtitle: "គ្មានការដំឡើងស្មុគស្មាញ។ ផ្ទុកឡើង ស្រង់ និងប្រើអត្ថបទរបស់អ្នកគ្រប់ទីកន្លែង។",
      step1Title: "ផ្ទុកឯកសាររបស់អ្នក",
      step1Desc: "ជ្រើសរើសរូបភាព ឬ PDF ពីឧបករណ៍របស់អ្នក ឬគ្រាន់តែទម្លាក់វា។",
      step2Title: "ដំណើរការដោយ AI",
      step2Desc: "OCR របស់យើងរកឃើញ និងអានខ្មែរ និងអង់គ្លេសដោយស្វ័យប្រវត្តិជាមួយនឹងភាពត្រឹមត្រូវខ្ពស់។",
      step3Title: "កែសម្រួល និងនាំចេញ",
      step3Desc: "ពិនិត្យលទ្ធផលដែលអាចកែសម្រួលបាន បន្ទាប់មកចម្លងវា ឬទាញយកឯកសារ TXT ស្អាត។",
    },
    features: {
      eyebrow: "បង្កើតឡើងសម្រាប់ឯកសារពិតប្រាកដ",
      title: "អ្វីដែលអ្នកត្រូវការ។ គ្មានអ្វីដែលអ្នកមិនត្រូវការ។",
      subtitle: "ឧបករណ៍បង្កើតឡើងជាពិសេសសម្រាប់ការបម្លែងឯកសារត្រឹមត្រូវ និងមានសុវត្ថិភាព។",
      feature1Title: "ភាពត្រឹមត្រូវខ្មែរ + អង់គ្លេស",
      feature1Desc: "ការទទួលស្គាល់ប្រសើរសម្រាប់យូនីកូដខ្មែរ និងអង់គ្លេស រួមទាំងឯកសារពីរភាសា។",
      feature1Link: "ពីរភាសាតាមលំនាំដើម",
      feature2Title: "រហ័ស និងត្រឹមត្រូវ",
      feature2Desc: "ទទួលបានលទ្ធផលក្នុងរយៈពេលប៉ុន្មានវិនាទី ជាមួយនឹងភាពត្រឹមត្រូវឈានមុខក្នុងឧស្សាហកម្ម",
      feature3Title: "ឯកជនតាមរចនា",
      feature3Desc: "ឯកសាររបស់អ្នកត្រូវបានដំណើរការដោយសុវត្ថិភាព និងដកចេញដោយស្វ័យប្រវត្តិ។ យើងមិនប្រើឯកសាររបស់អ្នកឡើងវិញទេ។",
      feature4Title: "មិនចាំបាច់ចុះឈ្មោះ",
      feature4Desc: "មិនចាំបាច់មានគណនី",
      feature5Title: "រក្សាទម្រង់",
      feature5Desc: "រក្សាកថាខណ្ឌ ការបំបែកបន្ទាត់ និងមាតិកាមានរចនាសម្ព័ន្ធសម្រាប់ការកែសម្រួលកាន់តែស្អាត និងលឿន។",
      feature5Link: "នាំចេញជា TXT ឬ Word",
      feature6Title: "ឥតគិតថ្លៃក្នុងការប្រើប្រាស់",
      feature6Desc: "គ្មានថ្លៃសេវាលាក់កំបាំង ឬកម្រិតការប្រើប្រាស់សម្រាប់ឯកសារស្តង់ដារ",
    },
    faq: {
      eyebrow: "សំណួរទូទៅ",
      title: "សំណួរដែលសួរញឹកញាប់",
      subtitle: "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងមុនពេលបម្លែងឯកសារដំបូងរបស់អ្នក។",
      contact: "នៅមានសំណួរ? ទំនាក់ទំនងមកយើង",
      q1: "តើខ្ញុំអាចផ្ទុកឯកសារទម្រង់អ្វីខ្លះឡើង?",
      a1: "EBC OCR គាំទ្រឯកសារ PNG, JPG និង PDF រហូតដល់ 10 MB។ សម្រាប់លទ្ធផលល្អបំផុត សូមប្រើរូបភាពច្បាស់លាស់ជាមួយនឹងពន្លឺល្អ និងអត្ថបទត្រង់។",
      q2: "តើ OCR ខ្មែរមានភាពត្រឹមត្រូវប៉ុណ្ណា?",
      a2: "ភាពត្រឹមត្រូវអាស្រ័យលើគុណភាពរូបភាព ប៉ុន្តែឯកសារខ្មែរស្អាតជាធម្មតាផលិតលទ្ធផលដែលអាចអានបានយ៉ាងខ្ពស់។ អ្នកអាចកែសម្រួលគ្រប់លទ្ធផលមុនពេលនាំចេញវា។",
      q3: "តើឯកសារដែលខ្ញុំផ្ទុកឡើងត្រូវបានរក្សាទុកទេ?",
      a3: "ទេ។ ឯកសារត្រូវបានដំណើរការដោយសុវត្ថិភាព និងលុបដោយស្វ័យប្រវត្តិបន្ទាប់ពីការបម្លែង។ មាតិការបស់អ្នកមិនត្រូវបានប្រើដើម្បីបណ្តុះបណ្តាលម៉ូដែលទេ។",
      q4: "តើខ្ញុំត្រូវបង្កើតគណនីទេ?",
      a4: "មិនចាំបាច់មានគណនីទេ។ ផ្ទុកឡើង និងបម្លែងឯកសារភ្លាមៗដោយមិនចាំបាច់ចុះឈ្មោះ។",
      q5: "តើខ្ញុំអាចស្រង់ទាំងខ្មែរ និងអង់គ្លេសបានទេ?",
      a5: "បាទ/ចាស។ ជ្រើសរើសខ្មែរ + អង់គ្លេសមុនពេលផ្ទុកឡើងសម្រាប់ឯកសារដែលមានភាសាទាំងពីរ។",
      q6: "តើមានកម្រិតទំហំឯកសារទេ?",
      a6: "បាទ/ចាស ទំហំឯកសារអតិបរមាគឺ 10MB ក្នុងមួយការផ្ទុកឡើង។",
    },
    ocr: {
      workspace: "កន្លែងធ្វើការ OCR",
      title: "ផ្ទុកឯកសារឡើង",
      selectLanguage: "ជ្រើសរើសភាសា បន្ទាប់មកទម្លាក់ឯកសាររបស់អ្នកខាងក្រោម។",
      dragDrop: "ទម្លាក់ឯកសាររបស់អ្នកនៅទីនេះ",
      or: "ឬ",
      browse: "រកមើលឯកសារ",
      browseFiles: "រកមើលឯកសារ",
      dragDropDocument: "ទម្លាក់ឯកសាររបស់អ្នកនៅទីនេះ",
      browseFromDevice: "ឬរកមើលឯកសារពីឧបករណ៍របស់អ្នក",
      maxSize: "ទំហំឯកសារអតិបរមា៖ 10MB",
      maximumSize: "អតិបរមា 10 MB",
      formats: "ទម្រង់ដែលគាំទ្រ",
      processing: "កំពុងដំណើរការឯកសាររបស់អ្នក",
      ready: "ឯកសាររបស់អ្នករួចរាល់ហើយ",
      analyzing: "កំពុងវិភាគមាតិកា",
      extracting: "ស្រង់អត្ថបទ",
      almostDone: "ជិតរួចរាល់ហើយ",
      result: "អត្ថបទដែលបានស្រង់",
      confidence: "កម្រិតទំនុកចិត្ត",
      copy: "ចម្លងអត្ថបទ",
      download: "ទាញយក",
      tryAnother: "ផ្ទុកឯកសារថ្មី",
      copied: "បានចម្លងទៅក្តារតម្បៀតខ្ទាស់!",
      error: "បរាជ័យក្នុងការដំណើរការឯកសារ",
      uploadError: "បរាជ័យក្នុងការផ្ទុកឯកសារឡើង",
      resultView: "ឯកសារដើម និងអត្ថបទដែលបានស្រង់ រួមគ្នានៅក្នុងទិដ្ឋភាពផ្តោតមួយ។",
      secureProcessing: "ដំណើរការមានសុវត្ថិភាព",
      highAccuracy: "OCR ត្រឹមត្រូវខ្ពស់",
      autoDeleted: "លុបស្វ័យប្រវត្តិ",
    },
    toast: {
      success: "ជោគជ័យ",
      error: "កំហុស",
      warning: "ការព្រមាន",
      info: "ដំណឹង",
      dismiss: "បិទការជូនដំណឹង",
    },
    common: {
      scrollToTop: "ឡើងទៅលើគេហទំព័រ",
    },
    footer: {
      tagline: "OCR ត្រឹមត្រូវសម្រាប់ឯកសារជាភាសាខ្មែរ និងអង់គ្លេស",
      quickLinks: "តំណភ្ជាប់រហ័ស",
      steeringCommittees: "គណៈកម្មាធិការតម្រង់ទិស",
      aboutUs: "អំពី​យើង",
      aboutUsEbc: "អំពី​យើង EBC",
      whatWeDo: "អ្វីដែលយើងធ្វើ",
      servicesFacilities: "សេវាកម្ម & បរិក្ខារ",
      platformEcosystem: "ប្រព័ន្ធអេកូឡូស៊ីនៃថ្នាល",
      events: "ព្រឹត្តិការណ៍",
      scholarships: "អាហារូបករណ៍",
      news: "ព័ត៌មាន",
      programs: "កម្មវិធី",
      helpCenter: "មជ្ឈមណ្ឌលជំនួយ",
      support: "ជំនួយ",
      ticketSupport: "ការគាំទ្រសំបុត្រ",
      teacherTutorials: "មេរៀនសម្រាប់គ្រូប្រើប្រាស់ប្រព័ន្ធគ្រប់គ្រងការសិក្សា",
      adminTutorials: "មេរៀនសម្រាប់អ្នកគ្រប់គ្រងប្រព័ន្ធប្រើប្រាស់ប្រព័ន្ធគ្រប់គ្រងការសិក្សា",
      contactUs: "ទាក់ទង​យើងខ្ញុំ",
      generalInfo: "+855 12 299 600 ព័ត៌មានទូទៅ",
      techInfo: "+855 10 299 600 ព័ត៌មានបច្ចេកទេស",
      address: "#២៤២, ផ្លូវ. ២៧១, សង្កាត់បឹងទំពុន, ខណ្ឌមានជ័យ, រាជធានីភ្នំពេញ, ប្រទេសកម្ពុជា",
      contactBtn: "ទាក់ទងយើង",
      copyright: "©2026 រក្សា​សិទ្ធិ​គ្រប់​យ៉ាង​ដោយ អង្គការ អ៊ី ប៊ី ស៊ី",
      privacy: "គោលការណ៍ភាពឯកជន",
      terms: "លក្ខខណ្ឌ និង ការប្រើប្រាស់",
      mptc: "ផ្តល់សេវាដោយ ក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍",
      languageLabel: "ប្តូរភាសា",
      digitalContent: "មាតិកាឌីជីថល",
      elearning: "eLearning",
      elibrary: "eLibrary",
      iptv: "IPTV",
      museum3d: "សារមន្ទីរ 3D",
      facebook: "Facebook",
      youtube: "YouTube",
      tiktok: "TikTok",
      product: "ផលិតផល",
      home: "ទំព័រដើម",
      features: "មុខងារ",
      pricing: "តម្លៃ",
      company: "ក្រុមហ៊ុន",
      about: "អំពីយើង",
      contact: "ទំនាក់ទំនង",
      legal: "ផ្នែកច្បាប់",
    },
    about: {
      eyebrow: "អំពី EBC OCR",
      title: "អំពី EBC OCR",
      subtitle: "ឧបករណ៍សាមញ្ញមួយដែលផ្តោតលើឯកជនភាព ត្រូវបានបង្កើតឡើងដើម្បីធ្វើឱ្យឯកសារភាសាខ្មែរ និងអង់គ្លេសអាចកែប្រែបានភ្លាមៗ។",
      description: "EBC OCR ត្រូវបានរចនាឡើងដើម្បីជួយអ្នកបំប្លែងរូបភាព និងឯកសារ PDF ទៅជាអត្ថបទដែលអាចកែប្រែបាន ដោយមិនត្រូវការបង្កើតគណនី ឬរក្សាទុកទិន្នន័យរបស់អ្នក។",
      missionTitle: "បេសកកម្មរបស់យើង",
      missionText: "យើងជឿជាក់ថាការបំប្លែងឯកសារគួរតែលឿន ត្រឹមត្រូវ និងគោរពឯកជនភាពរបស់អ្នក។ នោះហើយជាមូលហេតុដែល EBC OCR ដំណើរការឯកសាររបស់អ្នកដោយសុវត្ថិភាព និងលុបចោលភ្លាមៗបន្ទាប់ពីការបំប្លែង។",
      featuresTitle: "មុខងារ",
      feature1: "ការសម្គាល់អត្ថបទភាសាខ្មែរ និងអង់គ្លេស",
      feature2: "គាំទ្ររូបភាព (PNG, JPG) និងឯកសារ PDF",
      feature3: "មិនត្រូវការបង្កើតគណនី ឬចុះឈ្មោះ",
      feature4: "ឯកសារត្រូវបានលុបចោលដោយស្វ័យប្រវត្តិបន្ទាប់ពីដំណើរការ",
      feature5: "នាំចេញជាទម្រង់ TXT ឬ Word",
      privacyTitle: "ឯកជនភាពជាមុនគេ",
      privacyText: "ឯកសារដែលអ្នកផ្ទុកឡើងត្រូវបានដំណើរការដោយសុវត្ថិភាព និងមិនត្រូវបានរក្សាទុកទេ។ យើងមិនប្រើមាតិការបស់អ្នកដើម្បីបណ្តុះបណ្តាលម៉ូដែល ឬចែករំលែកវាជាមួយភាគីទីបីទេ។",
      technologyTitle: "បច្ចេកវិទ្យា",
      technologyText: "បង្កើតឡើងដោយប្រើបច្ចេកវិទ្យាវេបទំនើប រួមមាន Next.js, React និងម៉ាស៊ីន OCR Tesseract.js។ កម្មវិធីរបស់យើងដំណើរការប្រកបដោយប្រសិទ្ធភាពនៅក្នុងកម្មវិធីរុករករបស់អ្នក ធានាថាឯកសាររបស់អ្នកមិនចាកចេញពីឧបករណ៍របស់អ្នកក្នុងអំឡុងពេលដំណើរការនោះទេ។",
      contactTitle: "ទាក់ទងមកយើង",
      contactText: "មានសំណួរ ឬមតិកែលម្អ? យើងចង់ស្តាប់ពីអ្នកនៅ",
    },
  },
};
