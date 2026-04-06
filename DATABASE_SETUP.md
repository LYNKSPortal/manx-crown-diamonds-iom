# Database Setup Guide

## Overview
This project uses Neon PostgreSQL database for storing product data.

## Database Connection
- **Provider**: Neon (Serverless PostgreSQL)
- **Connection String**: Stored in `.env.local` file
- **SDK**: `@neondatabase/serverless`

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  material TEXT,
  gemstone TEXT,
  certification TEXT,
  weight TEXT,
  dimensions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the project root with:
```
DATABASE_URL="your-neon-database-connection-string"
```

### 2. Initialize Database
Run the setup script to create tables and seed initial data:
```bash
npm run db:setup
```

Or manually with environment variable:
```bash
DATABASE_URL="your-connection-string" npx tsx scripts/setup-db.ts
```

### 3. Vercel Deployment
Add the `DATABASE_URL` environment variable in Vercel:
1. Go to your project settings in Vercel
2. Navigate to Environment Variables
3. Add `DATABASE_URL` with your Neon connection string
4. Redeploy the application

## Files Structure

- `lib/db.ts` - Database connection utility
- `lib/init-db.ts` - Database initialization and seeding functions
- `lib/products-db.ts` - Product query functions (database version)
- `lib/products.ts` - Product query functions (mock data - for fallback)
- `scripts/setup-db.ts` - Setup script to initialize and seed database

## Usage

### Querying Products
```typescript
import { getProducts, getProductById } from '@/lib/products-db';

// Get all products
const products = await getProducts();

// Get product by ID
const product = await getProductById('1');

// Get products by category
const watches = await getProductsByCategory('watches');

// Get featured products
const featured = await getFeaturedProducts();
```

## Current Data
The database has been seeded with 4 sample products:
1. IWC Portugieser Chronograph (£24,500)
2. Jaeger-LeCoultre Reverso (£8,900)
3. Audemars Piguet Royal Oak (£32,000) - Featured
4. Patek Philippe Calatrava (£28,500) - Featured

## Next Steps
To use the database in your pages:
1. Update pages to use `products-db.ts` instead of `products.ts`
2. Make page components async
3. Use `await getProducts()` to fetch from database
4. Test locally with `npm run dev`
5. Deploy to Vercel with DATABASE_URL environment variable set
