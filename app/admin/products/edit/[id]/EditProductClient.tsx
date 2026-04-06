'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface EditProductClientProps {
  product: any;
}

export default function EditProductClient({ product }: EditProductClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(product.image_url || '');

  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    category: product.category || 'rings',
    price: product.price || '',
    in_stock: product.in_stock !== false,
    featured: product.featured || false,
    material: product.material || '',
    gemstone: product.gemstone || '',
    certification: product.certification || '',
    weight: product.weight || '',
    dimensions: product.dimensions || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_url: imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-dark-purple hover:text-opacity-80 mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-serif font-bold text-dark-purple mt-4">Edit Product</h1>
        <p className="text-gray-600 mt-1">Update product information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>
            <ImageUpload
              onImageUploaded={setImageUrl}
              currentImageUrl={imageUrl}
            />
          </div>

          {/* Basic Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="space-y-4">
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
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="e.g., Rolex Submariner"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  >
                    <option value="rings">Rings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="watches">Watches</option>
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
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="in_stock"
                    checked={formData.in_stock}
                    onChange={handleChange}
                    className="mr-3 accent-dark-purple w-5 h-5"
                  />
                  <span className="text-gray-700">In Stock</span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-3 accent-dark-purple w-5 h-5"
                  />
                  <span className="text-gray-700">Featured</span>
                </label>
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
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="Detailed product description..."
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="e.g., 18K White Gold"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="e.g., 1.5ct Diamond"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="e.g., GIA Certified"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="e.g., 3.2g"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
                  placeholder="e.g., 16 inches"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-dark-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href="/admin/products"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
