'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    subscribe: true
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        subscribe: true
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div
                    className="p-6 rounded-xl text-white text-center mb-8"
                    style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
                  >
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="collaboration">Collaboration Opportunity</option>
                        <option value="feedback">Feedback</option>
                        <option value="press">Press Inquiry</option>
                        <option value="advertising">Advertising</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="subscribe"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <label htmlFor="subscribe" className="ml-3 text-gray-700">
                        Yes, I'd like to subscribe to your newsletter and receive updates about new articles and exclusive content
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-xl transition-all"
                      style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info & Newsletter */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:hello@lifestylemagazine.com" className="text-pink-600 hover:underline">
                      hello@lifestylemagazine.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Collaborations</h4>
                    <a href="mailto:collaborate@lifestylemagazine.com" className="text-pink-600 hover:underline">
                      collaborate@lifestylemagazine.com
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Press Inquiries</h4>
                    <a href="mailto:press@lifestylemagazine.com" className="text-pink-600 hover:underline">
                      press@lifestylemagazine.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                    <span className="text-2xl mr-3">📷</span>
                    <span className="font-medium">Instagram</span>
                  </a>
                  <a href="#" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                    <span className="text-2xl mr-3">📌</span>
                    <span className="font-medium">Pinterest</span>
                  </a>
                  <a href="#" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                    <span className="text-2xl mr-3">🐦</span>
                    <span className="font-medium">Twitter</span>
                  </a>
                  <a href="#" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors">
                    <span className="text-2xl mr-3">👔</span>
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div
                className="rounded-2xl p-8 text-white"
                style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
              >
                <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/about" className="block hover:underline">
                    About Us
                  </Link>
                  <Link href="/blog" className="block hover:underline">
                    Browse Articles
                  </Link>
                  <Link href="/categories" className="block hover:underline">
                    Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How often do you publish new content?</h3>
              <p className="text-gray-600">We publish new articles daily across all our categories. Subscribe to our newsletter to stay updated!</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can I contribute to the magazine?</h3>
              <p className="text-gray-600">We love working with talented writers and creatives! Please send your pitch or portfolio to collaborate@lifestylemagazine.com</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do you accept sponsored content?</h3>
              <p className="text-gray-600">We carefully select brand partnerships that align with our values and audience. Contact us at collaborate@lifestylemagazine.com for advertising opportunities.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How can I unsubscribe from the newsletter?</h3>
              <p className="text-gray-600">Every newsletter includes an unsubscribe link at the bottom. We'll be sad to see you go, but we respect your choice!</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
