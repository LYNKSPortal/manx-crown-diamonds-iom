'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

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
            <a href="/contact" className="bg-antique-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all font-semibold">Contact Us</a>
          </nav>
          <MobileMenu currentPage="/contact" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-purple mb-4">
            Get in Touch
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Let's discuss your bespoke jewellery dreams
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-serif font-bold text-dark-purple mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:andy@manxcrowndiamonds.com" className="text-sm md:text-base lg:text-lg text-dark-purple hover:underline">
                    andy@manxcrowndiamonds.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+447624368505" className="text-sm md:text-base lg:text-lg text-dark-purple hover:underline">
                    +44 7624 368505
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">Isle of Man</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">By Appointment</p>
                  <p className="text-sm md:text-base lg:text-lg text-gray-500 mt-1">Contact us to schedule a consultation</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-dark-purple text-white p-8 rounded-xl">
              <h3 className="text-xl font-serif font-bold mb-4">Why Contact Us?</h3>
              <ul className="space-y-3 text-sm md:text-base lg:text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Discuss bespoke jewellery designs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Inquire about specific products</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Schedule a consultation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-antique-gold mt-1">•</span>
                  <span>Learn about our certification process</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-serif font-bold text-dark-purple mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm md:text-base lg:text-lg">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="bespoke">Bespoke Design Inquiry</option>
                    <option value="product">Product Inquiry</option>
                    <option value="consultation">Schedule Consultation</option>
                    <option value="certification">Certification Questions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent text-sm md:text-base lg:text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-antique-gold text-white py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors text-sm md:text-base lg:text-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>

                <p className="text-sm md:text-base lg:text-lg text-gray-500 text-center">
                  Note: This is a demo form. In production, this would send an email or save to a database.
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold text-diamond-blue mb-6 text-center">
            About Manx Crown Diamonds
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-dark-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-antique-gold" />
              </div>
              <h3 className="font-bold text-lg mb-2">Personal Service</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Work directly with Andy Asbridge for a truly personal experience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-dark-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-antique-gold" />
              </div>
              <h3 className="font-bold text-lg mb-2">Isle of Man Based</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Local craftsmanship with international quality standards
              </p>
            </div>
            <div className="text-center">
              <div className="bg-dark-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-antique-gold" />
              </div>
              <h3 className="font-bold text-lg mb-2">Flexible Appointments</h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Schedule consultations at your convenience
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
