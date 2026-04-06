import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function addUnderOfferField() {
  try {
    console.log('Adding is_under_offer field to products table...');
    
    await sql`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS is_under_offer BOOLEAN DEFAULT false
    `;
    
    console.log('✅ is_under_offer field added successfully');
    console.log('Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

addUnderOfferField();
