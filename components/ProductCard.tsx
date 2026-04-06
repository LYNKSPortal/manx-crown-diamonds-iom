import Link from 'next/link';
import { Product } from '@/lib/types';
import { Gem } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.imageUrl || '/images/image-coming-soon.jpg';

  return (
    <Link href={`/shop/${product.id}`}>
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {(product as any).is_under_offer ? (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Under Offer
            </div>
          ) : (product as any).is_unique_item ? (
            product.inStock ? (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Available
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Sold
              </div>
            )
          ) : (
            product.inStock ? (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                In Stock
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </div>
            )
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
