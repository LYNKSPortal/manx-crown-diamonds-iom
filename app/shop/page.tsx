import { getProducts } from '@/lib/products-db';
import ShopClient from './ShopClient';

export const revalidate = 0; // Disable caching

export default async function ShopPage() {
  const products = await getProducts();
  
  console.log('Shop page - Total products fetched:', products.length);
  console.log('Shop page - First 3 products:', products.slice(0, 3).map(p => ({ id: p.id, name: p.name })));
  
  return <ShopClient products={products} />;
}
