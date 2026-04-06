import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Gem, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';
import { getProductById } from '@/lib/products-db';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import FadeIn from '@/components/FadeIn';

export const revalidate = 0; // Disable caching
export const dynamic = 'force-dynamic'; // Force dynamic rendering

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-purple text-white py-6 px-6 sticky top-0 z-50 shadow-lg">
        <div className="flex justify-between items-center">
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <FadeIn>
          <Link href="/shop" className="inline-flex items-center gap-2 text-dark-purple hover:text-opacity-80 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </Link>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          <FadeIn delay={0.1}>
            <div className="rounded-2xl aspect-square overflow-hidden shadow-2xl">
              <img
                src={product.imageUrl || '/images/image-coming-soon.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
            <div className="mb-6">
              {product.featured && (
                <span className="inline-block bg-antique-gold text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-purple mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-dark-purple">
                  £{product.price.toLocaleString()}
                </span>
                {product.inStock ? (
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-red-600 font-semibold">
                    <XCircle className="w-5 h-5" />
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="bg-white rounded-xl p-6 shadow-md space-y-3">
                {product.specifications.material && (
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700">Material:</span>
                    <span className="text-gray-600">{product.specifications.material}</span>
                  </div>
                )}
                {product.specifications.gemstone && (
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700">Gemstone:</span>
                    <span className="text-gray-600">{product.specifications.gemstone}</span>
                  </div>
                )}
                {product.specifications.certification && (
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700">Certification:</span>
                    <span className="text-gray-600">{product.specifications.certification}</span>
                  </div>
                )}
                {product.specifications.weight && (
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-700">Weight:</span>
                    <span className="text-gray-600">{product.specifications.weight}</span>
                  </div>
                )}
                {product.specifications.dimensions && (
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Dimensions:</span>
                    <span className="text-gray-600">{product.specifications.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 border-2 border-dark-purple rounded-xl p-6">
              <h2 className="text-xl font-serif font-bold text-dark-purple mb-4">
                Interested in this piece?
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6">
                Contact us directly to discuss this product, arrange a viewing, or create a custom variation.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:andy@manxcrowndiamonds.com"
                  className="flex items-center gap-3 text-dark-purple hover:text-opacity-80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  andy@manxcrowndiamonds.com
                </a>
                <a
                  href="tel:+447624368505"
                  className="flex items-center gap-3 text-dark-purple hover:text-opacity-80 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +44 7624 368505
                </a>
              </div>
            </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-serif font-bold text-dark-purple mb-4">
            Why Choose Manx Crown Diamonds?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Certified Quality</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                All our jewellery and luxury timepieces come with proper certification and authentication, ensuring authenticity and quality.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Bespoke Service</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Work directly with Andy to create custom pieces tailored to your exact specifications.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Isle of Man Based</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Personal service with attention to every detail, from initial consultation to final delivery.
              </p>
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </div>
  );
}
