# Changelog

All notable changes to the EBC OCR Website project.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Testing infrastructure setup
- Image optimization (WebP conversion)
- Performance monitoring
- Advanced export options
- Batch processing

---

## [1.0.0] - 2026-11-02

### Added
- Complete bilingual OCR system (Khmer + English)
- Dark mode with synchronized theme system
- Scanner mode visualization (standard, scanner, line-detection)
- Nokora font integration for Khmer text
- PDF viewer with zoom controls
- Export to TXT and Word formats
- File validation with security checks
- Retry logic with exponential backoff
- Error boundary component
- Comprehensive documentation

### Changed
- Refactored PDF viewer with proper aspect ratio
- Enhanced file preview with scanner effects
- Improved dark mode navbar synchronization
- Optimized canvas coordinate mapping
- Enhanced error handling and validation

### Fixed
- Dark mode color mismatch between navbar and body
- PDF viewer aspect ratio issues
- Line detection bounding box misalignment
- Object-fit contain offset calculation
- 22 ESLint errors (all critical errors resolved)
- React hooks setState in useEffect warnings
- TypeScript explicit any type issues
- Navigation link best practices

### Security
- Input validation for file uploads
- XSS prevention in Word export
- Executable file blocking
- Request timeout handling
- AbortController for API calls

### Performance
- Debounced resize handlers
- Canvas cleanup on unmount
- Memory leak prevention
- Build time: 3.0s
- Bundle size: 1.3MB

### Documentation
- PROJECT_REVIEW_REPORT.md - Complete project assessment (9.2/10)
- ESLINT_FIXES_SUMMARY.md - All fixes documented
- CODE_REVIEW_AND_IMPROVEMENTS.md - Comprehensive review
- NEXT_STEPS.md - Enhancement roadmap
- SETUP.md - Developer setup guide
- DARK_MODE_IMPLEMENTATION.md - Theme system details
- PDF_VIEWER_IMPROVEMENTS.md - Viewer enhancements
- SCANNER_MODE_IMPLEMENTATION.md - Scanner features
- NOKORA_FONT_IMPLEMENTATION.md - Font integration
- LINE_DETECTION_FIX.md - Coordinate mapping
- IMPROVEMENTS_SUMMARY.md - Implementation summary

---

## [0.9.0] - 2026-11-01

### Added
- Line detection feature with bounding boxes
- Canvas-based overlay rendering
- Proper coordinate transformation
- Object-fit contain offset calculation

### Fixed
- Canvas bounding box misalignment
- Aspect ratio handling for object-fit: contain
- Coordinate mapping for letterboxed images

---

## [0.8.0] - 2026-11-01

### Added
- Interactive scanner mode toggle buttons
- Visual scanner effects with animations
- Three scanner modes: standard, scanner, line-detection
- Animated scan line with contrast adjustment

### Changed
- Enhanced FilePreview component with mode switching
- Added segmented control UI for mode selection

---

## [0.7.0] - 2026-10-31

### Added
- Nokora font for Khmer text
- Font-optical-sizing support
- Multiple font weights (100, 300, 400, 700, 900)
- Khmer-specific CSS classes

### Changed
- Updated global font stack to prioritize Nokora
- Enhanced typography for Khmer content

---

## [0.6.0] - 2026-10-31

### Added
- PDF viewer with zoom controls (50%-200%)
- Page navigation interface
- Modern floating controls with backdrop blur
- Proper aspect ratio handling

### Changed
- Refactored PDF preview container
- Improved responsive layout
- Enhanced user controls

---

## [0.5.0] - 2026-10-30

### Added
- Complete dark mode implementation
- Synchronized theme system (CSS variables + Tailwind)
- Smooth theme transitions
- System preference detection
- Persistent theme preference

### Fixed
- Navbar background color mismatch in dark mode
- Mobile menu dark mode styling
- Language dropdown dark mode styling

---

## [0.4.0] - 2026-10-29

### Added
- Initial OCR functionality
- File upload with drag-and-drop
- Image and PDF support
- Text extraction
- Export to TXT format

---

## [0.3.0] - 2026-10-28

### Added
- Bilingual support (English, Khmer)
- Language context provider
- Translation system
- Language selector in navbar

---

## [0.2.0] - 2026-10-27

### Added
- Basic page structure
- Navigation component
- Footer component
- About, Features, FAQ pages
- Responsive design

---

## [0.1.0] - 2026-10-26

### Added
- Initial project setup
- Next.js 16 with App Router
- TypeScript configuration
- Tailwind CSS 4
- Basic layout structure

---

## Version History Summary

| Version | Date       | Key Features                           |
|---------|------------|----------------------------------------|
| 1.0.0   | 2026-11-02 | Production release, all fixes applied  |
| 0.9.0   | 2026-11-01 | Line detection feature                 |
| 0.8.0   | 2026-11-01 | Scanner modes                          |
| 0.7.0   | 2026-10-31 | Nokora font integration                |
| 0.6.0   | 2026-10-31 | PDF viewer enhancements                |
| 0.5.0   | 2026-10-30 | Dark mode implementation               |
| 0.4.0   | 2026-10-29 | OCR functionality                      |
| 0.3.0   | 2026-10-28 | Bilingual support                      |
| 0.2.0   | 2026-10-27 | Basic pages                            |
| 0.1.0   | 2026-10-26 | Initial setup                          |

---

## Notes

### Breaking Changes
None in v1.0.0 - all changes are backward compatible.

### Migration Guide
No migration needed - direct upgrade from any 0.x version.

### Deprecations
None.

### Known Issues
- Image optimization warnings (7 ESLint warnings)
- No test coverage yet (planned for v1.1.0)

---

**Maintained by:** Development Team  
**License:** See LICENSE file  
**Repository:** <repository-url>
