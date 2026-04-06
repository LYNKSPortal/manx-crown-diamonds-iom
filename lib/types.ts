export type ProductCategory = 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'watches';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  images: string[];
  imageUrl?: string;
  featured: boolean;
  inStock: boolean;
  is_unique_item?: boolean;
  is_under_offer?: boolean;
  specifications: {
    material?: string;
    gemstone?: string;
    certification?: string;
    weight?: string;
    dimensions?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}
