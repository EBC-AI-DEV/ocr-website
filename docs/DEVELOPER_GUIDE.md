# EBC OCR - Developer Quick Reference

## 🚀 Quick Start

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 📂 Where to Find Things

### Adding a New Page?
→ `src/app/(website)/your-page/page.tsx` for marketing pages  
→ `src/app/your-page/page.tsx` for app pages

### Creating a Component?
→ `src/components/ui/` for reusable UI elements (buttons, modals)  
→ `src/components/layout/` for layout components (header, footer)  
→ `src/components/ocr/` for OCR-specific features

### Need State Management?
→ `src/hooks/` create custom hooks like `useOCR.ts`

### Business Logic?
→ `src/services/` for pure business logic (no React dependencies)  
→ `src/lib/` for utility functions and helpers

### Types & Configuration?
→ `src/types/` for TypeScript interfaces  
→ `src/config/` for constants and configuration

### API Endpoints?
→ `src/app/api/your-endpoint/route.ts`

## 🎨 Component Examples

### Using the Icon Component
```tsx
import { Icon } from "@/components/ui/Icon";

<Icon name="upload" size={18} />
// Available: arrow, check, chevron, clipboard, close, download, 
// file, globe, image, menu, scan, spark, trash, upload
```

### Using the Button Component
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
// Variants: primary, secondary, ghost
```

### Using the OCR Hook
```tsx
import { useOCR } from "@/hooks/useOCR";

const { 
  uploadedFile, 
  handleFileSelect, 
  extractText 
} = useOCR();
```

## 🔧 Key Utilities

### File Validation
```tsx
import { validateFile } from "@/lib/validations";

const result = validateFile(file);
if (!result.valid) {
  console.error(result.error);
}
```

### Formatting
```tsx
import { formatFileSize, getFileTypeLabel } from "@/lib/utils";

formatFileSize(1048576); // "1.0 MB"
getFileTypeLabel("image/png"); // "Image"
```

### Configuration
```tsx
import { siteConfig, ocrConfig } from "@/config/site";

console.log(siteConfig.email); // "hello@ebcocr.com"
console.log(ocrConfig.maxFileSize); // 10485760 (10 MB)
```

## 📝 Adding a New Feature

### Example: Adding a "Download PDF" Feature

**1. Add the function to the OCR hook:**
```tsx
// src/hooks/useOCR.ts
const downloadPdf = useCallback(() => {
  if (!text) return;
  // Your PDF generation logic
  setToast("PDF downloaded");
}, [text]);

return { ...existing, downloadPdf };
```

**2. Add UI in OCRResult component:**
```tsx
// src/components/ocr/OCRResult.tsx
<Button variant="secondary" onClick={onDownloadPdf}>
  <Icon name="file" size={15} /> <span>PDF</span>
</Button>
```

**3. Wire it up in the page:**
```tsx
// src/app/(website)/page.tsx
<OCRResult
  {...existing}
  onDownloadPdf={downloadPdf}
/>
```

## 🎯 Common Tasks

### Adding a New Language
Edit `src/config/site.ts`:
```tsx
languages: [
  { value: "km", label: "ខ្មែរ", description: "Khmer" },
  { value: "th", label: "ไทย", description: "Thai" }, // NEW
]
```

### Changing File Size Limit
Edit `src/config/site.ts`:
```tsx
maxFileSize: 20 * 1024 * 1024, // Change to 20 MB
```

### Adding Accepted File Format
Edit `src/config/site.ts`:
```tsx
acceptedFormats: {
  "image/png": [".png"],
  "image/webp": [".webp"], // NEW
}
```

## 🔌 Integrating Real OCR API

### Step 1: Add Environment Variables
```bash
# .env.local
OCR_API_KEY=your_api_key
OCR_API_URL=https://api.ocr-service.com
```

### Step 2: Update Service
```tsx
// src/services/ocr.service.ts
export async function processOCR(file: File, language: OCRLanguage) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('language', language);
  
  const response = await fetch(process.env.OCR_API_URL!, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OCR_API_KEY}`
    },
    body: formData
  });
  
  const data = await response.json();
  return data.text;
}
```

### Step 3: Update Hook
```tsx
// src/hooks/useOCR.ts
import { processOCR } from "@/services/ocr.service";

const extractText = useCallback(async () => {
  if (!uploadedFile) return;
  
  setStatus("processing");
  
  try {
    const file = new File([], uploadedFile.name); // Get actual File object
    const extractedText = await processOCR(file, language);
    setText(extractedText);
    setStatus("success");
  } catch (error) {
    setError("OCR processing failed");
    setStatus("ready");
  }
}, [uploadedFile, language]);
```

## 🐛 Troubleshooting

### Build Errors
- Check TypeScript errors: Look for red squiggles in your editor
- Missing imports: Ensure all imports use `@/` path alias
- Client vs Server: Add `"use client"` for components using state/effects

### Styling Issues
- All styles are in `src/app/globals.css`
- Check class names match existing patterns
- Tailwind v4 uses different syntax - check docs

### Route Not Found
- Ensure `page.tsx` exists in the route folder
- Check file naming (lowercase, hyphenated)
- Verify route group syntax: `(website)` for grouping

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout (fonts, metadata) |
| `src/app/(website)/page.tsx` | Homepage |
| `src/hooks/useOCR.ts` | Main OCR logic |
| `src/config/site.ts` | All configuration constants |
| `src/types/ocr.ts` | TypeScript definitions |
| `src/components/ui/Icon.tsx` | Icon system |

## 💡 Best Practices

✅ **DO:**
- Use the `@/` import alias for all imports
- Keep components small and focused
- Extract logic into custom hooks
- Add TypeScript types for all props
- Use the existing Icon component instead of inline SVGs

❌ **DON'T:**
- Mix business logic with UI components
- Duplicate code - extract to utilities
- Hardcode configuration - use `config/site.ts`
- Skip TypeScript types
- Create inline styles - use CSS classes

## 🔗 Useful Commands

```bash
# Find a component usage
grep -r "FileUploader" src/

# Find all TODOs
grep -r "TODO" src/

# Count lines of code
find src -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Check for unused imports (requires eslint)
npm run lint
```

## 📞 Need Help?

- Check `IMPLEMENTATION.md` for full project documentation
- Review existing components for patterns
- Email: hello@ebcocr.com

---

**Last Updated:** October 29, 2026  
**Project Version:** 0.1.0
