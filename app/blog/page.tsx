import Link from 'next/link';
import Image from 'next/image';
import { getSmakslyBlogs, formatBlogDate, estimateReadTime, SmakslyBlog } from '@/lib/smaksly-blogs';

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper to create excerpt from body
function createExcerpt(body: string, maxLength: number = 150): string {
  const textOnly = body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  if (textOnly.length <= maxLength) return textOnly
  return textOnly.substring(0, maxLength).trim() + '...'
}

// Transform SmakslyBlog to the format expected by the page
function transformBlogToArticle(blog: SmakslyBlog, featured: boolean = false) {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: createExcerpt(blog.body),
    category: blog.category || 'Lifestyle',
    author: 'Editorial Team',
    date: new Date(blog.publish_date).toISOString().split('T')[0],
    readTime: estimateReadTime(blog.body),
    image: blog.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    featured,
  }
}

export default async function BlogPage() {
  const smakslyBlogs = await getSmakslyBlogs()

  // Transform blogs - make first 2 featured
  const articles = smakslyBlogs.map((blog, index) => transformBlogToArticle(blog, index < 2))

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
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

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Articles Yet</h2>
              <p className="text-xl text-gray-600 mb-8">
                Check back soon for inspiring content!
              </p>
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
}
