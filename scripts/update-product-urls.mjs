import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function updateProductUrls() {
  try {
    console.log('Temporarily disabling foreign key constraints...');
    
    // Disable foreign key constraint
    await sql`
      ALTER TABLE product_images DROP CONSTRAINT IF EXISTS product_images_product_id_fkey
    `;
    
    console.log('Fetching all existing products...');
    
    const products = await sql`
      SELECT id, name FROM products
    `;
    
    console.log(`Found ${products.length} products to update`);
    
    for (const product of products) {
      // Generate slug from product name
      const slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Keep the timestamp from the old ID if it exists
      const oldIdParts = product.id.split('-');
      const timestamp = oldIdParts[oldIdParts.length - 1];
      
      // Create new ID with slug
      const newId = `${slug}-${timestamp}`;
      
      // Only update if the ID has changed
      if (newId !== product.id) {
        console.log(`Updating: "${product.name}"`);
        console.log(`  Old ID: ${product.id}`);
        console.log(`  New ID: ${newId}`);
        
        // First, update any product_images references
        await sql`
          UPDATE product_images
          SET product_id = ${newId}
          WHERE product_id = ${product.id}
        `;
        
        // Then update the product itself
        await sql`
          UPDATE products
          SET id = ${newId}
          WHERE id = ${product.id}
        `;
        
        console.log(`  ✅ Updated successfully`);
      } else {
        console.log(`Skipping: "${product.name}" (already has correct format)`);
      }
    }
    
    console.log('\nRe-enabling foreign key constraints...');
    
    // Re-enable foreign key constraint
    await sql`
      ALTER TABLE product_images 
      ADD CONSTRAINT product_images_product_id_fkey 
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    `;
    
    console.log('\n✅ All product URLs updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    
    // Try to re-enable constraint even if there was an error
    try {
      await sql`
        ALTER TABLE product_images 
        ADD CONSTRAINT product_images_product_id_fkey 
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      `;
    } catch (e) {
      console.error('Could not re-enable foreign key constraint:', e.message);
    }
    
    process.exit(1);
  }
}

updateProductUrls();
