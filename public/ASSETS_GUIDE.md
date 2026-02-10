# Adding Media Assets to INTERNITY PERFUME

## Overview

The application is **fully functional** without these assets. Your components have elegant animated fallbacks that look professional and premium. Adding these assets is **optional** and will enhance the visual experience.

---

## Required Assets (Optional)

### 1. Hero Poster Image

**Path**: `public/images/hero-poster.jpg`  
**Dimensions**: 1920x1080px (16:9)  
**Purpose**: Fallback image for hero section background video

**Design Guidelines**:
- Dark, moody aesthetic (black background)
- Feature a luxury perfume bottle with golden accents
- Professional product photography style
- Soft dramatic lighting
- Gold mist or particles for premium feel

### 2. Intro Video

**Path**: `public/videos/intro.mp4`  
**Duration**: 5-8 seconds recommended  
**Purpose**: Brand introduction on first visit

**Design Guidelines**:
- Show INTERNITY PERFUME branding
- Luxury aesthetic with spray/mist effects
- Dark background with gold accents
- Smooth fade in/out transitions

**Current Fallback**: Beautiful animated logo sequence with particles (already looks amazing!)

### 3. Hero Background Video

**Path**: `public/videos/hero-bg.mp4`  
**Duration**: Loop-able (15-30 seconds)  
**Purpose**: Hero section background animation

**Design Guidelines**:
- Subtle perfume spray or mist animation
- Dark, elegant aesthetic
- Loop seamlessly
- Not too distracting from content

**Current Fallback**: Luxury gradient background (clean and professional)

---

## How to Add Assets

### Option 1: Use Your Own Media

1. **Place files in the correct directories**:
   ```
   public/images/hero-poster.jpg
   public/videos/intro.mp4
   public/videos/hero-bg.mp4
   ```

2. **Restart the development server** (if running):
   ```powershell
   npm run dev
   ```

3. **Refresh your browser** at http://localhost:3000

### Option 2: Use Stock Media

**Recommended Sources**:
- **Unsplash** (free high-quality images): https://unsplash.com/s/photos/luxury-perfume
- **Pexels Videos** (free videos): https://www.pexels.com/search/videos/perfume/
- **Pixabay** (free images & videos): https://pixabay.com/videos/search/luxury/

**Search Terms**:
- "luxury perfume bottle"
- "perfume spray mist"
- "golden perfume"
- "luxury fragrance"

### Option 3: Keep the Current Fallbacks

**The fallbacks are already premium quality!**
- Animated intro with golden particles
- Smooth gradient backgrounds
- Professional typography animations
- No action needed - it looks great as-is

---

## Additional Optional Assets

### Favicon & Branding

Create these for a complete brand experience:

```
public/favicon.ico          - Browser tab icon (32x32px)
public/apple-touch-icon.png - iOS home screen (180x180px)
public/og-image.jpg          - Social media preview (1200x630px)
```

### Product Images

When adding real products, place images in:
```
public/images/products/
```

---

## Design Tips

### Color Palette (from your design system)

- **Primary Black**: `#0a0a0a`
- **Luxury Gold**: `#c9a962`
- **Cream**: `#f5f0e8`
- **Dark**: `#1a1a1a`

### Typography

- **Display Font**: Cormorant Garamond (elegant, luxury)
- **Body Font**: Inter (clean, modern)
- **Accent Font**: Playfair Display (sophisticated)

### Animation Principles

- Smooth, slow transitions (0.5s - 0.8s)
- Subtle parallax effects
- Gold shimmer accents
- Fade and float animations

---

## How It Works Now (Without Assets)

### Intro Video Component
```typescript
// Automatically detects if video exists
// Falls back to animated logo sequence
✓ Golden particle effects
✓ Smooth typography animations
✓ Professional brand reveal
```

### Hero Section
```typescript
// Shows gradient background
✓ Luxury black to gold gradient
✓ All content displays perfectly
✓ Parallax scroll effects working
```

---

## Verification

To verify everything is working:

1. **Start server**: `npm run dev`
2. **Open**: http://localhost:3000
3. **Check**: You should see beautiful animated intro
4. **Scroll**: Hero section with gradient background
5. **Navigate**: All pages load correctly

**Expected behavior**: Everything looks premium and professional even without the video assets!

---

## Questions?

The application is production-ready as-is. Adding media assets is purely for visual enhancement and is completely optional.
