import { config } from 'dotenv';
import { initDatabase, seedProducts } from '../lib/init-db';

// Load environment variables
config({ path: '.env.local' });

async function setup() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('✓ Database initialized');

    console.log('Seeding products...');
    const result = await seedProducts();
    console.log('✓', result.message);

    console.log('\n✅ Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setup();
