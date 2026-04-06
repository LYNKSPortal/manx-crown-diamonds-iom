import { sql } from './db';

export async function initDatabase() {
  try {
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category TEXT NOT NULL,
        in_stock BOOLEAN DEFAULT true,
        featured BOOLEAN DEFAULT false,
        material TEXT,
        gemstone TEXT,
        certification TEXT,
        weight TEXT,
        dimensions TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables created successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function seedProducts() {
  try {
    // Check if products already exist
    const existingProducts = await sql`SELECT COUNT(*) as count FROM products`;
    
    if (existingProducts[0].count > 0) {
      console.log('Products already exist, skipping seed');
      return { success: true, message: 'Products already seeded' };
    }

    // Insert sample products
    const products = [
      {
        id: '1',
        name: 'IWC Portugieser Chronograph',
        description: 'Elegant IWC Portugieser Chronograph in 18K rose gold with silver dial. Classic design with in-house automatic chronograph movement.',
        price: 24500,
        category: 'watches',
        in_stock: true,
        featured: false,
        material: '18K Rose Gold',
        certification: 'IWC Certified',
        dimensions: '41mm diameter'
      },
      {
        id: '2',
        name: 'Jaeger-LeCoultre Reverso',
        description: 'Classic Jaeger-LeCoultre Reverso with reversible case in stainless steel. Art Deco design with manual winding movement.',
        price: 8900,
        category: 'watches',
        in_stock: true,
        featured: false,
        material: 'Stainless Steel',
        certification: 'Jaeger-LeCoultre Certified',
        dimensions: '42.9mm x 25.5mm'
      },
      {
        id: '3',
        name: 'Audemars Piguet Royal Oak',
        description: 'Iconic Audemars Piguet Royal Oak in stainless steel with blue "Grande Tapisserie" dial. Automatic movement, integrated bracelet design.',
        price: 32000,
        category: 'watches',
        in_stock: true,
        featured: true,
        material: 'Stainless Steel',
        certification: 'AP Certified',
        dimensions: '41mm diameter'
      },
      {
        id: '4',
        name: 'Patek Philippe Calatrava',
        description: 'Timeless Patek Philippe Calatrava in 18K white gold with silver dial. Manual winding movement, the epitome of dress watch elegance.',
        price: 28500,
        category: 'watches',
        in_stock: true,
        featured: true,
        material: '18K White Gold',
        certification: 'Patek Philippe Certified',
        dimensions: '39mm diameter'
      }
    ];

    for (const product of products) {
      await sql`
        INSERT INTO products (
          id, name, description, price, category, in_stock, featured,
          material, certification, dimensions
        ) VALUES (
          ${product.id}, ${product.name}, ${product.description}, 
          ${product.price}, ${product.category}, ${product.in_stock}, 
          ${product.featured}, ${product.material}, ${product.certification},
          ${product.dimensions}
        )
      `;
    }

    console.log('Products seeded successfully');
    return { success: true, message: 'Products seeded successfully' };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}
