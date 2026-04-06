import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import AdminLayout from '@/components/AdminLayout';
import EditProductClient from './EditProductClient';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch product from database
  const products = await sql`
    SELECT * FROM products WHERE id = ${params.id} LIMIT 1
  `;

  if (products.length === 0) {
    redirect('/admin/products');
  }

  const product = products[0];

  return (
    <AdminLayout>
      <EditProductClient product={product} />
    </AdminLayout>
  );
}
