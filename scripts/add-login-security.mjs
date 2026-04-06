import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function addLoginSecurity() {
  try {
    console.log('Adding login security fields to users table...');
    
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP,
      ADD COLUMN IF NOT EXISTS last_failed_login TIMESTAMP
    `;
    
    console.log('✅ Login security fields added successfully');
    console.log('Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

addLoginSecurity();
