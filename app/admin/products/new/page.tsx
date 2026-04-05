'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { ProductCategory } from '@/lib/types';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'rings' as ProductCategory,
    price: '',
    inStock: true,
    featured: false,
    material: '',
    gemstone: '',
    certification: '',
    weight: '',
    dimensions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New product data:', formData);
    alert('Product created successfully! (This is a demo - in production, this would save to a database)');
    router.push('/admin/products');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-diamond-blue to-blue-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
            Add New Product
          </h1>
          <Link href="/admin" className="hover:text-diamond-gold transition-colors">
            Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-diamond-blue hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-6">Product Information</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  required
                >
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (£) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="material" className="block text-sm font-semibold text-gray-700 mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    placeholder="e.g., 18K White Gold"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="gemstone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Gemstone
                  </label>
                  <input
                    type="text"
                    id="gemstone"
                    name="gemstone"
                    value={formData.gemstone}
                    onChange={handleChange}
                    placeholder="e.g., 1.5ct Round Brilliant Diamond"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="certification" className="block text-sm font-semibold text-gray-700 mb-2">
                    Certification
                  </label>
                  <input
                    type="text"
                    id="certification"
                    name="certification"
                    value={formData.certification}
                    onChange={handleChange}
                    placeholder="e.g., GIA Certified"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g., 3.2g"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="dimensions" className="block text-sm font-semibold text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="e.g., 16 inches"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Images</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-diamond-blue transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                <input type="file" className="hidden" accept="image/*" multiple />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: Image upload is a demo feature. In production, this would integrate with a file storage service.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="mr-3 accent-diamond-blue w-5 h-5"
                  />
                  <span className="text-gray-700">In Stock</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-3 accent-diamond-blue w-5 h-5"
                  />
                  <span className="text-gray-700">Featured Product</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-diamond-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                <Save className="w-5 h-5" />
                Create Product
              </button>
              <Link
                href="/admin/products"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
