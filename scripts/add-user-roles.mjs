import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function addUserRoles() {
  try {
    console.log('Adding role field to users table...');
    
    // Add role column
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'admin'
    `;
    
    console.log('✅ Role field added successfully');
    
    // Set support@lynksportal.com as master_admin
    console.log('Setting support@lynksportal.com as master admin...');
    
    await sql`
      UPDATE users 
      SET role = 'master_admin'
      WHERE email = 'support@lynksportal.com'
    `;
    
    console.log('✅ Master admin role assigned to support@lynksportal.com');
    console.log('Migration completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

addUserRoles();
