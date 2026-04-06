import { Gem, Sparkles, Heart, Gift, Search, Palette, Mail, Phone } from 'lucide-react'
import Footer from '@/components/Footer'
import MobileMenu from '@/components/MobileMenu'
import FadeIn from '@/components/FadeIn'
import { getProducts } from '@/lib/products-db';

export const revalidate = 0; // Disable caching

export default async function Home() {
  const allProducts = await getProducts();
  return (
    <main className="min-h-screen w-full">
      {/* Deployment Test Marker - v2.0 with FadeIn */}
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
                <a href="/" className="hover:text-diamond-gold transition-colors">Home</a>
                <a href="/shop" className="hover:text-diamond-gold transition-colors">Shop</a>
                <a href="/sourcing" className="hover:text-diamond-gold transition-colors">Sourcing</a>
                <a href="/gift-cards" className="hover:text-diamond-gold transition-colors">Gift Cards</a>
                <a href="/contact" className="bg-antique-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all">Contact Us</a>
              </nav>
            </FadeIn>
            <FadeIn delay={0.1} className="inline-flex">
              <MobileMenu currentPage="/" />
            </FadeIn>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] bg-gradient-to-br from-dark-purple via-dark-purple to-gray-900 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <FadeIn delay={0.1}>
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-diamond-gold animate-pulse" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Bespoke Jewellery<br />
              <span className="text-diamond-gold">Crafted with Passion</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-200">
              Fine Jewellery & Luxury Timepieces | Isle of Man
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <a href="/shop" className="inline-block bg-antique-gold hover:bg-opacity-80 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-xl">
              View Our Shop
            </a>
          </FadeIn>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-diamond-blue">
                  Welcome to Manx Crown Diamonds
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                  At Manx Crown Diamonds, we specialise in creating bespoke diamond jewellery pieces that tell your unique story. 
                  Based on the Isle of Man, we combine traditional craftsmanship with modern design to create timeless pieces 
                  that celebrate life&apos;s most precious moments.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Whether you&apos;re looking for the perfect engagement ring or a custom piece, we&apos;re here to help
                </p>
              </FadeIn>
            </div>
            <FadeIn delay={0.3}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/meet-andy.jpg" 
                    alt="Andy Asbridge - Owner of Manx Crown Diamonds" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="collections" className="py-20 px-6" style={{background: 'linear-gradient(to bottom, #D4A574, #BB8F6A)'}}>
        <div className="w-full">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-white">
              Our Collections
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm md:text-base lg:text-lg text-white text-center max-w-3xl mx-auto mb-12">
              Discover our carefully curated collections of exquisite diamond jewellery
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {allProducts.slice(-4).reverse().map((product, index) => (
              <FadeIn key={product.id} delay={0.2 + index * 0.1} className="block">
                <a href={`/shop/${product.id}`} className="block group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.imageUrl || '/images/image-coming-soon.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
                </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <div className="text-center">
              <a href="/shop" className="inline-block bg-white text-dark-purple px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                View More Items
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-diamond-blue">
              Our Services
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              From sourcing to creation, we&apos;re with you every step of the way
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeIn delay={0.2}>
              <div className="text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-antique-gold transition-all">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-dark-purple">Sourcing</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Expert sourcing of diamonds, gemstones, and luxury timepieces with proper certification and authentication from trusted global suppliers.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-antique-gold transition-all">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-dark-purple">Consulting</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  One-on-one consultations to understand your vision and guide you through the design process with expert advice.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-antique-gold transition-all">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-dark-purple">Customisation</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Expert restoration and redesign services for your treasured pieces, bringing new life to cherished jewellery.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="text-center p-8 bg-gradient-to-b from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-antique-gold transition-all">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 text-dark-purple">Gift Cards</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Give the gift of choice with our bespoke jewellery gift cards, perfect for any special occasion or celebration.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-dark-purple to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Let&apos;s Create Something Beautiful
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm md:text-base lg:text-lg text-gray-200 text-center max-w-3xl mx-auto mb-12">
              Get in touch to start your bespoke jewellery journey
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <FadeIn delay={0.2} className="block">
              <a href="mailto:andy@manxcrowndiamonds.com" className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-8 transition-all border border-white/20 group">
              <Mail className="w-12 h-12 mx-auto mb-4 text-antique-gold group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-sm md:text-base lg:text-lg">andy@manxcrowndiamonds.com</p>
              </a>
            </FadeIn>
            
            <FadeIn delay={0.3} className="block">
              <a href="tel:+447624368505" className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-8 transition-all border border-white/20 group">
              <Phone className="w-12 h-12 mx-auto mb-4 text-antique-gold group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="text-sm md:text-base lg:text-lg">+44 7624 368505</p>
              </a>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-sm md:text-base lg:text-lg text-gray-200">
              <span className="font-semibold text-white">Based in the Isle of Man</span><br />
              We offer flexible appointment times to suit your schedule
            </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
