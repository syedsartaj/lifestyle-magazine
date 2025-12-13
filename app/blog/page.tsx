import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const articles = [
  {
    id: 1,
    title: "Summer Fashion Trends You Need to Know",
    slug: "summer-fashion-trends-2024",
    excerpt: "Discover the hottest fashion trends taking over this summer season, from vibrant colors to sustainable fabrics.",
    category: "Fashion",
    author: "Emma Richardson",
    date: "2024-06-15",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "10 Skincare Secrets for Glowing Skin",
    slug: "skincare-secrets-glowing-skin",
    excerpt: "Unlock the secrets to radiant, healthy skin with these expert-approved beauty tips and product recommendations.",
    category: "Beauty",
    author: "Sophia Chen",
    date: "2024-06-14",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Hidden Gems: European Cities You Must Visit",
    slug: "hidden-gems-european-cities",
    excerpt: "Explore stunning European destinations that are off the beaten path but absolutely worth adding to your travel bucket list.",
    category: "Travel",
    author: "Lucas Martinez",
    date: "2024-06-13",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
    featured: true
  },
  {
    id: 4,
    title: "Minimalist Living: How to Declutter Your Life",
    slug: "minimalist-living-declutter",
    excerpt: "Transform your space and mindset with practical tips for embracing a minimalist lifestyle that brings peace and clarity.",
    category: "Lifestyle",
    author: "Olivia Banks",
    date: "2024-06-12",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Farm-to-Table: Seasonal Recipe Collection",
    slug: "farm-to-table-seasonal-recipes",
    excerpt: "Celebrate the season's bounty with these delicious, wholesome recipes featuring fresh, local ingredients.",
    category: "Food",
    author: "Isabella Thompson",
    date: "2024-06-11",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Meditation for Beginners: Start Your Journey",
    slug: "meditation-for-beginners",
    excerpt: "Learn the fundamentals of meditation and discover how this ancient practice can transform your mental wellness.",
    category: "Wellness",
    author: "Maya Patel",
    date: "2024-06-10",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    featured: false
  },
  {
    id: 7,
    title: "Sustainable Fashion: Building an Eco-Wardrobe",
    slug: "sustainable-fashion-eco-wardrobe",
    excerpt: "Make conscious fashion choices with our guide to building a sustainable, stylish wardrobe that's kind to the planet.",
    category: "Fashion",
    author: "Emma Richardson",
    date: "2024-06-09",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea42c6f8?w=800&h=600&fit=crop",
    featured: false
  },
  {
    id: 8,
    title: "Weekend Brunch Recipes to Impress",
    slug: "weekend-brunch-recipes",
    excerpt: "Elevate your weekend mornings with these stunning brunch recipes that are as beautiful as they are delicious.",
    category: "Food",
    author: "Isabella Thompson",
    date: "2024-06-08",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&h=600&fit=crop",
    featured: false
  }
];

export default function BlogPage() {
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover inspiring stories, expert advice, and the latest trends in fashion, beauty, travel, and lifestyle
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link
              href="/categories"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-coral-500 text-white font-medium hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
            >
              All Categories
            </Link>
            {['Fashion', 'Beauty', 'Travel', 'Lifestyle', 'Food', 'Wellness'].map(category => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="px-6 py-2 rounded-full border-2 border-gray-200 text-gray-700 font-medium hover:border-pink-400 hover:text-pink-600 transition-all"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Articles Grid */}
        {featuredArticles.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-96">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <span
                        className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3"
                        style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
                      >
                        {article.category}
                      </span>
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-pink-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-200 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-300">
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map(article => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                    style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
                  >
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div
            className="rounded-2xl p-12 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
          >
            <h2 className="text-3xl font-bold mb-4">Never Miss a Story</h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter and get the latest articles delivered straight to your inbox
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-pink-600 font-semibold rounded-full hover:shadow-xl transition-all"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
