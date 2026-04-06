import Link from 'next/link';
import { Product } from '@/lib/types';
import { Gem } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative aspect-square bg-gradient-to-br from-dark-purple to-gray-800 flex items-center justify-center">
          <Gem className="w-24 h-24 text-antique-gold group-hover:scale-110 transition-transform" />
          {!product.inStock && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </div>
          )}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-antique-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold mb-2 text-dark-purple group-hover:text-opacity-80 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-dark-purple">
              £{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 capitalize">
              {product.category}
            </span>
          </div>
          {product.specifications.certification && (
            <div className="mt-3 text-xs text-gray-500">
              {product.specifications.certification}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
