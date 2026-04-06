import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../ProductForm';
import AdminLayout from '@/components/AdminLayout';

export default async function NewProductPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-dark-purple hover:text-opacity-80 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-serif font-bold text-dark-purple mt-4">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new product in your catalog</p>
        </div>

        <ProductForm />
      </div>
    </AdminLayout>
  );
}
