import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import ProductsClient from './ProductsClient';
import AdminLayout from '@/components/AdminLayout';

export default async function ManageProductsPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  // Fetch products from database
  const products = await sql`
    SELECT * FROM products ORDER BY created_at DESC
  `;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-dark-purple">Manage Products</h1>
          <p className="text-gray-600 mt-1">View and manage your product catalog</p>
        </div>

        <ProductsClient initialProducts={products as any} />
      </div>
    </AdminLayout>
  );
}
