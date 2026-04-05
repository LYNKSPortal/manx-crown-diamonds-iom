'use client';

import { useState } from 'react';
import { Package, Plus, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-diamond-blue to-blue-900 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-diamond-blue mb-2">Admin Login</h1>
            <p className="text-gray-600">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-diamond-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Login
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Demo password: admin123
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-diamond-blue to-blue-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <a href="/" className="hover:text-diamond-gold transition-colors">
              View Site
            </a>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="hover:text-diamond-gold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-diamond-blue mb-2">
            Welcome back, Andy
          </h2>
          <p className="text-gray-600">Manage your jewellery collection</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-diamond-blue" />
              </div>
              <span className="text-3xl font-bold text-diamond-blue">10</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Total Products</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-green-600">9</span>
            </div>
            <h3 className="text-gray-600 font-semibold">In Stock</h3>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-3xl font-bold text-yellow-600">4</span>
            </div>
            <h3 className="text-gray-600 font-semibold">Categories</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-diamond-blue">Quick Actions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/admin/products"
              className="group bg-gradient-to-br from-diamond-blue to-blue-800 text-white rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <Package className="w-12 h-12 mb-4 text-diamond-gold" />
              <h3 className="text-xl font-bold mb-2">Manage Products</h3>
              <p className="text-blue-100">
                Add, edit, or remove products from your collection
              </p>
            </Link>

            <Link
              href="/admin/products/new"
              className="group bg-gradient-to-br from-diamond-gold to-yellow-600 text-gray-900 rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <Plus className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Add New Product</h3>
              <p className="text-gray-800">
                Create a new product listing for your shop
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
