# Cloudinary Integration Guide

## Overview
This project uses Cloudinary for image storage and optimization for product images.

## Cloudinary Credentials
- **Cloud Name:** `883842631154281`
- **API Key:** `5czwUHHQWFVpSL3Iiu7iI6t_akA`
- **API Secret:** (Stored in environment variables)

## Setup Instructions

### 1. Environment Variables
Add the following to your `.env.local` file:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="883842631154281"
NEXT_PUBLIC_CLOUDINARY_API_KEY="5czwUHHQWFVpSL3Iiu7iI6t_akA"
CLOUDINARY_API_SECRET="your-api-secret-here"
```

**Note:** Replace `your-api-secret-here` with your actual API Secret from Cloudinary dashboard.

### 2. Vercel Deployment
Add these environment variables in Vercel:
1. Go to Project Settings → Environment Variables
2. Add the following:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `883842631154281`
   - `NEXT_PUBLIC_CLOUDINARY_API_KEY` = `5czwUHHQWFVpSL3Iiu7iI6t_akA`
   - `CLOUDINARY_API_SECRET` = `your-api-secret`
3. Select all environments (Production, Preview, Development)
4. Save and redeploy

## Files Structure

- `lib/cloudinary.ts` - Cloudinary configuration and helper functions
- `app/api/upload/route.ts` - API endpoint for image uploads
- `components/ImageUpload.tsx` - Client-side image upload component

## Usage

### Upload Component
```tsx
import ImageUpload from '@/components/ImageUpload';

function MyComponent() {
  const handleUploadComplete = (url: string, publicId: string) => {
    console.log('Image uploaded:', url);
    // Save to database or update state
  };

  return (
    <ImageUpload 
      onUploadComplete={handleUploadComplete}
      folder="products"
    />
  );
}
```

### Get Optimized Image URL
```typescript
import { getCloudinaryUrl } from '@/lib/cloudinary';

// Get optimized image URL
const imageUrl = getCloudinaryUrl('products/my-image', {
  width: 800,
  height: 600,
  quality: 'auto',
  format: 'auto',
});
```

### Upload Image Programmatically
```typescript
import { uploadImage } from '@/lib/cloudinary';

const result = await uploadImage(dataUrl, {
  folder: 'products',
  public_id: 'my-product-image',
  tags: ['product', 'jewellery'],
});

if (result.success) {
  console.log('Uploaded:', result.url);
}
```

### Delete Image
```typescript
import { deleteImage } from '@/lib/cloudinary';

const result = await deleteImage('products/my-image');
if (result.success) {
  console.log('Image deleted');
}
```

## Image Optimization Features

Cloudinary automatically provides:
- **Automatic format selection** - Serves WebP to supported browsers
- **Quality optimization** - Reduces file size while maintaining quality
- **Responsive images** - Generate multiple sizes on-the-fly
- **CDN delivery** - Fast global image delivery
- **Transformations** - Crop, resize, apply effects

## API Endpoint

### POST /api/upload
Upload an image to Cloudinary.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `file` field

**Response:**
```json
{
  "success": true,
  "publicId": "products/abc123",
  "url": "https://res.cloudinary.com/...",
  "width": 1920,
  "height": 1080
}
```

## Best Practices

1. **Use folders** - Organize images by category (products, banners, etc.)
2. **Add tags** - Tag images for easy filtering and management
3. **Optimize on delivery** - Use transformation parameters for responsive images
4. **Delete unused images** - Clean up old images to save storage
5. **Use public IDs** - Store Cloudinary public IDs in database, not full URLs

## Image Naming Convention

Recommended format: `{category}/{product-id}-{index}`

Example:
- `products/watch-001-main`
- `products/watch-001-detail-1`
- `products/ring-042-side`

## Cloudinary Dashboard

Access your Cloudinary dashboard at:
https://console.cloudinary.com/

Here you can:
- View all uploaded images
- Manage folders and tags
- Monitor usage and bandwidth
- Configure upload presets
- Set up transformations
