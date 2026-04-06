import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function addUniqueItemField() {
  try {
    console.log('Adding is_unique_item field to products table...');
    
    // Add is_unique_item column
    await sql`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS is_unique_item BOOLEAN DEFAULT false
    `;
    
    console.log('✅ is_unique_item field added successfully');
    console.log('Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

addUniqueItemField();
