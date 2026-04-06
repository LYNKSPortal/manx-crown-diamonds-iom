import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function addUserNames() {
  try {
    console.log('Adding first_name and last_name columns to users table...');
    
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
      ADD COLUMN IF NOT EXISTS last_name VARCHAR(100)
    `;
    
    console.log('✅ Name columns added successfully');
    
    // Set default name for support@lynksportal.com
    console.log('Setting default name for master admin...');
    
    await sql`
      UPDATE users 
      SET first_name = 'Support', last_name = 'Admin'
      WHERE email = 'support@lynksportal.com' AND first_name IS NULL
    `;
    
    console.log('✅ Default name set for master admin');
    console.log('Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

addUserNames();
