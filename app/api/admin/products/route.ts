import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET all products
export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const products = await sql`
      SELECT * FROM products ORDER BY created_at DESC
    `;

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const {
      name,
      description,
      price,
      category,
      in_stock = true,
      featured = false,
      is_unique_item,
      is_under_offer,
      material,
      gemstone,
      certification,
      weight,
      dimensions,
      image_url,
    } = data;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from product name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Add timestamp suffix to ensure uniqueness
    const id = `${slug}-${Date.now()}`;

    // Insert product
    const result = await sql`
      INSERT INTO products (
        id, name, description, price, category, in_stock, featured, is_unique_item, is_under_offer,
        material, gemstone, certification, weight, dimensions, image_url
      ) VALUES (
        ${id}, ${name}, ${description}, ${price}, ${category},
        ${in_stock}, ${featured}, ${is_unique_item || false}, ${is_under_offer || false}, ${material}, ${gemstone},
        ${certification}, ${weight}, ${dimensions}, ${image_url}
      )
      RETURNING *
    `;

    // Revalidate all pages that display products
    revalidatePath('/shop');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      product: result[0],
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
