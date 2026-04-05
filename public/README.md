# Public Assets

This folder contains static assets for the Manx Crown Diamonds website.

## Folder Structure

- `/products` - Product images (rings, necklaces, earrings, bracelets)
- `/images` - General website images (logo, hero images, etc.)

## Image Guidelines

### Product Images
- Format: JPG or PNG
- Recommended size: 800x800px minimum
- File naming: Use descriptive names (e.g., `diamond-ring-solitaire.jpg`)

### General Images
- Logo: SVG or PNG with transparent background
- Hero images: 1920x1080px recommended
- Icons: SVG preferred

## Usage in Next.js

Images in the `public` folder can be referenced from the root:

```jsx
// Example
<Image src="/products/ring-1.jpg" alt="Diamond Ring" width={800} height={800} />
```

Or with regular img tags:
```jsx
<img src="/images/logo.png" alt="Manx Crown Diamonds" />
```

## Current Status

Currently using placeholder icons from Lucide React. Replace with actual product photography when available.
