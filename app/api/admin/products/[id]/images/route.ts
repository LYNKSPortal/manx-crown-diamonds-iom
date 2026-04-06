import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';

// GET product images
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const images = await sql`
      SELECT id, image_url, cloudinary_public_id, display_order
      FROM product_images
      WHERE product_id = ${params.id}
      ORDER BY display_order ASC
    `;

    const formattedImages = images.map(img => ({
      id: img.id.toString(),
      url: img.image_url,
      publicId: img.cloudinary_public_id,
      order: img.display_order,
    }));

    return NextResponse.json({ images: formattedImages });
  } catch (error) {
    console.error('Error fetching product images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update product images
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { images } = await request.json();

    // Delete existing images for this product
    await sql`
      DELETE FROM product_images WHERE product_id = ${params.id}
    `;

    // Insert new images
    if (images && images.length > 0) {
      for (const image of images) {
        await sql`
          INSERT INTO product_images (product_id, image_url, cloudinary_public_id, display_order)
          VALUES (${params.id}, ${image.url}, ${image.publicId || null}, ${image.order})
        `;
      }
    }

    // Revalidate pages
    revalidatePath('/shop');
    revalidatePath('/');
    revalidatePath(`/shop/${params.id}`);

    return NextResponse.json({
      success: true,
      message: 'Images updated successfully',
    });
  } catch (error) {
    console.error('Error updating product images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
