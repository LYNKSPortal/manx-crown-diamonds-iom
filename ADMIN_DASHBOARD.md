# Admin Dashboard Documentation

## Overview
Complete admin dashboard backend for managing products, images, and database content for Manx Crown Diamonds.

## Features

### Authentication
- Secure JWT-based authentication
- Session management with HTTP-only cookies
- Protected admin routes

### Product Management
- **List Products** - View all products with search and filtering
- **Add Products** - Create new products with full details
- **Edit Products** - Update existing product information
- **Delete Products** - Remove products from database
- **Image Upload** - Cloudinary integration for product images

### Database Integration
- PostgreSQL (Neon) for data storage
- Real-time CRUD operations
- Automatic timestamps

## Setup Instructions

### 1. Generate Admin Password Hash

Run the password hash generator:
```bash
npx tsx scripts/generate-admin-password.ts your-password-here
```

This will output a hash to add to your `.env.local` file.

### 2. Environment Variables

Add to `.env.local`:
```
# Admin Authentication
ADMIN_EMAIL="andy@manxcrowndiamonds.com"
ADMIN_PASSWORD_HASH="$2a$10$..." # Generated from step 1
JWT_SECRET="your-random-secret-key-change-in-production"

# Database (already configured)
DATABASE_URL="postgresql://..."

# Cloudinary (already configured)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
NEXT_PUBLIC_CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### 3. Vercel Environment Variables

Add these to Vercel (in addition to existing DATABASE_URL and Cloudinary vars):
- `ADMIN_EMAIL` = `andy@manxcrowndiamonds.com`
- `ADMIN_PASSWORD_HASH` = (your generated hash)
- `JWT_SECRET` = (your secret key)

### 4. Database Schema Update

The `image_url` column has been added to the products table automatically.

## Admin Routes

### Public Routes
- `/admin/login` - Admin login page

### Protected Routes (require authentication)
- `/admin/dashboard` - Main dashboard
- `/admin/products` - Product list and management
- `/admin/products/new` - Add new product
- `/admin/products/edit/[id]` - Edit product
- `/admin/images` - Image management (placeholder)
- `/admin/settings` - Settings (placeholder)

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login with email and password
- `POST /api/admin/logout` - Logout and clear session

### Products
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create new product
- `GET /api/admin/products/[id]` - Get single product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Image Upload
- `POST /api/upload` - Upload image to Cloudinary

## Usage

### Login
1. Navigate to `/admin/login`
2. Enter admin email and password
3. Click "Login"
4. Redirected to `/admin/dashboard`

### Add Product
1. Go to `/admin/products`
2. Click "Add New Product"
3. Fill in product details:
   - Basic info (name, category, price, description)
   - Specifications (material, gemstone, certification, etc.)
   - Upload product image
   - Set stock status and featured flag
4. Click "Create Product"

### Edit Product
1. Go to `/admin/products`
2. Click edit icon on product row
3. Update product details
4. Click "Update Product"

### Delete Product
1. Go to `/admin/products`
2. Click delete icon on product row
3. Confirm deletion

### Upload Images
- Images are uploaded via Cloudinary integration
- Automatic optimization and CDN delivery
- Images stored with public URLs in database

## File Structure

```
app/
├── admin/
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard
│   └── products/
│       ├── page.tsx              # Product list (server component)
│       ├── ProductsClient.tsx    # Product list (client component)
│       ├── ProductForm.tsx       # Product form component
│       ├── new/
│       │   └── page.tsx          # Add product page
│       └── edit/
│           └── [id]/
│               └── page.tsx      # Edit product page
├── api/
│   ├── admin/
│   │   ├── login/
│   │   │   └── route.ts          # Login API
│   │   ├── logout/
│   │   │   └── route.ts          # Logout API
│   │   └── products/
│   │       ├── route.ts          # Products CRUD
│   │       └── [id]/
│   │           └── route.ts      # Single product CRUD
│   └── upload/
│       └── route.ts              # Image upload API
lib/
├── auth.ts                       # Authentication utilities
├── db.ts                         # Database connection
├── cloudinary.ts                 # Cloudinary utilities
├── init-db.ts                    # Database initialization
└── products-db.ts                # Product database queries
scripts/
├── setup-db.ts                   # Database setup script
├── add-image-url.ts              # Add image_url column
└── generate-admin-password.ts    # Password hash generator
```

## Security Features

1. **Password Hashing** - bcrypt with salt rounds
2. **JWT Tokens** - Signed with secret key
3. **HTTP-Only Cookies** - Prevent XSS attacks
4. **Session Expiry** - 24-hour token lifetime
5. **Route Protection** - Server-side authentication checks
6. **Secure Cookies** - HTTPS only in production

## Default Credentials

**Email:** `andy@manxcrowndiamonds.com`
**Password:** Set via environment variable

⚠️ **Important:** Change the default password in production!

## Troubleshooting

### Cannot Login
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in `.env.local`
- Verify password hash was generated correctly
- Check browser console for errors

### Products Not Saving
- Verify `DATABASE_URL` is set correctly
- Check database connection
- Review API response in browser network tab

### Images Not Uploading
- Verify Cloudinary credentials are set
- Check `CLOUDINARY_API_SECRET` is correct
- Review upload API logs

### Session Expires Immediately
- Check `JWT_SECRET` is set
- Verify cookies are enabled in browser
- Check for CORS issues

## Future Enhancements

- [ ] Order management
- [ ] Customer management  
- [ ] Analytics dashboard
- [ ] Bulk product import/export
- [ ] Email notifications
- [ ] Activity logs
- [ ] Multi-admin support with roles
- [ ] Product categories management
- [ ] Inventory tracking

## Support

For issues or questions, contact the development team or refer to the main project documentation.
