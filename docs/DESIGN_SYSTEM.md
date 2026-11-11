# Design System Documentation

## Overview

This design system provides a complete bilingual (Khmer and English) UI framework with full light/dark mode support. It uses CSS variables for theming and follows strict accessibility guidelines.

---

## 1. TYPOGRAPHY SYSTEM

### Font Families

Three fonts are used, each with a specific role:

#### **Nokora** (Khmer Primary)
- **Purpose**: All Khmer body text, headings, buttons, and navigation
- **Weights**: 100, 300, 400, 700, 900
- **Usage**: Default font for Khmer content
- **CSS Class**: `.khmer`

```css
font-family: "Nokora", var(--font-nokora), sans-serif;
```

#### **Inter** (Latin & Numbers)
- **Purpose**: English UI labels, numbers, statistics (WPM, accuracy, rankings), badges
- **Weights**: 400, 500, 600, 700, 800
- **Usage**: Latin text, numerics, UI labels
- **CSS Class**: `.latin`

```css
font-family: 'Inter', sans-serif;
```

#### **Moul** (Display/Decorative)
- **Purpose**: Hero brand highlights, large display titles, decorative watermarks ONLY
- **Weight**: 400
- **Usage**: Special display elements, not body text
- **CSS Class**: `.khmer-display`

```css
font-family: 'Moul', "Nokora", var(--font-nokora), sans-serif;
```

### Khmer Typography Rules

**Critical for Khmer text rendering:**

```css
/* Body Text */
.khmer-body {
  line-height: 1.7; /* Minimum 1.6, recommended 1.7-1.8 */
}

/* Headings */
.khmer-heading {
  line-height: 1.6;
}
```

**Why?** Khmer subscripts (ជើង) and upper vowels (ស្រៈលើ) require adequate vertical spacing to prevent overlapping and ensure readability.

### Google Fonts Import

Add this to your CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Moul&display=swap');
```

---

## 2. COLOR TOKENS

All colors are defined as CSS variables that automatically adapt to light/dark modes.

### Light Mode (Default)

```css
:root {
  /* Surfaces & Backgrounds */
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-2: #eef2f8;
  --border: #e2e8f0;

  /* Typography */
  --ink: #0f172a;        /* Primary headings & text */
  --muted: #64748b;      /* Secondary/supporting text */

  /* Brand Colors */
  --blue: #1a75bb;       /* Primary brand blue */
  --blue-dark: #002469;  /* High-contrast / Hover */
  --blue-soft: #eaf0ff;  /* Subtle blue background */

  /* Accent & Status Colors */
  --gold: #ffcc00;
  --gold-soft: #fff8d6;
  --green: #159a63;
  --green-soft: #ecfdf5;
  --red: #e60000;
  --red-soft: #fff0f0;

  /* Elevation */
  --radius: 16px;
  --shadow: 0 16px 50px rgba(15, 23, 42, 0.09);
}
```

### Dark Mode

```css
[data-theme='dark'],
.dark {
  color-scheme: dark;

  /* Surfaces & Backgrounds */
  --bg: #0b1220;
  --surface: #111c31;
  --surface-2: #182742;
  --border: #26334b;

  /* Typography */
  --ink: #e9eefb;        /* Crisp, readable light text */
  --muted: #93a3bd;      /* Soft slate supporting text */

  /* Brand Colors */
  --blue: #8eb0ff;       /* Accessible pastel sky blue for text/links */
  --blue-dark: #b9cdff;  /* Hover / highlight tint */
  --blue-soft: #17233c;  /* Subtle dark-navy background */

  /* Accent & Status Colors */
  --gold: #ffcc00;
  --gold-soft: #2a2410;
  --green: #45d99b;
  --green-soft: #10291f;
  --red: #ff7b7b;
  --red-soft: #2c1717;

  /* Elevation */
  --shadow: 0 16px 50px rgba(0, 0, 0, 0.55);
}
```

### Usage Guidelines

#### Surfaces
- **`--bg`**: Page background
- **`--surface`**: Cards, dialogs, inputs, dropdowns
- **`--surface-2`**: Tab bars, table headers, pill controls
- **`--border`**: Subtle, accessible borders

#### Typography
- **`--ink`**: Primary headings and body text
- **`--muted`**: Secondary text, labels, supporting content

#### Brand
- **`--blue`**: Primary brand color, links, active states
- **`--blue-dark`**: Hover states, high-contrast elements
- **`--blue-soft`**: Subtle backgrounds for blue-themed sections

#### Status
- **Success**: `--green` text on `--green-soft` background
- **Error**: `--red` text on `--red-soft` background
- **Warning**: `--gold` text on `--gold-soft` background

---

## 3. BUTTON COMPONENTS

### Critical Constraint: Primary Button

**⚠️ IMPORTANT:** Primary buttons MUST always use `#1a75bb` background in BOTH light and dark modes.

```css
/* PRIMARY BUTTON - Always #1a75bb */
.button-primary {
  background: #1a75bb;
  color: #ffffff;
}

[data-theme="dark"] .button-primary {
  background: #1a75bb; /* NOT var(--blue) */
  color: #ffffff;
}
```

**Why?** The variable `--blue` changes to `#8eb0ff` in dark mode, which fails contrast requirements with white text. The solid `#1a75bb` ensures proper contrast in both modes.

### Button Variants

#### Primary Button
```html
<button class="button button-primary">Primary Action</button>
```
- **Light Mode**: `background: #1a75bb`, `color: #ffffff`
- **Dark Mode**: `background: #1a75bb`, `color: #ffffff`
- **Hover**: `background: #002469`

#### Secondary Button
```html
<button class="button button-secondary">Secondary Action</button>
```
- **Light Mode**: `background: var(--surface)`, `color: #475569`, `border: var(--border)`
- **Dark Mode**: `background: var(--surface)`, `color: var(--blue)`, `border: var(--border)`

#### Ghost Button
```html
<button class="button button-ghost">Cancel</button>
```
- Transparent background
- **Hover**: Red text on red-soft background

---

## 4. COMPONENT PATTERNS

### Cards

```html
<div style="
  background: var(--surface);
  padding: 32px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
">
  <h3>Card Title</h3>
  <p style="color: var(--muted);">Card content goes here.</p>
</div>
```

### Status Alerts

#### Success
```html
<div style="
  background: var(--green-soft);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--green);
">
  <h4 style="color: var(--green);">Success</h4>
  <p style="color: var(--green);">Operation completed successfully.</p>
</div>
```

#### Error
```html
<div style="
  background: var(--red-soft);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--red);
">
  <h4 style="color: var(--red);">Error</h4>
  <p style="color: var(--red);">Something went wrong.</p>
</div>
```

### Badges

```html
<!-- Success Badge -->
<span style="
  padding: 6px 12px;
  background: var(--green-soft);
  color: var(--green);
  border: 1px solid var(--green);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
">
  Active
</span>

<!-- Info Badge -->
<span style="
  padding: 6px 12px;
  background: var(--blue-soft);
  color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
">
  Processing
</span>
```

---

## 5. THEME SWITCHING

### Implementation

The theme is controlled via the `data-theme` attribute on the root element:

```typescript
// Set theme
document.documentElement.setAttribute('data-theme', 'dark');

// Also add dark class for Tailwind
document.documentElement.classList.add('dark');
```

### React Context (Already Implemented)

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
```

---

## 6. ACCESSIBILITY

### Focus States

All interactive elements have accessible focus indicators:

```css
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 3px solid rgba(26, 117, 187, 0.25);
  outline-offset: 2px;
}

[data-theme='dark'] button:focus-visible {
  outline-color: rgba(142, 176, 255, 0.35);
}
```

### Contrast Requirements

- All text meets WCAG AA contrast ratios (4.5:1 for body text, 3:1 for headings)
- Primary button maintains proper contrast in both modes
- Status colors are tested for readability on their background colors

---

## 7. USAGE EXAMPLES

### Hero Section with Moul Display Font

```html
<h1 style="font-size: 64px; font-weight: 800; color: var(--ink);">
  OCR for <span class="khmer-display" style="color: var(--blue);">ខ្មែរ</span>
</h1>
```

### Khmer Paragraph Text

```html
<p class="khmer-body" style="
  font-size: 16px;
  line-height: 1.8;
  color: var(--muted);
">
  វាយបញ្ចូលអត្ថបទខ្មែរដោយស្វ័យប្រវត្តិពីរូបភាព។
</p>
```

### Interactive Card

```html
<div style="
  background: var(--surface);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
">
  <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">
    Feature Title
  </h3>
  <p style="color: var(--muted); font-size: 14px; line-height: 1.6;">
    Feature description goes here.
  </p>
  <button class="button button-primary" style="margin-top: 16px;">
    Learn More
  </button>
</div>
```

---

## 8. TESTING

Visit `/test-theme` to see the complete design system showcase including:
- Typography samples (all three fonts)
- Color token visualization
- Button variants
- Component examples
- Khmer text rendering
- Theme toggle

---

## 9. QUICK REFERENCE

### Don't Use in Dark Mode
- ❌ `var(--blue)` as button background (fails contrast)
- ❌ Hard-coded color values (won't adapt to theme)

### Do Use
- ✅ `#1a75bb` for primary button background (both modes)
- ✅ `var(--blue)` for text, icons, borders, active states
- ✅ CSS variables for all other colors
- ✅ `line-height: 1.7+` for Khmer text

### Color Decision Tree

**Need a button?**
- Primary action → `#1a75bb` background, white text
- Secondary action → `var(--surface)` background, `var(--border)` border
- Destructive action → Ghost button with red hover

**Need text color?**
- Primary text → `var(--ink)`
- Secondary text → `var(--muted)`
- Link/interactive → `var(--blue)`

**Need background?**
- Page → `var(--bg)`
- Card/dialog → `var(--surface)`
- Subtle accent → `var(--surface-2)`

---

## 10. MIGRATION CHECKLIST

If updating existing components:

- [ ] Replace font references with new typography classes
- [ ] Update primary buttons to use `#1a75bb` (not `var(--blue)`)
- [ ] Replace old color variables with new tokens
- [ ] Add `line-height: 1.7` to Khmer text
- [ ] Test both light and dark modes
- [ ] Verify focus states are visible
- [ ] Check color contrast in both themes

---

**Last Updated:** 2026-11-03
**Design System Version:** 1.0.0
