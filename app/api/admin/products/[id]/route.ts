import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      SELECT * FROM products WHERE id = ${params.id}
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: result[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      in_stock,
      featured,
      is_unique_item,
      material,
      gemstone,
      certification,
      weight,
      dimensions,
      image_url,
    } = data;

    const result = await sql`
      UPDATE products SET
        name = ${name},
        description = ${description},
        price = ${price},
        category = ${category},
        in_stock = ${in_stock},
        featured = ${featured},
        is_unique_item = ${is_unique_item || false},
        material = ${material},
        gemstone = ${gemstone},
        certification = ${certification},
        weight = ${weight},
        dimensions = ${dimensions},
        image_url = ${image_url},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Revalidate all pages that display products
    revalidatePath('/shop');
    revalidatePath('/');
    revalidatePath(`/shop/${params.id}`);

    return NextResponse.json({
      success: true,
      product: result[0],
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      DELETE FROM products WHERE id = ${params.id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Revalidate all pages that display products
    revalidatePath('/shop');
    revalidatePath('/');

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
