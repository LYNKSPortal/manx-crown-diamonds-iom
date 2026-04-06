import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function checkProducts() {
  try {
    console.log('Fetching all products from database...\n');
    
    const products = await sql`
      SELECT id, name, category, price, in_stock, created_at 
      FROM products 
      ORDER BY created_at DESC
    `;
    
    console.log(`Found ${products.length} products:\n`);
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Price: £${product.price}`);
      console.log(`   In Stock: ${product.in_stock}`);
      console.log(`   Created: ${product.created_at}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
