# EBC OCR Website - Development Setup

Complete setup guide for developers joining the project.

---

## Prerequisites

- **Node.js:** 18.17.0 or higher
- **npm:** 9.0.0 or higher
- **Git:** Latest version
- **OS:** Windows, macOS, or Linux

---

## Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ocr-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local` file in the root directory:
```bash
OCR_API_URL=https://api.example.com/ocr
OCR_API_USERNAME=your-username
OCR_API_SECRET_KEY=your-secret-key
```

### 4. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

---

## Project Structure

```
ocr-website/
├── src/
│   ├── app/                    # Next.js 16 app router
│   │   ├── (website)/         # Public pages
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   ├── ocr/              # OCR features
│   │   └── ui/               # Reusable UI
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities
│   ├── services/             # Business logic
│   ├── constants/            # App constants
│   └── types/                # TypeScript types
├── public/                   # Static assets
├── Documentation/            # Project docs
└── package.json             # Dependencies

Total Files: 37 TypeScript/TSX files
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Create production build
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript compiler
```

---

## Tech Stack

### Core Framework
- **Next.js 16.4.3** - React framework with App Router
- **React 19.3.0** - UI library
- **TypeScript 5.x** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **CSS Variables** - Theme system
- **Nokora Font** - Khmer typography
- **Inter Font** - English typography

### State Management
- **React Context API** - Global state (Theme, Language)
- **React Hooks** - Local state

### Build Tools
- **Turbopack** - Fast bundler (Next.js 16)
- **TypeScript Compiler** - Type checking
- **ESLint 9** - Linting

---

## Key Features

### 1. Dark Mode
- Class-based strategy (`dark:` prefix)
- CSS custom properties for colors
- Persistent user preference
- System preference detection

### 2. Bilingual Support
- Khmer (ខ្មែរ) and English
- Context-based translations
- Font optimization per language
- RTL-ready architecture

### 3. OCR Processing
- Image (PNG, JPG) and PDF support
- Real-time text extraction
- Export to TXT and Word
- Retry logic with backoff

### 4. Scanner Modes
- Standard view
- Scanner effect with animation
- Line detection with bounding boxes
- Canvas-based overlays

---

## Development Guidelines

### Code Style
```typescript
// Use functional components
export function Component() {
  return <div>Content</div>;
}

// Use TypeScript types
interface Props {
  title: string;
  count: number;
}

// Use named exports
export { Component, type Props };
```

### File Naming
- **Components:** PascalCase (`FileUploader.tsx`)
- **Utilities:** camelCase (`utils.ts`)
- **Types:** PascalCase (`ocr.ts`)
- **Constants:** UPPER_SNAKE_CASE in file

### Component Structure
```typescript
"use client"; // If client-side

import statements
type definitions
interface Props

export function Component({ props }: Props) {
  // 1. Hooks
  // 2. Derived state
  // 3. Effects
  // 4. Event handlers
  // 5. Render helpers
  // 6. Return JSX
}
```

---

## Common Tasks

### Adding a New Page
```bash
# 1. Create page file
touch src/app/(website)/new-page/page.tsx

# 2. Add to navigation
# Edit: src/components/layout/Navbar.tsx

# 3. Add translations
# Edit: src/contexts/LanguageContext.tsx
```

### Adding a New Component
```bash
# 1. Create component file
touch src/components/ui/NewComponent.tsx

# 2. Write component with types
# 3. Export from index (if needed)
# 4. Use in pages
```

### Updating Translations
```typescript
// Edit: src/contexts/LanguageContext.tsx
const translations = {
  en: {
    newKey: "English text"
  },
  km: {
    newKey: "ខ្មែរ"
  }
};

// Use in components
const { t } = useLanguage();
<p>{t("newKey")}</p>
```

---

## Debugging

### TypeScript Errors
```bash
npm run type-check
# Check output for specific errors
```

### ESLint Issues
```bash
npm run lint
# Fix auto-fixable issues
npx eslint --fix src/
```

### Build Errors
```bash
npm run build
# Check console for specific failures
# Common: missing env vars, type errors
```

### Dark Mode Issues
```typescript
// Check ThemeContext
// Verify [data-theme] attribute on <html>
// Check dark: classes in Tailwind
```

---

## Environment Variables

### Required for Production
```bash
OCR_API_URL=          # OCR service endpoint
OCR_API_USERNAME=     # API authentication username
OCR_API_SECRET_KEY=   # API authentication secret
```

### Optional
```bash
NODE_ENV=             # development | production
ANALYZE=              # true (for bundle analysis)
```

---

## Deployment

### Vercel (Recommended)
```bash
# 1. Push to GitHub
git push origin main

# 2. Import to Vercel
# 3. Add environment variables
# 4. Deploy
```

### Manual Build
```bash
npm run build
npm start
# Server runs on http://localhost:3000
```

### Docker (Future)
```dockerfile
# Dockerfile not yet created
# See NEXT_STEPS.md for containerization
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Cache Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

---

## Performance Tips

### Development
- Use Turbopack (default in Next.js 16)
- Enable React Compiler for faster rebuilds
- Close unused browser tabs

### Production
- Enable compression
- Optimize images (WebP)
- Use CDN for static assets

---

## Git Workflow

### Branch Strategy
```bash
main         # Production-ready code
develop      # Integration branch
feature/*    # New features
fix/*        # Bug fixes
```

### Commit Messages
```bash
# Format: <type>: <description>

feat: add batch processing
fix: resolve dark mode navbar issue
docs: update setup instructions
style: format code with prettier
refactor: extract OCR logic to service
test: add validation tests
chore: update dependencies
```

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Project Docs
- `README.md` - Project overview
- `NEXT_STEPS.md` - Enhancement roadmap
- `ESLINT_FIXES_SUMMARY.md` - Code quality fixes
- `PROJECT_REVIEW_REPORT.md` - Complete assessment
- `Documentation/` - Feature-specific docs

---

## Getting Help

### Common Issues
1. Check `Documentation/` folder
2. Search closed issues
3. Review error logs

### Contact
- **Repository:** <repository-url>
- **Issues:** <repository-url>/issues
- **Email:** support@example.com

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

See `CONTRIBUTING.md` (coming soon) for detailed guidelines.

---

**Last Updated:** 2026-11-02  
**Version:** 1.0.0  
**Status:** Production Ready
