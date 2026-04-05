'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Gift, CheckCircle, CreditCard, Mail, Phone } from 'lucide-react';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';

export default function GiftCardsPage() {
  const [formData, setFormData] = useState({
    purchaserName: '',
    purchaserEmail: '',
    purchaserPhone: '',
    recipientName: '',
    recipientEmail: '',
    amount: '',
    customAmount: '',
    message: '',
    deliveryMethod: 'email',
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
    console.log('Gift card request submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        purchaserName: '',
        purchaserEmail: '',
        purchaserPhone: '',
        recipientName: '',
        recipientEmail: '',
        amount: '',
        customAmount: '',
        message: '',
        deliveryMethod: 'email',
      });
    }, 5000);
  };

  const predefinedAmounts = ['£100', '£250', '£500', '£1000', '£2500', 'custom'];

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
            <a href="/gift-cards" className="text-antique-gold font-semibold">Gift Cards</a>
            <a href="/contact" className="bg-antique-gold text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all">Contact Us</a>
          </nav>
          <MobileMenu currentPage="/gift-cards" />
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-dark-purple to-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Gift className="w-20 h-20 mx-auto mb-6 text-antique-gold" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Gift Cards
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto">
            Give the gift of luxury and let them choose their perfect piece
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold text-diamond-blue mb-6">
              The Perfect Gift
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 leading-relaxed">
              A Manx Crown Diamonds gift card is the perfect way to celebrate life&apos;s special moments. Whether it&apos;s for an 
              engagement, anniversary, birthday, or any special occasion, let your loved ones choose their perfect piece 
              of jewellery.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Flexible Amounts</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">
                    Choose from preset amounts or specify a custom value that suits your budget.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Personal Touch</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">
                    Add a personalized message to make your gift even more special.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Easy Delivery</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">
                    Choose email delivery for instant gifting or physical card for a tangible present.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md">
                <div className="bg-dark-purple p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-antique-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">No Expiry</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">
                    Our gift cards never expire, giving your loved ones the freedom to choose when they&apos;re ready to find their perfect piece.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-8 h-8 text-dark-purple" />
              <h2 className="text-2xl font-serif font-bold text-dark-purple">
                Purchase a Gift Card
              </h2>
            </div>

            {submitted && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                <p className="font-semibold mb-1">Thank you for your gift card request!</p>
                <p className="text-sm">A member of our team will be in touch shortly to process your order and arrange payment.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="purchaserName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="purchaserName"
                      name="purchaserName"
                      value={formData.purchaserName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="purchaserEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="purchaserEmail"
                      name="purchaserEmail"
                      value={formData.purchaserEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="purchaserPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="purchaserPhone"
                      name="purchaserPhone"
                      value={formData.purchaserPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="recipientName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="recipientEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Recipient Email (for digital delivery)
                    </label>
                    <input
                      type="email"
                      id="recipientEmail"
                      name="recipientEmail"
                      value={formData.recipientEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gift Card Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Amount *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {predefinedAmounts.map((amount) => (
                        <label
                          key={amount}
                          className={`cursor-pointer border-2 rounded-lg p-3 text-center transition-all ${
                            formData.amount === amount
                              ? 'border-diamond-blue bg-blue-50 text-diamond-blue font-semibold'
                              : 'border-gray-300 hover:border-diamond-blue'
                          }`}
                        >
                          <input
                            type="radio"
                            name="amount"
                            value={amount}
                            checked={formData.amount === amount}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <span className="capitalize">{amount}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.amount === 'custom' && (
                    <div>
                      <label htmlFor="customAmount" className="block text-sm font-semibold text-gray-700 mb-2">
                        Custom Amount (£) *
                      </label>
                      <input
                        type="number"
                        id="customAmount"
                        name="customAmount"
                        value={formData.customAmount}
                        onChange={handleChange}
                        min="50"
                        step="1"
                        placeholder="Enter amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                        required={formData.amount === 'custom'}
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum amount: £50</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="deliveryMethod" className="block text-sm font-semibold text-gray-700 mb-2">
                      Delivery Method *
                    </label>
                    <select
                      id="deliveryMethod"
                      name="deliveryMethod"
                      value={formData.deliveryMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                      required
                    >
                      <option value="email">Email Delivery (Instant)</option>
                      <option value="physical">Physical Card (Posted)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Add a personal message for the recipient..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-diamond-blue focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> After submitting this form, a member of our team will contact you to arrange 
                  payment and finalize your gift card order. We accept bank transfers, credit/debit cards, and other payment methods.
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-antique-gold text-white py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
              >
                <Gift className="w-5 h-5" />
                Request Gift Card
              </button>
            </form>
          </div>
        </div>

        <div className="bg-dark-purple text-white rounded-xl p-8 md:p-12">
          <h2 className="text-3xl font-serif font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-antique-gold text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-bold mb-2">Fill Out Form</h3>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg">
                Complete the gift card request form with your details and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="bg-antique-gold text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-bold mb-2">We Contact You</h3>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg">
                Our team will reach out to confirm details and arrange payment
              </p>
            </div>
            <div className="text-center">
              <div className="bg-antique-gold text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-bold mb-2">Payment Processed</h3>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg">
                Complete payment securely through your preferred method
              </p>
            </div>
            <div className="text-center">
              <div className="bg-antique-gold text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                4
              </div>
              <h3 className="font-bold mb-2">Gift Card Delivered</h3>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg">
                Receive your gift card via email or post, ready to gift
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-serif font-bold text-dark-purple mb-4">
            Questions About Gift Cards?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6">
            Our team is here to help with any questions about purchasing or using gift cards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:andy@manxcrowndiamonds.com"
              className="inline-flex items-center gap-2 bg-white border-2 border-dark-purple text-dark-purple px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              andy@manxcrowndiamonds.com
            </a>
            <a
              href="tel:+447624368505"
              className="inline-flex items-center gap-2 bg-white border-2 border-dark-purple text-dark-purple px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              +44 7624 368505
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
