# Contributing to EBC OCR Website

Thank you for considering contributing to the EBC OCR Website! This document provides guidelines and instructions for contributing.

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive experience for everyone. We expect all contributors to:
- Be respectful and considerate
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards other community members

---

## How to Contribute

### Reporting Bugs

**Before submitting a bug report:**
1. Check the [existing issues](../../issues) to avoid duplicates
2. Verify the bug in the latest version
3. Collect relevant information (browser, OS, steps to reproduce)

**When submitting a bug report, include:**
- Clear, descriptive title
- Detailed description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, browser, Node version)

**Example:**
```markdown
**Bug:** Dark mode navbar flickers on page load

**Steps to reproduce:**
1. Open website in Safari
2. Toggle dark mode
3. Refresh page

**Expected:** Smooth dark mode rendering
**Actual:** White flash before dark mode applies

**Environment:** Safari 17, macOS 14.0
```

---

### Suggesting Enhancements

**Before suggesting an enhancement:**
1. Check if it already exists in [issues](../../issues) or roadmap
2. Consider if it fits the project scope
3. Think about how it benefits users

**When suggesting an enhancement:**
- Clear, descriptive title
- Detailed explanation of the feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples (if applicable)

---

## Development Process

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR-USERNAME/ocr-website.git
cd ocr-website
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Create a Branch

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

---

## Coding Standards

### TypeScript
```typescript
// ✅ Good
interface UserProps {
  name: string;
  age: number;
}

export function User({ name, age }: UserProps) {
  return <div>{name}, {age}</div>;
}

// ❌ Bad
export function User(props: any) {
  return <div>{props.name}</div>;
}
```

### React Components
```typescript
// ✅ Good - Functional components with proper types
export function Button({ onClick, children }: ButtonProps) {
  const [loading, setLoading] = useState(false);
  
  const handleClick = useCallback(() => {
    setLoading(true);
    onClick();
  }, [onClick]);
  
  return <button onClick={handleClick}>{children}</button>;
}

// ❌ Bad - Class components, missing types
export class Button extends Component {
  render() {
    return <button>{this.props.children}</button>;
  }
}
```

### File Organization
```typescript
// Component structure (top to bottom):
"use client"; // If needed

// 1. Imports
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

// 2. Types
interface Props {
  title: string;
}

// 3. Constants (component-specific)
const MAX_LENGTH = 100;

// 4. Component
export function Component({ title }: Props) {
  // Hooks first
  const [count, setCount] = useState(0);
  
  // Derived state
  const isLong = title.length > MAX_LENGTH;
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Event handlers
  const handleClick = () => {
    setCount(prev => prev + 1);
  };
  
  // Render helpers
  const renderTitle = () => <h1>{title}</h1>;
  
  // Return JSX
  return <div onClick={handleClick}>{renderTitle()}</div>;
}
```

---

## Commit Guidelines

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
feat: add batch file processing

Implemented queue system for processing multiple files.
Users can now upload up to 10 files simultaneously.

Closes #123

---

fix: resolve dark mode navbar flicker

Fixed race condition in theme initialization that caused
white flash on page load in Safari.

Fixes #456

---

docs: update setup instructions

Added troubleshooting section for common installation issues.
```

### Commit Best Practices
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("fix bug" not "fixes bug")
- Keep subject line under 72 characters
- Separate subject from body with blank line
- Explain what and why, not how
- Reference issues/PRs when relevant

---

## Testing Requirements

### Before Submitting
```bash
# Run type checking
npm run type-check

# Run linter
npm run lint

# Run tests (when implemented)
npm run test

# Build to verify
npm run build
```

### Manual Testing Checklist
- [ ] Feature works in Chrome, Firefox, Safari
- [ ] Works on mobile and desktop
- [ ] Dark mode works correctly
- [ ] Both languages (English/Khmer) work
- [ ] No console errors
- [ ] Responsive design maintained
- [ ] Accessibility not degraded

---

## Pull Request Process

### 1. Update Your Branch
```bash
# Fetch latest changes
git fetch upstream main

# Rebase your branch
git rebase upstream/main

# Resolve conflicts if any
```

### 2. Create Pull Request

**PR Title Format:**
```
<type>: <description>

Examples:
feat: add OCR history feature
fix: resolve canvas rendering issue
docs: improve setup documentation
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Type checking passed
- [ ] Linting passed
- [ ] Manual testing completed
- [ ] Works in multiple browsers

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tested manually

## Related Issues
Closes #123
```

### 3. Code Review

- Address all review comments
- Keep PR focused and small when possible
- Be open to feedback
- Update documentation if needed

### 4. Merging

- Squash commits if requested
- Ensure CI passes
- Wait for maintainer approval
- Maintainers will merge when ready

---

## Style Guide

### Naming Conventions

**Files:**
- Components: `PascalCase.tsx` (e.g., `FileUploader.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `PascalCase.ts` (e.g., `User.ts`)

**Variables:**
- camelCase: `userName`, `isActive`
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- Components: `PascalCase` (e.g., `FileUploader`)

**Functions:**
- Handlers: `handle` prefix (e.g., `handleClick`)
- Getters: `get` prefix (e.g., `getUserName`)
- Boolean: `is/has/should` prefix (e.g., `isVisible`)

### Imports Order
```typescript
// 1. External packages
import { useState } from "react";
import Link from "next/link";

// 2. Internal components
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

// 3. Utilities/hooks
import { formatDate } from "@/lib/utils";
import { useOCR } from "@/hooks/useOCR";

// 4. Types
import type { User } from "@/types/user";

// 5. Styles (if any)
import styles from "./Component.module.css";
```

---

## Documentation

### When to Update Docs

Update documentation when:
- Adding new features
- Changing existing behavior
- Fixing significant bugs
- Modifying setup process
- Changing configuration

### Documentation Files
- `README.md` - Project overview
- `SETUP.md` - Development setup
- `NEXT_STEPS.md` - Roadmap
- `CHANGELOG.md` - Version history
- Component READMEs (for complex components)

---

## Questions?

- **General questions:** Open a [discussion](../../discussions)
- **Bug reports:** Create an [issue](../../issues)
- **Feature requests:** Create an [issue](../../issues)
- **Security issues:** Email security@example.com (do not create public issue)

---

## Recognition

Contributors will be acknowledged in:
- CHANGELOG.md (for significant contributions)
- GitHub contributors page
- Release notes (for major features)

Thank you for contributing! 🎉

---

**Last Updated:** 2026-11-02  
**Version:** 1.0.0
