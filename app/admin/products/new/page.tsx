import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '../ProductForm';

export default async function NewProductPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-purple text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold">
            Add New Product
          </h1>
          <Link href="/admin/dashboard" className="hover:text-antique-gold transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-dark-purple hover:text-opacity-80 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <ProductForm />
      </div>
    </div>
  );
}
