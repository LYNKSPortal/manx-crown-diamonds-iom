import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { sql } from '../lib/db';
import { mockProducts } from '../lib/products';

async function migrateSampleData() {
  try {
    console.log('Starting migration of sample product data to database...\n');

    // Clear existing products
    console.log('Clearing existing products...');
    await sql`DELETE FROM products`;
    console.log('✓ Existing products cleared\n');

    // Insert each product
    console.log('Inserting sample products:');
    for (const product of mockProducts) {
      await sql`
        INSERT INTO products (
          id, name, description, price, category, in_stock, featured,
          material, gemstone, certification, weight, dimensions, image_url
        ) VALUES (
          ${product.id},
          ${product.name},
          ${product.description},
          ${product.price},
          ${product.category},
          ${product.inStock},
          ${product.featured},
          ${product.specifications.material || null},
          ${product.specifications.gemstone || null},
          ${product.specifications.certification || null},
          ${product.specifications.weight || null},
          ${product.specifications.dimensions || null},
          ${null}
        )
      `;
      console.log(`  ✓ ${product.name}`);
    }

    console.log(`\n✓ Successfully migrated ${mockProducts.length} products to database!`);
    console.log('\nProducts are now stored in the database and can be managed via the admin dashboard.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error migrating data:', error);
    process.exit(1);
  }
}

migrateSampleData();
