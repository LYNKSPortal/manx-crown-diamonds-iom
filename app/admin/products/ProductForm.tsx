'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Upload } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface ProductFormProps {
  product?: any;
  isEdit?: boolean;
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState(product?.image_url || '');

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'watches',
    price: product?.price || '',
    in_stock: product?.in_stock ?? true,
    featured: product?.featured ?? false,
    is_unique_item: product?.is_unique_item ?? false,
    is_under_offer: product?.is_under_offer ?? false,
    material: product?.material || '',
    gemstone: product?.gemstone || '',
    certification: product?.certification || '',
    weight: product?.weight || '',
    dimensions: product?.dimensions || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit 
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price as string),
          image_url: imageUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-serif font-bold text-dark-purple mb-6">Product Image</h2>
        <ImageUpload
          onUploadComplete={(url) => setImageUrl(url)}
          folder="products"
        />
        {imageUrl && !imageUrl.includes('cloudinary') && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Current image URL:</p>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="https://..."
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-serif font-bold text-dark-purple mb-6">Basic Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="e.g., Rolex Submariner"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
            >
              <option value="watches">Watches</option>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (£) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div className="pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Status
            </label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={!formData.is_unique_item && formData.in_stock}
                  onChange={() => setFormData({ ...formData, is_unique_item: false, in_stock: true })}
                  className="w-4 h-4 text-dark-purple focus:ring-dark-purple cursor-pointer mr-3"
                />
                <span className="text-sm text-gray-700">In Stock (regular inventory item)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={!formData.is_unique_item && !formData.in_stock}
                  onChange={() => setFormData({ ...formData, is_unique_item: false, in_stock: false })}
                  className="w-4 h-4 text-dark-purple focus:ring-dark-purple cursor-pointer mr-3"
                />
                <span className="text-sm text-gray-700">Out of Stock (regular inventory item)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.is_unique_item && formData.in_stock && !formData.is_under_offer}
                  onChange={() => setFormData({ ...formData, is_unique_item: true, in_stock: true, is_under_offer: false })}
                  className="w-4 h-4 text-dark-purple focus:ring-dark-purple cursor-pointer mr-3"
                />
                <span className="text-sm text-gray-700">Available (unique/one-of-a-kind item)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.is_unique_item && formData.is_under_offer}
                  onChange={() => setFormData({ ...formData, is_unique_item: true, in_stock: true, is_under_offer: true })}
                  className="w-4 h-4 text-dark-purple focus:ring-dark-purple cursor-pointer mr-3"
                />
                <span className="text-sm text-gray-700">Under Offer (in process of being sold)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={formData.is_unique_item && !formData.in_stock && !formData.is_under_offer}
                  onChange={() => setFormData({ ...formData, is_unique_item: true, in_stock: false, is_under_offer: false })}
                  className="w-4 h-4 text-dark-purple focus:ring-dark-purple cursor-pointer mr-3"
                />
                <span className="text-sm text-gray-700">Sold (unique/one-of-a-kind item)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
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

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-serif font-bold text-dark-purple mb-6">Specifications</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Material
            </label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="e.g., 18K White Gold"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gemstone
            </label>
            <input
              type="text"
              name="gemstone"
              value={formData.gemstone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="e.g., 2.0ct Diamond"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Certification
            </label>
            <input
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="e.g., GIA Certified"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight
            </label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="e.g., 3.2g"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dimensions
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
              placeholder="e.g., 41mm diameter"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 bg-dark-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
