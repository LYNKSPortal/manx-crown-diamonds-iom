import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Manx Crown Diamonds (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Contact us through our contact form</li>
              <li>Request information about our products or services</li>
              <li>Schedule a consultation</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              This information may include your name, email address, phone number, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Process your requests for consultations or bespoke designs</li>
              <li>Send you information about our products and services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">4. Disclosure of Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>With service providers who assist us in operating our website and conducting our business</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a business transfer or merger</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to or restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">7. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">8. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to make changes to this Privacy Policy at any time. We will notify you of any changes by updating the &quot;Last Updated&quot; date at the top of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or comments about this Privacy Policy, please contact us at:
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
