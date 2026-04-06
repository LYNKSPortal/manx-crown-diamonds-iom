import { Globe, Award, Shield, CheckCircle, Mail, Phone, Gem } from 'lucide-react';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import FadeIn from '@/components/FadeIn';

export default function SourcingPage() {
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
                <a href="/shop" className="hover:text-antique-gold transition-colors">Shop</a>
                <a href="/sourcing" className="text-antique-gold font-semibold">Sourcing</a>
                <a href="/gift-cards" className="hover:text-antique-gold transition-colors">Gift Cards</a>
                <a href="/contact" className="bg-antique-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all">Contact Us</a>
              </nav>
            </FadeIn>
            <FadeIn delay={0.1} className="inline-flex">
              <MobileMenu currentPage="/sourcing" />
            </FadeIn>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-dark-purple to-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <Globe className="w-20 h-20 mx-auto mb-6 text-antique-gold" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Global Jewellery Sourcing
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
              Let&apos;s discuss your sourcing needs and find exactly what you&apos;re looking for from the world&apos;s most prestigious suppliers
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-diamond-blue mb-6 text-center">
              Why Choose Our Sourcing Service?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
              With our extensive network of trusted suppliers worldwide, we can source any type of jewellery or timepiece you&apos;re looking for. 
              From diamonds and gemstones to luxury watches and bespoke pieces, we handle everything from search to authentication.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Network</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Access to premium jewellery and watch suppliers across the globe, from Antwerp to Geneva, ensuring the best selection.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Quality</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  All items we source come with proper certification and authentication, guaranteeing authenticity and quality.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
                <div className="bg-dark-purple w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-antique-gold" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted Process</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-600">
                  Transparent pricing, secure transactions, and full documentation for peace of mind throughout the process.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.5}>
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-serif font-bold text-diamond-blue mb-8 text-center">
            How Our Sourcing Service Works
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-diamond-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Initial Consultation</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-700">
                  Contact us to discuss your requirements. Tell us about the jewellery, watch, or gemstone you&apos;re looking for – 
                  Looking for something specific that you can&apos;t find? We can source it for you. Budget. We&apos;ll guide you through the options and help refine your requirements.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-diamond-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Global Search</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-700">
                  We leverage our worldwide network to search for items that match your criteria. Our connections span 
                  major jewellery and watch centers including Antwerp, Geneva, Mumbai, Tel Aviv, and New York.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-diamond-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Selection & Verification</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-700">
                  We present you with a curated selection that meets your specifications. Each item comes with 
                  detailed certification and authentication documentation, including high-resolution images and reports.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-diamond-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Acquisition</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-700">
                  Once you&apos;ve chosen your diamond, we handle the secure acquisition and import process. All transactions are 
                  fully insured and documented.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-diamond-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delivery & Handover</h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-700">
                  Your item is delivered to us where it can be customized if needed, or provided as-is with full 
                  certification and documentation. We can also arrange for independent verification if desired.
                </p>
              </div>
            </div>
          </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <FadeIn delay={0.6}>
            <div className="bg-dark-purple text-white rounded-xl p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">What We Can Source</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-antique-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg">You tell us what you&apos;re looking for, including specifications, budget, and timeline.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-antique-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg">Luxury watches from prestigious brands</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-antique-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg">We&apos;ll present you with options that match your criteria, complete with full details and pricing.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-antique-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg">Designer jewellery pieces (rings, necklaces, earrings, bracelets)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-antique-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg">Vintage and antique jewellery</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-antique-gold flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base lg:text-lg">Custom or hard-to-find pieces</span>
              </li>
            </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold text-dark-purple mb-6">Our Commitment</h2>
              <div className="space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <p>
                  <strong className="text-dark-purple">Transparency:</strong> We provide full disclosure of all costs, 
                  including sourcing fees, import duties, and any applicable taxes.
                </p>
                <p>
                  <strong className="text-dark-purple">Authenticity:</strong> Every item comes with legitimate 
                  certification and authentication from recognized institutes and experts.
                </p>
                <p>
                  <strong className="text-dark-purple">Ethical Sourcing:</strong> We only work with reputable suppliers who adhere 
                  to ethical trade practices and industry standards.
                </p>
                <p>
                  <strong className="text-dark-purple">Expert Guidance:</strong> Andy personally oversees every sourcing 
                  request, bringing years of industry experience and expertise.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.8}>
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            <Gem className="w-16 h-16 mx-auto mb-6 text-dark-purple" />
            <h2 className="text-3xl font-serif font-bold text-dark-purple mb-4">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Whether it&apos;s a rare diamond, a specific luxury watch, or a unique gemstone, our global network allows us to find exactly what you&apos;re looking for. We&apos;re here to help. 
              Contact us today to start your sourcing journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-antique-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
            <a
              href="tel:+447624368505"
              className="inline-flex items-center gap-2 bg-white text-dark-purple border-2 border-dark-purple px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>Email:</strong> <a href="mailto:andy@manxcrowndiamonds.com" className="text-dark-purple hover:underline">andy@manxcrowndiamonds.com</a>
              <span className="mx-3">|</span>
              <strong>Phone:</strong> <a href="tel:+447624368505" className="text-dark-purple hover:underline">+44 7624 368505</a>
            </p>
          </div>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </div>
  );
}
