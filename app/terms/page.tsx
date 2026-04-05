import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-dark-purple text-white py-6 px-6 sticky top-0 z-50 shadow-lg">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img src="/images/white-logo.png" alt="Manx Crown Diamonds" className="h-12 md:h-16" />
          </a>
          <nav className="hidden md:flex gap-8 items-center text-sm md:text-base lg:text-lg">
            <a href="/" className="hover:text-antique-gold transition-colors">Home</a>
            <a href="/shop" className="hover:text-antique-gold transition-colors">Shop</a>
            <a href="/sourcing" className="hover:text-antique-gold transition-colors">Sourcing</a>
            <a href="/gift-cards" className="hover:text-antique-gold transition-colors">Gift Cards</a>
            <a href="/contact" className="bg-antique-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all">Contact Us</a>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-diamond-blue mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the Manx Crown Diamonds website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">2. Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily view the materials on Manx Crown Diamonds' website for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or public display</li>
              <li>Attempt to decompile or reverse engineer any software on the website</li>
              <li>Remove any copyright or proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">3. Product Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All jewellery and diamonds displayed on our website are subject to availability. We make every effort to display our products as accurately as possible, however:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Product images are for illustrative purposes only</li>
              <li>Actual products may vary slightly in appearance</li>
              <li>All diamonds are certified by IGI or GIA as stated</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to limit quantities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">4. Bespoke Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For bespoke jewellery design services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>All designs are subject to consultation and approval</li>
              <li>A deposit may be required before work commences</li>
              <li>Timelines are estimates and may vary based on complexity</li>
              <li>Custom pieces are non-refundable once production begins</li>
              <li>Final pricing will be confirmed before production</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">5. Consultations</h2>
            <p className="text-gray-700 leading-relaxed">
              Consultations are by appointment only. We reserve the right to cancel or reschedule appointments with reasonable notice. Clients are expected to provide at least 24 hours notice for cancellations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Manx Crown Diamonds and is protected by copyright and intellectual property laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">7. Certification and Authenticity</h2>
            <p className="text-gray-700 leading-relaxed">
              All diamonds sold by Manx Crown Diamonds are certified by reputable gemological institutes (IGI or GIA). Certificates are provided with all diamond purchases. We guarantee the authenticity of all our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Manx Crown Diamonds or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">9. Accuracy of Materials</h2>
            <p className="text-gray-700 leading-relaxed">
              The materials appearing on Manx Crown Diamonds' website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">10. Links to Third-Party Sites</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">11. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of our website is also governed by our Privacy Policy. Please review our <a href="/privacy" className="text-diamond-blue hover:underline">Privacy Policy</a> to understand our practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the Isle of Man, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">13. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the current version of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:andy@manxcrowndiamonds.com" className="text-diamond-blue hover:underline">andy@manxcrowndiamonds.com</a></p>
              <p className="text-gray-700 mt-2"><strong>Phone:</strong> <a href="tel:+447624368505" className="text-diamond-blue hover:underline">+44 7624 368505</a></p>
              <p className="text-gray-700 mt-2"><strong>Location:</strong> Isle of Man</p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-diamond-blue hover:underline">← Back to Home</a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
