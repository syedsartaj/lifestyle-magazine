import Image from 'next/image'
import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import CategoryPill from '@/components/CategoryPill'
import { Sparkles, TrendingUp, Calendar } from 'lucide-react'
import { getSmakslyBlogs, formatBlogDate, estimateReadTime, SmakslyBlog } from '@/lib/smaksly-blogs'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper to get category color
function getCategoryColor(category?: string): string {
  const colorMap: { [key: string]: string } = {
    fashion: 'pink',
    beauty: 'rose',
    travel: 'coral',
    wellness: 'green',
    food: 'orange',
    home: 'purple',
    lifestyle: 'purple',
  }
  return colorMap[category?.toLowerCase() || ''] || 'pink'
}

// Helper to create excerpt from body
function createExcerpt(body: string, maxLength: number = 150): string {
  const textOnly = body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  if (textOnly.length <= maxLength) return textOnly
  return textOnly.substring(0, maxLength).trim() + '...'
}

// Transform SmakslyBlog to the format expected by the page
function transformBlog(blog: SmakslyBlog, tall: boolean = false) {
  return {
    id: blog.slug,
    title: blog.title,
    excerpt: createExcerpt(blog.body),
    image: blog.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    category: blog.category || 'Lifestyle',
    categoryColor: getCategoryColor(blog.category),
    author: 'Editorial Team',
    date: formatBlogDate(blog.publish_date),
    readTime: estimateReadTime(blog.body),
    tall,
  }
}

export default async function Home() {
  const smakslyBlogs = await getSmakslyBlogs()

  // Transform blogs to match the expected format
  const allPosts = smakslyBlogs.map((blog, index) => transformBlog(blog, index % 3 === 1))

  const featuredPost = allPosts[0] || {
    id: 'default',
    title: 'Welcome to Our Lifestyle Magazine',
    excerpt: 'Discover inspiring stories, expert advice, and the latest trends',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    category: 'Lifestyle',
    categoryColor: 'pink',
    author: 'Editorial Team',
    date: formatBlogDate(new Date()),
    readTime: '5 min read',
  }

  const trendingPosts = allPosts.slice(1, 4)
  const masonryPosts = allPosts.slice(4, 10)

  // Get unique categories with counts
  const categoryMap = new Map<string, number>()
  smakslyBlogs.forEach(blog => {
    const category = blog.category || 'Lifestyle'
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
  })

  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    color: getCategoryColor(name),
    count,
  }))
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
      {trendingPosts.length > 0 && (
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
      )}

      {/* Masonry Grid Section */}
      {masonryPosts.length > 0 && (
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
      )}

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
