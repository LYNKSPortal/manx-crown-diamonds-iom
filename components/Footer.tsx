import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import FadeIn from './FadeIn';

export default function Footer() {
  return (
    <footer className="bg-dark-purple text-gray-300">
      <div className="px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <FadeIn className="block">
            <div className="text-center">
              <img src="/images/white-logo.png" alt="Manx Crown Diamonds" className="h-16 mb-4 mx-auto" />
            <p className="text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed">
              Specialising in bespoke jewellery, certified diamonds, and luxury timepieces. Combining traditional craftsmanship with modern design on the Isle of Man.
            </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="block">
            <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-antique-gold transition-colors text-sm md:text-base lg:text-lg">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-400 hover:text-antique-gold transition-colors text-sm md:text-base lg:text-lg">
                  Shop
                </a>
              </li>
              <li>
                <a href="/sourcing" className="text-gray-400 hover:text-antique-gold transition-colors text-sm md:text-base lg:text-lg">
                  Sourcing
                </a>
              </li>
              <li>
                <a href="/gift-cards" className="text-gray-400 hover:text-antique-gold transition-colors text-sm md:text-base lg:text-lg">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-antique-gold flex-shrink-0" />
                <a href="mailto:andy@manxcrowndiamonds.com" className="text-gray-400 hover:text-antique-gold transition-colors text-sm md:text-base lg:text-lg">
                  andy@manxcrowndiamonds.com
                </a>
              </li>
              <li className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-antique-gold flex-shrink-0" />
                <a href="tel:+447624368505" className="text-gray-400 hover:text-antique-gold transition-colors text-sm md:text-base lg:text-lg">
                  +44 7624 368505
                </a>
              </li>
              <li className="flex items-center justify-center gap-3">
                <MapPin className="w-5 h-5 text-antique-gold flex-shrink-0" />
                <span className="text-gray-400 text-sm md:text-base lg:text-lg">
                  Isle of Man
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4">Financing</h4>
            <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-4">
              We use Conister Bank for all our financing options
            </p>
            <img 
              src="/images/approved_partner.png" 
              alt="Conister Bank Approved Partner" 
              className="h-16 mx-auto"
            />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm md:text-base lg:text-lg text-gray-400">
              © {new Date().getFullYear()} Manx Crown Diamonds. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm md:text-base lg:text-lg">
              <a href="/privacy" className="text-gray-400 hover:text-antique-gold transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-antique-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
