import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import { Package, LogOut, Upload, Settings } from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-purple text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-300 mt-1">Manx Crown Diamonds</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{session.email}</span>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            href="/admin/images"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-dark-purple rounded-full p-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-antique-gold" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-dark-purple">
                Images
              </h2>
            </div>
            <p className="text-gray-600">
              Upload and manage product images using Cloudinary integration.
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
  );
}
