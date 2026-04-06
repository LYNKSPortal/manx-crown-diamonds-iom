import { sql } from './db';
import { Product } from './types';

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await sql`
      SELECT 
        id, name, description, price, category, 
        in_stock as "inStock", featured,
        material, gemstone, certification, weight, dimensions,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM products
      ORDER BY created_at DESC
    `;

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      category: row.category,
      inStock: row.inStock,
      featured: row.featured,
      images: ['/products/placeholder.jpg'],
      specifications: {
        material: row.material || undefined,
        gemstone: row.gemstone || undefined,
        certification: row.certification || undefined,
        weight: row.weight || undefined,
        dimensions: row.dimensions || undefined,
      },
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const rows = await sql`
      SELECT 
        id, name, description, price, category, 
        in_stock as "inStock", featured,
        material, gemstone, certification, weight, dimensions,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM products
      WHERE id = ${id}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      category: row.category,
      inStock: row.inStock,
      featured: row.featured,
      images: ['/products/placeholder.jpg'],
      specifications: {
        material: row.material || undefined,
        gemstone: row.gemstone || undefined,
        certification: row.certification || undefined,
        weight: row.weight || undefined,
        dimensions: row.dimensions || undefined,
      },
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const rows = await sql`
      SELECT 
        id, name, description, price, category, 
        in_stock as "inStock", featured,
        material, gemstone, certification, weight, dimensions,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM products
      WHERE category = ${category}
      ORDER BY created_at DESC
    `;

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      category: row.category,
      inStock: row.inStock,
      featured: row.featured,
      images: ['/products/placeholder.jpg'],
      specifications: {
        material: row.material || undefined,
        gemstone: row.gemstone || undefined,
        certification: row.certification || undefined,
        weight: row.weight || undefined,
        dimensions: row.dimensions || undefined,
      },
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const rows = await sql`
      SELECT 
        id, name, description, price, category, 
        in_stock as "inStock", featured,
        material, gemstone, certification, weight, dimensions,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM products
      WHERE featured = true
      ORDER BY created_at DESC
    `;

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: Number(row.price),
      category: row.category,
      inStock: row.inStock,
      featured: row.featured,
      images: ['/products/placeholder.jpg'],
      specifications: {
        material: row.material || undefined,
        gemstone: row.gemstone || undefined,
        certification: row.certification || undefined,
        weight: row.weight || undefined,
        dimensions: row.dimensions || undefined,
      },
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
}
