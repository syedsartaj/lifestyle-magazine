'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Instagram, Twitter, Facebook, Heart } from 'lucide-react'

const navigation = [
  { name: 'Fashion', href: '/category/fashion' },
  { name: 'Beauty', href: '/category/beauty' },
  { name: 'Travel', href: '/category/travel' },
  { name: 'Wellness', href: '/category/wellness' },
  { name: 'Food', href: '/category/food' },
  { name: 'Home', href: '/category/home' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-coral' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-purple' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-pink via-coral to-rose py-2">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white text-sm">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Welcome to LUXE - Where Style Meets Inspiration</span>
            <span className="sm:hidden">Welcome to LUXE</span>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="hover:scale-110 transition-transform"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink via-coral to-rose bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              LUXE
            </h1>
            <p className="text-xs text-gray-500 tracking-widest uppercase mt-1">Lifestyle Magazine</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-pink font-medium transition-colors link-underline"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-4 animate-fade-in">
            <input
              type="search"
              placeholder="Search for fashion, beauty, travel..."
              className="w-full px-6 py-3 border-2 border-pink/30 rounded-full focus:outline-none focus:border-pink transition-colors"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-fade-in">
          <nav className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-lg text-gray-700 hover:text-pink font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/about"
                className="block text-lg text-gray-700 hover:text-pink font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-lg text-gray-700 hover:text-pink font-medium transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
