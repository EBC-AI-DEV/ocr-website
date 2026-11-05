# 📋 Quick Reference Card

**EBC OCR Website v1.0.0 - Developer Cheat Sheet**

---

## 🚀 Essential Commands

```bash
# Development
npm run dev              # Start dev (localhost:3000)
npm run build            # Production build (2-3s)
npm start               # Start production

# Quality
npm run check            # Type + Lint check
npm run type-check      # TypeScript only
npm run lint            # ESLint only
npm run lint:fix        # Auto-fix issues
```

---

## 📁 Key Files

```
src/
├── app/layout.tsx              # Root layout, fonts
├── app/globals.css             # Theme colors
├── contexts/
│   ├── ThemeContext.tsx        # Dark mode
│   └── LanguageContext.tsx     # Translations
├── components/ocr/
│   ├── FileUploader.tsx        # File upload
│   └── FilePreview.tsx         # Preview + scanner
├── lib/
│   ├── utils.ts                # Helpers
│   └── validations.ts          # File validation
└── constants/index.ts          # Config values
```

---

## 🎨 Theme System

### Colors (globals.css)
```css
:root {
  --background: #f8fafc;
  --text: #0f172a;
}

[data-theme="dark"] {
  --background: #020617;
  --text: #f1f5f9;
}
```

### Usage
```typescript
// ThemeContext
const { theme, toggleTheme } = useTheme();

// Tailwind
<div className="bg-white dark:bg-slate-900">
```

---

## 🌐 Language System

### Add Translation
```typescript
// contexts/LanguageContext.tsx
const translations = {
  en: { myKey: "English" },
  km: { myKey: "ខ្មែរ" }
};
```

### Usage
```typescript
const { t, language } = useLanguage();
<p>{t("myKey")}</p>
```

---

## 📦 Component Pattern

```typescript
"use client"; // If client-side

import { useState, useEffect } from "react";
import type { Props } from "./types";

export function Component({ prop }: Props) {
  // 1. Hooks
  const [state, setState] = useState<Type>(initial);
  
  // 2. Effects
  useEffect(() => {
    // ... 
  }, [deps]);
  
  // 3. Handlers
  const handleClick = () => {
    setState(newValue);
  };
  
  // 4. Render
  return <div onClick={handleClick}>{state}</div>;
}
```

---

## 🔧 Constants

```typescript
// Import from constants/index.ts
import { ZOOM_CONFIG, CANVAS_CONFIG } from "@/constants";

// Usage
setZoom(ZOOM_CONFIG.DEFAULT); // 100
const maxZoom = ZOOM_CONFIG.MAX; // 200
```

---

## ✅ Validation

```typescript
import { validateFile } from "@/lib/validations";

const result = validateFile(file);
if (!result.valid) {
  console.error(result.error);
}
```

---

## 🎯 Utilities

```typescript
import { 
  formatFileSize,     // "2.5 MB"
  debounce,           // Debounce function
  safeJsonParse,      // Safe JSON parse
  truncate            // Truncate string
} from "@/lib/utils";
```

---

## 🚨 Error Handling

```typescript
// Use ErrorBoundary
import { ErrorBoundary } from "@/components/ErrorBoundary";

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

---

## 📝 Git Commits

```bash
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: maintenance
```

---

## 🔍 Common Paths

```typescript
// Path aliases (@/)
"@/components/..."   # src/components/
"@/lib/..."          # src/lib/
"@/contexts/..."     # src/contexts/
"@/types/..."        # src/types/
"@/constants"        # src/constants/index.ts
```

---

## 🐛 Debugging

```bash
# Type errors
npm run type-check

# Lint errors
npm run lint

# Build issues
rm -rf .next node_modules
npm install && npm run build

# Git issues
git status
git diff
```

---

## 📊 Current Stats

- **Version**: 1.0.0
- **Files**: 37 TS/TSX
- **Lines**: ~11,000
- **Docs**: 27 files
- **Quality**: 9.2/10
- **Status**: ✅ Production Ready

---

## 🎓 Best Practices

### DO ✅
- Use TypeScript types
- Extract constants
- Clean up in useEffect
- Use semantic HTML
- Follow naming conventions
- Write JSDoc for utils

### DON'T ❌
- Use `any` type
- Access refs in render
- Mutate state directly
- Skip error handling
- Commit secrets
- Ignore warnings

---

## 🔗 Quick Links

- **Docs**: [SETUP.md](SETUP.md)
- **Deploy**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Changes**: [CHANGELOG.md](CHANGELOG.md)
- **Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md)
- **Status**: [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## 💡 Tips

1. **Before commit**: `npm run check`
2. **Before PR**: `npm run build`
3. **New feature**: Read [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Bug found**: Check [GitHub Issues](../../issues)
5. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🆘 Emergency

```bash
# Build broken?
rm -rf .next && npm run build

# Types broken?
rm -rf node_modules && npm install

# Git broken?
git reset --hard origin/main

# Everything broken?
Read SETUP.md from scratch
```

---

## 📞 Support

- **Docs**: Start with README.md
- **Issues**: GitHub Issues
- **Email**: support@example.com

---

**Print this for your desk! 📌**

**Version**: 1.0.0 | **Updated**: 2026-11-02
