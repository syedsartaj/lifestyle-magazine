import Image from 'next/image'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import CategoryPill from '@/components/CategoryPill'
import { Sparkles, TrendingUp, Calendar } from 'lucide-react'

// Sample blog posts data
const featuredPost = {
  id: '1',
  title: 'Summer Fashion Trends That Will Define 2024',
  excerpt: 'From vibrant colors to sustainable fabrics, discover the must-have pieces for your summer wardrobe',
  image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
  category: 'Fashion',
  categoryColor: 'pink',
  author: 'Sophia Laurent',
  date: '2024-12-10',
  readTime: '8 min read',
}

const trendingPosts = [
  {
    id: '2',
    title: '10 Parisian Cafes You Must Visit This Year',
    excerpt: 'A curated guide to the most Instagram-worthy spots in the City of Light',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    category: 'Travel',
    categoryColor: 'coral',
    author: 'Emma Wilson',
    date: '2024-12-09',
    readTime: '6 min read',
  },
  {
    id: '3',
    title: 'The Ultimate Guide to Glass Skin',
    excerpt: 'Achieve that coveted K-beauty glow with our expert skincare routine',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&q=80',
    category: 'Beauty',
    categoryColor: 'rose',
    author: 'Mia Chen',
    date: '2024-12-08',
    readTime: '5 min read',
  },
  {
    id: '4',
    title: 'Minimalist Home Decor on a Budget',
    excerpt: 'Transform your space into a serene sanctuary without breaking the bank',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    category: 'Home',
    categoryColor: 'purple',
    author: 'Olivia Martinez',
    date: '2024-12-07',
    readTime: '7 min read',
  },
]

const masonryPosts = [
  {
    id: '5',
    title: 'Sustainable Fashion Brands You Need to Know',
    excerpt: 'Eco-friendly doesn\'t mean compromising on style',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    category: 'Fashion',
    categoryColor: 'pink',
    author: 'Luna Green',
    date: '2024-12-06',
    readTime: '4 min read',
    tall: false,
  },
  {
    id: '6',
    title: 'Wellness Rituals for Busy Professionals',
    excerpt: 'Self-care practices that actually fit into your hectic schedule',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    category: 'Wellness',
    categoryColor: 'green',
    author: 'Aria Thompson',
    date: '2024-12-05',
    readTime: '6 min read',
    tall: true,
  },
  {
    id: '7',
    title: 'Street Style from Fashion Week',
    excerpt: 'The best looks spotted outside the runway shows',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    category: 'Fashion',
    categoryColor: 'pink',
    author: 'Chloe Anderson',
    date: '2024-12-04',
    readTime: '5 min read',
    tall: false,
  },
  {
    id: '8',
    title: 'Mediterranean Diet: A Lifestyle Approach',
    excerpt: 'Delicious recipes and health benefits of eating like an Italian',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80',
    category: 'Food',
    categoryColor: 'orange',
    author: 'Isabella Rossi',
    date: '2024-12-03',
    readTime: '7 min read',
    tall: true,
  },
  {
    id: '9',
    title: 'Your Guide to Vintage Shopping',
    excerpt: 'Find unique pieces and avoid common pitfalls',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    category: 'Fashion',
    categoryColor: 'pink',
    author: 'Harper Lee',
    date: '2024-12-02',
    readTime: '5 min read',
    tall: false,
  },
  {
    id: '10',
    title: 'Yoga Retreats Worth the Journey',
    excerpt: 'Escape the ordinary at these transformative destinations',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
    category: 'Travel',
    categoryColor: 'coral',
    author: 'Zoe Williams',
    date: '2024-12-01',
    readTime: '6 min read',
    tall: true,
  },
]

const categories = [
  { name: 'Fashion', color: 'pink', count: 124 },
  { name: 'Beauty', color: 'rose', count: 98 },
  { name: 'Travel', color: 'coral', count: 87 },
  { name: 'Wellness', color: 'green', count: 76 },
  { name: 'Food', color: 'orange', count: 65 },
  { name: 'Home', color: 'purple', count: 54 },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-20">
          <div className="max-w-3xl text-white">
            <CategoryPill category={featuredPost.category} color={featuredPost.categoryColor} />
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight">
              {featuredPost.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span className="font-medium">{featuredPost.author}</span>
              <span>•</span>
              <span>{featuredPost.date}</span>
              <span>•</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <Link
              href={`/blog/${featuredPost.id}`}
              className="inline-block mt-8 px-8 py-4 bg-pink hover:bg-pink-dark text-white font-semibold rounded-full transition-all transform hover:scale-105"
            >
              Read Full Article
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-pink" />
            <h2 className="font-playfair text-2xl md:text-3xl font-bold">Explore by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/category/${cat.name.toLowerCase()}`}
                className="group"
              >
                <CategoryPill
                  category={cat.name}
                  color={cat.color}
                  count={cat.count}
                  large
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-gradient-to-b from-white to-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="w-6 h-6 text-coral" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <Calendar className="w-6 h-6 text-purple" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">Latest Stories</h2>
          </div>

          {/* Masonry Grid using CSS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
            {masonryPosts.map((post) => (
              <div
                key={post.id}
                className={post.tall ? 'row-span-2' : 'row-span-1'}
              >
                <BlogCard post={post} masonry />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink via-coral to-rose">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get weekly inspiration delivered straight to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-pink font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-sm mt-4 text-white/80">
            Join 50,000+ style enthusiasts. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}
