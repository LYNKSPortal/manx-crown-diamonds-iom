import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);

async function createUsersTable() {
  try {
    console.log('Creating users table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('✅ Users table created successfully');
    
    // Check if support@lynksportal.com exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = 'support@lynksportal.com'
    `;
    
    if (existingUser.length === 0) {
      console.log('Creating master admin user: support@lynksportal.com...');
      
      // Hash the password (using the existing password from env or a default)
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      
      await sql`
        INSERT INTO users (email, password, role)
        VALUES ('support@lynksportal.com', ${hashedPassword}, 'master_admin')
      `;
      
      console.log('✅ Master admin user created');
    } else {
      console.log('Updating existing user to master_admin...');
      
      await sql`
        UPDATE users 
        SET role = 'master_admin'
        WHERE email = 'support@lynksportal.com'
      `;
      
      console.log('✅ User updated to master_admin');
    }
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

createUsersTable();
