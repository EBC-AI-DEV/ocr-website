# Dark Mode Testing Guide

## How to Test

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   Navigate to `http://localhost:3000`

3. **Find the theme toggle:**
   Look for the moon/sun icon in the top-right corner of the navbar

4. **Click the toggle:**
   - Light mode shows a moon icon 🌙
   - Dark mode shows a sun icon ☀️

5. **What should happen:**
   - Background changes from light gray to dark gray
   - Text changes from dark to light
   - All cards, buttons, and components adapt
   - The change is instant

## Debug Steps

If dark mode is not working:

### Step 1: Check Browser Console
Open browser DevTools (F12) and look for:
- "Theme applied: dark" or "Theme applied: light"
- "Toggling theme from light to dark"
- Any JavaScript errors

### Step 2: Check HTML Element
In DevTools, inspect the `<html>` element. It should have:
- `class="dark"` when in dark mode
- `data-theme="dark"` attribute
- Font variable classes

### Step 3: Check localStorage
In DevTools Console, type:
```javascript
localStorage.getItem('theme')
```
Should return "light" or "dark"

### Step 4: Manual Test
In DevTools Console, manually toggle:
```javascript
document.documentElement.classList.add('dark')
```
If this works, the CSS is fine. Issue is with the toggle button.

### Step 5: Check CSS Variables
In DevTools Elements tab, select `<html>` and check computed styles for:
- `--background` should change based on theme
- `--text` should change based on theme

## What Was Implemented

### Files Updated:
1. `src/contexts/ThemeContext.tsx` - Added console logs for debugging
2. `src/app/history/page.tsx` - Dark mode classes
3. `src/app/ocr/page.tsx` - Dark mode classes
4. `src/app/not-found.tsx` - Dark mode classes
5. `src/app/(website)/layout.tsx` - Dark background

### CSS Variables (in globals.css):
- `:root` - Light theme variables
- `[data-theme="dark"]` - Dark theme variables

### Tailwind Classes Used:
- `dark:bg-slate-950` - Dark background
- `dark:text-slate-100` - Dark text
- `dark:border-slate-800` - Dark borders

## Expected Behavior

### Light Mode:
- Background: Light gray (`#f8fafc`)
- Text: Dark (`#0f172a`)
- Cards: White
- Navbar: Light with shadow

### Dark Mode:
- Background: Very dark gray (`#020617`)
- Text: Light (`#f1f5f9`)
- Cards: Dark gray
- Navbar: Dark with subtle border

## Common Issues

### Issue 1: Toggle doesn't respond
**Fix:** Check if ThemeProvider wraps the app in layout.tsx

### Issue 2: Some pages work, others don't
**Fix:** Ensure all pages use either CSS variables or dark: classes

### Issue 3: Flash of wrong theme
**Fix:** suppressHydrationWarning is set in layout.tsx

### Issue 4: Theme doesn't persist
**Fix:** localStorage should save the theme preference

## Browser Console Commands

Test theme manually:
```javascript
// Check current theme
document.documentElement.getAttribute('data-theme')

// Check if dark class exists
document.documentElement.classList.contains('dark')

// Toggle manually
document.documentElement.classList.toggle('dark')

// Check localStorage
localStorage.getItem('theme')
```

## Pages to Test
1. Home `/`
2. Upload `/upload`
3. OCR Upload `/ocr-upload`
4. How It Works `/how-it-works`
5. Features `/features`
6. FAQ `/faq`
7. About `/about`
8. Contact `/contact`
9. History `/history`
10. OCR `/ocr`
11. 404 Page (go to any invalid URL)

Each page should respond to theme toggle immediately.
