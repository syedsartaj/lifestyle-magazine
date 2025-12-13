import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    description: "Discover the latest trends, style guides, and fashion inspiration for every season",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    articleCount: 145,
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "Beauty",
    slug: "beauty",
    description: "Expert skincare tips, makeup tutorials, and product reviews for glowing skin",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=600&fit=crop",
    articleCount: 128,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Explore breathtaking destinations, travel guides, and wanderlust inspiration",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
    articleCount: 97,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Embrace intentional living with tips on home decor, organization, and mindful choices",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
    articleCount: 163,
    color: "from-amber-500 to-orange-500"
  },
  {
    name: "Food",
    slug: "food",
    description: "Delicious recipes, cooking tips, and culinary adventures for food lovers",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    articleCount: 112,
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Wellness",
    slug: "wellness",
    description: "Nurture your mind, body, and soul with holistic wellness practices and self-care",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    articleCount: 89,
    color: "from-teal-500 to-green-500"
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into your favorite topics and discover curated content that speaks to your interests and passions
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-80">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2 group-hover:scale-105 transition-transform">
                      {category.name}
                    </h2>
                    <p className="text-gray-200 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {category.articleCount} Articles
                      </span>
                      <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="py-16 mb-16"
          style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Content Library</h2>
              <p className="text-xl opacity-90">Thousands of articles curated just for you</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">734</div>
                <div className="text-lg opacity-90">Total Articles</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">6</div>
                <div className="text-lg opacity-90">Main Categories</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">Expert Contributors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Tags</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Sustainable Living', 'Self Care', 'Minimalism', 'Skincare Routine',
              'Travel Tips', 'Street Style', 'Healthy Recipes', 'Meditation',
              'Home Decor', 'Fashion Week', 'Plant Based', 'Beauty Hacks',
              'Adventure Travel', 'Capsule Wardrobe', 'Mindfulness', 'Interior Design'
            ].map(tag => (
              <span
                key={tag}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>

        {/* Browse All CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Decide Where to Start?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Browse all our articles and discover content across all categories
            </p>
            <Link
              href="/blog"
              className="inline-block px-8 py-3 rounded-full text-white font-semibold hover:shadow-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
            >
              View All Articles
            </Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-600 mb-8">
              Get weekly highlights from your favorite categories delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
              />
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full text-white font-semibold hover:shadow-xl transition-all whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%)' }}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
