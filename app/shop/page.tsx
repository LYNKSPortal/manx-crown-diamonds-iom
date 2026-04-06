import { getProducts } from '@/lib/products-db';
import ShopClient from './ShopClient';

export const revalidate = 0; // Disable caching

export default async function ShopPage() {
  const products = await getProducts();
  
  return <ShopClient products={products} />;
}
