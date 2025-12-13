import Link from 'next/link'
import { Instagram, Twitter, Facebook, Youtube, Mail, Heart, MapPin, Pin } from 'lucide-react'

const footerLinks = {
  categories: [
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Beauty', href: '/category/beauty' },
    { name: 'Travel', href: '/category/travel' },
    { name: 'Wellness', href: '/category/wellness' },
    { name: 'Food', href: '/category/food' },
    { name: 'Home', href: '/category/home' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
}

const socialMedia = [
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:bg-pink' },
  { name: 'Pinterest', icon: Pin, href: '#', color: 'hover:bg-coral' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:bg-rose' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:bg-purple' },
  { name: 'Youtube', icon: Youtube, href: '#', color: 'hover:bg-orange' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      {/* Instagram Grid Preview */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-3xl font-bold mb-2">Follow Our Journey</h3>
            <p className="text-gray-600">@luxe.magazine on Instagram</p>
          </div>

          {/* Instagram-style grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Link
                key={i}
                href="#"
                className="aspect-square bg-gradient-to-br from-pink/20 to-coral/20 rounded-lg hover:opacity-80 transition-opacity relative group overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h2 className="font-playfair text-4xl font-bold bg-gradient-to-r from-pink via-coral to-rose bg-clip-text text-transparent">
                LUXE
              </h2>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your daily dose of inspiration for fashion, beauty, travel, and lifestyle.
              We curate the best content to help you live your most stylish life.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink" />
                Subscribe to our Newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink text-white font-semibold rounded-lg hover:bg-pink-dark transition-colors whitespace-nowrap text-sm"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-pink mt-0.5 flex-shrink-0" />
              <span>New York, NY | Los Angeles, CA | Paris, France</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-pink transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialMedia.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`p-3 bg-gray-100 rounded-full ${social.color} hover:text-white transition-all transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600 flex items-center gap-1 justify-center md:justify-end">
                Made with <Heart className="w-4 h-4 text-pink fill-pink" /> by LUXE Magazine
              </p>
              <p className="text-xs text-gray-500 mt-1">
                &copy; {new Date().getFullYear()} LUXE. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-pink via-coral to-rose" />
    </footer>
  )
}
