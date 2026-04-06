import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function addProductImagesTable() {
  try {
    console.log('Creating product_images table...');
    
    // Create product_images table
    await sql`
      CREATE TABLE IF NOT EXISTS product_images (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        cloudinary_public_id VARCHAR(255),
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `;
    
    console.log('✅ product_images table created successfully');
    
    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_product_images_product_id 
      ON product_images(product_id)
    `;
    
    console.log('✅ Index created successfully');
    
    // Migrate existing image_url data to product_images table
    console.log('Migrating existing product images...');
    
    const productsWithImages = await sql`
      SELECT id, image_url FROM products WHERE image_url IS NOT NULL
    `;
    
    for (const product of productsWithImages) {
      await sql`
        INSERT INTO product_images (product_id, image_url, display_order)
        VALUES (${product.id}, ${product.image_url}, 0)
        ON CONFLICT DO NOTHING
      `;
    }
    
    console.log(`✅ Migrated ${productsWithImages.length} product images`);
    console.log('Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

addProductImagesTable();
