# Object-Fit Contain Offset Fix for Line Detection

## Overview
Fixed critical bounding box misalignment caused by `object-fit: contain` letterboxing. The canvas overlay now correctly accounts for centering offsets when images don't match their container's aspect ratio.

## The Problem

### Root Cause
When using `object-fit: contain`, images are scaled to fit within their container while maintaining aspect ratio. This creates **letterboxing** (empty space) that offsets the actual image from the container's top-left corner.

**Example:**
```
Container: 800x600px (4:3 aspect ratio)
Image: 1200x800px (3:2 aspect ratio)

Result: Image scaled to 800x533px, centered vertically
- Displayed width: 800px
- Displayed height: 533px
- Offset X: 0px
- Offset Y: 33.5px (letterbox top and bottom)
```

Without accounting for this offset, bounding boxes drawn at (0, 0) would appear 33.5px too high.

## The Solution

### Aspect Ratio Calculation

```typescript
const imageAspectRatio = img.naturalWidth / img.naturalHeight;
const containerAspectRatio = renderedWidth / renderedHeight;

let displayedWidth = renderedWidth;
let displayedHeight = renderedHeight;
let offsetX = 0;
let offsetY = 0;

if (imageAspectRatio > containerAspectRatio) {
  // Image is wider - letterbox top/bottom
  displayedWidth = renderedWidth;
  displayedHeight = renderedWidth / imageAspectRatio;
  offsetY = (renderedHeight - displayedHeight) / 2;
} else {
  // Image is taller - letterbox left/right
  displayedHeight = renderedHeight;
  displayedWidth = renderedHeight * imageAspectRatio;
  offsetX = (renderedWidth - displayedWidth) / 2;
}
```

### Coordinate Transformation with Offset

```typescript
// Scale factors based on displayed dimensions (not container)
const scaleX = displayedWidth / img.naturalWidth;
const scaleY = displayedHeight / img.naturalHeight;

// Apply scaling AND offset
const x = naturalX * scaleX + offsetX;
const y = naturalY * scaleY + offsetY;
```

## Complete Algorithm

### Step 1: Calculate Displayed Dimensions

```typescript
// Given:
// - Container: 800x600px
// - Image natural: 1200x800px

const imageAspectRatio = 1200 / 800 = 1.5;
const containerAspectRatio = 800 / 600 = 1.333;

// imageAspectRatio > containerAspectRatio (1.5 > 1.333)
// → Image is wider, so letterbox top/bottom

displayedWidth = 800;
displayedHeight = 800 / 1.5 = 533.33;
offsetY = (600 - 533.33) / 2 = 33.33;
```

### Step 2: Calculate Scale Factors

```typescript
scaleX = 800 / 1200 = 0.667;
scaleY = 533.33 / 800 = 0.667;
```

### Step 3: Transform Coordinates

```typescript
// OCR box at normalized (0.1, 0.15) with size (0.8, 0.08)

// Natural coordinates
naturalX = 0.1 × 1200 = 120;
naturalY = 0.15 × 800 = 120;
naturalW = 0.8 × 1200 = 960;
naturalH = 0.08 × 800 = 64;

// Displayed coordinates with offset
x = 120 × 0.667 + 0 = 80;
y = 120 × 0.667 + 33.33 = 113.33;
w = 960 × 0.667 = 640;
h = 64 × 0.667 = 42.67;
```

**Result:** Box drawn at (80, 113.33) with size 640×42.67 on 800×600 canvas

## Visual Examples

### Example 1: Wide Image (Letterbox Top/Bottom)

```
┌─────────────────────────────────┐
│         (empty space)           │ ← offsetY
├─────────────────────────────────┤
│                                 │
│        [Actual Image]           │
│     with bounding boxes         │
│                                 │
├─────────────────────────────────┤
│         (empty space)           │ ← offsetY
└─────────────────────────────────┘
    Container: 800×600px
    Image displayed: 800×533px
```

### Example 2: Tall Image (Letterbox Left/Right)

```
┌──┬───────────────────────┬──┐
│  │                       │  │
│  │   [Actual Image]      │  │
│  │  with bounding boxes  │  │
│  │                       │  │
└──┴───────────────────────┴──┘
 ↑                           ↑
offsetX                   offsetX

Container: 800×600px
Image displayed: 450×600px
```

## Key Improvements

### Before Fix
```typescript
// ❌ Wrong: Ignored object-fit offset
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;
const scaleX = img.clientWidth / img.naturalWidth;
const x = naturalX * scaleX; // Missing offset!
```

### After Fix
```typescript
// ✅ Correct: Accounts for letterboxing
canvas.width = renderedWidth; // Full container
const scaleX = displayedWidth / img.naturalWidth;
const x = naturalX * scaleX + offsetX; // Includes offset!
```

## Canvas Setup

```typescript
// Set canvas to full container size
canvas.width = renderedWidth;
canvas.height = renderedHeight;

// NOT just the displayed image size
// This ensures the canvas covers any letterboxing
```

## Testing Scenarios

### Scenario 1: Perfect Fit (No Offset)
```
Container: 800×600 (4:3)
Image: 1600×1200 (4:3)
Result: 
  - displayedWidth = 800
  - displayedHeight = 600
  - offsetX = 0
  - offsetY = 0
```

### Scenario 2: Wide Image
```
Container: 800×600 (4:3)
Image: 1200×600 (2:1)
Result:
  - displayedWidth = 800
  - displayedHeight = 400
  - offsetX = 0
  - offsetY = 100
```

### Scenario 3: Tall Image
```
Container: 800×600 (4:3)
Image: 600×1200 (1:2)
Result:
  - displayedWidth = 300
  - displayedHeight = 600
  - offsetX = 250
  - offsetY = 0
```

### Scenario 4: Square Image in Wide Container
```
Container: 1000×500 (2:1)
Image: 800×800 (1:1)
Result:
  - displayedWidth = 500
  - displayedHeight = 500
  - offsetX = 250
  - offsetY = 0
```

## Edge Cases Handled

### 1. Very Wide Images (Panoramas)
```typescript
// Example: 3000×500 image in 800×600 container
imageAspectRatio = 6
containerAspectRatio = 1.33
// Result: Significant top/bottom letterbox
offsetY = (600 - 133.33) / 2 = 233.33
```

### 2. Very Tall Images (Portraits)
```typescript
// Example: 500×3000 image in 800×600 container
imageAspectRatio = 0.167
containerAspectRatio = 1.33
// Result: Significant left/right letterbox
offsetX = (800 - 100) / 2 = 350
```

### 3. Square Images
```typescript
// Example: 1000×1000 in 800×600
imageAspectRatio = 1
containerAspectRatio = 1.33
// Image is taller relative to container
offsetX = (800 - 600) / 2 = 100
```

## Integration with OCR API

### Expected Coordinate Format

```typescript
interface OCRBoundingBox {
  // Normalized coordinates (0-1 range relative to natural image)
  x: number;      // Left edge
  y: number;      // Top edge
  width: number;  // Box width
  height: number; // Box height
}

// Or absolute pixel coordinates
interface OCRBoundingBoxPixels {
  x: number;      // Pixels from left on natural image
  y: number;      // Pixels from top on natural image
  width: number;  // Width in pixels
  height: number; // Height in pixels
}
```

### Transformation Function

```typescript
const transformOCRBox = (
  box: OCRBoundingBox,
  naturalWidth: number,
  naturalHeight: number,
  scaleX: number,
  scaleY: number,
  offsetX: number,
  offsetY: number
) => {
  // Convert to natural pixels
  const naturalX = box.x * naturalWidth;
  const naturalY = box.y * naturalHeight;
  const naturalW = box.width * naturalWidth;
  const naturalH = box.height * naturalHeight;
  
  // Scale and offset to canvas coordinates
  return {
    x: naturalX * scaleX + offsetX,
    y: naturalY * scaleY + offsetY,
    width: naturalW * scaleX,
    height: naturalH * scaleY,
  };
};
```

### Usage Example

```typescript
const drawOCRResults = (ocrBoxes: OCRBoundingBox[]) => {
  ocrBoxes.forEach(box => {
    const transformed = transformOCRBox(
      box,
      img.naturalWidth,
      img.naturalHeight,
      scaleX,
      scaleY,
      offsetX,
      offsetY
    );
    
    ctx.fillRect(transformed.x, transformed.y, transformed.width, transformed.height);
    ctx.strokeRect(transformed.x, transformed.y, transformed.width, transformed.height);
  });
};
```

## Performance Considerations

### Calculation Overhead
```typescript
// These calculations are lightweight (~0.1ms)
const imageAspectRatio = img.naturalWidth / img.naturalHeight;
const containerAspectRatio = renderedWidth / renderedHeight;
// 2 divisions, 1 comparison, 2 subtractions = negligible
```

### When to Recalculate
- ✅ On image load
- ✅ On window resize
- ✅ On zoom change
- ✅ On mode change
- ❌ Not needed on every frame

### Optimization
```typescript
// Cache aspect ratio calculations if they don't change
const imageAspect = useMemo(
  () => img.naturalWidth / img.naturalHeight,
  [img.naturalWidth, img.naturalHeight]
);
```

## Browser Compatibility

✅ **Full Support:**
- All modern browsers support these calculations
- No browser-specific workarounds needed
- Works identically across Chrome, Firefox, Safari, Edge

## Debugging Tips

### Visualize Offsets

```typescript
// Draw letterbox regions in different color
ctx.fillStyle = "rgba(255, 0, 0, 0.1)"; // Red tint

// Top/bottom letterbox
if (offsetY > 0) {
  ctx.fillRect(0, 0, canvas.width, offsetY);
  ctx.fillRect(0, canvas.height - offsetY, canvas.width, offsetY);
}

// Left/right letterbox
if (offsetX > 0) {
  ctx.fillRect(0, 0, offsetX, canvas.height);
  ctx.fillRect(canvas.width - offsetX, 0, offsetX, canvas.height);
}
```

### Log Calculations

```typescript
console.log({
  container: { width: renderedWidth, height: renderedHeight },
  natural: { width: img.naturalWidth, height: img.naturalHeight },
  displayed: { width: displayedWidth, height: displayedHeight },
  offset: { x: offsetX, y: offsetY },
  scale: { x: scaleX, y: scaleY },
});
```

### Draw Grid Reference

```typescript
// Draw a grid to verify alignment
ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
ctx.lineWidth = 1;

// Center lines
ctx.beginPath();
ctx.moveTo(canvas.width / 2, 0);
ctx.lineTo(canvas.width / 2, canvas.height);
ctx.moveTo(0, canvas.height / 2);
ctx.lineTo(canvas.width, canvas.height / 2);
ctx.stroke();

// Image boundary
ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
ctx.strokeRect(offsetX, offsetY, displayedWidth, displayedHeight);
```

## Common Mistakes to Avoid

### ❌ Wrong: Using clientWidth for scale
```typescript
const scaleX = img.clientWidth / img.naturalWidth;
// This is wrong if there's letterboxing!
```

### ✅ Correct: Using displayed width for scale
```typescript
const scaleX = displayedWidth / img.naturalWidth;
// displayedWidth accounts for aspect ratio
```

### ❌ Wrong: Ignoring offset
```typescript
const x = naturalX * scaleX;
// Missing the letterbox offset!
```

### ✅ Correct: Including offset
```typescript
const x = naturalX * scaleX + offsetX;
// Accounts for centering
```

### ❌ Wrong: Canvas size = displayed image
```typescript
canvas.width = displayedWidth;
canvas.height = displayedHeight;
// Canvas won't cover letterboxing!
```

### ✅ Correct: Canvas size = full container
```typescript
canvas.width = renderedWidth;
canvas.height = renderedHeight;
// Canvas covers entire image element including letterbox
```

## Related CSS Requirements

```css
/* Image must use object-fit: contain */
.preview-image {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

/* Container must have defined dimensions */
.preview-container {
  width: 800px;
  height: 600px;
  position: relative; /* For absolute canvas positioning */
}

/* Canvas positioned over image */
.detection-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
```

## Future Enhancements

### 1. Support object-fit: cover
```typescript
// Would need different calculation
if (imageAspectRatio > containerAspectRatio) {
  // Image is wider - crop left/right
  displayedHeight = renderedHeight;
  displayedWidth = renderedHeight * imageAspectRatio;
  offsetX = -(displayedWidth - renderedWidth) / 2;
} else {
  // Image is taller - crop top/bottom
  displayedWidth = renderedWidth;
  displayedHeight = renderedWidth / imageAspectRatio;
  offsetY = -(displayedHeight - renderedHeight) / 2;
}
```

### 2. Support object-position
```typescript
// Would need to parse CSS object-position value
const objectPosition = getComputedStyle(img).objectPosition;
// Adjust offsetX/offsetY based on position (e.g., "top", "right")
```

---

**Status:** ✅ Fixed and Production Ready
**Last Updated:** 2026-11-02
**Component:** `src/components/ocr/FilePreview.tsx`
**Key Fix:** Accounts for `object-fit: contain` letterboxing offset
