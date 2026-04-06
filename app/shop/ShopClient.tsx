'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import FadeIn from '@/components/FadeIn';
import { Product, ProductCategory } from '@/lib/types';

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Products' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'watches', label: 'Watches' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStockOnly || product.inStock;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, priceRange, showInStockOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1000000]);
    setShowInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-purple text-white py-6 sticky top-0 z-50 shadow-lg w-full">
        <div className="w-full px-6 flex justify-between items-center">
          <FadeIn delay={0} className="inline-flex">
            <a href="/" className="flex items-center">
              <img src="/images/white-logo.png" alt="Manx Crown Diamonds" className="h-12 md:h-16" />
            </a>
          </FadeIn>
          <div className="flex items-center">
            <FadeIn delay={0.1} className="inline-flex">
              <nav className="hidden md:flex gap-8 items-center text-sm md:text-base lg:text-lg">
                <a href="/" className="hover:text-antique-gold transition-colors">Home</a>
                <a href="/shop" className="text-antique-gold font-semibold">Shop</a>
                <a href="/sourcing" className="hover:text-antique-gold transition-colors">Sourcing</a>
                <a href="/gift-cards" className="hover:text-antique-gold transition-colors">Gift Cards</a>
                <a href="/contact" className="bg-antique-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all">Contact Us</a>
              </nav>
            </FadeIn>
            <FadeIn delay={0.1} className="inline-flex">
              <MobileMenu currentPage="/shop" />
            </FadeIn>
          </div>
        </div>
      </header>

      <div className="px-6 py-12">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-purple mb-4">
              Our Collection
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600">
              Browse our exquisite selection of fine jewellery and luxury timepieces
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-6 py-3 bg-antique-gold text-white rounded-lg hover:bg-opacity-80 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row gap-8">
          <FadeIn delay={0.2} className="block md:w-64">
            <aside className={`${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-dark-purple">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-dark-purple transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={selectedCategory === cat.value}
                          onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                          className="mr-3 accent-diamond-blue"
                        />
                        <span className="group-hover:text-diamond-blue transition-colors">
                          {cat.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-diamond-blue"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>£{priceRange[0].toLocaleString()}</span>
                      <span>£{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={showInStockOnly}
                      onChange={(e) => setShowInStockOnly(e.target.checked)}
                      className="mr-3 accent-diamond-blue"
                    />
                    <span className="group-hover:text-diamond-blue transition-colors">
                      In Stock Only
                    </span>
                  </label>
                </div>
              </div>
              </div>
            </aside>
          </FadeIn>

          <main className="flex-1">
            <FadeIn delay={0.3}>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-diamond-blue">{filteredProducts.length}</span> products
                </p>
              </div>
            </FadeIn>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500 mb-4">No products found</p>
                <button
                  onClick={resetFilters}
                  className="text-diamond-blue hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <FadeIn key={product.id} delay={0.3 + index * 0.1}>
                    <ProductCard product={product} />
                  </FadeIn>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
