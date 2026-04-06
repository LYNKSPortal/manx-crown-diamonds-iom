import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { Package, Upload, Settings, TrendingUp, ShoppingBag, Eye } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-dark-purple">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {session.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-dark-purple">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Products</p>
                <p className="text-3xl font-bold text-dark-purple mt-2">24</p>
              </div>
              <div className="bg-dark-purple bg-opacity-10 rounded-full p-4">
                <ShoppingBag className="w-8 h-8 text-dark-purple" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-antique-gold">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Featured Items</p>
                <p className="text-3xl font-bold text-dark-purple mt-2">8</p>
              </div>
              <div className="bg-antique-gold bg-opacity-10 rounded-full p-4">
                <TrendingUp className="w-8 h-8 text-antique-gold" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">In Stock</p>
                <p className="text-3xl font-bold text-dark-purple mt-2">21</p>
              </div>
              <div className="bg-green-500 bg-opacity-10 rounded-full p-4">
                <Package className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        <main className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/products"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-dark-purple rounded-full p-4 group-hover:scale-110 transition-transform">
                <Package className="w-8 h-8 text-antique-gold" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-dark-purple">
                Products
              </h2>
            </div>
            <p className="text-gray-600">
              Manage your product catalog, add new items, edit details, and upload images.
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-dark-purple rounded-full p-4 group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-antique-gold" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-dark-purple">
                Settings
              </h2>
            </div>
            <p className="text-gray-600">
              Configure site settings, manage categories, and update preferences.
            </p>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-dark-purple mb-6">
            Quick Links
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-dark-purple hover:bg-gray-50 transition-all"
            >
              <span className="text-gray-700">View Live Website</span>
              <span className="text-gray-400">→</span>
            </a>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-dark-purple hover:bg-gray-50 transition-all"
            >
              <span className="text-gray-700">Add New Product</span>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>
        </main>
      </div>
    </AdminLayout>
  );
}
