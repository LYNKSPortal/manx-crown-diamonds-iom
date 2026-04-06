import { config } from 'dotenv';
import { sql } from '../lib/db';

config({ path: '.env.local' });

async function addImageUrlColumn() {
  try {
    console.log('Adding image_url column to products table...');
    
    await sql`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS image_url TEXT
    `;
    
    console.log('✓ image_url column added successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error adding column:', error);
    process.exit(1);
  }
}

addImageUrlColumn();
