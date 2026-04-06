import bcrypt from 'bcryptjs';

async function generatePasswordHash() {
  const password = process.argv[2] || 'admin123';
  
  console.log('Generating password hash for:', password);
  
  const hash = await bcrypt.hash(password, 10);
  
  console.log('\nAdd this to your .env.local file:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('\nAnd set your admin email:');
  console.log('ADMIN_EMAIL="andy@manxcrowndiamonds.com"');
  console.log('\nAnd JWT secret:');
  console.log('JWT_SECRET="your-random-secret-key-here"');
}

generatePasswordHash();
